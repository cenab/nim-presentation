import { SupabaseClient, User, AuthSession } from '@supabase/supabase-js';

export class AuthService {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async signup(email: string, password: string): Promise<{ user: User | null; session: AuthSession | null; error: Error | null }> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });
    return { user: data.user, session: data.session, error };
  }

  async login(email: string, password: string): Promise<{ session: AuthSession | null; error: Error | null }> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { session: data.session, error };
  }

  async verifyToken(token: string): Promise<User | null> {
    const { data, error } = await this.supabase.auth.getUser(token);
    if (error) {
      console.error('Error verifying token:', error.message);
      return null;
    }
    return data.user;
  }

  async logout(): Promise<{ error: Error | null }> {
    const { error } = await this.supabase.auth.signOut();
    return { error };
  }

  async resetPassword(email: string, redirectTo?: string): Promise<{ data: any; error: Error | null }> {
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, redirectTo ? { redirectTo } : undefined);
    return { data, error };
  }

  async updateUser(attributes: { password?: string; email?: string }): Promise<{ user: User | null; error: Error | null }> {
    const { data, error } = await this.supabase.auth.updateUser(attributes);
    return { user: data.user, error };
  }

  async refreshSession(refreshToken: string): Promise<{ session: AuthSession | null; error: Error | null }> {
    const { data, error } = await this.supabase.auth.refreshSession({ refresh_token: refreshToken });
    return { session: data.session, error };
  }
}