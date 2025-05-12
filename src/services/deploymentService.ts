import { SupabaseClient } from '@supabase/supabase-js';
import { Deployment } from '../models/deployment.ts'; // Assuming a Deployment model

export class DeploymentService {
  private supabase: SupabaseClient;
  private tableName = 'deployments'; // Your Supabase table name for deployments

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async createDeployment(data: Partial<Deployment>): Promise<Deployment | null> {
    const { data: newDeployment, error } = await this.supabase
      .from(this.tableName)
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error('Error creating deployment:', error.message);
      return null;
    }
    return newDeployment;
  }

  async getDeployment(id: string): Promise<Deployment | null> {
    const { data: deployment, error } = await this.supabase
      .from(this.tableName)
      .select()
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching deployment ${id}:`, error.message);
      return null;
    }
    return deployment;
  }

  async updateDeploymentStatus(id: string, status: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error(`Error updating deployment ${id} status:`, error.message);
    }
  }

  async deleteDeployment(id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting deployment ${id}:`, error.message);
    }
  }

  // Add other methods as needed (e.g., list deployments by user)
}