import React from 'react';
import { useWebcam } from '../hooks/useWebcam';
import { useEmotionTracking } from '../hooks/useEmotionTracking';
import { AlertCircle, Camera } from 'lucide-react';

export const WebcamFeed: React.FC = () => {
  const { videoRef, error, stream } = useWebcam();
  
  // Attach emotion tracking to the video ref
  useEmotionTracking(videoRef);

  return (
    <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-700/50 shadow-inner">
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <AlertCircle className="text-red-400 mb-2" size={32} />
          <p className="text-red-400 font-medium">Camera Error</p>
          <p className="text-slate-400 text-sm mt-1">{error}</p>
        </div>
      ) : !stream ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Camera className="text-slate-600 mb-2 animate-pulse" size={32} />
          <p className="text-slate-500 text-sm">Accessing camera...</p>
        </div>
      ) : null}
      
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover transform -scale-x-100 transition-opacity duration-500 ${stream ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* Recording indicator */}
      {stream && !error && (
        <div className="absolute top-4 right-4 flex items-center gap-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-medium text-slate-300 tracking-wider uppercase">Tracking</span>
        </div>
      )}
    </div>
  );
};
