'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ImageComparisonSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeAlt?: string;
    afterAlt?: string;
    initialPosition?: number;
}

export default function ImageComparisonSlider({
    beforeImage,
    afterImage,
    beforeAlt = "Before image",
    afterAlt = "After image",
    initialPosition = 50
}: ImageComparisonSliderProps) {
    const [sliderPosition, setSliderPosition] = useState<number>(initialPosition);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number): void => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = (x / rect.width) * 100;

        setSliderPosition(Math.min(Math.max(percentage, 0), 100));
    };

    const handleMouseDown = (): void => {
        setIsDragging(true);
    };

    const handleMouseUp = (): void => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (!isDragging) return;
        handleMove(e.clientX);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX);
    };

    useEffect(() => {
        const handleGlobalMouseUp = (): void => setIsDragging(false);
        const handleGlobalMouseMove = (e: MouseEvent): void => {
            if (isDragging) handleMove(e.clientX);
        };

        if (isDragging) {
            document.addEventListener('mouseup', handleGlobalMouseUp);
            document.addEventListener('mousemove', handleGlobalMouseMove);
        }

        return () => {
            document.removeEventListener('mouseup', handleGlobalMouseUp);
            document.removeEventListener('mousemove', handleGlobalMouseMove);
        };
    }, [isDragging]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden select-none cursor-col-resize"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
        >
            {/* After Image (Right side - full width) */}
            <div className="absolute inset-0">
                <Image
                    src={afterImage}
                    alt={afterAlt}
                    fill
                    className="object-cover"
                    draggable={false}
                    priority
                />
            </div>

            {/* Before Image (Left side - clipped) */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
            >
                <div className="absolute inset-0 w-full h-full" style={{ width: `${(100 / sliderPosition) * 100}%` }}>
                    <Image
                        src={beforeImage}
                        alt={beforeAlt}
                        fill
                        className="object-cover"
                        draggable={false}
                        priority
                    />
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                onMouseDown={handleMouseDown}
            >
                {/* Slider Button */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center cursor-col-resize">
                    {/* Left Arrow */}
                    <svg
                        className="w-4 h-4 text-gray-700 absolute left-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>

                    {/* Right Arrow */}
                    <svg
                        className="w-4 h-4 text-gray-700 absolute right-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}