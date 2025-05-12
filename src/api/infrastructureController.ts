import { Context } from 'hono';
import { DeploymentService } from '../services/deploymentService';
import { TerraformService } from '../services/terraformService';
import { CloudClientService } from '../services/cloudClientService';
import { AuthService } from '../services/authService'; // For authentication check
import { CloudProvider } from '../models/cloud';
import { Deployment } from '../models/deployment';

export class InfrastructureController {
  private deploymentService: DeploymentService;
  private terraformService: TerraformService;
  private cloudClientService: CloudClientService;
  private authService: AuthService;

  constructor(
    deploymentService: DeploymentService,
    terraformService: TerraformService,
    cloudClientService: CloudClientService,
    authService: AuthService
  ) {
    this.deploymentService = deploymentService;
    this.terraformService = terraformService;
    this.cloudClientService = cloudClientService;
    this.authService = authService;
  }

  async handleProvisionRequest(c: Context) {
    try {
      // Authenticate user (example - you might use Hono middleware for this)
      const token = c.req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return c.json({ error: 'Authentication required' }, 401);
      }
      const user = await this.authService.verifyToken(token);
      if (!user) {
        return c.json({ error: 'Invalid or expired token' }, 401);
      }

      const { provider, config } = await c.req.json();

      // Basic validation
      if (!provider || !config) {
        return c.json({ error: 'Cloud provider and configuration are required' }, 400);
      }

      // Validate provider
      if (!Object.values(CloudProvider).includes(provider)) {
         return c.json({ error: `Invalid cloud provider: ${provider}` }, 400);
      }

      // Create a new deployment record in the database
      const newDeploymentData: Partial<Deployment> = {
        user_id: user.id,
        cloud_provider: provider,
        status: 'pending',
        config: config,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const deployment = await this.deploymentService.createDeployment(newDeploymentData);

      if (!deployment) {
        return c.json({ error: 'Failed to create deployment record' }, 500);
      }

      // Asynchronously trigger Terraform provisioning
      // Note: In a real-world scenario, you might want a more robust background job system
      // for long-running Terraform operations instead of awaiting directly in the request handler.
      this.terraformService.apply(provider as CloudProvider, deployment.id, config)
        .then(terraformOutput => {
          // Update deployment record with provisioned details and status
          this.deploymentService.updateDeploymentStatus(deployment.id, 'provisioned');
          // Store terraform_output in the deployment record
          this.deploymentService.updateDeploymentStatus(deployment.id, 'provisioned'); // Update status again after output is ready
          // You would also update the deployment record with the actual terraform_output here
          // this.deploymentService.updateDeploymentOutput(deployment.id, terraformOutput);
          console.log(`Deployment ${deployment.id} provisioned successfully.`);

          // Optional: Perform initial client interaction after provisioning
          // if (terraformOutput && terraformOutput.machine_address) { // Example output key
          //   this.cloudClientService.sendCommand(terraformOutput.machine_address.value, 'initial_setup', {});
          // }

        })
        .catch(async (error) => {
          console.error(`Error provisioning deployment ${deployment.id}:`, error);
          // Update deployment record status to failed
          await this.deploymentService.updateDeploymentStatus(deployment.id, 'failed');
        });


      return c.json({
        message: 'Infrastructure provisioning initiated',
        deploymentId: deployment.id,
        status: deployment.status,
      }, 202); // 202 Accepted - processing is ongoing

    } catch (error: any) {
      console.error('Error in handleProvisionRequest:', error);
      return c.json({ error: error.message }, 500);
    }
  }

  async handleSendCommandRequest(c: Context) {
     try {
      // Authenticate user
      const token = c.req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return c.json({ error: 'Authentication required' }, 401);
      }
      const user = await this.authService.verifyToken(token);
      if (!user) {
        return c.json({ error: 'Invalid or expired token' }, 401);
      }

      const deploymentId = c.req.param('deploymentId');
      const { command, payload } = await c.req.json();

      if (!deploymentId || !command) {
          return c.json({ error: 'Deployment ID and command are required' }, 400);
      }

      // Retrieve deployment details to get machine addresses
      const deployment = await this.deploymentService.getDeployment(deploymentId);

      if (!deployment) {
          return c.json({ error: `Deployment with ID ${deploymentId} not found` }, 404);
      }

      // Ensure the authenticated user owns this deployment (basic authorization)
      if (deployment.user_id !== user.id) {
          return c.json({ error: 'Unauthorized access to deployment' }, 403);
      }

      // Extract machine addresses from terraform_output
      // This part is highly dependent on the structure of your Terraform output
      const machineAddresses: string[] = [];
      if (deployment.terraform_output && deployment.terraform_output.machine_address) { // Example output key
          // Assuming machine_address is a single value or an array of values
          const outputValue = deployment.terraform_output.machine_address.value;
          if (Array.isArray(outputValue)) {
              machineAddresses.push(...outputValue);
          } else if (outputValue) {
              machineAddresses.push(outputValue);
          }
      }

      if (machineAddresses.length === 0) {
          return c.json({ error: `No machine addresses found for deployment ${deploymentId}` }, 404);
      }

      // Send command to each machine
      const results = await Promise.all(machineAddresses.map(address =>
          this.cloudClientService.sendCommand(address, command, payload)
            .catch(err => {
              console.error(`Error sending command to ${address}:`, err);
              return { address, error: err.message }; // Return error for this machine
            })
      ));

      return c.json({
          message: 'Command sent to cloud machines',
          deploymentId: deploymentId,
          results: results, // Array of results for each machine
      });

    } catch (error: any) {
      console.error('Error in handleSendCommandRequest:', error);
      return c.json({ error: error.message }, 500);
    }
  }

  async handleDestroyRequest(c: Context) {
    try {
      // Authenticate user
      const token = c.req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return c.json({ error: 'Authentication required' }, 401);
      }
      const user = await this.authService.verifyToken(token);
      if (!user) {
        return c.json({ error: 'Invalid or expired token' }, 401);
      }

      const deploymentId = c.req.param('deploymentId');

      if (!deploymentId) {
          return c.json({ error: 'Deployment ID is required' }, 400);
      }

      // Retrieve deployment details
      const deployment = await this.deploymentService.getDeployment(deploymentId);

      if (!deployment) {
          return c.json({ error: `Deployment with ID ${deploymentId} not found` }, 404);
      }

       // Ensure the authenticated user owns this deployment
      if (deployment.user_id !== user.id) {
          return c.json({ error: 'Unauthorized access to deployment' }, 403);
      }

      // Update deployment status to destroying
      await this.deploymentService.updateDeploymentStatus(deploymentId, 'destroying');

      // Asynchronously trigger Terraform destroy
      this.terraformService.destroy(deployment.cloud_provider as CloudProvider, deploymentId)
        .then(async () => {
          console.log(`Deployment ${deploymentId} destroyed successfully.`);
          // Update deployment status to destroyed
          await this.deploymentService.updateDeploymentStatus(deploymentId, 'destroyed');
          // Optionally delete the record or mark as inactive
          // await this.deploymentService.deleteDeployment(deploymentId);
        })
        .catch(async (error) => {
          console.error(`Error destroying deployment ${deploymentId}:`, error);
          // Update deployment status to failed
          await this.deploymentService.updateDeploymentStatus(deploymentId, 'failed');
        });

      return c.json({
        message: 'Infrastructure destruction initiated',
        deploymentId: deploymentId,
        status: 'destroying',
      }, 202); // 202 Accepted - processing is ongoing

    } catch (error: any) {
      console.error('Error in handleDestroyRequest:', error);
      return c.json({ error: error.message }, 500);
    }
  }

  // Add other infrastructure-related handling methods as needed
}