import { Context } from 'hono';
import { AuthService } from '../services/authService';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async handleSignupRequest(c: Context) {
    try {
      const { email, password } = await c.req.json();
      // Basic validation
      if (!email || !password) {
        return c.json({ error: 'Email and password are required' }, 400);
      }

      const { user, session, error } = await this.authService.signup(email, password);

      if (error) {
        return c.json({ error: error.message }, 500);
      }

      return c.json({ user, session });
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  }

  async handleLoginRequest(c: Context) {
    try {
      const { email, password } = await c.req.json();
       // Basic validation
       if (!email || !password) {
        return c.json({ error: 'Email and password are required' }, 400);
      }

      const { session, error } = await this.authService.login(email, password);

      if (error) {
         // Supabase login errors often have specific messages
        return c.json({ error: error.message }, 401);
      }

      return c.json({ session });
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  }

  // Add other auth handling methods as needed (e.g., handleLogoutRequest)
}