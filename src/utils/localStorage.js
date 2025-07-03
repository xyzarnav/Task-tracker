const TASKS_KEY = "taskTracker_tasks";
const USER_KEY = "taskTracker_user";

export const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
};

export const loadTasksFromStorage = () => {
  try {
    const stored = localStorage.getItem(TASKS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
    return [];
  }
};

export const saveUserToStorage = (user) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user to localStorage:", error);
  }
};

export const loadUserFromStorage = () => {
  try {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Error loading user from localStorage:", error);
    return null;
  }
};

export const clearUserFromStorage = () => {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error("Error clearing user from localStorage:", error);
  }
};

export const initializeSampleData = () => {
  const sampleTasks = [
    {
      id: "1",
      title: "Complete React assignment",
      description:
        "Build a task tracker application with all required features",
      completed: false,
      priority: "high",
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
      category: "Work",
    },
    {
      id: "2",
      title: "Review JavaScript concepts",
      description:
        "Go through ES6+ features, async/await, and modern practices",
      completed: true,
      priority: "medium",
      createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      category: "Learning",
    },
    {
      id: "3",
      title: "Plan weekend activities",
      description: "Research local events and make reservations",
      completed: false,
      priority: "low",
      createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
      category: "Personal",
    },
  ];

  saveTasksToStorage(sampleTasks);
  return sampleTasks;
};
