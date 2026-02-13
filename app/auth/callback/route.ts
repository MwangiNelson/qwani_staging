import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { supabaseServerClient } from "@/utils/supabase/supabase_server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await supabaseServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data.user) {
      // Create or update user profile after OAuth
      const { error: profileError } = await supabase.from("users").upsert({
        id: data.user.id,
        email: data.user.email!,
        display_name: data.user.user_metadata?.full_name || 
                      data.user.user_metadata?.name || 
                      data.user.email?.split("@")[0],
        profile_image: data.user.user_metadata?.avatar_url || 
                       data.user.user_metadata?.picture,
        updated_at: new Date().toISOString(),
      });

      if (profileError) {
        console.error("Error creating/updating user profile:", profileError);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }
  return NextResponse.redirect(`${origin}`);
}
