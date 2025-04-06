import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Recipe } from "@/types";
import { Link } from "react-router-dom";
import { Clock, Users, Heart } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRecipeStore } from "@/store/recipeStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import ShareButtons from "./ShareButton"; // ✅ Make sure this import path is correct

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const { user, isAuthenticated } = useAuthStore();
  const { favorites, addToFavorites, removeFromFavorites } = useRecipeStore();
  const [isLoading, setIsLoading] = useState(false);

  const isFavorite = user && favorites.includes(recipe.id);

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please sign in to save favorites");
      return;
    }

    setIsLoading(true);
    try {
      if (isFavorite) {
        await removeFromFavorites(user!.id, recipe.id);
      } else {
        await addToFavorites(user!.id, recipe.id);
      }
    } catch (error) {
      console.error("Failed to update favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden recipe-card transition-transform hover:scale-[1.02]">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <Button
          size="icon"
          variant="ghost"
          className={`absolute top-2 right-2 h-8 w-8 rounded-full ${
            isFavorite
              ? "bg-red-100 text-red-500 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
              : "bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
          }`}
          onClick={handleFavoriteToggle}
          disabled={isLoading}
        >
          <Heart
            className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
          />
        </Button>
      </div>

      <Link to={`/recipe/${recipe.id}`}>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-1">{recipe.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {recipe.description}
          </p>

          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {recipe.cookingTime} min
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" /> {recipe.servings} servings
            </span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {recipe.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{recipe.tags.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>

        {/* Footer with right-aligned share buttons and no author name */}
        <CardFooter className="p-4 pt-0 flex justify-end">
          <div className="scale-75">
            <ShareButtons recipeId={recipe.id} recipeTitle={recipe.title} />
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
