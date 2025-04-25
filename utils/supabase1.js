import { createClient } from "@supabase/supabase-js";
import {
  EXPO_PUBLIC_SUPABASE_ANON_KEY1,
  EXPO_PUBLIC_SUPABASE_URL1,
} from "../env";

export const supabase = createClient(
  EXPO_PUBLIC_SUPABASE_URL1 || "",
  EXPO_PUBLIC_SUPABASE_ANON_KEY1 || ""
);
