"use client";

import { useEffect, useRef } from "react";
import { useSpring, useMotionValue, useTransform } from "framer-motion";

import { OrangeRectangle } from "./orange-rectangle";
import { BluePill } from "./blue-pill";
import { PurpleDome } from "./purple-dome";
import { YellowCircle } from "./yellow-circle";

interface DataEntitiesProps {
  isTyping: boolean;
  isPasswordHidden: boolean;
  isPasswordVisible?: boolean;
}

export function DataEntities({
  isTyping,
  isPasswordHidden,
  isPasswordVisible = false,
}: DataEntitiesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth movement
  const springConfig = { damping: 20, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Mouse lean effect
  const mouseLean = useTransform(smoothX, [-1, 1], [-8, 8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] flex items-center justify-center pointer-events-none"
    >
      <div className="relative w-[300px] h-[300px] flex items-center justify-center scale-150">
        <OrangeRectangle
          isTyping={isTyping}
          isPasswordHidden={isPasswordHidden}
          isPasswordVisible={isPasswordVisible}
          smoothX={smoothX}
          smoothY={smoothY}
          mouseLean={mouseLean}
        />
        <BluePill
          isTyping={isTyping}
          isPasswordHidden={isPasswordHidden}
          isPasswordVisible={isPasswordVisible}
          smoothX={smoothX}
          smoothY={smoothY}
          mouseLean={mouseLean}
        />
        <PurpleDome
          isTyping={isTyping}
          isPasswordHidden={isPasswordHidden}
          isPasswordVisible={isPasswordVisible}
          smoothX={smoothX}
          smoothY={smoothY}
          mouseLean={mouseLean}
        />
        <YellowCircle
          isTyping={isTyping}
          isPasswordHidden={isPasswordHidden}
          isPasswordVisible={isPasswordVisible}
          smoothX={smoothX}
          smoothY={smoothY}
          mouseLean={mouseLean}
        />
      </div>
    </div>
  );
}
