import { useState } from "react";
import { useTodo } from "../context/TodoContext.jsx";
import { RiAddLine, RiLoaderLine } from "react-icons/ri";

const PRIORITIES = ["low", "medium", "high"];

export default function TodoForm() {
  const { addTodo, submitting } = useTodo();
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });
  const [expanded, setExpanded] = useState(false);
  const [titleError, setTitleError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "title" && value.trim()) setTitleError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setTitleError("Title is required");
      return;
    }
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      dueDate: form.dueDate || null,
    };
    const ok = await addTodo(payload);
    if (ok) {
      setForm({ title: "", description: "", priority: "medium", dueDate: "" });
      setExpanded(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass rounded-2xl p-5 animate-slide-up"
    >
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
        New Task
      </h2>

      {/* Title */}
      <div className="mb-3">
        <input
          id="todo-title"
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          onFocus={() => setExpanded(true)}
          placeholder="What needs to be done?"
          className={`input-field text-lg ${titleError ? "border-red-500/50 ring-2 ring-red-500/30" : ""}`}
          autoComplete="off"
        />
        {titleError && (
          <p className="text-red-400 text-xs mt-1.5 ml-1 animate-fade-in">
            {titleError}
          </p>
        )}
      </div>

      {/* Expandable fields */}
      {expanded && (
        <div className="space-y-3 animate-slide-up">
          {/* Description */}
          <textarea
            id="todo-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Add a description (optional)..."
            rows={2}
            className="input-field resize-none text-sm"
          />

          <div className="flex gap-3">
            {/* Priority */}
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1.5 ml-1">
                Priority
              </label>
              <select
                id="todo-priority"
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
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1.5 ml-1">
                Due Date
              </label>
              <input
                id="todo-due-date"
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="input-field text-sm"
                style={{ colorScheme: "dark" }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        {expanded && (
          <button
            type="button"
            onClick={() => {
              setExpanded(false);
              setForm({ title: "", description: "", priority: "medium", dueDate: "" });
              setTitleError("");
            }}
            className="btn-ghost text-sm"
          >
            Cancel
          </button>
        )}
        <button
          id="todo-submit"
          type="submit"
          disabled={submitting}
          className="btn-primary ml-auto flex items-center gap-2"
        >
          {submitting ? (
            <RiLoaderLine className="animate-spin text-lg" />
          ) : (
            <RiAddLine className="text-lg" />
          )}
          {submitting ? "Adding..." : "Add Task"}
        </button>
      </div>
    </form>
  );
}
