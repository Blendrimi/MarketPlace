// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://spgpdlzhnspxavygkbnm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwZ3BkbHpobnNweGF2eWdrYm5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NTAzNzUsImV4cCI6MjA2MjEyNjM3NX0.G-y1c0o4gqiw9TNDlebOEmTXY8qt4sNqXWaKt2UW2nE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
