"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface YellowCircleProps {
  isTyping: boolean;
  isPasswordHidden: boolean;
  isPasswordVisible: boolean;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  mouseLean: MotionValue<number>;
}

export function YellowCircle({
  isTyping,
  isPasswordHidden,
  isPasswordVisible,
  smoothX,
  smoothY,
  mouseLean,
}: YellowCircleProps) {
  const eyeX = useTransform(smoothX, (v) => {
    if (isPasswordVisible) return -25;
    if (isPasswordHidden) return 0;
    return v * 10;
  });
  const eyeY = useTransform(smoothY, (v) => {
    if (isPasswordVisible || isPasswordHidden) return 0;
    const typingOffset = isTyping ? -5 : 0;
    return v * 10 + typingOffset;
  });

  return (
    <motion.div
      animate={{ rotate: isPasswordVisible ? -15 : 0 }}
      style={{
        rotate: isPasswordHidden || isPasswordVisible ? undefined : mouseLean,
      }}
      className="absolute right-[40px] bottom-[50px] z-20 origin-bottom"
    >
      <motion.div
        animate={{
          y:
            isTyping && !isPasswordVisible
              ? 20
              : Math.cos(Date.now() / 1000 + 1) * 10,
          scale: isPasswordHidden || isPasswordVisible ? 0.9 : 1,
          x: isPasswordVisible ? [0, 1, -1, 0] : 0, // Vibration when visible
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 2.5,
            repeatType: "reverse",
            ease: "easeInOut",
          },
          x: {
            repeat: isPasswordVisible ? Infinity : 0,
            duration: 0.2,
          },
          scale: { duration: 0.3 },
        }}
        className="size-[70px] bg-[#E8D754] rounded-full shadow-lg flex items-center justify-center"
      >
        {/* Face */}
        <motion.div style={{ x: eyeX, y: eyeY }} className="flex gap-1.5">
          <motion.div
            animate={{
              height: isPasswordHidden || isPasswordVisible ? 2 : 8,
            }}
            className="w-2.5 bg-zinc-800 rounded-full"
          />
          <motion.div
            animate={{
              height: isPasswordHidden || isPasswordVisible ? 2 : 8,
            }}
            className="w-2.5 bg-zinc-800 rounded-full"
          />
        </motion.div>

        {/* Focus glasses when typing */}
        {isTyping && !isPasswordHidden && !isPasswordVisible && (
          <motion.div
            style={{ x: eyeX, y: eyeY }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute pointer-events-none flex gap-0.5"
          >
            <div className="size-4 rounded-full border-2 border-zinc-800" />
            <div className="w-1 h-0.5 bg-zinc-800 mt-[6px]" />
            <div className="size-4 rounded-full border-2 border-zinc-800" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
