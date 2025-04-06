
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface Recipe {
  [x: string]: any;
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image: string;
  rating: number;
  tags: string[];
  userId: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface RecipeState {
  recipes: Recipe[];
  userRecipes: Recipe[];
  favorites: string[];
  currentRecipe: Recipe | null;
  loading: boolean;
  error: string | null;
}
