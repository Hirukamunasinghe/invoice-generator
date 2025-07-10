import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bopyxpetvqxberdxfift.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvcHl4cGV0dnF4YmVyZHhmaWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNTAzODMsImV4cCI6MjA2NzcyNjM4M30.g_Jw--vaedeF7LieRnLz_zNaJg6NOhVX7X5GhvAitCQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 