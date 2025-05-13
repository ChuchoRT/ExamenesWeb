'use client';

import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);

    // Efecto para manejar el montaje del componente
    useEffect(() => {
        setMounted(true);
    }, []);

    // Efecto para inicializar y manejar el tema
    useEffect(() => {
        if (!mounted) return;

        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Determinar el tema inicial
        const initialTheme = savedTheme === 'dark' || (!savedTheme && prefersDark);
        setIsDark(initialTheme);

        // Aplicar el tema
        if (initialTheme) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [mounted]);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);

        if (newTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    // No renderizar nada hasta que el componente esté montado
    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 left-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
            {isDark ? '🌞' : '🌙'}
        </button>
    );
} 