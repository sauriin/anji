"use client"

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const startParam = searchParams.get("start");

  const [step, setStep] = useState<"greeting" | "ready" | "video" | "main">(
    startParam === "main" ? "main" : "greeting"
  );

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (step === "greeting") {
      const timer = setTimeout(() => {
        setStep("ready");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleStart = () => {
    setStep("video");
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.error("Video play failed", err);
        });
      }
    }, 100);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence>
        {/* Step 1: Greeting */}
        {step === "greeting" && (
          <motion.div
            key="greeting"
            className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, backgroundColor: "#ffffff" }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl font-bold text-pink-600">Hi Anji ❤️</h1>
            <p className="mt-2 text-lg text-gray-700">This is your surprise</p>
          </motion.div>
        )}

        {/* Step 2: Ready Screen (Tap to Start) */}
        {step === "ready" && (
          <motion.div
            key="ready"
            className="absolute inset-0 flex items-center justify-center bg-white cursor-pointer text-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            onClick={handleStart}
          >
            <motion.p
              className="text-3xl font-bold text-pink-600 leading-snug"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              👆 Tap to see the most&nbsp;
              <span className="text-rose-500">Pyaara</span>&nbsp;person in the world ❤️
            </motion.p>
          </motion.div>
        )}

        {/* Step 3: Video */}
        {step === "video" && (
          <motion.div
            key="video"
            className="absolute inset-0 bg-black z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <video
              ref={videoRef}
              src="/vid1.mp4"
              playsInline
              preload="auto"
              controls={false}
              className="w-full h-full object-cover"
              onEnded={() => setStep("main")}
            />
          </motion.div>
        )}

        {/* Step 4: Main content */}
        {step === "main" && (
          <motion.section
            key="main"
            className="h-full flex flex-col items-center justify-start bg-cover bg-center bg-no-repeat px-6 text-center pt-45"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/736x/8b/1e/78/8b1e78e74cd806bab78bac79c0932aa6.jpg')",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-pink-600 leading-snug drop-shadow-lg bg-black/40 px-4 py-2 rounded-lg">
              🌟 So, this is for the Most <span className="text-rose-500">Pyaara</span> Person of the Family ❤️
            </h1>
            <div className="mt-8 flex flex-wrap gap-6 justify-center">
              <Link href="/memories">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-3 bg-pink-500 text-white rounded-full shadow-lg"
                >
                  Memories
                </motion.button>
              </Link>
              <Link href="/letter">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-3 bg-rose-500 text-white rounded-full shadow-lg"
                >
                  Letter
                </motion.button>
              </Link>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
