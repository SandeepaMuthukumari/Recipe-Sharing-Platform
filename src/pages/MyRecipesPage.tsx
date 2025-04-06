
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useRecipeStore } from "@/store/recipeStore";
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function MyRecipesPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { userRecipes, loading, fetchUserRecipes } = useRecipeStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please sign in to view your recipes");
      navigate("/login");
      return;
    }
    
    fetchUserRecipes(user!.id);
  }, [isAuthenticated, user, fetchUserRecipes, navigate]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">My Recipes</h1>
        
        <Link to="/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Recipe
          </Button>
        </Link>
      </div>
      
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
      ) : userRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {userRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">You haven't created any recipes yet</h3>
          <p className="text-muted-foreground mb-6">
            Share your culinary creations with the FlavorExchange community!
          </p>
          <Link to="/create">
            <Button>Create Your First Recipe</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
