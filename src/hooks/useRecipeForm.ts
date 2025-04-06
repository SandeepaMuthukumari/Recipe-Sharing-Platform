
import { useState } from "react";
import { Recipe } from "@/types";
import { toast } from "sonner";

export interface RecipeFormData extends Omit<Recipe, "id" | "createdAt" | "userId"> {}

interface UseRecipeFormOptions {
  initialData?: Partial<RecipeFormData>;
}

export function useRecipeForm(options: UseRecipeFormOptions = {}) {
  const [formData, setFormData] = useState<RecipeFormData>({
    title: options.initialData?.title || "",
    description: options.initialData?.description || "",
    ingredients: options.initialData?.ingredients || [""],
    instructions: options.initialData?.instructions || [""],
    cookingTime: options.initialData?.cookingTime || 30,
    servings: options.initialData?.servings || 2,
    difficulty: options.initialData?.difficulty || "Easy",
    image: options.initialData?.image || "",
    rating: options.initialData?.rating || 0,
    tags: options.initialData?.tags || []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };
  
  const addIngredient = () => {
    setFormData(prev => ({ 
      ...prev, 
      ingredients: [...prev.ingredients, ""] 
    }));
  };
  
  const removeIngredient = (index: number) => {
    const newIngredients = [...formData.ingredients];
    newIngredients.splice(index, 1);
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };
  
  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData(prev => ({ ...prev, instructions: newInstructions }));
  };
  
  const addInstruction = () => {
    setFormData(prev => ({ 
      ...prev, 
      instructions: [...prev.instructions, ""] 
    }));
  };
  
  const removeInstruction = (index: number) => {
    const newInstructions = [...formData.instructions];
    newInstructions.splice(index, 1);
    setFormData(prev => ({ ...prev, instructions: newInstructions }));
  };
  
  const handleAddTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, tag]
    }));
  };
  
  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const validateForm = () => {
    if (!formData.title || !formData.description) {
      toast.error("Title and description are required");
      return false;
    }
    
    if (formData.ingredients.some(ing => !ing.trim())) {
      toast.error("Empty ingredients are not allowed");
      return false;
    }
    
    if (formData.instructions.some(inst => !inst.trim())) {
      toast.error("Empty instructions are not allowed");
      return false;
    }
    
    return true;
  };

  return {
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
  };
}
