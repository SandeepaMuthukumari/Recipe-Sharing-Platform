
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useRecipeStore } from "@/store/recipeStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Import all the components we've created
import { FormSkeleton } from "@/components/recipe/FormSkeleton";
import { RecipeBasicDetails } from "@/components/recipe/RecipeBasicDetails";
import { RecipeTags } from "@/components/recipe/RecipeTags";
import { RecipeIngredients } from "@/components/recipe/RecipeIngredients";
import { RecipeInstructions } from "@/components/recipe/RecipeInstructions";
import { RecipeFormActions } from "@/components/recipe/RecipeFormActions";
import { useRecipeForm } from "@/hooks/useRecipeForm";

export default function EditRecipePage() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuthStore();
  const { currentRecipe, loading, fetchRecipeById, updateRecipe } = useRecipeStore();
  const navigate = useNavigate();
  
  const {
    formData,
    isSubmitting,
    setFormData,
    setIsSubmitting,
    handleInputChange,
    handleNumberInputChange,
    handleSelectChange,
    handleIngredientChange,
    addIngredient,
    removeIngredient,
    handleInstructionChange,
    addInstruction,
    removeInstruction,
    handleAddTag,
    removeTag,
    validateForm
  } = useRecipeForm();
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please sign in to edit recipes");
      navigate("/login");
      return;
    }
    
    if (id) {
      fetchRecipeById(id);
    }
  }, [id, isAuthenticated, fetchRecipeById, navigate]);
  
  useEffect(() => {
    if (currentRecipe) {
      // Check if user is the owner of the recipe
      if (user?.id !== currentRecipe.userId) {
        toast.error("You don't have permission to edit this recipe");
        navigate(`/recipe/${id}`);
        return;
      }
      
      // Initialize form with recipe data
      const { id: recipeId, createdAt, userId, ...recipeData } = currentRecipe;
      setFormData(recipeData);
    }
  }, [currentRecipe, user, id, navigate, setFormData]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm() || !id) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      await updateRecipe(id, formData);
      navigate(`/recipe/${id}`);
    } catch (error) {
      toast.error("Failed to update recipe");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return <FormSkeleton />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Edit Recipe</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <RecipeBasicDetails 
          formData={formData} 
          handleInputChange={handleInputChange}
          handleNumberInputChange={handleNumberInputChange}
          handleSelectChange={handleSelectChange}
        />
        
        <RecipeTags 
          tags={formData.tags} 
          onAddTag={handleAddTag}
          onRemoveTag={removeTag}
        />
        
        <RecipeIngredients 
          ingredients={formData.ingredients}
          onAddIngredient={addIngredient}
          onChangeIngredient={handleIngredientChange}
          onRemoveIngredient={removeIngredient}
        />
        
        <RecipeInstructions 
          instructions={formData.instructions}
          onAddInstruction={addInstruction}
          onChangeInstruction={handleInstructionChange}
          onRemoveInstruction={removeInstruction}
        />
        
        <RecipeFormActions 
          isSubmitting={isSubmitting}
          onCancel={() => navigate(`/recipe/${id}`)}
        />
      </form>
    </div>
  );
}
