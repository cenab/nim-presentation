// src/models/deployment.ts

export interface Deployment {
  id: string; // Unique deployment ID
  user_id: string; // ID of the user who initiated the deployment (from Supabase Auth)
  cloud_provider: 'aws' | 'azure' | 'gcp' | string; // e.g., 'aws', 'azure', 'gcp'
  status: 'pending' | 'provisioning' | 'provisioned' | 'destroying' | 'destroyed' | 'failed';
  config: any; // Store the configuration used for this deployment (e.g., instance type, region)
  terraform_output: any; // Store the parsed output from terraform apply (e.g., machine IP addresses)
  created_at: string; // Timestamp of creation
  updated_at: string; // Timestamp of last update
}

// You might add other related models here if needed, e.g., for specific cloud resource details