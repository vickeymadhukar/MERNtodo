import { useTodo } from "../context/TodoContext.jsx";
import { RiTaskLine } from "react-icons/ri";

export default function StatsBar() {
  const { stats, pagination } = useTodo();
  const completionPct =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statCards = [
    {
      id: "stat-total",
      label: "Total",
      value: pagination.total,
      color: "text-brand-400",
      bg: "from-brand-500/20 to-brand-500/5",
    },
    {
      id: "stat-pending",
      label: "Pending",
      value: stats.pending,
      color: "text-amber-400",
      bg: "from-amber-500/20 to-amber-500/5",
    },
    {
      id: "stat-completed",
      label: "Completed",
      value: stats.completed,
      color: "text-emerald-400",
      bg: "from-emerald-500/20 to-emerald-500/5",
    },
    {
      id: "stat-progress",
      label: "Done",
      value: `${completionPct}%`,
      color: "text-purple-400",
      bg: "from-purple-500/20 to-purple-500/5",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-slide-up">
      {statCards.map(({ id, label, value, color, bg }) => (
        <div
          key={id}
          id={id}
          className={`glass rounded-2xl p-4 bg-gradient-to-br ${bg} transition-all duration-200 hover:scale-[1.02]`}
        >
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">
            {label}
          </p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
      ))}
    </div>
  );
}
