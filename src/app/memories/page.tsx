"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Memories() {
    const router = useRouter();

    const allImages = [
        "/Images/Image3.jpg",
        "/Images/Image2.jpg",
        "/Images/Image1.jpg",
        "/Images/Image4.jpg",
        "/Images/Image6.jpg",
        "/Images/Image5.jpg",
    ];

    const [images, setImages] = useState(allImages);

    const handleSwipe = (offset: number, index: number) => {
        if (Math.abs(offset) > 150) {
            setImages((prev) => prev.filter((_, i) => i !== index));
        }
    };

    return (
        <section className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-rose-100 overflow-hidden px-4">
            <h1 className="text-4xl font-bold text-pink-600 mb-4 text-center">
                Swipe Through Our Memories 💖
            </h1>
            <p className="text-gray-700 mb-8 text-center max-w-md">
                Swipe left or right to go through each special moment.
            </p>

            {images.length > 0 ? (
                <div className="relative w-80 h-96">
                    <AnimatePresence>
                        {images.map((src, index) => {
                            const isTop = index === 0;

                            return (
                                <motion.div
                                    key={src}
                                    className="absolute w-full h-full rounded-xl shadow-lg cursor-grab bg-white p-2"
                                    style={{
                                        zIndex: images.length - index,
                                    }}
                                    drag={isTop ? "x" : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    onDragEnd={(e, info) => {
                                        handleSwipe(info.offset.x, index);
                                    }}
                                    initial={{ scale: 1 - index * 0.03, y: index * 5 }}
                                    animate={{ scale: 1 - index * 0.03, y: index * 5 }}
                                    exit={{
                                        x: 500,
                                        opacity: 0,
                                        transition: { duration: 0.3 },
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    <img
                                        src={src}
                                        alt={`Memory ${index + 1}`}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center px-6"
                >
                    <h2 className="text-3xl font-bold text-rose-600 mb-4">
                        🌟 That’s all the memories for now 🌟
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        💌 But no matter the distance, you’re always close to my heart.
                        Here’s to many more moments we’ll make together ❤️✨
                    </p>

                    {/* Buttons shown only after all images are gone */}
                    <div className="flex justify-center gap-6">
                        <button
                            onClick={() => router.push("/?start=main")}
                            className="px-6 py-2 bg-pink-100 hover:bg-pink-200 text-pink-600 font-semibold rounded-md shadow-md transition"
                        >
                            Main Page
                        </button>
                        <button
                            onClick={() => router.push("/letter")}
                            className="px-6 py-2 bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-md shadow-md transition"
                        >
                            Letter
                        </button>
                    </div>
                </motion.div>
            )}
        </section>
    );
}
