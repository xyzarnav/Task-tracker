import React, { useState, useEffect } from "react";
import { Plus, Edit3, X, Calendar, Flag, Tag } from "lucide-react";

const TaskForm = ({ onSubmit, onCancel, editingTask, isInline = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    category: "",
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || "",
        priority: editingTask.priority,
        dueDate: editingTask.dueDate ? editingTask.dueDate.split("T")[0] : "",
        category: editingTask.category || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        category: "",
      });
    }
  }, [editingTask]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      completed: editingTask?.completed || false,
      priority: formData.priority,
      dueDate: formData.dueDate
        ? new Date(formData.dueDate).toISOString()
        : undefined,
      category: formData.category.trim() || undefined,
    });

    if (!editingTask) {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        category: "",
      });
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
        >
          Task Title *
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          placeholder="Enter task title"
          required
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          placeholder="Enter task description (optional)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            <Flag className="w-4 h-4 inline mr-1" />
            Priority
          </label>
          <select
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            <Calendar className="w-4 h-4 inline mr-1" />
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={formData.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            <Tag className="w-4 h-4 inline mr-1" />
            Category
          </label>
          <input
            type="text"
            id="category"
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            placeholder="e.g., Work, Personal"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
        >
          {editingTask ? (
            <Edit3 className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          {editingTask ? "Update Task" : "Add Task"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        )}
      </div>
    </form>
  );

  if (isInline) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-blue-200 dark:border-blue-900 p-4 mb-4">
        {formContent}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        {editingTask ? (
          <Edit3 className="w-5 h-5" />
        ) : (
          <Plus className="w-5 h-5" />
        )}
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>
      {formContent}
    </div>
  );
};

export default TaskForm;
