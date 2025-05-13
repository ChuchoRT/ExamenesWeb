import Quiz from '@/components/Quiz';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 transition-colors">
      <ThemeToggle />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Examenes de Programación
        </h1>
        <Quiz />
      </div>
    </main>
  );
}
