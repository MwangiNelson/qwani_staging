"use client";
import React, { Suspense } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const NProgress = () => {
  return (
    <Suspense>
      <ProgressBar
        height="4px"
        color="#8F8F92"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </Suspense>
  );
};
