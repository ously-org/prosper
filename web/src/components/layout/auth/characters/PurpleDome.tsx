"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface PurpleDomeProps {
  isTyping: boolean;
  isPasswordHidden: boolean;
  isPasswordVisible: boolean;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  mouseLean: MotionValue<number>;
}

export function PurpleDome({
  isTyping,
  isPasswordHidden,
  isPasswordVisible,
  smoothX,
  smoothY,
  mouseLean,
}: PurpleDomeProps) {
  const eyeX = useTransform(smoothX, (v) => {
    if (isPasswordVisible) return -40;
    if (isPasswordHidden) return 0;
    return v * 15;
  });
  const eyeY = useTransform(smoothY, (v) => {
    if (isPasswordVisible || isPasswordHidden) return 0;
    return v * 15;
  });

  return (
    <motion.div
      animate={{ 
        rotate: 0,
        y: 0,
      }}
      style={{
        rotate: isPasswordHidden || isPasswordVisible ? undefined : mouseLean,
      }}
      className="absolute bottom-[20px] left-[80px] z-30 origin-bottom"
    >
      <motion.div
        animate={{
          y:
            isTyping && !isPasswordVisible
              ? 5
              : Math.cos(Date.now() / 1000) * 5,
          scale: isPasswordHidden || isPasswordVisible ? 0.95 : 1,
          height:
            isTyping && !isPasswordHidden && !isPasswordVisible ? 100 : 90,
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 3,
            repeatType: "reverse",
            ease: "easeInOut",
          },
          scale: { duration: 0.3 },
          height: { duration: 0.2 },
        }}
        className="w-[140px] bg-[#6C3FF5] rounded-t-[70px] rounded-b-[20px] shadow-2xl flex items-center justify-center pt-4"
      >
        <motion.div
          style={{ x: eyeX, y: eyeY }}
          className="flex flex-col items-center gap-1.5"
        >
          <motion.div
            animate={{
              x: isPasswordVisible ? [0, 8, 0] : 0,
            }}
            transition={{
              x: isPasswordVisible
                ? {
                    duration: 3,
                    repeat: Infinity,
                    times: [0, 0.7, 0.8],
                  }
                : { duration: 0.2 },
            }}
            className="flex gap-4"
          >
            {/* Left Eye: Always a slit when password interacted with */}
            <motion.div
              animate={{
                height: isPasswordVisible || isPasswordHidden ? 2 : 12,
              }}
              transition={{ height: { duration: 0.2 } }}
              className="w-3.5 bg-white rounded-full"
            />
            {/* Right Eye: Peeks ONLY when password is visible */}
            <motion.div
              animate={{
                height: isPasswordVisible
                  ? [2, 11, 2]
                  : isPasswordHidden
                  ? 2
                  : 12,
              }}
              transition={{
                height: isPasswordVisible
                  ? {
                      duration: 3,
                      repeat: Infinity,
                      times: [0, 0.7, 0.8],
                    }
                  : { duration: 0.2 },
              }}
              className="w-3.5 bg-white rounded-full"
            />
          </motion.div>
          <motion.div
            animate={{
              width: isTyping && !isPasswordVisible ? 12 : 8,
              height: isTyping && !isPasswordVisible ? 4 : 2,
              borderRadius: "4px",
              opacity: isPasswordHidden || isPasswordVisible ? 0 : 0.7,
            }}
            className="bg-white mt-1"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
