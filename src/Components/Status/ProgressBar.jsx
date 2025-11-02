import React, { useEffect, useState, useCallback } from "react";
import "./ProgressBar.css";

const ProgressBar = ({ index, activeIndex, duration, onComplete }) => {
  const isActive = index === activeIndex;
  const [progress, setProgress] = useState(0);

  const resetProgress = useCallback(() => {
    setProgress(0);
  }, []);

  useEffect(() => {
    let animationFrame;
    let startTime;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const newProgress = Math.min((elapsedTime / duration) * 100, 100);

      setProgress(newProgress);

      if (newProgress < 100) {
        animationFrame = requestAnimationFrame(animate);
      } else if (onComplete) {
        onComplete();
      }
    };

    if (isActive) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      resetProgress();
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isActive, duration, onComplete, resetProgress]);

  return (
    <div className={`progress-bar-container ${isActive ? "active" : ""}`}>
      <div
        className={`progress-bar ${isActive ? "animated" : ""}`}
        style={{ 
          width: `${progress}%`,
          transition: `width ${isActive ? '0.1s' : '0s'} linear`
        }}
      />
    </div>
  );
};

export default ProgressBar;
