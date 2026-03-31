"use client";

import { useRef, useEffect, useState } from 'react';

interface ScratchOffCanvasProps {
    width?: number;
    height?: number;
    revealText: string;
}

export default function ScratchOffCanvas({ width = 250, height = 250, revealText }: ScratchOffCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isScratched, setIsScratched] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Fill with rich metallic gold gradient
        const gradient = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, width / 2);
        gradient.addColorStop(0, '#FFF5D6'); // bright center highlight
        gradient.addColorStop(0.2, '#F3E5AB');
        gradient.addColorStop(0.5, '#D4AF37'); // base gold
        gradient.addColorStop(0.8, '#AA7900'); // shadow transition
        gradient.addColorStop(1, '#8A5A00'); // dark metallic edge

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Optional: Add some noise/texture to look like a scratch card
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        for (let i = 0; i < 500; i++) {
            ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
        }

        let isDrawing = false;

        const getMousePos = (e: MouseEvent | TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            let clientX, clientY;

            if ('touches' in e) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = (e as MouseEvent).clientX;
                clientY = (e as MouseEvent).clientY;
            }

            return {
                x: (clientX - rect.left) * scaleX,
                y: (clientY - rect.top) * scaleY
            };
        };

        const scratch = (x: number, y: number) => {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2, false);
            ctx.fill();
        };

        const handleStart = (e: MouseEvent | TouchEvent) => {
            isDrawing = true;
            const { x, y } = getMousePos(e);
            scratch(x, y);
        };

        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (!isDrawing) return;
            // Prevent scrolling while scratching
            if (e.cancelable) e.preventDefault();

            const { x, y } = getMousePos(e);
            scratch(x, y);

            // Check how much is scratched
            checkScratched();
        };

        const handleEnd = () => {
            isDrawing = false;
        };

        const checkScratched = () => {
            if (isScratched) return;
            const pixels = ctx.getImageData(0, 0, width, height).data;
            let transparentPixels = 0;
            for (let i = 3; i < pixels.length; i += 4) {
                if (pixels[i] === 0) {
                    transparentPixels++;
                }
            }
            const totalPixels = pixels.length / 4;
            const percentage = (transparentPixels / totalPixels) * 100;

            if (percentage > 50) {
                setIsScratched(true);
                // Fade out the rest of the canvas automatically
                canvas.style.transition = 'opacity 1s ease-out';
                canvas.style.opacity = '0';
                setTimeout(() => {
                    canvas.style.display = 'none';
                }, 1000);
            }
        };

        canvas.addEventListener('mousedown', handleStart);
        canvas.addEventListener('mousemove', handleMove, { passive: false });
        window.addEventListener('mouseup', handleEnd);

        canvas.addEventListener('touchstart', handleStart);
        canvas.addEventListener('touchmove', handleMove, { passive: false });
        window.addEventListener('touchend', handleEnd);

        return () => {
            canvas.removeEventListener('mousedown', handleStart);
            canvas.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleEnd);

            canvas.removeEventListener('touchstart', handleStart);
            canvas.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleEnd);
        };
    }, [width, height, isScratched]);

    return (
        <div className="relative inline-block rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.4)] ring-4 ring-white" style={{ width, height }}>
            <div
                className="absolute inset-0 flex items-center justify-center rounded-full bg-white border border-brand-accent/20"
            >
                <span className="font-serif text-4xl text-brand-dark italic">
                    {revealText}
                </span>
            </div>
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                className="absolute inset-0 cursor-crosshair rounded-full z-10 touch-none"
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}
