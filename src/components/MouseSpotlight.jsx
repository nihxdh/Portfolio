import React, { useState, useEffect, useCallback, useRef } from 'react';

const MouseSpotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const animationFrameRef = useRef();

  // Throttled mouse move handler for better performance
  const handleMouseMove = useCallback((e) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
      
      // Make spotlight visible after first mouse move
      if (!isVisible) {
        setIsVisible(true);
      }
    });
  }, [isVisible]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  // Handle window resize for responsive gradient sizing
  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  useEffect(() => {
    // Initialize window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter, handleResize]);

  // Calculate responsive gradient size based on screen size
  const gradientSize = Math.min(Math.max(windowSize.width * 0.5, 500), 1000);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        background: `radial-gradient(${gradientSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, 
          rgba(59, 130, 246, 0.15), 
          rgba(59, 130, 246, 0.12) 20%, 
          rgba(59, 130, 246, 0.08) 40%, 
          transparent 70%)`,
        transition: 'opacity 300ms ease-out'
      }}
    />
  );
};

export default MouseSpotlight;
