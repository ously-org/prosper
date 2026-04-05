"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface OrangeRectangleProps {
  isTyping: boolean;
  isPasswordHidden: boolean;
  isPasswordVisible: boolean;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  mouseLean: MotionValue<number>;
}

export function OrangeRectangle({
  isTyping,
  isPasswordHidden,
  isPasswordVisible,
  smoothX,
  smoothY,
  mouseLean,
}: OrangeRectangleProps) {
  const eyeX = useTransform(smoothX, (v) => {
    if (isPasswordVisible) return -30;
    if (isPasswordHidden) return 0;
    return v * 18;
  });
  const eyeY = useTransform(smoothY, (v) => {
    if (isPasswordVisible || isPasswordHidden) return 0;
    return v * 18;
  });

  return (
    <motion.div
      animate={{
        rotate: isPasswordVisible ? -12 : 0,
      }}
      style={{
        rotate: isPasswordHidden || isPasswordVisible ? undefined : mouseLean,
      }}
      className="absolute left-[-40px] bottom-[20px] z-0 origin-bottom"
    >
      <motion.div
        animate={{
          y:
            isTyping && !isPasswordVisible
              ? 10
              : Math.sin(Date.now() / 1000) * 10,
          scale: isPasswordHidden || isPasswordVisible ? 0.95 : 1,
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 2.5,
            repeatType: "reverse",
            ease: "easeInOut",
          },
          scale: { duration: 0.3 },
        }}
        className="relative w-[140px] h-[240px] bg-[#FF9B6B] rounded-[40px] shadow-lg flex flex-col items-center justify-center pr-4 pb-10 overflow-hidden"
      >
        {/* Sleep Mask (Eye Pad) */}
        {(isPasswordHidden || isPasswordVisible) && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute top-[85px] left-2 right-2 h-10 bg-[#2a2a2a] rounded-lg shadow-xl z-20 flex items-center justify-around px-2 border border-white/5"
          >
            {/* The "X" patterns on the mask */}
            <div className="relative size-4">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-600 rotate-45" />
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-600 -rotate-45" />
            </div>
            <div className="relative size-4">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-600 rotate-45" />
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-600 -rotate-45" />
            </div>
          </motion.div>
        )}
        {/* Face */}
        <motion.div style={{ x: eyeX, y: eyeY }} className="flex gap-4">
          <motion.div
            animate={{
              height: isPasswordHidden || isPasswordVisible ? 2 : 14,
            }}
            className="w-4 bg-zinc-800 rounded-full"
          />
          <motion.div
            animate={{
              height: isPasswordHidden || isPasswordVisible ? 2 : 14,
            }}
            className="w-4 bg-zinc-800 rounded-full"
          />
        </motion.div>
        {/* Blushing cheeks when typing */}
        {isTyping && !isPasswordHidden && !isPasswordVisible && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-[130px] left-6 size-4 bg-pink-300/40 rounded-full blur-[2px]"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-[130px] right-6 size-4 bg-pink-300/40 rounded-full blur-[2px]"
            />
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
