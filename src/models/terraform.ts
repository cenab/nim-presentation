// src/models/terraform.ts

// Represents the structure of the JSON output from `terraform output -json`
// The exact structure will depend on the outputs defined in your .tf files.
// This is a basic example, you will likely need to adjust this based on your actual outputs.
export interface TerraformOutput {
  [outputName: string]: {
    value: any; // The value of the output
    type: string; // The type of the output (e.g., "string", "map", "list")
    sensitive: boolean; // Whether the output is sensitive
  };
}

// Represents the configuration passed to Terraform (e.g., variables)
export interface TerraformConfig {
  [variableName: string]: any;
}

// Represents the result of a Terraform apply operation
export interface TerraformApplyResult {
  output: TerraformOutput;
  // Add other relevant information, e.g., logs, status
}