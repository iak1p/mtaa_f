import { createClient } from "@supabase/supabase-js";

export const supabase_noti = createClient(
  "https://yzfmkyxkcwocoyznoxhb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6Zm1reXhrY3dvY295em5veGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MDU4NjQsImV4cCI6MjA2MTE4MTg2NH0.KWiby4nZBc7rCsv0JjTnfQ4yFS5VM0h8bGxAL93Aock"
);
