import React, { useState, useEffect } from "react";
import {
  saveTasksToStorage,
  loadTasksFromStorage,
  saveUserToStorage,
  loadUserFromStorage,
  clearUserFromStorage,
  initializeSampleData,
} from "./utils/localStorage";
import Login from "./components/Login";
import Header from "./components/Header";
import TaskForm from "./components/Taskform";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";

function App() {
  // Simplified state management - single state object
  const [appState, setAppState] = useState({
    user: null,
    tasks: [],
    filter: "all",
    searchQuery: "",
    editingTask: null,
    theme: "light", // add theme state
  });

  // Load user and tasks on app start
  useEffect(() => {
    const savedUser = loadUserFromStorage();
    const savedTasks = loadTasksFromStorage();

    setAppState((prev) => ({
      ...prev,
      user: savedUser,
      tasks: savedTasks.length === 0 ? initializeSampleData() : savedTasks,
    }));
  }, []);

  // Persist theme to localStorage and load on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("taskTracker_theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setAppState((prev) => ({ ...prev, theme: savedTheme }));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("taskTracker_theme", appState.theme);
  }, [appState.theme]);

  // Save tasks whenever tasks change
  useEffect(() => {
    if (appState.tasks.length > 0) {
      saveTasksToStorage(appState.tasks);
    }
  }, [appState.tasks]);

  // Simplified update function
  const updateState = (updates) => {
    setAppState((prev) => ({ ...prev, ...updates }));
  };

  const handleLogin = (loginUser) => {
    updateState({ user: loginUser });
    saveUserToStorage(loginUser);
  };

  const handleLogout = () => {
    updateState({ user: null });
    clearUserFromStorage();
  };

  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...taskData,
    };
    updateState({ tasks: [newTask, ...appState.tasks] });
  };

  const handleEditTask = (taskData) => {
    if (!appState.editingTask) return;

    const updatedTasks = appState.tasks.map((task) =>
      task.id === appState.editingTask.id ? { ...task, ...taskData } : task
    );
    updateState({ tasks: updatedTasks, editingTask: null });
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = appState.tasks.filter((task) => task.id !== id);
    updateState({ tasks: updatedTasks });
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = appState.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    updateState({ tasks: updatedTasks });
  };

  const handleStartEdit = (task) => {
    updateState({ editingTask: task });
  };

  const handleCancelEdit = () => {
    updateState({ editingTask: null });
  };

  // Theme toggle handler
  const toggleTheme = () => {
    setAppState((prev) => ({
      ...prev,
      theme: prev.theme === "dark" ? "light" : "dark",
    }));
  };

  // Filter and search tasks
  const filteredTasks = appState.tasks.filter((task) => {
    // Apply filter
    let matchesFilter = true;
    if (appState.filter === "completed") {
      matchesFilter = task.completed;
    } else if (appState.filter === "pending") {
      matchesFilter = !task.completed;
    }

    // Apply search
    let matchesSearch = true;
    if (appState.searchQuery.trim()) {
      const query = appState.searchQuery.toLowerCase();
      matchesSearch =
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query)) ||
        (task.category && task.category.toLowerCase().includes(query));
    }

    return matchesFilter && matchesSearch;
  });

  // Calculate task counts
  const taskCounts = {
    all: appState.tasks.length,
    completed: appState.tasks.filter((task) => task.completed).length,
    pending: appState.tasks.filter((task) => !task.completed).length,
  };

  const taskStats = {
    total: appState.tasks.length,
    completed: taskCounts.completed,
    pending: taskCounts.pending,
  };

  if (!appState.user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className={`${appState.theme === "dark" ? "dark" : ""}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-black dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
        <Header
          user={appState.user}
          onLogout={handleLogout}
          taskStats={taskStats}
          theme={appState.theme}
          onToggleTheme={toggleTheme}
        />

        <main className="max-w-4xl mx-auto px-4 pb-8">
          <TaskForm
            onSubmit={appState.editingTask ? handleEditTask : handleAddTask}
            onCancel={appState.editingTask ? handleCancelEdit : undefined}
            editingTask={appState.editingTask}
            isInline={!!appState.editingTask}
          />

          <TaskFilter
            currentFilter={appState.filter}
            onFilterChange={(filter) => updateState({ filter })}
            taskCounts={taskCounts}
            searchQuery={appState.searchQuery}
            onSearchChange={(searchQuery) => updateState({ searchQuery })}
          />

          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onEdit={handleStartEdit}
            onDelete={handleDeleteTask}
            searchQuery={appState.searchQuery}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
