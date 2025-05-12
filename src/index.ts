import { Hono } from 'hono';
import { FrontendService } from './services/frontendService';
import { InfrastructureController } from './api/infrastructureController';
import { AuthController } from './api/authController';
import { AuthService } from './services/authService';
import { DeploymentService } from './services/deploymentService';
import { TerraformService } from './services/terraformService';
import { CloudClientService } from './services/cloudClientService';
import { supabase } from './utils/supabaseClient';

// Instantiate Services
const authService = new AuthService(supabase);
const deploymentService = new DeploymentService(supabase);
const terraformService = new TerraformService(); // Dependencies will be added later
const cloudClientService = new CloudClientService(); // Dependencies will be added later

// Instantiate Controllers
const authController = new AuthController(authService);
const infrastructureController = new InfrastructureController(
  deploymentService,
  terraformService,
  cloudClientService,
  authService // Inject AuthService for route protection
);

// Initialize Hono app
const app = new Hono();

// Instantiate FrontendService and set up routes
const frontendService = new FrontendService(app, infrastructureController, authController);

// Start the Bun server
Bun.serve({
  fetch: app.fetch,
  port: 3000, // Or your desired port
});

console.log('Bun server is running on port 3000');