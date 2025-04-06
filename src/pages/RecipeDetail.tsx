
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useRecipeStore } from "@/store/recipeStore";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Users, ChefHat, Star, Heart, Edit, Trash2, ArrowLeft } from "lucide-react";
import { CookingTimer } from "@/components/recipe/CookingTimer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentRecipe, loading, fetchRecipeById, clearCurrentRecipe, deleteRecipe, favorites, addToFavorites, removeFromFavorites } = useRecipeStore();
  const { user, isAuthenticated } = useAuthStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  
  useEffect(() => {
    if (id) {
      fetchRecipeById(id);
    }
    
    return () => {
      clearCurrentRecipe();
    };
  }, [id, fetchRecipeById, clearCurrentRecipe]);
  
  const isOwner = currentRecipe && user && currentRecipe.userId === user.id;
  const isFavorite = currentRecipe && user && favorites.includes(currentRecipe.id);
  
  const handleFavoriteToggle = async () => {
    if (!isAuthenticated || !currentRecipe) {
      toast.error("Please sign in to save favorites");
      return;
    }
    
    try {
      if (isFavorite) {
        await removeFromFavorites(user!.id, currentRecipe.id);
      } else {
        await addToFavorites(user!.id, currentRecipe.id);
      }
    } catch (error) {
      console.error("Failed to update favorites:", error);
    }
  };
  
  const handleDelete = async () => {
    if (!currentRecipe) return;
    
    setIsDeleting(true);
    try {
      await deleteRecipe(currentRecipe.id);
      navigate("/my-recipes");
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    } finally {
      setIsDeleting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="space-y-6">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/3" />
              {Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/3" />
              {Array(8).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!currentRecipe) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Recipe not found</h2>
        <p className="mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Back button */}
      <Link to="/" className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to recipes</span>
      </Link>
      
      {/* Recipe header */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <h1 className="text-4xl font-bold">{currentRecipe.title}</h1>
          
          <div className="flex items-center gap-3">
            {isOwner && (
              <>
                <Link to={`/edit/${currentRecipe.id}`}>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </Link>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="flex items-center gap-2">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your recipe.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
            
            <Button
              variant={isFavorite ? "default" : "outline"}
              className={`flex items-center gap-2 ${isFavorite ? 'bg-recipe-primary hover:bg-recipe-accent' : ''}`}
              onClick={handleFavoriteToggle}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-white' : ''}`} />
              {isFavorite ? "Saved" : "Save Recipe"}
            </Button>
          </div>
        </div>
        
        <p className="text-lg text-muted-foreground mb-4">
          {currentRecipe.description}
        </p>
        
        <div className="flex flex-wrap gap-3 mb-6">
          {currentRecipe.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Recipe meta info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y">
          <div className="flex flex-col items-center text-center">
            <span className="flex items-center gap-1 text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              Cooking Time
            </span>
            <span className="font-medium">{currentRecipe.cookingTime} min</span>
            <Button 
              variant="link" 
              size="sm" 
              className="mt-1 text-recipe-primary"
              onClick={() => setShowTimer(!showTimer)}
            >
              {showTimer ? "Hide Timer" : "Start Timer"}
            </Button>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <span className="flex items-center gap-1 text-muted-foreground mb-1">
              <Users className="h-4 w-4" />
              Servings
            </span>
            <span className="font-medium">{currentRecipe.servings}</span>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <span className="flex items-center gap-1 text-muted-foreground mb-1">
              <ChefHat className="h-4 w-4" />
              Difficulty
            </span>
            <span className="font-medium">{currentRecipe.difficulty}</span>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <span className="flex items-center gap-1 text-muted-foreground mb-1">
              <Star className="h-4 w-4" />
              Rating
            </span>
            <span className="font-medium">{currentRecipe.rating.toFixed(1)}</span>
          </div>
        </div>
        
        {/* Cooking Timer */}
        {showTimer && (
          <div className="my-6">
            <CookingTimer cookingTime={currentRecipe.cookingTime} />
          </div>
        )}
      </div>
      
      {/* Recipe image */}
      <div className="mb-8">
        <img 
          src={currentRecipe.image} 
          alt={currentRecipe.title} 
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </div>
      
      {/* Recipe content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ingredients */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {currentRecipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-recipe-primary mt-2"></span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Instructions */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <ol className="space-y-4">
            {currentRecipe.instructions.map((step, index) => (
              <li key={index} className="ml-8 list-decimal">
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}