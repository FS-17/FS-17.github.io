"use client";

import { useRef, useCallback, useEffect, useState } from "react";

// Local function to handle bold text formatting
function convertBoldText(text) {
  if (!text) return "";
  const parts = text.split("*");
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-bold text-blue-400">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export default function VideoTrio({ item }) {
  const mainVideoRef = useRef(null);
  const leftVideoRef = useRef(null);
  const rightVideoRef = useRef(null);
  const isSyncing = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videosReady, setVideosReady] = useState({
    main: false,
    left: false,
    right: false,
  });

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const videos = [
      mainVideoRef.current,
      leftVideoRef.current,
      rightVideoRef.current,
    ];
    videos.forEach((video) => {
      if (video) {
        video.playbackRate = 1.5;
        // Ensure videos are muted for mobile autoplay compatibility
        video.muted = true;
      }
    });
  }, []);

  // Track when videos are ready to play
  const handleCanPlay = useCallback((videoName) => {
    setVideosReady((prev) => ({ ...prev, [videoName]: true }));
  }, []);

  // Check if all videos are loaded and ready
  const allVideosReady =
    videosReady.main && videosReady.left && videosReady.right;

  const syncAllVideos = useCallback((action, sourceTime = null) => {
    const videos = [
      mainVideoRef.current,
      leftVideoRef.current,
      rightVideoRef.current,
    ];

    // For mobile, we need to handle each video individually with promises
    const playPromises = [];

    videos.forEach((video) => {
      if (video) {
        // Ensure video is muted for mobile autoplay
        video.muted = true;

        // Only sync time if the difference is significant to prevent stuttering
        if (
          sourceTime !== null &&
          Math.abs(video.currentTime - sourceTime) > 0.2
        ) {
          video.currentTime = sourceTime;
        }
        if (action === "play") {
          if (video.paused) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromises.push(
                playPromise.catch((err) => {
                  console.log("Video play failed:", err);
                  // On mobile, try to play again after a short delay
                  setTimeout(() => {
                    video.play().catch(() => {});
                  }, 100);
                }),
              );
            }
          }
        } else if (action === "pause") {
          if (!video.paused) {
            video.pause();
          }
        }
      }
    });

    return Promise.all(playPromises);
  }, []);

  const handlePlay = useCallback(
    (e) => {
      if (isSyncing.current) return;
      isSyncing.current = true;
      setIsPlaying(true);
      syncAllVideos("play", e.target.currentTime);
      setTimeout(() => {
        isSyncing.current = false;
      }, 200);
    },
    [syncAllVideos],
  );

  const handlePause = useCallback(() => {
    if (isSyncing.current) return;
    isSyncing.current = true;
    setIsPlaying(false);
    syncAllVideos("pause");
    setTimeout(() => {
      isSyncing.current = false;
    }, 200);
  }, [syncAllVideos]);

  const handleSeek = useCallback((e) => {
    if (isSyncing.current) return;
    isSyncing.current = true;

    const videos = [
      mainVideoRef.current,
      leftVideoRef.current,
      rightVideoRef.current,
    ];
    videos.forEach((video) => {
      if (video && video !== e.target) {
        video.currentTime = e.target.currentTime;
      }
    });

    setTimeout(() => {
      isSyncing.current = false;
    }, 200);
  }, []);

  const handleContainerClick = useCallback(
    async (e) => {
      // Don't allow interaction until all videos are loaded
      if (!allVideosReady) return;

      // Stop propagation if clicking the overlay to avoid double triggering
      if (e.target.closest(".z-10")) {
        e.stopPropagation();
      }

      // Only trigger if clicking on the container, overlay, or video wrappers
      if (
        e.target.tagName === "VIDEO" ||
        e.target.closest(".video-wrapper") ||
        e.target.closest(".group\\/trio") ||
        e.target.closest(".z-10")
      ) {
        const mainVideo = mainVideoRef.current;
        const leftVideo = leftVideoRef.current;
        const rightVideo = rightVideoRef.current;

        if (mainVideo) {
          // Prevent double events by setting syncing flag
          if (isSyncing.current) return;
          isSyncing.current = true;

          // Ensure all videos are muted for mobile compatibility
          [mainVideo, leftVideo, rightVideo].forEach((v) => {
            if (v) v.muted = true;
          });

          if (mainVideo.paused) {
            // For mobile, sync time first then play all
            const currentTime = mainVideo.currentTime;
            [leftVideo, rightVideo].forEach((v) => {
              if (v) v.currentTime = currentTime;
            });

            // Play all videos with proper promise handling for mobile
            const playAll = async () => {
              const videos = [mainVideo, leftVideo, rightVideo];
              for (const video of videos) {
                if (video) {
                  try {
                    await video.play();
                  } catch (err) {
                    console.log("Play error:", err);
                    // Retry once
                    try {
                      await video.play();
                    } catch {}
                  }
                }
              }
            };

            await playAll();
            setIsPlaying(true);
          } else {
            syncAllVideos("pause");
            setIsPlaying(false);
          }

          setTimeout(() => {
            isSyncing.current = false;
          }, 200);
        }
      }
    },
    [syncAllVideos, allVideosReady],
  );

  return (
    <div className="col-span-1 md:col-span-12">
      <div
        className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-blue-500/20 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 p-4 sm:p-6 md:p-8 cursor-pointer group/trio"
        onClick={handleContainerClick}
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-96 h-16 sm:h-32 bg-blue-500/10 blur-3xl rounded-full" />

        {/* Loading overlay - shown until all videos are ready */}
        {!allVideosReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-gray-900/80 backdrop-blur-sm rounded-2xl md:rounded-3xl">
            <div className="relative">
              {/* Spinning loader */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-video text-cyan-400/80 text-lg sm:text-xl"></i>
              </div>
            </div>
            <p className="mt-4 text-sm sm:text-base text-gray-400 font-medium">
              Loading videos...
            </p>
            <div className="flex gap-2 mt-3">
              <div
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${videosReady.main ? "bg-green-400" : "bg-gray-600"}`}
              ></div>
              <div
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${videosReady.left ? "bg-green-400" : "bg-gray-600"}`}
              ></div>
              <div
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${videosReady.right ? "bg-green-400" : "bg-gray-600"}`}
              ></div>
            </div>
            <p className="mt-2 text-[10px] sm:text-xs text-gray-500">
              {Object.values(videosReady).filter(Boolean).length} / 3 videos
              ready
            </p>
          </div>
        )}

        {/* Play/Pause overlay - only show when videos are ready */}
        {allVideosReady && (
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 z-10 ${isPlaying ? "opacity-0 group-hover/trio:opacity-100" : "opacity-100"}`}
            onClick={handleContainerClick}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-full p-4 sm:p-6 border border-white/20 shadow-2xl transform hover:scale-110 active:scale-95 transition-transform duration-200">
              {isPlaying ? (
                <i className="fas fa-pause text-2xl sm:text-4xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"></i>
              ) : (
                <i className="fas fa-play text-2xl sm:text-4xl text-white ml-0.5 sm:ml-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"></i>
              )}
            </div>
          </div>
        )}

        {/* Header */}
        {(item.title || item.description) && (
          <div className="relative text-center mb-4 sm:mb-6 md:mb-8">
            {item.title && (
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 sm:mb-3">
                {item.title}
              </h3>
            )}
            {item.description && (
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-2">
                {convertBoldText(item.description)}
              </p>
            )}
            <p className="text-[10px] sm:text-xs text-cyan-400/60 mt-2 flex items-center justify-center gap-1 sm:gap-2">
              <i className="fas fa-sync-alt"></i>
              <span className="hidden sm:inline">
                Click anywhere to play/pause all videos together
              </span>
              <span className="sm:hidden">Tap to play/pause all</span>
            </p>
          </div>
        )}

        {/* Video Trio Layout */}
        <div className="relative flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-6 items-center lg:items-end">
          {/* Main Screen Video (Center) - Always first on mobile */}
          <div className="w-full lg:col-span-6 lg:order-2">
            <div className="relative video-wrapper">
              {/* Screen frame effect */}
              <div className="absolute -inset-1 rounded-xl md:rounded-2xl bg-gradient-to-b from-cyan-500/30 via-blue-500/20 to-transparent blur-sm opacity-60 pointer-events-none" />
              <div className="relative rounded-lg md:rounded-xl overflow-hidden shadow-2xl border-2 border-white/10 bg-black">
                <video
                  ref={mainVideoRef}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onSeeked={handleSeek}
                  onCanPlay={() => handleCanPlay("main")}
                  className="w-full h-auto max-h-[250px] sm:max-h-[350px] md:max-h-[450px] object-contain"
                  playsInline
                  muted
                  autoPlay
                  loop
                  preload="auto"
                  webkit-playsinline="true"
                  disablePictureInPicture
                  controlsList="nodownload nofullscreen noremoteplayback"
                >
                  <source src={item.mainVideo.value} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              {/* Main screen label */}
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-bold rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-cyan-300 backdrop-blur border border-cyan-500/40">
                <i className="fas fa-tv mr-1 sm:mr-2"></i>Main Display
              </div>
              {item.mainVideo.caption && (
                <p className="text-center text-xs sm:text-sm text-gray-400 mt-2 sm:mt-4 font-medium">
                  {item.mainVideo.caption}
                </p>
              )}

              {/* Mobile: Connection lines coming out from bottom of main screen */}
              <div className="lg:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-start gap-0">
                {/* Left line going down and left */}
                <div className="relative">
                  <div className="absolute top-0 right-0 w-[60px] sm:w-[80px] h-px bg-gradient-to-l from-transparent via-blue-500/60 to-blue-500/60"></div>
                  <div className="absolute top-0 -left-[60px] sm:-left-[80px] w-px h-4 bg-gradient-to-b from-blue-500/60 to-transparent"></div>
                </div>
                {/* Center dot */}
                <div className="w-2 h-2 rounded-full bg-cyan-400/60 shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
                {/* Right line going down and right */}
                <div className="relative">
                  <div className="absolute top-0 left-0 w-[60px] sm:w-[80px] h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-cyan-500/60"></div>
                  <div className="absolute top-0 left-[60px] sm:left-[80px] w-px h-4 bg-gradient-to-b from-cyan-500/60 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Videos Container - Side by side on mobile */}
          <div className="w-full lg:contents">
            <div className="grid grid-cols-2 lg:contents gap-3 sm:gap-4">
              {/* Left Mobile Video */}
              <div className="lg:col-span-3 lg:order-1">
                <div className="relative max-w-[160px] sm:max-w-[200px] lg:max-w-[280px] mx-auto video-wrapper">
                  {/* Mobile: Connection line coming into this video */}
                  <div className="lg:hidden absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-gradient-to-b from-blue-500/60 to-blue-400/30"></div>
                  <div className="lg:hidden absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400/80 shadow-[0_0_6px_rgba(59,130,246,0.6)]"></div>

                  {/* Phone frame effect */}
                  <div className="absolute -inset-[2px] sm:-inset-[3px] rounded-[18px] sm:rounded-[24px] lg:rounded-[28px] bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-60 pointer-events-none" />
                  <div className="relative rounded-[14px] sm:rounded-[20px] lg:rounded-[24px] overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-b from-gray-800 to-gray-900">
                    <video
                      ref={leftVideoRef}
                      onPlay={handlePlay}
                      onPause={handlePause}
                      onSeeked={handleSeek}
                      onCanPlay={() => handleCanPlay("left")}
                      className="w-full h-auto max-h-[280px] sm:max-h-[350px] lg:max-h-[500px] object-contain bg-black"
                      playsInline
                      muted
                      autoPlay
                      loop
                      preload="auto"
                      webkit-playsinline="true"
                      disablePictureInPicture
                      controlsList="nodownload nofullscreen noremoteplayback"
                    >
                      <source src={item.leftVideo.value} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  {/* Mobile label */}
                  <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 lg:top-3 lg:left-3 px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 backdrop-blur border border-blue-500/30">
                    <i className="fas fa-mobile-alt mr-0.5 sm:mr-1 lg:mr-1.5"></i>
                    <span className="hidden sm:inline">Player 1</span>
                    <span className="sm:hidden">P1</span>
                  </div>
                  {item.leftVideo.caption && (
                    <p className="text-center text-[10px] sm:text-xs text-gray-500 mt-2 sm:mt-3 line-clamp-2">
                      {item.leftVideo.caption}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Mobile Video */}
              <div className="lg:col-span-3 lg:order-3">
                <div className="relative max-w-[160px] sm:max-w-[200px] lg:max-w-[280px] mx-auto video-wrapper">
                  {/* Mobile: Connection line coming into this video */}
                  <div className="lg:hidden absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-gradient-to-b from-cyan-500/60 to-cyan-400/30"></div>
                  <div className="lg:hidden absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_6px_rgba(34,211,238,0.6)]"></div>

                  {/* Phone frame effect */}
                  <div className="absolute -inset-[2px] sm:-inset-[3px] rounded-[18px] sm:rounded-[24px] lg:rounded-[28px] bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-60 pointer-events-none" />
                  <div className="relative rounded-[14px] sm:rounded-[20px] lg:rounded-[24px] overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-b from-gray-800 to-gray-900">
                    <video
                      ref={rightVideoRef}
                      onPlay={handlePlay}
                      onPause={handlePause}
                      onSeeked={handleSeek}
                      onCanPlay={() => handleCanPlay("right")}
                      className="w-full h-auto max-h-[280px] sm:max-h-[350px] lg:max-h-[500px] object-contain bg-black"
                      playsInline
                      muted
                      autoPlay
                      loop
                      preload="auto"
                      webkit-playsinline="true"
                      disablePictureInPicture
                      controlsList="nodownload nofullscreen noremoteplayback"
                    >
                      <source src={item.rightVideo.value} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  {/* Mobile label */}
                  <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 lg:top-3 lg:left-3 px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-full bg-cyan-500/20 text-cyan-300 backdrop-blur border border-cyan-500/30">
                    <i className="fas fa-mobile-alt mr-0.5 sm:mr-1 lg:mr-1.5"></i>
                    <span className="hidden sm:inline">Player 2</span>
                    <span className="sm:hidden">P2</span>
                  </div>
                  {item.rightVideo.caption && (
                    <p className="text-center text-[10px] sm:text-xs text-gray-500 mt-2 sm:mt-3 line-clamp-2">
                      {item.rightVideo.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connection lines visual (decorative) - Hidden on mobile */}
        <div className="hidden lg:block absolute top-1/2 left-[22%] w-[8%] h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
        <div className="hidden lg:block absolute top-1/2 right-[22%] w-[8%] h-px bg-gradient-to-l from-cyan-500/50 to-transparent" />
      </div>
    </div>
  );
}
