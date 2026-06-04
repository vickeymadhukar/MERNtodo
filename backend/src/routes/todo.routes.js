import express from "express";
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  deleteCompletedTodos,
} from "../controllers/todo.controller.js";

const router = express.Router();

// ── Collection routes ─────────────────────────────────────────────────────────
router.route("/").get(getAllTodos).post(createTodo);
router.route("/completed").delete(deleteCompletedTodos);

// ── Document routes ───────────────────────────────────────────────────────────
router.route("/:id").get(getTodoById).put(updateTodo).delete(deleteTodo);
router.route("/:id/toggle").patch(toggleTodo);

export default router;
