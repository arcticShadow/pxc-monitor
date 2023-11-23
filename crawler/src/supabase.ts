import { createClient } from "@supabase/supabase-js";
import config from "./config";

const getClient = async <T>() => {
  let { supabaseUrl, supabaseKey } = await config;

  if (!supabaseUrl || !supabaseKey) {
    supabaseUrl = process.env.supabaseUrl;
    supabaseKey = process.env.supabaseKey;
  }
  return createClient<T>(supabaseUrl, supabaseKey);
};

export { getClient };
