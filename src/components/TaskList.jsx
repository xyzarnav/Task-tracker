import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import TaskItem from './TaskItem';

const TaskList = ({ 
  tasks, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  searchQuery 
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          {searchQuery ? (
            <AlertCircle className="w-8 h-8 text-gray-400" />
          ) : (
            <CheckCircle className="w-8 h-8 text-gray-400" />
          )}
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          {searchQuery ? 'No tasks found' : 'No tasks yet'}
        </h3>
        <p className="text-gray-500 dark:text-gray-300">
          {searchQuery 
            ? `No tasks match "${searchQuery}". Try adjusting your search.`
            : 'Create your first task to get started on your productivity journey!'
          }
        </p>
      </div>
    );
  }

  // Group tasks by completion status for better visual organization
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-4">
      {pendingTasks.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wide mb-3">
            Pending Tasks ({pendingTasks.length})
          </h3>
          <div className="space-y-3">
            {pendingTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wide mb-3 mt-8">
            Completed Tasks ({completedTasks.length})
          </h3>
          <div className="space-y-3">
            {completedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;