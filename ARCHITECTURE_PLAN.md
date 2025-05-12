# Backend Architecture Plan

This document outlines the architecture for the backend application using TypeScript, Bun, and Hono. The backend will interact with a separate frontend via a dedicated service layer, manage multi-cloud infrastructure using Terraform, communicate with client applications running on the provisioned cloud machines, and utilize Supabase for authentication and database management.

## Project Setup and Initial Structure

The project will be initialized as a Bun project. Core dependencies will include `hono`, `typescript`, `@types/node`, and the Supabase client library (`@supabase/supabase-js`).

The initial directory structure will be organized as follows:

```
/Users/batu/Documents/DEVELOPMENT/nim-backend/
├── src/
│   ├── api/
│   │   ├── infrastructureController.ts
│   │   └── authController.ts # Controller for authentication
│   ├── services/
│   │   ├── frontendService.ts  # Service for frontend interaction
│   │   ├── terraformService.ts
│   │   ├── cloudClientService.ts
│   │   ├── deploymentService.ts # Interacts with Supabase Database
│   │   └── authService.ts # Service for authentication with Supabase
│   ├── models/
│   │   ├── cloud.ts
│   │   ├── terraform.ts
│   │   ├── deployment.ts
│   │   └── auth.ts # Models for auth (e.g., User)
│   ├── utils/
│   │   └── supabaseClient.ts # Supabase client instance
│   └── index.ts
├── terraform/
│   ├── aws/
│   │   └── main.tf  # AWS specific scripts
│   ├── azure/
│   │   └── main.tf # Azure specific scripts
│   └── gcp/
│       └── main.tf # GCP specific scripts
└── package.json
└── tsconfig.json
```

## Core Backend Components

*   **`src/utils/supabaseClient.ts`:**
    *   This file will instantiate and export the Supabase client.
    *   It will read the Supabase URL and Anon Key from environment variables.
    *   This client instance will be used by services that interact with Supabase.

*   **`src/index.ts`:**
    *   The entry point of the Bun application.
    *   Initializes the Hono application instance.
    *   Instantiate necessary services (`DeploymentService`, `TerraformService`, `CloudClientService`, `AuthService`). These services will be instantiated with their dependencies (e.g., `DeploymentService` and `AuthService` will receive the Supabase client).
    *   Instantiate controllers (`InfrastructureController`, `AuthController`) and inject their service dependencies.
    *   Instantiate the `FrontendService` and pass the Hono app and controllers to it for route registration.
    *   Starts the Hono server using Bun's `serve`.

*   **`src/services/frontendService.ts`:**
    *   This service is responsible for setting up the API endpoints using Hono.
    *   It receives incoming HTTP requests from the frontend via Hono's routing.
    *   Its primary role is to route these requests to the appropriate methods within the `InfrastructureController` and `AuthController`.
    *   It acts as the initial entry point for frontend requests into the backend logic.
    *   Example implementation would involve defining Hono routes and linking them to controller methods.

*   **`src/api/authController.ts`:**
    *   Handles authentication-related API requests (e.g., `/auth/signup`, `/auth/login`).
    *   Receives requests from the `FrontendService`.
    *   Calls methods on the `AuthService` to perform authentication operations.
    *   Formats authentication responses (e.g., tokens).

*   **`src/services/authService.ts`:**
    *   **This service encapsulates the logic for interacting with Supabase Authentication.**
    *   **It will use the Supabase client instance to perform operations like user signup, login, logout, and potentially token verification.**
    *   **Designed as an object-oriented interface to the remote Supabase Auth service.**
    *   Methods would include `signup(email, password): Promise<User>`, `login(email, password): Promise<AuthSession>`, `verifyToken(token): Promise<User | null>`.

*   **`src/api/infrastructureController.ts`:**
    *   Receives requests from the `FrontendService`.
    *   **Can utilize the `AuthService` to protect routes, ensuring only authenticated users can trigger infrastructure operations.**
    *   Parses request data, validates input.
    *   Orchestrates calls to `DeploymentService`, `TerraformService`, and `CloudClientService`.
    *   Formats responses.

*   **`src/services/deploymentService.ts`:**
    *   **Manages the state and lifecycle of each infrastructure deployment by interacting with the Supabase Database.**
    *   **It will use the Supabase client instance to perform CRUD operations on a designated table (e.g., `deployments`) in your Supabase database.**
    *   **Designed as an object-oriented interface to the remote Supabase Database service.**
    *   Methods like `createDeployment(data): Promise<Deployment>`, `getDeployment(id): Promise<Deployment | null>`, `updateDeploymentStatus(id, status): Promise<void>`, `deleteDeployment(id): Promise<void>` will translate to Supabase database queries using the client library.
    *   Stores deployment details, including machine addresses from Terraform output, in the Supabase database.

*   **`src/services/terraformService.ts`:**
    *   Interacts with the Terraform CLI using Bun's process API.
    *   Executes commands, parses output (including machine addresses).
    *   Updates the `DeploymentService` (which in turn updates Supabase).

*   **`src/services/cloudClientService.ts`:**
    *   Communicates with client applications on provisioned machines using machine addresses retrieved from the `DeploymentService` (which gets them from Supabase).

## Terraform Script Integration (`terraform/<provider>/*.tf`)

*   Terraform scripts will be placed within the respective cloud provider directories (`terraform/aws`, `terraform/azure`, `terraform/gcp`).
*   These scripts should be reusable and configurable using Terraform variables.
*   Scripts MUST define outputs (`output "..." {}`) for the information the backend needs to interact with the provisioned machines, such as public IP addresses, hostnames, or internal network addresses. These outputs are consumed by the `TerraformService` and stored in the `DeploymentService` for use by the `CloudClientService`.

## End-to-End Workflow Examples

**Provisioning with Frontend Service and Supabase:**

1.  Frontend sends a login/signup request to `/auth/login` or `/auth/signup`.
2.  Hono routes to `FrontendService`, which calls `authController.handleLoginRequest`.
3.  `AuthController` calls `authService.login`, which uses the Supabase client to authenticate with Supabase Auth.
4.  Supabase Auth returns tokens to `AuthService`, which returns them to `AuthController`.
5.  `AuthController` sends tokens back to the frontend.
6.  Frontend stores tokens and includes them in subsequent requests (e.g., in the `Authorization` header).
7.  Frontend sends a `POST` request to `/provision` with the token.
8.  Hono routes to `FrontendService`, which calls `infrastructureController.handleProvisionRequest`.
9.  `InfrastructureController` uses `AuthService.verifyToken` (or middleware) to validate the token with Supabase Auth, ensuring the user is authenticated.
10. If authenticated, `InfrastructureController` proceeds: initiates deployment via `DeploymentService` (which saves state to Supabase Database), calls `TerraformService`, which updates `DeploymentService` (Supabase Database) with machine addresses.
11. `InfrastructureController` can call `CloudClientService` for initial client interaction.
12. `InfrastructureController` prepares the response and returns it via the `FrontendService`.

**Sending Command to Existing Deployment with Frontend Service and Supabase:**

1.  Frontend sends a `POST` request to `/infrastructure/:deploymentId/command`.
2.  Hono routes to `FrontendService`, which calls `infrastructureController.handleSendCommandRequest`.
3.  `InfrastructureController` retrieves deployment details (including machine addresses) from `DeploymentService` (from Supabase Database).
4.  `InfrastructureController` calls `cloudClientService.sendCommand` for each relevant machine address.
5.  `CloudClientService` communicates with the client on the cloud machine.
6.  The client processes the command and responds.
7.  `CloudClientService` returns the response to `InfrastructureController`.
8.  `InfrastructureController` aggregates responses and returns the final response.
9.  The response is sent back to the frontend via the `FrontendService`.

## Architecture Diagram

```mermaid
graph TD
    A[Frontend Request] --> B(Hono Application);
    B --> C[Frontend Service];
    C -- Routes Auth Request --> D{Auth Controller};
    D -- Calls --> E[Auth Service];
    E -- Uses --> F[Supabase Client];
    F -- Interacts with --> G[Supabase Auth (Remote)];
    G --> F;
    F --> E;
    E --> D;
    D -- Sends Response --> C;

    C -- Routes Infra Request --> H{Infrastructure Controller};
    H -- (Optional) Uses --> E[Auth Service];
    E -- Verifies Token --> G[Supabase Auth (Remote)];
    G --> E;
    E --> H;

    H -- Calls --> I[Deployment Service];
    I -- Uses --> F[Supabase Client];
    F -- Interacts with --> J[Supabase Database (Remote)];
    J --> F;
    F --> I;
    I -- Create/Get/Update Deployment --> K[Deployment State in Supabase];
    K --> I;
    I --> H;

    H -- Calls --> L[Terraform Service];
    L -- Determines Dir --> M[terraform/aws, azure, gcp Folders];
    L -- Executes Terraform CLI --> N[Bun Child Process];
    N -- Reads .tf files --> M;
    N -- Interacts with --> O[Cloud Provider APIs];
    N -- Manages State --> P[Remote State Backend (Recommended)];
    N -- Outputs JSON (Machine Addresses) --> L;
    L -- Parses Output --> Q[Machine Addresses/Outputs];
    Q --> I{Deployment Service};
    I -- Updates State --> K;
    L -- Returns Result --> H;

    H -- Calls --> R[Cloud Client Service];
    R -- Gets Addresses from --> I[Deployment Service];
    R -- Communicates with --> S[Client on Cloud Machine];
    S --> R;
    R -- Returns Result --> H;

    H -- Formats Response --> C;
    C -- Sends Response --> B;
    B --> A[Frontend Request];