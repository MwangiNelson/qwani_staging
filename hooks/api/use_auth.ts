import { createClient } from "@/utils/supabase/supabase_ client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface AuthError {
  message: string;
}

export const useEmailAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const supabase = createClient();

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Invalidate user queries to refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
      
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (authData.user) {
        // Create user profile in the users table
        const { error: profileError } = await supabase.from("users").upsert({
          id: authData.user.id,
          email: authData.user.email!,
          display_name: email.split("@")[0], // Default display name from email
          created_at: new Date().toISOString(),
        });

        if (profileError) {
          console.error("Error creating user profile:", profileError);
          // Don't throw here - the auth account was created successfully
        }
      }

      // Invalidate user queries
      queryClient.invalidateQueries({ queryKey: ["user"] });

      return authData;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        throw new Error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    resetPassword,
    isLoading,
  };
};

// Hook to create/upsert user profile after OAuth
export const useCreateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      email,
      displayName,
      profileImage,
    }: {
      id: string;
      email: string;
      displayName?: string;
      profileImage?: string;
    }) => {
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from("users")
        .upsert({
          id,
          email,
          display_name: displayName || email.split("@")[0],
          profile_image: profileImage,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
