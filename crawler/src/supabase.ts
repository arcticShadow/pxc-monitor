import { createClient } from "@supabase/supabase-js";
import config from "./config";

const getClient = async <T>() => {
  let { supabaseUrl, supabaseKey } = await config;
  console.log({ supabaseKey, supabaseUrl, env: process.env });

  if (!supabaseUrl || !supabaseKey) {
    // get from github secrets - where it puts it in all caps
    supabaseUrl = process.env.SUPABASE_URL;
    supabaseKey = process.env.SUPABASE_KEY;
  }
  return createClient<T>(supabaseUrl, supabaseKey);
};

export { getClient };
