import { useEffect, useRef, useState } from 'react';
import { emotionService } from '../services/endpoints';
import { useSessionStore } from '../store/useSessionStore';

export const useEmotionTracking = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
  const { updateFromResponse } = useSessionStore();
  const [isCapturing, setIsCapturing] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Create hidden canvas once
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
      canvasRef.current.width = 320;
      canvasRef.current.height = 240;
    }

    const captureAndSend = async () => {
      if (isCapturing) return; // Prevent overlapping
      if (!videoRef.current || !canvasRef.current) return;
      if (videoRef.current.readyState !== 4) return; // wait for HAVE_ENOUGH_DATA

      setIsCapturing(true);

      try {
        const context = canvasRef.current.getContext('2d');
        if (context) {
          context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
          // Get base64 string
          const base64Image = canvasRef.current.toDataURL('image/jpeg', 0.8);
          
          const response = await emotionService.adapt({ image: base64Image });
          if (response.data.success) {
            updateFromResponse(response.data);
          }
        }
      } catch (error) {
        console.error('Emotion tracking error:', error);
      } finally {
        setIsCapturing(false);
      }
    };

    // Start interval
    intervalRef.current = setInterval(captureAndSend, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [videoRef, isCapturing, updateFromResponse]);
};
