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

function App() {
  // Simplified state management - single state object
  const [appState, setAppState] = useState({
    user: null,
    tasks: [],
    filter: "all",
    searchQuery: "",
    editingTask: null,
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

  const handleCancelEdit = () => {
    updateState({ editingTask: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Header
        user={appState.user}
        onLogout={handleLogout}
        taskStats={taskStats}
      />

      <main className="max-w-4xl mx-auto px-4 pb-8">
        <TaskForm
          onSubmit={appState.editingTask ? handleEditTask : handleAddTask}
          onCancel={appState.editingTask ? handleCancelEdit : undefined}
          editingTask={appState.editingTask}
          isInline={!!appState.editingTask}
        />
      </main>
    </div>
  );
}

export default App;
