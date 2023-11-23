import { createClient } from "@supabase/supabase-js";
import config from "./config";

const getClient = async <T>() => {
  let { supabaseUrl, supabaseKey } = await config;

  if (!supabaseUrl || !supabaseKey) {
    // get from github secrets - where it puts it in all caps
    supabaseUrl = process.env.SUPABASEURL;
    supabaseKey = process.env.SUPABASEKEY;
  }
  return createClient<T>(supabaseUrl, supabaseKey);
};

export { getClient };
