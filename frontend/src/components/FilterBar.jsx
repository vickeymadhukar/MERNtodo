import { useTodo } from "../context/TodoContext.jsx";

const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "completed", label: "Done" },
];

const PRIORITY_FILTERS = [
  { key: "", label: "Any Priority" },
  { key: "high", label: "🔴 High" },
  { key: "medium", label: "🟡 Medium" },
  { key: "low", label: "🟢 Low" },
];

export default function FilterBar() {
  const {
    filter,
    setFilter,
    priorityFilter,
    setPriorityFilter,
    stats,
    clearCompleted,
    setPagination,
  } = useTodo();

  const handleStatusChange = (key) => {
    setFilter(key);
    setPagination((p) => ({ ...p, page: 1 }));
  };

  const handlePriorityChange = (e) => {
    setPriorityFilter(e.target.value);
    setPagination((p) => ({ ...p, page: 1 }));
  };

  return (
    <div className="glass rounded-2xl px-5 py-4 flex flex-wrap items-center gap-4 animate-fade-in">
      {/* Status tabs */}
      <div className="flex items-center bg-surface-800 rounded-xl p-1 gap-1">
        {STATUS_FILTERS.map(({ key, label }) => (
          <button
            key={key}
            id={`filter-${key}`}
            onClick={() => handleStatusChange(key)}
            className={`
              px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
              ${
                filter === key
                  ? "bg-brand-500 text-white shadow-lg shadow-brand-500/30"
                  : "text-gray-500 hover:text-gray-300"
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Priority filter */}
      <select
        id="priority-filter"
        value={priorityFilter}
        onChange={handlePriorityChange}
        className="bg-surface-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-300
                   focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all"
      >
        {PRIORITY_FILTERS.map(({ key, label }) => (
          <option key={key} value={key} className="bg-surface-800">
            {label}
          </option>
        ))}
      </select>

      {/* Stats */}
      <div className="flex items-center gap-3 text-xs text-gray-500 ml-auto flex-wrap">
        <span>
          <span className="text-brand-400 font-semibold">{stats.pending}</span> pending
        </span>
        <span>
          <span className="text-emerald-400 font-semibold">{stats.completed}</span> done
        </span>

        {/* Clear completed */}
        {stats.completed > 0 && (
          <button
            id="clear-completed"
            onClick={clearCompleted}
            className="text-red-400 hover:text-red-300 font-medium hover:underline transition-colors ml-1"
          >
            Clear done
          </button>
        )}
      </div>
    </div>
  );
}
