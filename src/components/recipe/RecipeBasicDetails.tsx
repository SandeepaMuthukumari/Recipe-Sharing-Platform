
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Recipe } from "@/types";

interface RecipeBasicDetailsProps {
  formData: Partial<Recipe>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleNumberInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

export function RecipeBasicDetails({
  formData,
  handleInputChange,
  handleNumberInputChange,
  handleSelectChange,
}: RecipeBasicDetailsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Recipe Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title || ""}
          onChange={handleInputChange}
          placeholder="Enter the name of your recipe"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleInputChange}
          placeholder="Briefly describe your recipe"
          rows={3}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cookingTime">Cooking Time (minutes)</Label>
          <Input
            id="cookingTime"
            name="cookingTime"
            type="number"
            min="1"
            value={formData.cookingTime || 0}
            onChange={handleNumberInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="servings">Servings</Label>
          <Input
            id="servings"
            name="servings"
            type="number"
            min="1"
            value={formData.servings || 0}
            onChange={handleNumberInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select 
            name="difficulty"
            value={formData.difficulty || "Easy"}
            onValueChange={(value) => handleSelectChange("difficulty", value)}
          >
            <SelectTrigger id="difficulty">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          value={formData.image || ""}
          onChange={handleInputChange}
          placeholder="Enter an image URL for your recipe"
          required
        />
      </div>
    </>
  );
}
