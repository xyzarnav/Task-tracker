
const USER_KEY = "taskTracker_user";


export const saveUserToStorage = (user) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user to localStorage:", error);
  }
};






