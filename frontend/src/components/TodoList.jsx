import { useTodo } from "../context/TodoContext.jsx";
import TodoItem from "./TodoItem.jsx";
import { RiCheckboxCircleLine, RiInboxLine, RiLoaderLine } from "react-icons/ri";

export default function TodoList() {
  const { todos, loading, error, filter } = useTodo();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-500">
        <RiLoaderLine className="text-4xl animate-spin text-brand-500" />
        <span className="text-sm">Loading your tasks...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="text-red-400 font-medium">⚠️ {error}</p>
        <p className="text-gray-500 text-sm mt-1">
          Make sure the backend server is running on port 5000.
        </p>
      </div>
    );
  }

  if (todos.length === 0) {
    const emptyMessages = {
      all: { icon: <RiInboxLine className="text-5xl" />, text: "No tasks yet. Add your first task above!" },
      pending: { icon: <RiCheckboxCircleLine className="text-5xl" />, text: "No pending tasks. Great job! 🎉" },
      completed: { icon: <RiCheckboxCircleLine className="text-5xl" />, text: "No completed tasks yet. Keep going!" },
    };
    const { icon, text } = emptyMessages[filter] || emptyMessages.all;

    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-600 animate-fade-in">
        {icon}
        <p className="text-sm font-medium text-gray-500">{text}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
}
