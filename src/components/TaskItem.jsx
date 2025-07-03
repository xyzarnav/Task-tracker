import React, { useState } from 'react';
import { Check, Edit3, Trash2, Calendar, Flag, Tag, Clock } from 'lucide-react';

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (date.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (Math.abs(diffInHours) < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  const isDueSoon = task.dueDate && new Date(task.dueDate).getTime() - new Date().getTime() < 86400000 && !task.completed;

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm border-l-4 p-4 transition-all duration-200 hover:shadow-md ${
      task.completed 
        ? 'border-l-green-400 bg-green-50/30 dark:bg-green-900/20' 
        : isOverdue 
          ? 'border-l-red-400' 
          : isDueSoon 
            ? 'border-l-yellow-400' 
            : 'border-l-blue-400'
    }`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900'
          }`}
        >
          {task.completed && <Check className="w-3 h-3" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className={`font-medium ${
                task.completed ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-gray-100'
              }`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`mt-1 text-sm ${
                  task.completed ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-200'
                }`}>
                  {task.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-300">
                  <Clock className="w-3 h-3" />
                  {formatDate(task.createdAt)}
                </div>

                {task.priority && (
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)} dark:border-opacity-60`}>
                    <Flag className="w-3 h-3" />
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                )}

                {task.category && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800">
                    <Tag className="w-3 h-3" />
                    {task.category}
                  </span>
                )}

                {task.dueDate && (
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
                    isOverdue 
                      ? 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900 dark:border-red-800' 
                      : isDueSoon 
                        ? 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900 dark:border-yellow-800'
                        : 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700'
                  }`}>
                    <Calendar className="w-3 h-3" />
                    Due {formatDate(task.dueDate)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(task)}
                className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition-colors duration-200"
                title="Edit task"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors duration-200"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onDelete(task.id)}
                    className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-2 py-1 text-xs bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;