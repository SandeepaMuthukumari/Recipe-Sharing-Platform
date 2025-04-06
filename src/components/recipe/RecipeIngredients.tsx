
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface RecipeIngredientsProps {
  ingredients: string[];
  onAddIngredient: () => void;
  onChangeIngredient: (index: number, value: string) => void;
  onRemoveIngredient: (index: number) => void;
}

export function RecipeIngredients({
  ingredients,
  onAddIngredient,
  onChangeIngredient,
  onRemoveIngredient,
}: RecipeIngredientsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Ingredients</Label>
        <Button 
          type="button" 
          onClick={onAddIngredient} 
          size="sm" 
          variant="outline"
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Add Ingredient
        </Button>
      </div>
      
      {ingredients.map((ingredient, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={ingredient}
            onChange={(e) => onChangeIngredient(index, e.target.value)}
            placeholder={`Ingredient ${index + 1}`}
            required
          />
          {ingredients.length > 1 && (
            <Button 
              type="button" 
              onClick={() => onRemoveIngredient(index)}
              size="icon"
              variant="outline"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
