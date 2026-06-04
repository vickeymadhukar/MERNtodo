import { useState } from "react";
import { useTodo } from "../context/TodoContext.jsx";
import {
  RiCheckLine,
  RiDeleteBinLine,
  RiEditLine,
  RiCalendarLine,
  RiFlag2Line,
} from "react-icons/ri";
import EditTodoModal from "./EditTodoModal.jsx";

const priorityConfig = {
  low: { label: "Low", cls: "badge-low" },
  medium: { label: "Medium", cls: "badge-medium" },
  high: { label: "High", cls: "badge-high" },
};

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isOverdue(dateStr) {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date() && new Date(dateStr).toDateString() !== new Date().toDateString();
}

export default function TodoItem({ todo }) {
  const { toggleTodo, removeTodo } = useTodo();
  const [editOpen, setEditOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await removeTodo(todo._id);
    // No need to reset since component unmounts
  };

  const overdue = !todo.isCompleted && isOverdue(todo.dueDate);
  const priority = priorityConfig[todo.priority] || priorityConfig.medium;

  return (
    <>
      <article
        className={`
          group glass rounded-2xl p-4 transition-all duration-300 animate-fade-in
          ${todo.isCompleted ? "opacity-60" : ""}
          ${deleting ? "opacity-0 scale-95 pointer-events-none" : ""}
          hover:border-white/20 hover:bg-white/[0.07]
        `}
      >
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <button
            id={`toggle-${todo._id}`}
            onClick={() => toggleTodo(todo._id)}
            aria-label={todo.isCompleted ? "Mark as pending" : "Mark as complete"}
            className={`
              mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center
              transition-all duration-200 cursor-pointer
              ${
                todo.isCompleted
                  ? "bg-brand-500 border-brand-500 text-white"
                  : "border-gray-600 hover:border-brand-400"
              }
            `}
          >
            {todo.isCompleted && <RiCheckLine className="text-sm" />}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-base leading-snug break-words
                ${todo.isCompleted ? "line-through text-gray-500" : "text-gray-100"}
              `}
            >
              {todo.title}
            </h3>

            {todo.description && (
              <p className="text-sm text-gray-500 mt-1 break-words leading-relaxed">
                {todo.description}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {/* Priority badge */}
              <span className={`flex items-center gap-1 ${priority.cls}`}>
                <RiFlag2Line className="text-xs" />
                {priority.label}
              </span>

              {/* Due date */}
              {todo.dueDate && (
                <span
                  className={`flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full border
                    ${
                      overdue
                        ? "bg-red-500/15 text-red-400 border-red-500/25"
                        : "bg-white/5 text-gray-400 border-white/10"
                    }
                  `}
                >
                  <RiCalendarLine className="text-xs" />
                  {overdue ? "Overdue · " : ""}
                  {formatDate(todo.dueDate)}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
            <button
              id={`edit-${todo._id}`}
              onClick={() => setEditOpen(true)}
              aria-label="Edit todo"
              className="p-2 rounded-xl text-gray-500 hover:text-brand-400 hover:bg-brand-500/10 transition-all duration-200"
            >
              <RiEditLine className="text-base" />
            </button>
            <button
              id={`delete-${todo._id}`}
              onClick={handleDelete}
              aria-label="Delete todo"
              className="p-2 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
            >
              <RiDeleteBinLine className="text-base" />
            </button>
          </div>
        </div>
      </article>

      {editOpen && (
        <EditTodoModal todo={todo} onClose={() => setEditOpen(false)} />
      )}
    </>
  );
}
