import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://coawqomwhsqoimrvjmwy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvYXdxb213aHNxb2ltcnZqbXd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ0Nzg1MjQsImV4cCI6MjExMDA1NDUyNH0.7Kq5kLv20twgXj0ZhK_NLnQar-MmnNymLCDDzWEmMow';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface ContactMessage {
  id?: string;
  name: string;
  phone_whatsapp: string;
  message: string;
  status?: 'new' | 'contacted' | 'closed';
  created_at?: string;
}
