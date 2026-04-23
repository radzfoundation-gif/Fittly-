'use client';

import { useState, useRef } from 'react';

export default function SeamlessVideo({ src, className, style }: { src: string; className?: string; style?: React.CSSProperties }) {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);

  const handleTimeUpdate = (videoNum: 1 | 2, e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;

    // Crossfade 1.5 seconds before the video ends
    const crossfadeDuration = 1.5;
    const timeLeft = video.duration - video.currentTime;

    if (timeLeft <= crossfadeDuration) {
      if (videoNum === 1 && activeVideo === 1) {
        if (video2Ref.current) {
          video2Ref.current.currentTime = 0;
          video2Ref.current.play().catch(console.error);
        }
        setActiveVideo(2);
      } else if (videoNum === 2 && activeVideo === 2) {
        if (video1Ref.current) {
          video1Ref.current.currentTime = 0;
          video1Ref.current.play().catch(console.error);
        }
        setActiveVideo(1);
      }
    }
  };

  return (
    <div className={`relative w-full h-full ${className || ''}`}>
      <video
        ref={video1Ref}
        src={src}
        autoPlay
        muted
        playsInline
        onTimeUpdate={(e) => handleTimeUpdate(1, e)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out duration-1000 ${activeVideo === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
      />
      <video
        ref={video2Ref}
        src={src}
        muted
        playsInline
        onTimeUpdate={(e) => handleTimeUpdate(2, e)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out duration-1000 ${activeVideo === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
      />
    </div>
  );
}
