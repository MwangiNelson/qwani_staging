"use client";
import React from "react";
import { useWebsiteContext } from "./WebsiteContext";
import { CustomSpeedDial } from "../CustomSpeedDial";

export const SpeedDialViewer = () => {
  const { speedDial } = useWebsiteContext();
  return speedDial ? <CustomSpeedDial /> : null;
};
