"use client";
import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const NProgress = () => {
  return (
    <ProgressBar
      height="4px"
      color="#8F8F92"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};
