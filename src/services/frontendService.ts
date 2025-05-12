import { Hono } from 'hono';
import { InfrastructureController } from '../api/infrastructureController';
import { AuthController } from '../api/authController';

export class FrontendService {
  private app: Hono;
  private infrastructureController: InfrastructureController;
  private authController: AuthController;

  constructor(app: Hono, infrastructureController: InfrastructureController, authController: AuthController) {
    this.app = app;
    this.infrastructureController = infrastructureController;
    this.authController = authController;
    this.setupRoutes();
  }

  private setupRoutes() {
    // Infrastructure Routes
    this.app.post('/provision', (c) => this.infrastructureController.handleProvisionRequest(c));
    this.app.post('/infrastructure/:deploymentId/command', (c) => this.infrastructureController.handleSendCommandRequest(c));
    this.app.delete('/infrastructure/:deploymentId', (c) => this.infrastructureController.handleDestroyRequest(c));

    // Authentication Routes
    this.app.post('/auth/signup', (c) => this.authController.handleSignupRequest(c));
    this.app.post('/auth/login', (c) => this.authController.handleLoginRequest(c));
    // Add other auth routes as needed (e.g., logout, refresh token)

    // Add other frontend-facing routes here
  }
}