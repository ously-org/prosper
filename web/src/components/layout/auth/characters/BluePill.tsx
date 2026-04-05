"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface BluePillProps {
  isTyping: boolean;
  isPasswordHidden: boolean;
  isPasswordVisible: boolean;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  mouseLean: MotionValue<number>;
}

export function BluePill({
  isTyping,
  isPasswordHidden,
  isPasswordVisible,
  smoothX,
  smoothY,
  mouseLean,
}: BluePillProps) {
  const eyeX = useTransform(smoothX, (v) => {
    if (isPasswordVisible) return -35;
    if (isPasswordHidden) return 0;
    return v * 20;
  });
  const eyeY = useTransform(smoothY, (v) => {
    if (isPasswordVisible || isPasswordHidden) return 8; // Slight look down when peeking
    return v * 20;
  });

  return (
    <motion.div
      animate={{ rotate: isPasswordVisible ? -10 : 0 }}
      style={{
        rotate: isPasswordHidden || isPasswordVisible ? undefined : mouseLean,
      }}
      className="absolute top-[10px] z-10 origin-bottom"
    >
      <motion.div
        animate={{
          y: isTyping && !isPasswordVisible ? -10 : 0,
          scale: isPasswordHidden || isPasswordVisible ? 0.95 : 1,
        }}
        transition={{ duration: 0.3, bounce: 0.5 }}
        className="w-[120px] h-[190px] bg-primary rounded-[60px] shadow-xl flex flex-col items-center justify-center pt-4"
      >
        <div className="absolute inset-x-2 top-2 h-1/2 bg-white/10 rounded-t-[50px] pointer-events-none" />

        {/* Face Container */}
        <motion.div
          style={{ x: eyeX, y: eyeY }}
          className="flex flex-col items-center gap-2 mt-[-30px]"
        >
          <div className="flex gap-5">
            <motion.div
              animate={{
                height: isPasswordHidden || isPasswordVisible ? 2 : 16,
              }}
              className="w-3.5 bg-primary-foreground rounded-full"
            />
            <motion.div
              animate={{
                height: isPasswordHidden || isPasswordVisible ? 2 : 16,
              }}
              className="w-3.5 bg-primary-foreground rounded-full"
            />
          </div>
          <motion.div
            animate={{
              width: isTyping && !isPasswordVisible ? 10 : 6,
              height: isTyping && !isPasswordVisible ? 10 : 4,
              borderRadius: isTyping && !isPasswordVisible ? "50%" : "4px",
              opacity: isPasswordHidden || isPasswordVisible ? 0 : 1,
            }}
            className="bg-primary-foreground/50 mt-1"
          />
        </motion.div>

        {/* Hands - Show on hidden (eyes) or visible (peeking/dropped) */}
        {(isPasswordHidden || isPasswordVisible) && (
          <div className="absolute top-[60px] w-full flex justify-center gap-2 px-6">
            <motion.div
              animate={{
                y: isPasswordVisible ? 15 : 0,
                opacity: 1,
                rotate: isPasswordVisible ? 15 : 10,
                scale: 1.1,
              }}
              className="w-10 h-14 bg-primary brightness-110 rounded-full shadow-md"
            />
            <motion.div
              animate={{
                y: isPasswordVisible ? 15 : 0,
                opacity: 1,
                rotate: isPasswordVisible ? -15 : -10,
                scale: 1.1,
              }}
              className="w-10 h-14 bg-primary brightness-110 rounded-full shadow-md"
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
