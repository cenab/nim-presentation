import { CloudProvider } from '../models/cloud';
import { TerraformApplyResult, TerraformConfig, TerraformOutput } from '../models/terraform';
import { DeploymentService } from './deploymentService'; // To update deployment status

// Note: In a real application, you would inject DeploymentService here
// and potentially a logging service. For simplicity, we'll assume direct import for now.

export class TerraformService {
  // Injected dependency (ideally)
  // private deploymentService: DeploymentService;

  constructor(
    // deploymentService: DeploymentService
    ) {
    // this.deploymentService = deploymentService;
  }

  private getTerraformDir(provider: CloudProvider): string {
    // Assumes Terraform files are in ./terraform/<provider>
    return `./terraform/${provider.toLowerCase()}`;
  }

  private async executeTerraformCommand(provider: CloudProvider, command: string, args: string[] = []): Promise<string> {
    const terraformDir = this.getTerraformDir(provider);
    console.log(`Executing 'terraform ${command}' in ${terraformDir}`);

    // Use Bun.spawn for executing external processes
    const proc = Bun.spawn(['terraform', command, ...args], {
      cwd: terraformDir,
      stdout: 'pipe',
      stderr: 'pipe',
    });

    const stdout = await new Response(proc.stdout).text();
    const stderr = await new Response(proc.stderr).text();

    const exitCode = await proc.exitCode;

    if (exitCode !== 0) {
      console.error(`Terraform command failed with exit code ${exitCode}`);
      console.error('Stderr:', stderr);
      throw new Error(`Terraform command failed: ${stderr}`);
    }

    console.log('Stdout:', stdout);
    return stdout;
  }

  async apply(provider: CloudProvider, deploymentId: string, config: TerraformConfig): Promise<TerraformApplyResult> {
    const terraformDir = this.getTerraformDir(provider);

    // Prepare variables for Terraform
    const varArgs: string[] = [];
    for (const key in config) {
      if (Object.prototype.hasOwnProperty.call(config, key)) {
        // Simple handling for string/number variables.
        // For complex types, consider writing a .tfvars file.
        varArgs.push(`-var=${key}=${config[key]}`);
      }
    }

    // Run terraform init (idempotent)
    await this.executeTerraformCommand(provider, 'init');

    // Run terraform apply
    await this.executeTerraformCommand(provider, 'apply', ['-auto-approve', ...varArgs]);

    // Get terraform output
    const outputJsonString = await this.executeTerraformCommand(provider, 'output', ['-json']);
    const output: TerraformOutput = JSON.parse(outputJsonString);

    // In a real scenario, you would update the DeploymentService here
    // this.deploymentService.updateDeploymentOutput(deploymentId, output);

    return { output };
  }

  async destroy(provider: CloudProvider, deploymentId: string): Promise<void> {
     const terraformDir = this.getTerraformDir(provider);

     // Run terraform init (idempotent)
    await this.executeTerraformCommand(provider, 'init');

    // Run terraform destroy
    await this.executeTerraformCommand(provider, 'destroy', ['-auto-approve']);

    // In a real scenario, you would update the DeploymentService here
    // this.deploymentService.updateDeploymentStatus(deploymentId, 'destroyed');
  }

  async getOutput(provider: CloudProvider): Promise<TerraformOutput> {
     const terraformDir = this.getTerraformDir(provider);

     // Run terraform init (idempotent)
    await this.executeTerraformCommand(provider, 'init');

    // Get terraform output
    const outputJsonString = await this.executeTerraformCommand(provider, 'output', ['-json']);
    const output: TerraformOutput = JSON.parse(outputJsonString);
    return output;
  }
}