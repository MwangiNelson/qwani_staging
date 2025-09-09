"use client";

import { Button } from "@/components/ui/button";
import { imageUrl } from "@/sanity/lib/client";
import { IComicPanel } from "@/utils/data_types";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";

interface ComicViewerProps {
  panels: IComicPanel[];
  title: string;
}

export default function ComicViewer({ panels, title }: ComicViewerProps) {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const lastTapTime = useRef<number>(0);

  const totalPanels = panels.length;

  const goToNext = useCallback(() => {
    if (currentPanel < totalPanels - 1) {
      setCurrentPanel(currentPanel + 1);
      if (!loadedImages.has(currentPanel + 1)) {
        setIsLoading(true);
      }
    }
  }, [currentPanel, totalPanels, loadedImages]);

  const goToPrevious = useCallback(() => {
    if (currentPanel > 0) {
      setCurrentPanel(currentPanel - 1);
      if (!loadedImages.has(currentPanel - 1)) {
        setIsLoading(true);
      }
    }
  }, [currentPanel, loadedImages]);

  const goToPanel = useCallback(
    (index: number) => {
      setCurrentPanel(index);
      if (!loadedImages.has(index)) {
        setIsLoading(true);
      }
    },
    [loadedImages]
  );

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  // Auto-hide controls in fullscreen
  const [showControls, setShowControls] = useState(true);
  const controlsTimer = useRef<NodeJS.Timeout | null>(null);

  const resetControlsTimer = useCallback(() => {
    if (controlsTimer.current) {
      clearTimeout(controlsTimer.current);
    }
    setShowControls(true);
    if (isFullscreen) {
      controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
    }
  }, [isFullscreen]);

  // Touch/Swipe handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    const isTap = Math.abs(distance) < 10;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    } else if (isTap && isFullscreen) {
      // Only handle taps in fullscreen mode to avoid interfering with normal navigation
      const currentTime = Date.now();
      const timeDiff = currentTime - lastTapTime.current;

      if (timeDiff < 300) {
        // Double tap - exit fullscreen
        setIsFullscreen(false);
      } else {
        // Single tap - show controls
        resetControlsTimer();
      }

      lastTapTime.current = currentTime;
    }
  }, [goToNext, goToPrevious, isFullscreen, resetControlsTimer]);

  // Handle image load
  const handleImageLoad = useCallback(() => {
    console.log(`Image loaded for panel ${currentPanel + 1}`);
    setLoadedImages((prev) => new Set([...prev, currentPanel]));
    setIsLoading(false);
  }, [currentPanel]);

  // Handle image error
  const handleImageError = useCallback(() => {
    console.warn(`Failed to load comic panel ${currentPanel + 1}`);
    setIsLoading(false);
  }, [currentPanel]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") setIsFullscreen(false);
      if (e.key === "f" || e.key === "F") toggleFullscreen();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [goToPrevious, goToNext, toggleFullscreen]);

  // Reset loading state when panel changes
  useEffect(() => {
    if (loadedImages.has(currentPanel)) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [currentPanel, loadedImages]);

  // Fix initial loading state on refresh
  useEffect(() => {
    // If we have panels but no loaded images, start loading the first panel
    if (panels.length > 0 && loadedImages.size === 0) {
      setIsLoading(true);
    }
  }, [panels.length, loadedImages.size]);

  // Force loading state reset when component mounts or panels change
  useEffect(() => {
    if (panels.length > 0) {
      setIsLoading(true);
      // Reset loaded images when panels change
      setLoadedImages(new Set());
    }
  }, [panels]);

  // Timeout fallback for loading state
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        console.warn(`Loading timeout for panel ${currentPanel + 1}`);
        setIsLoading(false);
      }, 5000); // 5 second timeout

      return () => clearTimeout(timeout);
    }
  }, [isLoading, currentPanel]);

  // Additional fallback: check if image is actually loaded
  useEffect(() => {
    if (isLoading && panels.length > 0 && panels[currentPanel]) {
      const currentPanelData = panels[currentPanel];
      const checkImageLoaded = () => {
        const img = new Image();
        img.onload = () => {
          console.log(`Fallback: Image loaded for panel ${currentPanel + 1}`);
          setLoadedImages((prev) => new Set([...prev, currentPanel]));
          setIsLoading(false);
        };
        img.onerror = () => {
          console.warn(`Fallback: Failed to load panel ${currentPanel + 1}`);
          setIsLoading(false);
        };
        img.src = imageUrl(
          currentPanelData.image.asset || currentPanelData.image
        );
      };

      // Check after a short delay
      const checkTimeout = setTimeout(checkImageLoaded, 1000);
      return () => clearTimeout(checkTimeout);
    }
  }, [isLoading, currentPanel, panels]);

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

  // Show controls when panel changes
  useEffect(() => {
    if (isFullscreen) {
      resetControlsTimer();
    }
  }, [currentPanel, isFullscreen, resetControlsTimer]);

  if (!panels || panels.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No comic panels available</p>
      </div>
    );
  }

  const currentPanelData = panels[currentPanel];

  return (
    <div
      className={`comic-viewer ${
        isFullscreen ? "fixed inset-0 z-50 bg-black" : ""
      }`}
    >
      {/* Header */}
      <div
        className={`${
          isFullscreen
            ? "absolute top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm"
            : ""
        } transition-opacity duration-300 ${
          showControls || !isFullscreen ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="web-px py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-primary">{title}</h2>
              <span className="text-sm text-gray-500">
                Panel {currentPanel + 1} of {totalPanels}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-primary bg-primary/10 hover:bg-primary/20"
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Comic Panel */}
      <div
        className={`${
          isFullscreen ? "h-full flex items-center justify-center" : "relative"
        }`}
      >
        <div
          className={`${
            isFullscreen ? "max-w-4xl max-h-full" : "relative"
          } group`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={isFullscreen ? resetControlsTimer : undefined}
        >
          <div className="relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={`panel-${currentPanel}`}
              src={imageUrl(
                currentPanelData.image.asset || currentPanelData.image
              )}
              alt={
                currentPanelData.caption || `Comic panel ${currentPanel + 1}`
              }
              className={`${
                isFullscreen
                  ? "max-h-[98vh] max-w-[95vw] w-auto h-auto object-contain"
                  : "w-full h-auto max-h-[80vh] object-contain rounded-lg cursor-pointer hover:opacity-95 transition-all duration-300"
              } transition-all duration-300`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              onClick={toggleFullscreen}
              style={{
                imageRendering: "-webkit-optimize-contrast",
              }}
              loading="eager"
            />

            {/* Fullscreen Icon Overlay */}
            {!isFullscreen && (
              <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 size={16} />
              </div>
            )}

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            )}
          </div>

          {/* Caption */}
          {currentPanelData.caption && (
            <div
              className={`${
                isFullscreen
                  ? "absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4"
                  : "mt-4 p-4 bg-gray-50 rounded-lg"
              }`}
            >
              <p
                className={`${
                  isFullscreen ? "text-white text-center" : "text-gray-700"
                } text-sm leading-relaxed`}
              >
                {currentPanelData.caption}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div
        className={`${
          isFullscreen
            ? "absolute bottom-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm"
            : ""
        } transition-opacity duration-300 ${
          showControls || !isFullscreen ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="web-px py-4">
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevious}
              disabled={currentPanel === 0}
              className={`${
                isFullscreen ? "text-white hover:bg-white/20" : ""
              } disabled:opacity-50`}
            >
              <ChevronLeft size={20} />
              Previous
            </Button>

            {/* Panel Thumbnails */}
            <div className="flex gap-2 max-w-md overflow-x-auto">
              {panels.map((panel, index) => (
                <button
                  key={panel._key}
                  onClick={() => goToPanel(index)}
                  className={`flex-shrink-0 w-12 h-12 rounded border-2 transition-all ${
                    index === currentPanel
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl(panel.image.asset || panel.image)}
                    alt={`Panel ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </button>
              ))}
            </div>

            {/* Next Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNext}
              disabled={currentPanel === totalPanels - 1}
              className={`${
                isFullscreen ? "text-white hover:bg-white/20" : ""
              } disabled:opacity-50`}
            >
              Next
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className={`${
          isFullscreen
            ? "absolute top-0 left-0 right-0 h-1 bg-gray-800"
            : "mt-4 h-1 bg-gray-200 rounded-full"
        }`}
      >
        <div
          className={`${
            isFullscreen ? "bg-white" : "bg-blue-500"
          } h-full transition-all duration-300 rounded-full`}
          style={{ width: `${((currentPanel + 1) / totalPanels) * 100}%` }}
        />
      </div>

      {/* Keyboard Shortcuts Help - Desktop Only */}
      {isFullscreen && showControls && (
        <div className="hidden md:block absolute top-16 right-4 bg-black/80 backdrop-blur-sm text-white text-xs p-3 rounded-lg">
          <div className="space-y-1">
            <div>← → Navigate</div>
            <div>F Toggle fullscreen</div>
            <div>ESC Exit fullscreen</div>
          </div>
        </div>
      )}

      {/* Mobile Help - Simplified */}
      {isFullscreen && showControls && (
        <div className="md:hidden absolute top-16 right-4 bg-black/80 backdrop-blur-sm text-white text-xs p-3 rounded-lg">
          <div className="space-y-1">
            <div> Double tap to exit</div>
            <div> Single tap for controls</div>
          </div>
        </div>
      )}

      {/* Mobile Swipe Indicator */}
      {!isFullscreen && (
        <div className="md:hidden text-center text-sm text-gray-500 mt-2">
          Swipe to navigate • Tap image to fullscreen
        </div>
      )}

      {/* Desktop Click Indicator */}
      {!isFullscreen && (
        <div className="hidden md:block text-center text-sm text-gray-500 mt-2">
          Click image to fullscreen • Use arrow keys or buttons to navigate
        </div>
      )}

      {/* Hidden Controls Indicator */}
      {isFullscreen && !showControls && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full opacity-75">
          Tap to show controls
        </div>
      )}
    </div>
  );
}
