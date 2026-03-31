"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Generates an SVG texture matching the target's hand-drawn curtain folds
const CurtainTexture = () => (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute inset-0 z-0">
        <defs>
            {/* Pattern mimicking stylized curtain fabric folds */}
            <pattern id="curtain-folds" width="100" height="800" patternUnits="userSpaceOnUse">
                <path d="M 10,0 Q 15,200 12,400 T 10,800" stroke="#fca5a5" strokeWidth="2" fill="none" opacity="0.4" />
                <path d="M 25,50 Q 20,250 22,500 T 25,800" stroke="#fca5a5" strokeWidth="1" fill="none" opacity="0.2" />
                <path d="M 40,0 Q 45,300 42,600 T 40,800" stroke="#fca5a5" strokeWidth="2.5" fill="none" opacity="0.5" />
                <path d="M 60,100 Q 55,400 58,600 T 60,800" stroke="#fca5a5" strokeWidth="1" fill="none" opacity="0.3" />
                <path d="M 75,0 Q 80,200 78,450 T 75,800" stroke="#fca5a5" strokeWidth="1.5" fill="none" opacity="0.4" />
                <path d="M 90,20 Q 85,300 88,550 T 90,800" stroke="#fca5a5" strokeWidth="1" fill="none" opacity="0.2" />
            </pattern>
            <linearGradient id="shading" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#4a1111" stopOpacity="0.8" />
                <stop offset="20%" stopColor="#8b2222" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#5c1616" stopOpacity="0" />
                <stop offset="80%" stopColor="#8b2222" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#4a1111" stopOpacity="0.8" />
            </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#shading)" />
        <rect width="100%" height="100%" fill="url(#curtain-folds)" />
    </svg>
);

export default function CurtainReveal({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleOpen = () => {
        setIsOpen(true);
    };

    return (
        <>
            <AnimatePresence>
                <motion.div
                    className="fixed inset-0 z-[100] flex overflow-hidden"
                    style={{ pointerEvents: isOpen ? 'none' : 'auto' }}
                    onClick={isOpen ? undefined : handleOpen}
                >
                    {/* Left Curtain */}
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: isOpen ? '-85%' : 0 }}
                        transition={{ duration: 4.0, ease: [0.45, 0, 0.15, 1] }}
                        className="relative h-full w-1/2 overflow-hidden border-r border-black/30 shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-10 cursor-pointer pointer-events-auto"
                        style={{
                            backgroundColor: '#721c1c',
                        }}
                    >
                        <CurtainTexture />
                    </motion.div>

                    {/* Right Curtain */}
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: isOpen ? '85%' : 0 }}
                        transition={{ duration: 4.0, ease: [0.45, 0, 0.15, 1] }}
                        className="relative h-full w-1/2 overflow-hidden border-l border-black/30 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-10 cursor-pointer pointer-events-auto"
                        style={{
                            backgroundColor: '#721c1c',
                        }}
                    >
                        <CurtainTexture />
                        {/* Flip the pattern for the right curtain for symmetry */}
                        <div className="absolute inset-0 scale-x-[-1] pointer-events-none">
                            <CurtainTexture />
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            <div className={!isOpen ? 'opacity-0 scale-[1.02]' : 'opacity-100 scale-100 transition-all duration-1000 ease-out delay-100'}>
                {children}
            </div>
        </>
    );
}
