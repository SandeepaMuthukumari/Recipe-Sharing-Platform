
import { create } from 'zustand';
import { RecipeState, Recipe } from '@/types';
import { recipeAPI } from '@/lib/api';
import { toast } from 'sonner';

export const useRecipeStore = create<RecipeState & {
  fetchRecipes: () => Promise<void>;
  fetchRecipeById: (id: string) => Promise<void>;
  fetchUserRecipes: (userId: string) => Promise<void>;
  createRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt'>) => Promise<void>;
  updateRecipe: (id: string, recipeData: Partial<Recipe>) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
  fetchFavorites: (userId: string) => Promise<void>;
  addToFavorites: (userId: string, recipeId: string) => Promise<void>;
  removeFromFavorites: (userId: string, recipeId: string) => Promise<void>;
  searchRecipes: (query: string) => Promise<void>;
  clearCurrentRecipe: () => void;
}>((set, get) => ({
  recipes: [],
  userRecipes: [],
  favorites: [],
  currentRecipe: null,
  loading: false,
  error: null,
  
  fetchRecipes: async () => {
    set({ loading: true, error: null });
    try {
      const recipes = await recipeAPI.getAllRecipes();
      set({ recipes, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : "Failed to fetch recipes" 
      });
      toast.error("Failed to load recipes");
    }
  },
  
  fetchRecipeById: async (id) => {
    set({ loading: true, error: null });
    try {
      const recipe = await recipeAPI.getRecipeById(id);
      set({ currentRecipe: recipe, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : "Failed to fetch recipe" 
      });
      toast.error("Recipe not found");
    }
  },
  
  fetchUserRecipes: async (userId) => {
    set({ loading: true, error: null });
    try {
      const userRecipes = await recipeAPI.getUserRecipes(userId);
      set({ userRecipes, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : "Failed to fetch user recipes" 
      });
      toast.error("Failed to load your recipes");
    }
  },
  
  createRecipe: async (recipe) => {
    set({ loading: true, error: null });
    try {
      const newRecipe = await recipeAPI.createRecipe(recipe);
      set({ 
        recipes: [newRecipe, ...get().recipes],
        userRecipes: [newRecipe, ...get().userRecipes],
        loading: false 
      });
      toast.success("Recipe created successfully!");
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : "Failed to create recipe" 
      });
      toast.error("Failed to create recipe");
    }
  },
  
  updateRecipe: async (id, recipeData) => {
    set({ loading: true, error: null });
    try {
      const updatedRecipe = await recipeAPI.updateRecipe(id, recipeData);
      
      set({ 
        recipes: get().recipes.map(r => r.id === id ? updatedRecipe : r),
        userRecipes: get().userRecipes.map(r => r.id === id ? updatedRecipe : r),
        currentRecipe: updatedRecipe,
        loading: false 
      });
      toast.success("Recipe updated successfully!");
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : "Failed to update recipe" 
      });
      toast.error("Failed to update recipe");
    }
  },
  
  deleteRecipe: async (id) => {
    set({ loading: true, error: null });
    try {
      await recipeAPI.deleteRecipe(id);
      set({ 
        recipes: get().recipes.filter(r => r.id !== id),
        userRecipes: get().userRecipes.filter(r => r.id !== id),
        loading: false 
      });
      toast.success("Recipe deleted successfully!");
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : "Failed to delete recipe" 
      });
      toast.error("Failed to delete recipe");
    }
  },
  
  fetchFavorites: async (userId) => {
    set({ loading: true, error: null });
    try {
      const favorites = await recipeAPI.getFavorites(userId);
      set({ favorites, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : "Failed to fetch favorites" 
      });
    }
  },
  
  addToFavorites: async (userId, recipeId) => {
    try {
      const favorites = await recipeAPI.addToFavorites(userId, recipeId);
      set({ favorites });
      toast.success("Added to favorites!");
    } catch (error) {
      toast.error("Failed to add to favorites");
    }
  },
  
  removeFromFavorites: async (userId, recipeId) => {
    try {
      const favorites = await recipeAPI.removeFromFavorites(userId, recipeId);
      set({ favorites });
      toast.success("Removed from favorites");
    } catch (error) {
      toast.error("Failed to remove from favorites");
    }
  },
  
  searchRecipes: async (query) => {
    set({ loading: true, error: null });
    try {
      if (!query) {
        const recipes = await recipeAPI.getAllRecipes();
        set({ recipes, loading: false });
      } else {
        const recipes = await recipeAPI.searchRecipes(query);
        set({ recipes, loading: false });
      }
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : "Failed to search recipes" 
      });
    }
  },
  
  clearCurrentRecipe: () => {
    set({ currentRecipe: null });
  }
}));
