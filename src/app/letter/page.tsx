"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Letter() {
    const letter = `Hey Anjali,

You’re not just someone I miss; you’re a blessing I admire every day. Your strength, your laughter, your fierce love for those around you—it all inspires me more than words can say.

I promise we’ll keep creating those unforgettable memories, crazy and beautiful like only we know how. Until then, this little letter is my way to remind you how incredibly special you are to me—now and always.

May God’s peace guard your heart and mind, and may His love carry you through every moment.
"And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." — Philippians 4:7

With all my love,
Saurin 💛
`;

    const [displayed, setDisplayed] = useState("");
    const [isDone, setIsDone] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayed(letter.slice(0, i));
            i++;
            if (i > letter.length) {
                clearInterval(interval);
                setIsDone(true); // typing finished
            }
        }, 30);
        return () => clearInterval(interval);
    }, []);

    // Detect if mobile for font size on hearts
    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMobile(window.innerWidth < 640);
        }
    }, []);

    return (
        <section className="relative py-8 sm:py-12 max-w-xl sm:max-w-3xl mx-auto min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 overflow-hidden px-4 sm:px-0">
            {/* Floating hearts */}
            <motion.div
                className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {[...Array(10)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="absolute text-pink-400"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            fontSize: isMobile ? "1rem" : "1.25rem",
                        }}
                        animate={{ y: [-20, -200], opacity: [0, 1, 0] }}
                        transition={{ duration: 5, repeat: Infinity, delay: i * 0.5 }}
                    >
                        ❤️
                    </motion.span>
                ))}
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-5xl font-bold text-pink-600 mb-6 text-center"
                style={{ fontFamily: "'Dancing Script', cursive" }}
            >
                A Letter for You 💌
            </motion.h1>

            {/* Paper effect */}
            <div
                className="relative p-6 sm:p-8 rounded-xl shadow-2xl border border-pink-200 overflow-hidden"
                style={{
                    backgroundImage:
                        "url('https://i.pinimg.com/736x/0d/2c/3c/0d2c3c353eed42411c9c62c93f5d38dd.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-xl"></div>

                <p
                    className="relative whitespace-pre-wrap text-lg sm:text-xl text-gray-800 leading-relaxed sm:leading-loose"
                    style={{ fontFamily: "'Dancing Script', cursive", textAlign: "left" }}
                >
                    {displayed}
                    <span className={`animate-pulse text-pink-500 ${isDone ? "hidden" : ""}`}>|</span>
                </p>
            </div>

            {/* Buttons - show only after typing done */}
            {isDone && (
                <div className="flex justify-center gap-6 mt-10">
                    <button
                        onClick={() => router.push("/?start=main")}
                        className="px-6 py-2 bg-pink-100 hover:bg-pink-200 text-pink-600 font-semibold rounded-md shadow-md transition"
                    >
                        Main Page
                    </button>
                    <button
                        onClick={() => router.push("/memories")}
                        className="px-8 py-3 bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-md shadow-md transition"
                    >
                        Memories
                    </button>
            
                </div>
            )}
        </section>
    );
}
