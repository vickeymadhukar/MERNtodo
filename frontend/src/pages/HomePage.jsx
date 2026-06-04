import Header from "../components/Header.jsx";
import StatsBar from "../components/StatsBar.jsx";
import TodoForm from "../components/TodoForm.jsx";
import FilterBar from "../components/FilterBar.jsx";
import TodoList from "../components/TodoList.jsx";

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-500/5 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-[300px] h-[300px] rounded-full bg-brand-500/3 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 pb-12">
        <Header />

        <main className="space-y-5">
          {/* Stats */}
          <StatsBar />

          {/* Add todo */}
          <TodoForm />

          {/* Filter bar */}
          <FilterBar />

          {/* Todo list */}
          <TodoList />
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-gray-700">
          Built with ❤️ using MERN Stack · React Context API · Tailwind CSS
        </footer>
      </div>
    </div>
  );
}
