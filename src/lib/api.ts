
import { User, Recipe } from "@/types";
import { mockUsers, mockRecipes } from "./mock-data";

// Helper functions to work with localStorage
const getLocalData = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const setLocalData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Initialize local storage with mock data if it doesn't exist
const initializeLocalStorage = () => {
  if (!getLocalData("users")) {
    setLocalData("users", mockUsers);
  }
  
  if (!getLocalData("recipes")) {
    setLocalData("recipes", mockRecipes);
  }
  
  if (!getLocalData("favorites")) {
    setLocalData("favorites", {});
  }
};

// Initialize on import
initializeLocalStorage();

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<User> => {
    await delay(500);
    const users = getLocalData("users") as User[];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error("Invalid email or password");
    }
    
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  },
  
  register: async (username: string, email: string, password: string): Promise<User> => {
    await delay(500);
    const users = getLocalData("users") as User[];
    
    if (users.some(u => u.email === email)) {
      throw new Error("Email already in use");
    }
    
    const newUser = {
      id: `user${Date.now()}`,
      username,
      email,
      password
    };
    
    setLocalData("users", [...users, newUser]);
    
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword as User;
  },
  
  getCurrentUser: (): User | null => {
    const currentUser = getLocalData("currentUser");
    return currentUser;
  },
  
  setCurrentUser: (user: User | null): void => {
    if (user) {
      setLocalData("currentUser", user);
    } else {
      localStorage.removeItem("currentUser");
    }
  }
};

// Recipes API
export const recipeAPI = {
  getAllRecipes: async (): Promise<Recipe[]> => {
    await delay(300);
    return getLocalData("recipes") || [];
  },
  
  getRecipeById: async (id: string): Promise<Recipe> => {
    await delay(200);
    const recipes = getLocalData("recipes") as Recipe[];
    const recipe = recipes.find(r => r.id === id);
    
    if (!recipe) {
      throw new Error("Recipe not found");
    }
    
    return recipe;
  },
  
  getUserRecipes: async (userId: string): Promise<Recipe[]> => {
    await delay(300);
    const recipes = getLocalData("recipes") as Recipe[];
    return recipes.filter(r => r.userId === userId);
  },
  
  createRecipe: async (recipe: Omit<Recipe, "id" | "createdAt">): Promise<Recipe> => {
    await delay(500);
    const recipes = getLocalData("recipes") as Recipe[];
    
    const newRecipe = {
      ...recipe,
      id: `recipe${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    setLocalData("recipes", [...recipes, newRecipe]);
    return newRecipe;
  },
  
  updateRecipe: async (id: string, recipeData: Partial<Recipe>): Promise<Recipe> => {
    await delay(400);
    const recipes = getLocalData("recipes") as Recipe[];
    const recipeIndex = recipes.findIndex(r => r.id === id);
    
    if (recipeIndex === -1) {
      throw new Error("Recipe not found");
    }
    
    const updatedRecipe = {
      ...recipes[recipeIndex],
      ...recipeData
    };
    
    recipes[recipeIndex] = updatedRecipe;
    setLocalData("recipes", recipes);
    
    return updatedRecipe;
  },
  
  deleteRecipe: async (id: string): Promise<void> => {
    await delay(300);
    const recipes = getLocalData("recipes") as Recipe[];
    const updatedRecipes = recipes.filter(r => r.id !== id);
    setLocalData("recipes", updatedRecipes);
  },
  
  // Favorites functionality
  getFavorites: async (userId: string): Promise<string[]> => {
    await delay(200);
    const favorites = getLocalData("favorites") || {};
    return favorites[userId] || [];
  },
  
  addToFavorites: async (userId: string, recipeId: string): Promise<string[]> => {
    await delay(200);
    const favorites = getLocalData("favorites") || {};
    const userFavorites = favorites[userId] || [];
    
    if (!userFavorites.includes(recipeId)) {
      userFavorites.push(recipeId);
      favorites[userId] = userFavorites;
      setLocalData("favorites", favorites);
    }
    
    return userFavorites;
  },
  
  removeFromFavorites: async (userId: string, recipeId: string): Promise<string[]> => {
    await delay(200);
    const favorites = getLocalData("favorites") || {};
    const userFavorites = favorites[userId] || [];
    
    const updatedFavorites = userFavorites.filter(id => id !== recipeId);
    favorites[userId] = updatedFavorites;
    setLocalData("favorites", favorites);
    
    return updatedFavorites;
  },
  
  searchRecipes: async (query: string): Promise<Recipe[]> => {
    await delay(300);
    const recipes = getLocalData("recipes") as Recipe[];
    const lowerQuery = query.toLowerCase();
    
    return recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(lowerQuery) || 
      recipe.description.toLowerCase().includes(lowerQuery) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(lowerQuery))
    );
  }
};
