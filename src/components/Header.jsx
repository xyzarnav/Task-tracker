import React from 'react';
import { LogOut, CheckSquare, Sun, Moon } from 'lucide-react';

const Header = ({ user, onLogout, taskStats, theme, onToggleTheme }) => {
  const completionRate = taskStats.total > 0 ? Math.round((taskStats.completed / taskStats.total) * 100) : 0;

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 mb-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-10 h-10 rounded-full flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Task Tracker
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-200">
                Welcome back, {user.username}!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200
                ${
                  theme === "dark"
                    ? "bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 hover:opacity-90"
                    : "bg-gray-100 hover:bg-gray-400"
                }
              `}
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-purple-900" />
              )}
            </button>

            <div className="hidden sm:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-100">{taskStats.total} Total</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-100">
                  {taskStats.completed} Done
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-100">
                  {taskStats.pending} Pending
                </span>
              </div>
              <div className="text-gray-700 dark:text-white font-medium">
                {completionRate}% Complete
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-100 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-4 h-4 dark:text-white" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile stats */}
        <div className="sm:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-100">
              {taskStats.total} Total
            </span>
            <span className="text-green-600 dark:text-green-300">{taskStats.completed} Done</span>
            <span className="text-yellow-600 dark:text-yellow-300">{taskStats.pending} Pending</span>
            <span className="text-gray-700 dark:text-white font-medium">
              {completionRate}% Complete
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;