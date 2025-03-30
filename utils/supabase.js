import { createClient } from "@supabase/supabase-js";
import {
  EXPO_PUBLIC_SUPABASE_ANON_KEY,
  EXPO_PUBLIC_SUPABASE_URL,
} from "../env";

export const supabase = createClient(
  EXPO_PUBLIC_SUPABASE_URL || "",
  EXPO_PUBLIC_SUPABASE_ANON_KEY || ""
);
