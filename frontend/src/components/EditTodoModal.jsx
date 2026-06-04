import { useState, useEffect } from "react";
import { useTodo } from "../context/TodoContext.jsx";
import { RiCloseLine, RiLoaderLine, RiSaveLine } from "react-icons/ri";

const PRIORITIES = ["low", "medium", "high"];

export default function EditTodoModal({ todo, onClose }) {
  const { editTodo, submitting } = useTodo();
  const [form, setForm] = useState({
    title: todo.title || "",
    description: todo.description || "",
    priority: todo.priority || "medium",
    dueDate: todo.dueDate ? todo.dueDate.slice(0, 10) : "",
    isCompleted: todo.isCompleted || false,
  });

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      dueDate: form.dueDate || null,
      isCompleted: form.isCompleted,
    };
    const ok = await editTodo(todo._id, payload);
    if (ok) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="glass rounded-2xl w-full max-w-lg animate-scale-in shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-gray-100">Edit Task</h2>
          <button
            id="close-edit-modal"
            onClick={onClose}
            className="p-2 rounded-xl text-gray-500 hover:text-gray-200 hover:bg-white/10 transition-all"
          >
            <RiCloseLine className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5 ml-1">Title *</label>
            <input
              id="edit-title"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Task title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5 ml-1">Description</label>
            <textarea
              id="edit-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="input-field resize-none text-sm"
              placeholder="Add details..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 ml-1">Priority</label>
              <select
                id="edit-priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="input-field text-sm capitalize"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p} className="bg-surface-800">
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 ml-1">Due Date</label>
              <input
                id="edit-due-date"
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="input-field text-sm"
                style={{ colorScheme: "dark" }}
              />
            </div>
          </div>

          {/* Completed toggle */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`
                relative w-11 h-6 rounded-full transition-all duration-200
                ${form.isCompleted ? "bg-brand-500" : "bg-surface-500"}
              `}
            >
              <input
                id="edit-completed"
                type="checkbox"
                name="isCompleted"
                checked={form.isCompleted}
                onChange={handleChange}
                className="sr-only"
              />
              <div
                className={`
                  absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md
                  transition-transform duration-200
                  ${form.isCompleted ? "translate-x-5" : "translate-x-0"}
                `}
              />
            </div>
            <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
              Mark as completed
            </span>
          </label>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost">
              Cancel
            </button>
            <button
              id="save-todo"
              type="submit"
              disabled={submitting}
              className="btn-primary flex items-center gap-2"
            >
              {submitting ? (
                <RiLoaderLine className="animate-spin" />
              ) : (
                <RiSaveLine />
              )}
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
