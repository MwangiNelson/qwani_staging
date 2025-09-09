"use client";

import { Button } from "@/components/ui/button";
import { imageUrl } from "@/sanity/lib/client";
import { IComicPanel } from "@/utils/data_types";
import {
  Maximize2,
  Minimize2,
  Play,
  Pause,
  ChevronUp,
  ChevronDown,
  BookOpen,
  Eye,
  Moon,
  Sun,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";

interface VerticalComicViewerProps {
  panels: IComicPanel[];
  title: string;
}

export default function VerticalComicViewer({
  panels,
  title,
}: VerticalComicViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [autoScroll, setAutoScroll] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [readingMode, setReadingMode] = useState<"comfort" | "focus" | "wide">(
    "comfort"
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const controlsTimer = useRef<NodeJS.Timeout | null>(null);

  const totalPanels = panels.length;

  // Auto-scroll functionality
  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }

    autoScrollRef.current = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop += scrollSpeed;
      }
    }, 50);
  }, [scrollSpeed]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }, []);

  const toggleAutoScroll = useCallback(() => {
    if (autoScroll) {
      stopAutoScroll();
      setAutoScroll(false);
    } else {
      startAutoScroll();
      setAutoScroll(true);
    }
  }, [autoScroll, startAutoScroll, stopAutoScroll]);

  // Scroll functions
  const scrollToTop = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  // Reading mode functions
  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode]);

  const adjustZoom = useCallback((direction: "in" | "out") => {
    setZoomLevel((prev) => {
      const newZoom = direction === "in" ? prev + 25 : prev - 25;
      return Math.max(50, Math.min(200, newZoom));
    });
  }, []);

  const resetZoom = useCallback(() => {
    setZoomLevel(100);
  }, []);

  // Handle scroll progress
  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    }
  }, []);

  // Auto-hide controls
  const resetControlsTimer = useCallback(() => {
    if (controlsTimer.current) {
      clearTimeout(controlsTimer.current);
    }
    setShowControls(true);
    if (isFullscreen) {
      controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
    }
  }, [isFullscreen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
      if (e.key === "f" || e.key === "F") toggleFullscreen();
      if (e.key === " ") {
        e.preventDefault();
        toggleAutoScroll();
      }
      if (e.key === "Home") scrollToTop();
      if (e.key === "End") scrollToBottom();
      if (e.key === "d" || e.key === "D") toggleDarkMode();
      if (e.key === "+" || e.key === "=") adjustZoom("in");
      if (e.key === "-") adjustZoom("out");
      if (e.key === "0") resetZoom();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    toggleFullscreen,
    toggleAutoScroll,
    scrollToTop,
    scrollToBottom,
    toggleDarkMode,
    adjustZoom,
    resetZoom,
  ]);

  // Auto-hide controls effect
  useEffect(() => {
    if (!isFullscreen) {
      setShowControls(true);
      if (controlsTimer.current) {
        clearTimeout(controlsTimer.current);
      }
      return;
    }
    resetControlsTimer();
  }, [isFullscreen, resetControlsTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
      if (controlsTimer.current) {
        clearTimeout(controlsTimer.current);
      }
    };
  }, []);

  if (!panels || panels.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No comic panels available</p>
      </div>
    );
  }

  // Get reading mode styles
  const getReadingModeStyles = () => {
    switch (readingMode) {
      case "comfort":
        return {
          container: "max-w-4xl mx-auto",
          panel: "mb-8",
          spacing: "space-y-8",
        };
      case "focus":
        return {
          container: "max-w-2xl mx-auto",
          panel: "mb-6",
          spacing: "space-y-6",
        };
      case "wide":
        return {
          container: "max-w-6xl mx-auto",
          panel: "mb-12",
          spacing: "space-y-12",
        };
      default:
        return {
          container: "max-w-4xl mx-auto",
          panel: "mb-8",
          spacing: "space-y-8",
        };
    }
  };

  const readingStyles = getReadingModeStyles();

  return (
    <div
      className={`document-comic-viewer ${
        isFullscreen ? "fixed inset-0 z-50" : ""
      } ${darkMode ? "dark" : ""} ${darkMode ? "bg-gray-900" : "bg-white"}`}
    >
      {/* Header */}
      <div
        className={`${
          isFullscreen
            ? "absolute top-0 left-0 right-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700"
            : "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
        } transition-opacity duration-300 ${
          showControls || !isFullscreen ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="web-px py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <h2
                className={`text-lg sm:text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {title}
              </h2>
              <span
                className={`text-xs sm:text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {totalPanels} panels
              </span>
            </div>

            {/* Reading Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Reading Mode - Hidden on mobile */}
              <select
                value={readingMode}
                onChange={(e) =>
                  setReadingMode(e.target.value as "comfort" | "focus" | "wide")
                }
                className={`hidden sm:block text-xs px-2 py-1 rounded border ${
                  darkMode
                    ? "bg-gray-800 text-white border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
              >
                <option value="comfort">Comfort</option>
                <option value="focus">Focus</option>
                <option value="wide">Wide</option>
              </select>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => adjustZoom("out")}
                  className={`${
                    darkMode
                      ? "text-white hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ZoomOut size={14} className="sm:w-4 sm:h-4" />
                </Button>
                <span
                  className={`hidden sm:inline text-xs px-1 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {zoomLevel}%
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => adjustZoom("in")}
                  className={`${
                    darkMode
                      ? "text-white hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ZoomIn size={14} className="sm:w-4 sm:h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetZoom}
                  className={`${
                    darkMode
                      ? "text-white hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <RotateCcw size={14} className="sm:w-4 sm:h-4" />
                </Button>
              </div>

              {/* Dark Mode */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className={`${
                  darkMode
                    ? "text-white hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {darkMode ? (
                  <Sun size={14} className="sm:w-4 sm:h-4" />
                ) : (
                  <Moon size={14} className="sm:w-4 sm:h-4" />
                )}
              </Button>

              {/* Fullscreen */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className={`${
                  darkMode
                    ? "text-white hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {isFullscreen ? (
                  <Minimize2 size={14} className="sm:w-4 sm:h-4" />
                ) : (
                  <Maximize2 size={14} className="sm:w-4 sm:h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Comic Container - Document Style */}
      <div
        ref={containerRef}
        className={`${
          isFullscreen ? "h-full pt-16 pb-20" : "min-h-screen"
        } overflow-y-auto`}
        onScroll={handleScroll}
        onClick={isFullscreen ? resetControlsTimer : undefined}
      >
        <div
          className={`${readingStyles.container} px-4 py-8 ${readingStyles.spacing}`}
        >
          {panels.map((panel, index) => (
            <div key={panel._key} className={`${readingStyles.panel}`}>
              {/* Panel Image */}
              <div className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl(panel.image.asset || panel.image)}
                  alt={panel.caption || `Comic panel ${index + 1}`}
                  className="w-full h-auto object-contain rounded-lg shadow-lg"
                  style={{
                    imageRendering: "-webkit-optimize-contrast",
                    transform: `scale(${zoomLevel / 100})`,
                    transformOrigin: "top center",
                    marginBottom: `${(zoomLevel - 100) * 0.5}px`,
                  }}
                  loading="lazy"
                />

                {/* Caption */}
                {panel.caption && (
                  <div
                    className={`mt-4 p-4 rounded-lg max-w-2xl mx-auto ${
                      darkMode
                        ? "bg-gray-800 border border-gray-700"
                        : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <p
                      className={`text-sm leading-relaxed text-center ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {panel.caption}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reading Controls - Bottom Bar */}
      <div
        className={`${
          isFullscreen
            ? "absolute bottom-0 left-0 right-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700"
            : "bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
        } transition-opacity duration-300 ${
          showControls || !isFullscreen ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="web-px py-2 sm:py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
            {/* Navigation Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className={`${
                  darkMode
                    ? "text-white hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ChevronUp size={14} className="sm:w-4 sm:h-4" />
                <span className="ml-1 hidden sm:inline">Top</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAutoScroll}
                className={`${
                  darkMode
                    ? "text-white hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"
                } ${
                  autoScroll ? (darkMode ? "bg-gray-800" : "bg-gray-100") : ""
                }`}
              >
                {autoScroll ? (
                  <Pause size={14} className="sm:w-4 sm:h-4" />
                ) : (
                  <Play size={14} className="sm:w-4 sm:h-4" />
                )}
                <span className="ml-1 hidden sm:inline">
                  {autoScroll ? "Pause" : "Auto"}
                </span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToBottom}
                className={`${
                  darkMode
                    ? "text-white hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ChevronDown size={14} className="sm:w-4 sm:h-4" />
                <span className="ml-1 hidden sm:inline">End</span>
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 w-full sm:w-auto mx-2 sm:mx-4">
              <div
                className={`h-1 rounded-full ${
                  darkMode ? "bg-gray-700" : "bg-gray-300"
                }`}
              >
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    darkMode ? "bg-blue-400" : "bg-blue-600"
                  }`}
                  style={{ width: `${readingProgress}%` }}
                />
              </div>
              <div
                className={`text-xs mt-1 text-center ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {Math.round(readingProgress)}% read
              </div>
            </div>

            {/* Speed Control */}
            <div className="flex items-center gap-1 sm:gap-2">
              <span
                className={`hidden sm:inline text-xs ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Speed:
              </span>
              <select
                value={scrollSpeed}
                onChange={(e) => setScrollSpeed(Number(e.target.value))}
                className={`text-xs px-1 sm:px-2 py-1 rounded border ${
                  darkMode
                    ? "bg-gray-800 text-white border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={3}>3x</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Help Text */}
      {isFullscreen && showControls && (
        <div
          className={`absolute top-16 right-2 sm:right-4 backdrop-blur-sm text-xs p-2 sm:p-3 rounded-lg max-w-xs ${
            darkMode
              ? "bg-gray-800/90 text-white border border-gray-700"
              : "bg-white/90 text-gray-900 border border-gray-200"
          }`}
        >
          <div className="space-y-1">
            <div className="hidden sm:block">
              <strong>Navigation:</strong>
            </div>
            <div className="hidden sm:block">Space: Toggle auto-scroll</div>
            <div className="hidden sm:block">Home: Go to top</div>
            <div className="hidden sm:block">End: Go to bottom</div>
            <div className="hidden sm:block">
              <strong>Display:</strong>
            </div>
            <div className="hidden sm:block">F: Toggle fullscreen</div>
            <div className="hidden sm:block">D: Toggle dark mode</div>
            <div className="hidden sm:block">+/-: Zoom in/out</div>
            <div className="hidden sm:block">0: Reset zoom</div>
            <div className="hidden sm:block">ESC: Exit fullscreen</div>

            {/* Mobile help */}
            <div className="sm:hidden">
              <div>
                <strong>Touch:</strong> Tap controls to use
              </div>
              <div>
                <strong>ESC:</strong> Exit fullscreen
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Instructions */}
      {!isFullscreen && (
        <div
          className={`text-center text-sm mt-2 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <div className="space-y-1">
            <div>📖 Document-style reading experience</div>
            <div>Use controls above for reading modes, zoom, and dark mode</div>
          </div>
        </div>
      )}
    </div>
  );
}
