import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://pyestzeenlmflfpjvegx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZXN0emVlbmxtZmxmcGp2ZWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3NDE5ODgsImV4cCI6MjAzOTMxNzk4OH0.-_rEifI4qxoZ6lSU1wv5lNKD8LFR_VN4bQW3sKeKbw8"
);
