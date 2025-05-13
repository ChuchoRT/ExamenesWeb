'use client';

import React, { useState, useEffect } from 'react';

interface TimerProps {
    onTimeUp: () => void;
    initialTime?: number;
}

export default function Timer({ onTimeUp, initialTime = 30 }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setTimeout(onTimeUp, 0);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []); // Solo se ejecuta al montar el componente

    return (
        <div className={`fixed top-4 right-4 text-2xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
            {timeLeft}s
        </div>
    );
} 