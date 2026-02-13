"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import GoogleSignIn from "./google-sign-in";
import EmailAuthForm from "./email-auth-form";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<"choice" | "login" | "register">("choice");

  const handleClose = () => {
    setAuthMode("choice");
    onClose();
  };

  const handleSuccess = () => {
    setAuthMode("choice");
    onSuccess?.();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl font-semibold text-center">
              {authMode === "choice" && "Join the Conversation"}
              {authMode === "login" && "Welcome Back"}
              {authMode === "register" && "Create Your Account"}
            </DialogTitle>
            <DialogDescription className="text-center font-dm-sans text-muted-foreground pt-2">
              {authMode === "choice" && "Sign in to leave comments and engage with our community"}
              {authMode === "login" && "Sign in to continue to your account"}
              {authMode === "register" && "Create an account to join our community"}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {authMode === "choice" && (
            <div className="space-y-4">
              {/* Google Sign In */}
              <GoogleSignIn />

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground font-dm-sans">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Email Options */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-12 font-dm-sans font-medium"
                  onClick={() => setAuthMode("login")}
                >
                  Sign in with Email
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-10 font-dm-sans text-muted-foreground hover:text-foreground"
                  onClick={() => setAuthMode("register")}
                >
                  New here? Create an account
                </Button>
              </div>
            </div>
          )}

          {(authMode === "login" || authMode === "register") && (
            <div className="space-y-4">
              <EmailAuthForm
                mode={authMode}
                onSuccess={handleSuccess}
                onModeSwitch={() => setAuthMode(authMode === "login" ? "register" : "login")}
              />

              {/* Back to choice */}
              <Button
                variant="ghost"
                className="w-full h-10 font-dm-sans text-muted-foreground hover:text-foreground"
                onClick={() => setAuthMode("choice")}
              >
                Back to all options
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-muted/30 border-t">
          <p className="text-xs text-center text-muted-foreground font-dm-sans">
            By continuing, you agree to our{" "}
            <a href="/terms" className="underline hover:text-foreground">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
