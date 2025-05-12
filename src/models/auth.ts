// src/models/auth.ts

import { User as SupabaseUser, Session as SupabaseSession } from '@supabase/supabase-js';

// You can extend or adapt the Supabase User and Session types if needed
export interface User extends SupabaseUser {}
export interface AuthSession extends SupabaseSession {}

// Add other auth-related models or interfaces here if necessary
// For example, interfaces for login/signup request bodies.