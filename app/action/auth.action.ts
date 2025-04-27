"use server"
import { supabaseServerClient } from "@/utils/supabase/supabase_server";
import { headers } from "next/headers";

export const signOut = async () => {
    const supabase = await supabaseServerClient();
    const headersList = await headers();
    const origin = headersList.get("origin");
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    } else {
      return true;
    }
  };