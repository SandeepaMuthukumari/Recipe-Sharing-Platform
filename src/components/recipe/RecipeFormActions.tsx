
import React from "react";
import { Button } from "@/components/ui/button";

interface RecipeFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

export function RecipeFormActions({ isSubmitting, onCancel }: RecipeFormActionsProps) {
  return (
    <div className="pt-4 border-t flex flex-wrap gap-3">
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving Changes..." : "Save Changes"}
      </Button>
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
}
