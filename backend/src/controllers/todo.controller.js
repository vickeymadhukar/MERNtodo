import Todo from "../models/todo.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// ── GET /api/v1/todos ─────────────────────────────────────────────────────────
export const getAllTodos = asyncHandler(async (req, res) => {
  const { status, priority, page = 1, limit = 20 } = req.query;

  const filter = {};
  if (status === "completed") filter.isCompleted = true;
  if (status === "pending") filter.isCompleted = false;
  if (priority) filter.priority = priority;

  const skip = (Number(page) - 1) * Number(limit);

  const [todos, total] = await Promise.all([
    Todo.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Todo.countDocuments(filter),
  ]);

  res.status(200).json(
    new ApiResponse(200, {
      todos,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    }, "Todos fetched successfully")
  );
});

// ── GET /api/v1/todos/:id ─────────────────────────────────────────────────────
export const getTodoById = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  res.status(200).json(new ApiResponse(200, todo, "Todo fetched successfully"));
});

// ── POST /api/v1/todos ────────────────────────────────────────────────────────
export const createTodo = asyncHandler(async (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  if (!title || title.trim() === "") {
    throw new ApiError(400, "Title is required");
  }

  const todo = await Todo.create({ title, description, priority, dueDate });

  res.status(201).json(new ApiResponse(201, todo, "Todo created successfully"));
});

// ── PUT /api/v1/todos/:id ─────────────────────────────────────────────────────
export const updateTodo = asyncHandler(async (req, res) => {
  const { title, description, priority, dueDate, isCompleted } = req.body;

  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { title, description, priority, dueDate, isCompleted },
    { new: true, runValidators: true }
  );

  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  res.status(200).json(new ApiResponse(200, todo, "Todo updated successfully"));
});

// ── PATCH /api/v1/todos/:id/toggle ───────────────────────────────────────────
export const toggleTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  todo.isCompleted = !todo.isCompleted;
  await todo.save();

  res.status(200).json(new ApiResponse(200, todo, "Todo toggled successfully"));
});

// ── DELETE /api/v1/todos/:id ──────────────────────────────────────────────────
export const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  res.status(200).json(new ApiResponse(200, null, "Todo deleted successfully"));
});

// ── DELETE /api/v1/todos/completed ───────────────────────────────────────────
export const deleteCompletedTodos = asyncHandler(async (req, res) => {
  const result = await Todo.deleteMany({ isCompleted: true });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedCount: result.deletedCount },
        "Completed todos cleared"
      )
    );
});
