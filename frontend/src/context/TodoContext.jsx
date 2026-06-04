import { createContext, useContext, useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import * as todoApi from "../api/todo.api.js";

// ── Create Context ────────────────────────────────────────────────────────────
const TodoContext = createContext(null);

// ── Provider ──────────────────────────────────────────────────────────────────
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // "all" | "pending" | "completed"
  const [priorityFilter, setPriorityFilter] = useState(""); // "" | "low" | "medium" | "high"
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20, pages: 1 });

  // ── Load todos ──────────────────────────────────────────────────────────────
  const loadTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filter !== "all") params.status = filter;
      if (priorityFilter) params.priority = priorityFilter;
      params.page = pagination.page;
      params.limit = pagination.limit;

      const res = await todoApi.fetchTodos(params);
      setTodos(res.data.todos);
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [filter, priorityFilter, pagination.page, pagination.limit]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  // ── Create todo ─────────────────────────────────────────────────────────────
  const addTodo = useCallback(async (data) => {
    setSubmitting(true);
    try {
      const res = await todoApi.createTodo(data);
      setTodos((prev) => [res.data, ...prev]);
      setPagination((p) => ({ ...p, total: p.total + 1 }));
      toast.success("Todo created! 🎉");
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  }, []);

  // ── Update todo ─────────────────────────────────────────────────────────────
  const editTodo = useCallback(async (id, data) => {
    setSubmitting(true);
    try {
      const res = await todoApi.updateTodo(id, data);
      setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
      toast.success("Todo updated!");
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  }, []);

  // ── Toggle todo ─────────────────────────────────────────────────────────────
  const toggleTodo = useCallback(async (id) => {
    // Optimistic update
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
    try {
      const res = await todoApi.toggleTodo(id);
      setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      // Revert on failure
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, isCompleted: !t.isCompleted } : t))
      );
      toast.error(err.message);
    }
  }, []);

  // ── Delete todo ─────────────────────────────────────────────────────────────
  const removeTodo = useCallback(async (id) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
      setPagination((p) => ({ ...p, total: Math.max(0, p.total - 1) }));
      toast.success("Todo deleted.");
    } catch (err) {
      toast.error(err.message);
    }
  }, []);

  // ── Clear completed ─────────────────────────────────────────────────────────
  const clearCompleted = useCallback(async () => {
    const completedCount = todos.filter((t) => t.isCompleted).length;
    if (completedCount === 0) {
      toast("No completed todos to clear.", { icon: "ℹ️" });
      return;
    }
    try {
      await todoApi.deleteCompletedTodos();
      setTodos((prev) => prev.filter((t) => !t.isCompleted));
      setPagination((p) => ({ ...p, total: Math.max(0, p.total - completedCount) }));
      toast.success(`Cleared ${completedCount} completed todo(s).`);
    } catch (err) {
      toast.error(err.message);
    }
  }, [todos]);

  // ── Derived stats ───────────────────────────────────────────────────────────
  const stats = {
    total: pagination.total,
    completed: todos.filter((t) => t.isCompleted).length,
    pending: todos.filter((t) => !t.isCompleted).length,
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        submitting,
        error,
        filter,
        setFilter,
        priorityFilter,
        setPriorityFilter,
        pagination,
        setPagination,
        stats,
        loadTodos,
        addTodo,
        editTodo,
        toggleTodo,
        removeTodo,
        clearCompleted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// ── Custom hook ───────────────────────────────────────────────────────────────
export const useTodo = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return ctx;
};
