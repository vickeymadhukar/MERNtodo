import api from "./axiosInstance.js";

/**
 * Fetch all todos with optional filters & pagination
 * @param {{ status?: string, priority?: string, page?: number, limit?: number }} params
 */
export const fetchTodos = (params = {}) =>
  api.get("/todos", { params });

/**
 * Fetch a single todo by ID
 * @param {string} id
 */
export const fetchTodoById = (id) => api.get(`/todos/${id}`);

/**
 * Create a new todo
 * @param {{ title: string, description?: string, priority?: string, dueDate?: string }} data
 */
export const createTodo = (data) => api.post("/todos", data);

/**
 * Update a todo by ID
 * @param {string} id
 * @param {object} data
 */
export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);

/**
 * Toggle todo completion
 * @param {string} id
 */
export const toggleTodo = (id) => api.patch(`/todos/${id}/toggle`);

/**
 * Delete a todo by ID
 * @param {string} id
 */
export const deleteTodo = (id) => api.delete(`/todos/${id}`);

/**
 * Delete all completed todos
 */
export const deleteCompletedTodos = () => api.delete("/todos/completed");
