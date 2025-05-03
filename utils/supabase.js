import { createClient } from "@supabase/supabase-js";
import {
  EXPO_PUBLIC_SUPABASE_ANON_KEY,
  EXPO_PUBLIC_SUPABASE_URL,
} from "../env";

export const supabase = createClient(
  EXPO_PUBLIC_SUPABASE_URL || "",
  EXPO_PUBLIC_SUPABASE_ANON_KEY || ""
);

import {
  EXPO_PUBLIC_SUPABASE_ANON_KEY1,
  EXPO_PUBLIC_SUPABASE_URL1,
} from "../env";

export const supabase_noti = createClient(
  EXPO_PUBLIC_SUPABASE_URL1 || "",
  EXPO_PUBLIC_SUPABASE_ANON_KEY1 || ""
);

