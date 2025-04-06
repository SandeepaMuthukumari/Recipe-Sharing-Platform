
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useRecipeStore } from "@/store/recipeStore";
import RecipeCard from "@/components/RecipeCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Recipe } from "@/types";
import { toast } from "sonner";

export default function FavoritesPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { recipes, favorites, loading, fetchRecipes, fetchFavorites } = useRecipeStore();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please sign in to view your favorites");
      navigate("/login");
      return;
    }
    
    const loadData = async () => {
      await fetchRecipes();
      await fetchFavorites(user!.id);
    };
    
    loadData();
  }, [isAuthenticated, user, fetchRecipes, fetchFavorites, navigate]);
  
  useEffect(() => {
    if (favorites.length > 0 && recipes.length > 0) {
      const favRecipes = recipes.filter(recipe => favorites.includes(recipe.id));
      setFavoriteRecipes(favRecipes);
    } else {
      setFavoriteRecipes([]);
    }
  }, [favorites, recipes]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Favorite Recipes</h1>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-48 w-full rounded-md" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          ))}
        </div>
      ) : favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No favorite recipes yet</h3>
          <p className="text-muted-foreground mb-6">
            Save your favorite recipes to find them quickly later!
          </p>
        </div>
      )}
    </div>
  );
}
