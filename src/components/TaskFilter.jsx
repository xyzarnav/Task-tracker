import React from "react";
import { List, CheckCircle, Clock, Search, X } from "lucide-react";

const TaskFilter = ({
  currentFilter,
  onFilterChange,
  taskCounts,
  searchQuery,
  onSearchChange,
}) => {
  const filters = [
    { key: "all", label: "All Tasks", count: taskCounts.all, icon: List },
    {
      key: "pending",
      label: "Pending",
      count: taskCounts.pending,
      icon: Clock,
    },
    {
      key: "completed",
      label: "Completed",
      count: taskCounts.completed,
      icon: CheckCircle,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentFilter === key
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold ${
                  currentFilter === key
                    ? "bg-blue-400 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full sm:w-64 pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
