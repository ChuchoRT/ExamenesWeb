'use client';

import React, { useState, useCallback } from 'react';
import Timer from './Timer';
import Alert from './Alert';

interface Question {
    id: number;
    question: string;
    options?: string[];
    correctAnswer?: number;
    type: 'multiple' | 'writing';
    expectedAnswer?: string;
    category: 'logica' | 'sql' | 'javascript';
    level: 'junior' | 'semi-senior' | 'senior';
}

const questions: Question[] = [
    // Lógica de Programación - Junior
    {
        id: 1,
        question: "¿Cuál es el resultado de 2 + 2 * 2?",
        options: ["4", "6", "8", "10"],
        correctAnswer: 1,
        type: 'multiple',
        category: "logica",
        level: "junior"
    },
    {
        id: 2,
        question: "¿Cuál es el valor de x después de ejecutar: x = 5; x += 3;?",
        options: ["5", "8", "15", "3"],
        correctAnswer: 1,
        type: 'multiple',
        category: "logica",
        level: "junior"
    },
    {
        id: 3,
        question: "¿Cuál es el resultado de 10 % 3?",
        options: ["3", "1", "0", "3.33"],
        correctAnswer: 1,
        type: 'multiple',
        category: "logica",
        level: "junior"
    },
    // Lógica de Programación - Semi-Senior
    {
        id: 4,
        question: "¿Cuál es la complejidad temporal de un algoritmo de búsqueda binaria?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correctAnswer: 1,
        type: 'multiple',
        category: "logica",
        level: "semi-senior"
    },
    {
        id: 5,
        question: "¿Cuál estructura de datos es más eficiente para implementar una cola?",
        options: ["Array", "Lista enlazada", "Árbol binario", "Hash table"],
        correctAnswer: 1,
        type: 'multiple',
        category: "logica",
        level: "semi-senior"
    },
    // Lógica de Programación - Senior
    {
        id: 6,
        question: "¿Cuál es la complejidad espacial de un algoritmo de ordenamiento rápido (quicksort)?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correctAnswer: 2,
        type: 'multiple',
        category: "logica",
        level: "senior"
    },
    {
        id: 7,
        question: "¿Cuál patrón de diseño es más apropiado para manejar múltiples observadores?",
        options: ["Singleton", "Observer", "Factory", "Strategy"],
        correctAnswer: 1,
        type: 'multiple',
        category: "logica",
        level: "senior"
    },
    // SQL - Junior
    {
        id: 8,
        question: "¿Cuál es la sintaxis correcta para crear una tabla en SQL?",
        options: [
            "CREATE TABLE nombre_tabla;",
            "CREATE TABLE nombre_tabla (columna1 tipo1, columna2 tipo2);",
            "NEW TABLE nombre_tabla;",
            "TABLE CREATE nombre_tabla;"
        ],
        correctAnswer: 1,
        type: 'multiple',
        category: "sql",
        level: "junior"
    },
    {
        id: 9,
        question: "¿Cuál comando se usa para eliminar datos de una tabla?",
        options: ["REMOVE", "DELETE", "DROP", "ERASE"],
        correctAnswer: 1,
        type: 'multiple',
        category: "sql",
        level: "junior"
    },
    // SQL - Semi-Senior
    {
        id: 10,
        question: "¿Cuál es la sintaxis correcta para un JOIN?",
        options: [
            "SELECT * FROM tabla1 JOIN tabla2",
            "SELECT * FROM tabla1, tabla2",
            "SELECT * FROM tabla1 INNER JOIN tabla2 ON tabla1.id = tabla2.id",
            "SELECT * FROM tabla1 + tabla2"
        ],
        correctAnswer: 2,
        type: 'multiple',
        category: "sql",
        level: "semi-senior"
    },
    // SQL - Senior
    {
        id: 11,
        question: "Escribe el código SQL para consultar las últimas 10 personas registradas en la tabla usuarios, ordenadas por fecha de registro descendente.",
        type: 'writing',
        expectedAnswer: "SELECT * FROM usuarios ORDER BY fecha_registro DESC LIMIT 10",
        category: "sql",
        level: "senior"
    },
    {
        id: 12,
        question: "Escribe el código SQL para crear una vista que muestre el nombre del empleado, su departamento y su salario, pero solo para empleados con salario mayor a 50000.",
        type: 'writing',
        expectedAnswer: "CREATE VIEW empleados_altos AS SELECT nombre, departamento, salario FROM empleados WHERE salario > 50000",
        category: "sql",
        level: "senior"
    },
    // JavaScript - Junior
    {
        id: 13,
        question: "¿Cuál es la forma correcta de declarar una variable en JavaScript?",
        options: [
            "variable x = 5;",
            "v x = 5;",
            "let x = 5;",
            "x = 5;"
        ],
        correctAnswer: 2,
        type: 'multiple',
        category: "javascript",
        level: "junior"
    },
    {
        id: 14,
        question: "¿Cuál es el resultado de '2' + 2 en JavaScript?",
        options: ["4", "22", "Error", "NaN"],
        correctAnswer: 1,
        type: 'multiple',
        category: "javascript",
        level: "junior"
    },
    // JavaScript - Semi-Senior
    {
        id: 15,
        question: "¿Cuál es la diferencia entre let y const?",
        options: [
            "No hay diferencia",
            "let permite reasignación, const no",
            "const es más rápido",
            "let es para números, const para strings"
        ],
        correctAnswer: 1,
        type: 'multiple',
        category: "javascript",
        level: "semi-senior"
    },
    // JavaScript - Senior
    {
        id: 16,
        question: "¿Cuál es el resultado de ejecutar: console.log([1,2,3].map(x => x * 2).filter(x => x > 4))?",
        options: ["[6]", "[4,6]", "[2,4,6]", "Error"],
        correctAnswer: 0,
        type: 'multiple',
        category: "javascript",
        level: "senior"
    }
];

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<'logica' | 'sql' | 'javascript'>('logica');
    const [selectedLevel, setSelectedLevel] = useState<'junior' | 'semi-senior' | 'senior'>('junior');
    const [isStarted, setIsStarted] = useState(false);
    const [writtenAnswer, setWrittenAnswer] = useState('');
    const [answers, setAnswers] = useState<boolean[]>([]);
    const [showFinalScore, setShowFinalScore] = useState(false);

    const handleAnswer = (selectedOption: number) => {
        const currentQ = filteredQuestions[currentQuestion];
        if (currentQ.type === 'multiple') {
            const isAnswerCorrect = selectedOption === currentQ.correctAnswer;
            setIsCorrect(isAnswerCorrect);
            setShowResult(true);
            setAnswers([...answers, isAnswerCorrect]);
        }
    };

    const handleWrittenAnswer = () => {
        const currentQ = filteredQuestions[currentQuestion];
        if (currentQ.type === 'writing') {
            const isAnswerCorrect = writtenAnswer.toLowerCase().trim() === currentQ.expectedAnswer?.toLowerCase().trim();
            setIsCorrect(isAnswerCorrect);
            setShowResult(true);
            setAnswers([...answers, isAnswerCorrect]);
        }
    };

    const handleTimeUp = useCallback(() => {
        setShowResult(true);
        setIsCorrect(false);
        setAnswers(prev => [...prev, false]);
    }, []);

    const handleNextQuestion = () => {
        setShowResult(false);
        setWrittenAnswer('');

        if (currentQuestion + 1 >= filteredQuestions.length) {
            setShowFinalScore(true);
        } else {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const handleStart = () => {
        setIsStarted(true);
        setCurrentQuestion(0);
        setShowResult(false);
        setWrittenAnswer('');
        setAnswers([]);
        setShowFinalScore(false);
    };

    const handleRestart = () => {
        setIsStarted(false);
        setCurrentQuestion(0);
        setShowResult(false);
        setWrittenAnswer('');
        setAnswers([]);
        setShowFinalScore(false);
    };

    const filteredQuestions = questions.filter(
        q => q.category === selectedCategory && q.level === selectedLevel
    );

    const calculateScore = () => {
        const correctAnswers = answers.filter(answer => answer).length;
        const totalQuestions = filteredQuestions.length;
        const percentage = (correctAnswers / totalQuestions) * 100;
        return {
            correct: correctAnswers,
            total: totalQuestions,
            percentage: percentage.toFixed(1)
        };
    };

    if (showFinalScore) {
        const score = calculateScore();
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                        Resultados del Examen
                    </h2>
                    <div className="mb-6">
                        <div className="text-4xl font-bold mb-2 text-blue-500">
                            {score.percentage}%
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                            {score.correct} de {score.total} respuestas correctas
                        </p>
                    </div>
                    <div className="space-y-4">
                        <button
                            onClick={handleRestart}
                            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                        >
                            Volver a Intentar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!isStarted) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
                        Selecciona el tipo de examen
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Categoría:</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value as any)}
                                className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                                <option value="logica">Lógica de Programación</option>
                                <option value="sql">Base de Datos SQL</option>
                                <option value="javascript">JavaScript</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Nivel:</label>
                            <select
                                value={selectedLevel}
                                onChange={(e) => setSelectedLevel(e.target.value as any)}
                                className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                                <option value="junior">Junior</option>
                                <option value="semi-senior">Semi-Senior</option>
                                <option value="senior">Senior</option>
                            </select>
                        </div>
                        <button
                            onClick={handleStart}
                            className="w-full mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                        >
                            Comenzar Examen
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <Timer onTimeUp={handleTimeUp} key={currentQuestion} />

            {!showResult ? (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Pregunta {currentQuestion + 1} de {filteredQuestions.length}
                    </div>
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                        {filteredQuestions[currentQuestion]?.question}
                    </h2>
                    {filteredQuestions[currentQuestion]?.type === 'multiple' ? (
                        <div className="space-y-3">
                            {filteredQuestions[currentQuestion]?.options?.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    className="w-full p-3 text-left border rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <textarea
                                value={writtenAnswer}
                                onChange={(e) => setWrittenAnswer(e.target.value)}
                                className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                rows={4}
                                placeholder="Escribe tu respuesta aquí..."
                            />
                            <button
                                onClick={handleWrittenAnswer}
                                className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                Enviar Respuesta
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center">
                    <Alert isCorrect={isCorrect} />
                    <button
                        onClick={handleNextQuestion}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        {currentQuestion + 1 >= filteredQuestions.length ? 'Ver Resultados' : 'Siguiente Pregunta'}
                    </button>
                </div>
            )}
        </div>
    );
} 