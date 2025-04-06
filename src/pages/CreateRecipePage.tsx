
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useRecipeStore } from "@/store/recipeStore";
import { toast } from "sonner";

// Import all the components we've created
import { RecipeBasicDetails } from "@/components/recipe/RecipeBasicDetails";
import { RecipeTags } from "@/components/recipe/RecipeTags";
import { RecipeIngredients } from "@/components/recipe/RecipeIngredients";
import { RecipeInstructions } from "@/components/recipe/RecipeInstructions";
import { RecipeFormActions } from "@/components/recipe/RecipeFormActions";
import { useRecipeForm } from "@/hooks/useRecipeForm";

export default function CreateRecipePage() {
  const { user, isAuthenticated } = useAuthStore();
  const { createRecipe, loading } = useRecipeStore();
  const navigate = useNavigate();
  
  const {
    formData,
    isSubmitting,
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
  } = useRecipeForm({
    initialData: {
      title: "",
      description: "",
      ingredients: [""],
      instructions: [""],
      cookingTime: 30,
      servings: 2,
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      rating: 0,
      tags: []
    }
  });
  
  // Redirect if not logged in
  if (!isAuthenticated) {
    toast.error("Please sign in to create recipes");
    navigate("/login");
    return null;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      await createRecipe({
        ...formData,
        userId: user!.id
      });
      navigate("/my-recipes");
    } catch (error) {
      toast.error("Failed to create recipe");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Create New Recipe</h1>
      
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
          onCancel={() => navigate("/")}
        />
      </form>
    </div>
  );
}
