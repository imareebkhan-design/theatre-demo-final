import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// A simple SVG bird path
const BirdIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-brand-accent/30">
        <path d="M4 12c2 0 4-2 4-2s2 2 4 2 4-2 4-2 2 2 4 2" />
    </svg>
);

interface Bird {
    id: number;
    initialX: string;
    initialY: string;
    duration: number;
    delay: number;
    scale: number;
}

export default function FlockingBirds() {
    const [birds, setBirds] = useState<Bird[]>([]);

    useEffect(() => {
        // Generate a flock of birds
        const newBirds = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            initialX: `${-10 - Math.random() * 20}%`, // Start off-screen left
            initialY: `${Math.random() * 100}%`,
            duration: 15 + Math.random() * 20, // 15-35s to cross screen
            delay: Math.random() * 10,
            scale: 0.5 + Math.random() * 1.5,
        }));
        setBirds(newBirds);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {birds.map((bird) => (
                <motion.div
                    key={bird.id}
                    className="absolute"
                    initial={{ left: bird.initialX, top: bird.initialY, scale: bird.scale, opacity: 0 }}
                    animate={{
                        left: '110%',
                        top: [`${parseFloat(bird.initialY)}%`, `${parseFloat(bird.initialY) - 10 + Math.random() * 20}%`, `${parseFloat(bird.initialY)}%`],
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: bird.duration,
                        delay: bird.delay,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <BirdIcon />
                </motion.div>
            ))}
        </div>
    );
}
