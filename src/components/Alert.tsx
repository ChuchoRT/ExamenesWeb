'use client';

import React from 'react';

interface AlertProps {
    isCorrect: boolean;
}

export default function Alert({ isCorrect }: AlertProps) {
    return (
        <div className={`p-4 rounded-lg mb-4 ${isCorrect
            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
            }`}>
            <div className="flex items-center">
                {isCorrect ? (
                    <>
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-bold">¡Correcto!</span>
                    </>
                ) : (
                    <>
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="font-bold">¡Incorrecto!</span>
                    </>
                )}
            </div>
            <p className="mt-2">
                {isCorrect
                    ? 'Has respondido correctamente a la pregunta.'
                    : 'La respuesta no es correcta. ¡Sigue intentando!'}
            </p>
        </div>
    );
} 