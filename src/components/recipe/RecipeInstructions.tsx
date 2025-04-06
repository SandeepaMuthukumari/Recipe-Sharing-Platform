
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface RecipeInstructionsProps {
  instructions: string[];
  onAddInstruction: () => void;
  onChangeInstruction: (index: number, value: string) => void;
  onRemoveInstruction: (index: number) => void;
}

export function RecipeInstructions({
  instructions,
  onAddInstruction,
  onChangeInstruction,
  onRemoveInstruction,
}: RecipeInstructionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Instructions</Label>
        <Button 
          type="button" 
          onClick={onAddInstruction} 
          size="sm" 
          variant="outline"
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Add Step
        </Button>
      </div>
      
      {instructions.map((instruction, index) => (
        <div key={index} className="flex items-start gap-2">
          <div className="flex-none pt-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-recipe-primary text-white text-sm">
              {index + 1}
            </span>
          </div>
          <Textarea
            value={instruction}
            onChange={(e) => onChangeInstruction(index, e.target.value)}
            placeholder={`Step ${index + 1}`}
            required
          />
          {instructions.length > 1 && (
            <Button 
              type="button" 
              onClick={() => onRemoveInstruction(index)}
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
