"use client";

import { useRef, useEffect, useState } from 'react';

interface ScratchOffCanvasProps {
    width?: number;
    height?: number;
    revealText: string;
    onScratchComplete?: () => void;
}

export default function ScratchOffCanvas({ width = 250, height = 250, revealText, onScratchComplete }: ScratchOffCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isScratched, setIsScratched] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // ── Metallic Gold Coin Effect ──
        const cx = width / 2;
        const cy = height / 2;
        const r = Math.min(cx, cy);

        // 1. Base dark gold fill (clipped to circle)
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.clip();

        ctx.fillStyle = '#B07D20';
        ctx.fillRect(0, 0, width, height);

        // 2. Conic spin-gradient: 180 thin pie slices alternating bright/mid gold
        const slices = 180;
        for (let i = 0; i < slices; i++) {
            const a1 = (i / slices) * Math.PI * 2;
            const a2 = ((i + 1) / slices) * Math.PI * 2;
            // Alternating bright / slightly darker bands using a sine wave
            const t = 0.5 + 0.5 * Math.sin(i * 1.2 + 0.3);
            const rC = Math.round(190 + t * 55);   // 190–245
            const gC = Math.round(138 + t * 47);   // 138–185
            const bC = Math.round(20 + t * 25);   // 20–45
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, r, a1, a2);
            ctx.closePath();
            ctx.fillStyle = `rgb(${rC},${gC},${bC})`;
            ctx.fill();
        }

        // 3. Specular highlight — off-center radial, upper-left quadrant
        const hx = cx - r * 0.18;
        const hy = cy - r * 0.18;
        const hl = ctx.createRadialGradient(hx, hy, 0, hx, hy, r * 0.9);
        hl.addColorStop(0, 'rgba(255, 245, 185, 0.88)');
        hl.addColorStop(0.18, 'rgba(235, 200, 100, 0.55)');
        hl.addColorStop(0.45, 'rgba(200, 155,  40, 0.15)');
        hl.addColorStop(1, 'rgba(0,   0,    0,  0)');
        ctx.fillStyle = hl;
        ctx.fillRect(0, 0, width, height);

        // 4. Edge vignette — darkens the rim like a real coin
        const vg = ctx.createRadialGradient(cx, cy, r * 0.62, cx, cy, r);
        vg.addColorStop(0, 'rgba(0, 0, 0, 0)');
        vg.addColorStop(1, 'rgba(0, 0, 0, 0.38)');
        ctx.fillStyle = vg;
        ctx.fillRect(0, 0, width, height);

        ctx.restore();

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
                onScratchComplete?.();
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
    }, [width, height, isScratched, onScratchComplete]);

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
