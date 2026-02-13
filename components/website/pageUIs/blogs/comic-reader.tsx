"use client";

import { Button } from "@/components/ui/button";
import { imageUrl } from "@/sanity/lib/client";
import { IComicPanel } from "@/utils/data_types";
import {
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Moon,
  Sun,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  BookOpen,
  ArrowLeftRight,
  ArrowDownUp,
  Play,
  Pause,
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

type ReadingDirection = "ltr" | "rtl" | "vertical";

interface ComicReaderProps {
  panels: IComicPanel[];
  title: string;
}

export default function ComicReader({ panels, title }: ComicReaderProps) {
  // Core state
  const [readingDirection, setReadingDirection] = useState<ReadingDirection>("ltr");
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showControls, setShowControls] = useState(true);
  
  // Vertical mode state
  const [autoScroll, setAutoScroll] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const [readingProgress, setReadingProgress] = useState(0);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const controlsTimer = useRef<NodeJS.Timeout | null>(null);

  const totalPages = panels.length;

  // Navigation functions
  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(0, Math.min(totalPages - 1, page)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (readingDirection === "rtl") {
      goToPage(currentPage - 1);
    } else {
      goToPage(currentPage + 1);
    }
  }, [currentPage, readingDirection, goToPage]);

  const prevPage = useCallback(() => {
    if (readingDirection === "rtl") {
      goToPage(currentPage + 1);
    } else {
      goToPage(currentPage - 1);
    }
  }, [currentPage, readingDirection, goToPage]);

  // Vertical scroll functions
  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
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

  // Zoom functions
  const adjustZoom = useCallback((direction: "in" | "out") => {
    setZoomLevel((prev) => {
      const newZoom = direction === "in" ? prev + 25 : prev - 25;
      return Math.max(50, Math.min(200, newZoom));
    });
  }, []);

  const resetZoom = useCallback(() => setZoomLevel(100), []);

  // Toggle functions
  const toggleFullscreen = useCallback(() => setIsFullscreen(prev => !prev), []);
  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);

  // Handle scroll progress (vertical mode)
  const handleScroll = useCallback(() => {
    if (containerRef.current && readingDirection === "vertical") {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    }
  }, [readingDirection]);

  // Auto-hide controls in fullscreen
  const resetControlsTimer = useCallback(() => {
    if (controlsTimer.current) clearTimeout(controlsTimer.current);
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
      if (e.key === "d" || e.key === "D") toggleDarkMode();
      if (e.key === "+" || e.key === "=") adjustZoom("in");
      if (e.key === "-") adjustZoom("out");
      if (e.key === "0") resetZoom();

      if (readingDirection === "vertical") {
        if (e.key === " ") {
          e.preventDefault();
          toggleAutoScroll();
        }
      } else {
        if (e.key === "ArrowLeft") prevPage();
        if (e.key === "ArrowRight") nextPage();
        if (e.key === "Home") goToPage(0);
        if (e.key === "End") goToPage(totalPages - 1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [readingDirection, toggleFullscreen, toggleDarkMode, adjustZoom, resetZoom, toggleAutoScroll, prevPage, nextPage, goToPage, totalPages]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
      if (controlsTimer.current) clearTimeout(controlsTimer.current);
    };
  }, []);

  // Reset page when switching direction
  useEffect(() => {
    if (readingDirection === "rtl") {
      setCurrentPage(totalPages - 1);
    } else if (readingDirection === "ltr") {
      setCurrentPage(0);
    }
  }, [readingDirection, totalPages]);

  if (!panels || panels.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg border border-dashed border-gray-200">
        <p className="font-dm-sans text-muted-foreground">No comic panels available</p>
      </div>
    );
  }

  const isHorizontal = readingDirection !== "vertical";
  const canGoPrev = isHorizontal && (readingDirection === "rtl" ? currentPage < totalPages - 1 : currentPage > 0);
  const canGoNext = isHorizontal && (readingDirection === "rtl" ? currentPage > 0 : currentPage < totalPages - 1);

  return (
    <div
      className={cn(
        "comic-reader rounded-lg overflow-hidden",
        isFullscreen && "fixed inset-0 z-50 rounded-none",
        darkMode ? "bg-gray-900" : "bg-white"
      )}
    >
      {/* Header Controls */}
      <div
        className={cn(
          "transition-opacity duration-300 border-b",
          isFullscreen && "absolute top-0 left-0 right-0 z-20",
          darkMode ? "bg-gray-900/95 border-gray-700" : "bg-white/95 border-gray-200",
          "backdrop-blur-sm",
          showControls || !isFullscreen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="px-4 py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Title & Page Info */}
            <div className="flex items-center gap-3">
              <BookOpen className={cn("h-5 w-5", darkMode ? "text-primary" : "text-primary")} />
              <div>
                <h2 className={cn("font-playfair font-semibold", darkMode ? "text-white" : "text-foreground")}>
                  {title}
                </h2>
                <p className={cn("text-xs font-dm-sans", darkMode ? "text-gray-400" : "text-muted-foreground")}>
                  {isHorizontal 
                    ? `Page ${currentPage + 1} of ${totalPages}`
                    : `${totalPages} panels`
                  }
                </p>
              </div>
            </div>

            {/* Reading Direction Selector */}
            <div className="flex items-center gap-2">
              <span className={cn("text-xs font-dm-sans hidden sm:inline", darkMode ? "text-gray-400" : "text-muted-foreground")}>
                Reading:
              </span>
              <div className={cn("flex rounded-lg p-1", darkMode ? "bg-gray-800" : "bg-gray-100")}>
                <button
                  onClick={() => setReadingDirection("ltr")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-dm-sans font-medium rounded-md transition-all flex items-center gap-1.5",
                    readingDirection === "ltr"
                      ? "bg-primary text-white shadow-sm"
                      : darkMode 
                        ? "text-gray-300 hover:text-white" 
                        : "text-gray-600 hover:text-foreground"
                  )}
                  title="Left to Right"
                >
                  <ArrowLeftRight className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">L → R</span>
                </button>
                <button
                  onClick={() => setReadingDirection("rtl")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-dm-sans font-medium rounded-md transition-all flex items-center gap-1.5",
                    readingDirection === "rtl"
                      ? "bg-primary text-white shadow-sm"
                      : darkMode 
                        ? "text-gray-300 hover:text-white" 
                        : "text-gray-600 hover:text-foreground"
                  )}
                  title="Right to Left (Manga Style)"
                >
                  <ArrowLeftRight className="h-3.5 w-3.5 rotate-180" />
                  <span className="hidden sm:inline">R → L</span>
                </button>
                <button
                  onClick={() => setReadingDirection("vertical")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-dm-sans font-medium rounded-md transition-all flex items-center gap-1.5",
                    readingDirection === "vertical"
                      ? "bg-primary text-white shadow-sm"
                      : darkMode 
                        ? "text-gray-300 hover:text-white" 
                        : "text-gray-600 hover:text-foreground"
                  )}
                  title="Vertical Scroll"
                >
                  <ArrowDownUp className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Scroll</span>
                </button>
              </div>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-1">
              {/* Zoom */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => adjustZoom("out")}
                className={darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className={cn("text-xs px-1 hidden sm:inline", darkMode ? "text-gray-400" : "text-gray-500")}>
                {zoomLevel}%
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => adjustZoom("in")}
                className={darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetZoom}
                className={darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>

              <div className={cn("w-px h-6 mx-1", darkMode ? "bg-gray-700" : "bg-gray-200")} />

              {/* Dark Mode */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className={darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"}
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {/* Fullscreen */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className={darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"}
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        ref={containerRef}
        className={cn(
          "relative",
          isFullscreen ? "h-[calc(100vh-140px)] mt-[70px]" : "min-h-[500px] h-[70vh]",
          readingDirection === "vertical" ? "overflow-y-auto" : "overflow-hidden"
        )}
        onScroll={handleScroll}
        onClick={isFullscreen ? resetControlsTimer : undefined}
      >
        {/* Horizontal View (LTR/RTL) */}
        {isHorizontal && (
          <div className="relative h-full flex items-center justify-center">
            {/* Previous Button */}
            <button
              onClick={prevPage}
              disabled={!canGoPrev}
              className={cn(
                "absolute left-2 sm:left-4 z-10 p-2 sm:p-3 rounded-full transition-all",
                darkMode ? "bg-gray-800/80 hover:bg-gray-700" : "bg-white/80 hover:bg-white shadow-lg",
                !canGoPrev && "opacity-30 cursor-not-allowed"
              )}
            >
              <ChevronLeft className={cn("h-5 w-5 sm:h-6 sm:w-6", darkMode ? "text-white" : "text-foreground")} />
            </button>

            {/* Current Panel */}
            <div className="h-full flex items-center justify-center px-16 sm:px-20">
              <img
                src={imageUrl(panels[currentPage].image.asset || panels[currentPage].image)}
                alt={panels[currentPage].caption || `Page ${currentPage + 1}`}
                className="max-h-full max-w-full object-contain rounded-lg shadow-xl transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel / 100})` }}
              />
            </div>

            {/* Next Button */}
            <button
              onClick={nextPage}
              disabled={!canGoNext}
              className={cn(
                "absolute right-2 sm:right-4 z-10 p-2 sm:p-3 rounded-full transition-all",
                darkMode ? "bg-gray-800/80 hover:bg-gray-700" : "bg-white/80 hover:bg-white shadow-lg",
                !canGoNext && "opacity-30 cursor-not-allowed"
              )}
            >
              <ChevronRight className={cn("h-5 w-5 sm:h-6 sm:w-6", darkMode ? "text-white" : "text-foreground")} />
            </button>

            {/* Caption */}
            {panels[currentPage].caption && (
              <div className={cn(
                "absolute bottom-4 left-1/2 -translate-x-1/2 max-w-md px-4 py-2 rounded-lg text-center text-sm font-dm-sans",
                darkMode ? "bg-gray-800/90 text-gray-200" : "bg-white/90 text-gray-700 shadow-lg"
              )}>
                {panels[currentPage].caption}
              </div>
            )}
          </div>
        )}

        {/* Vertical View */}
        {readingDirection === "vertical" && (
          <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
            {panels.map((panel, index) => (
              <div key={panel._key} className="relative">
                <img
                  src={imageUrl(panel.image.asset || panel.image)}
                  alt={panel.caption || `Panel ${index + 1}`}
                  className="w-full h-auto object-contain rounded-lg shadow-lg"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
                  loading="lazy"
                />
                {panel.caption && (
                  <div className={cn(
                    "mt-4 p-4 rounded-lg max-w-2xl mx-auto text-center text-sm font-dm-sans",
                    darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"
                  )}>
                    {panel.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div
        className={cn(
          "transition-opacity duration-300 border-t",
          isFullscreen && "absolute bottom-0 left-0 right-0 z-20",
          darkMode ? "bg-gray-900/95 border-gray-700" : "bg-white/95 border-gray-200",
          "backdrop-blur-sm",
          showControls || !isFullscreen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="px-4 py-3">
          {/* Horizontal Mode Controls */}
          {isHorizontal && (
            <div className="flex items-center justify-between gap-4">
              {/* Page Navigation */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(readingDirection === "rtl" ? totalPages - 1 : 0)}
                  className={cn("font-dm-sans", darkMode && "border-gray-600 text-gray-300")}
                >
                  {readingDirection === "rtl" ? "Last" : "First"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(readingDirection === "rtl" ? 0 : totalPages - 1)}
                  className={cn("font-dm-sans", darkMode && "border-gray-600 text-gray-300")}
                >
                  {readingDirection === "rtl" ? "First" : "Last"}
                </Button>
              </div>

              {/* Page Slider */}
              <div className="flex-1 flex items-center gap-3 max-w-md">
                <span className={cn("text-xs font-dm-sans", darkMode ? "text-gray-400" : "text-gray-500")}>
                  {readingDirection === "rtl" ? totalPages : 1}
                </span>
                <input
                  type="range"
                  min={0}
                  max={totalPages - 1}
                  value={currentPage}
                  onChange={(e) => goToPage(parseInt(e.target.value))}
                  className={cn(
                    "flex-1 h-2 rounded-lg appearance-none cursor-pointer",
                    darkMode ? "bg-gray-700" : "bg-gray-200",
                    readingDirection === "rtl" && "rotate-180"
                  )}
                />
                <span className={cn("text-xs font-dm-sans", darkMode ? "text-gray-400" : "text-gray-500")}>
                  {readingDirection === "rtl" ? 1 : totalPages}
                </span>
              </div>

              {/* Page Number Input */}
              <div className="flex items-center gap-2">
                <span className={cn("text-xs font-dm-sans hidden sm:inline", darkMode ? "text-gray-400" : "text-gray-500")}>
                  Go to:
                </span>
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={currentPage + 1}
                  onChange={(e) => goToPage(parseInt(e.target.value) - 1)}
                  className={cn(
                    "w-16 px-2 py-1 text-xs rounded border text-center font-dm-sans",
                    darkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300"
                  )}
                />
              </div>
            </div>
          )}

          {/* Vertical Mode Controls */}
          {readingDirection === "vertical" && (
            <div className="flex items-center justify-between gap-4">
              {/* Auto-scroll Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
                  className={cn("font-dm-sans", darkMode && "border-gray-600 text-gray-300")}
                >
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Top
                </Button>
                <Button
                  variant={autoScroll ? "default" : "outline"}
                  size="sm"
                  onClick={toggleAutoScroll}
                  className={cn("font-dm-sans", !autoScroll && darkMode && "border-gray-600 text-gray-300")}
                >
                  {autoScroll ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                  {autoScroll ? "Pause" : "Auto"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" })}
                  className={cn("font-dm-sans", darkMode && "border-gray-600 text-gray-300")}
                >
                  <ChevronDown className="h-4 w-4 mr-1" />
                  End
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="flex-1 max-w-md">
                <div className={cn("h-2 rounded-full", darkMode ? "bg-gray-700" : "bg-gray-200")}>
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${readingProgress}%` }}
                  />
                </div>
                <p className={cn("text-xs text-center mt-1 font-dm-sans", darkMode ? "text-gray-400" : "text-gray-500")}>
                  {Math.round(readingProgress)}% read
                </p>
              </div>

              {/* Speed Control */}
              <div className="flex items-center gap-2">
                <span className={cn("text-xs font-dm-sans hidden sm:inline", darkMode ? "text-gray-400" : "text-gray-500")}>
                  Speed:
                </span>
                <select
                  value={scrollSpeed}
                  onChange={(e) => setScrollSpeed(Number(e.target.value))}
                  className={cn(
                    "text-xs px-2 py-1 rounded border font-dm-sans",
                    darkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300"
                  )}
                >
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x</option>
                  <option value={2}>2x</option>
                  <option value={3}>3x</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Keyboard Shortcuts Help (Fullscreen) */}
      {isFullscreen && showControls && (
        <div className={cn(
          "absolute top-20 right-4 text-xs p-3 rounded-lg max-w-[200px] hidden sm:block",
          darkMode ? "bg-gray-800/90 text-gray-300 border border-gray-700" : "bg-white/90 text-gray-600 border border-gray-200"
        )}>
          <p className="font-semibold mb-2">Keyboard Shortcuts</p>
          {isHorizontal ? (
            <>
              <p>← → Navigate pages</p>
              <p>Home/End: First/Last</p>
            </>
          ) : (
            <p>Space: Toggle auto-scroll</p>
          )}
          <p>F: Toggle fullscreen</p>
          <p>D: Toggle dark mode</p>
          <p>+/-: Zoom in/out</p>
          <p>0: Reset zoom</p>
          <p>ESC: Exit fullscreen</p>
        </div>
      )}
    </div>
  );
}
