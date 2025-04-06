
import { useEffect, useState } from "react";
import { useRecipeStore } from "@/store/recipeStore";
import RecipeCard from "@/components/RecipeCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HomePage() {
  const { recipes, loading, fetchRecipes, searchRecipes } = useRecipeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  
  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchRecipes(searchQuery);
  };
  
  const filteredRecipes = filter === "all" 
    ? recipes 
    : recipes.filter(recipe => recipe.tags.includes(filter));
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section */}
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Discover & Share Amazing Recipes</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Find recipes you'll love or share your culinary creations with our community
        </p>
        
        <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
          <input
            type="text"
            placeholder="Search recipes, ingredients, or cuisines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-recipe-primary focus:border-transparent"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <Button type="submit" className="absolute right-1 top-1">Search</Button>
        </form>
      </section>
      
      {/* Filters */}
      <section className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h2 className="text-2xl font-semibold">Latest Recipes</h2>
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Recipes</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="quick">Quick Meals</SelectItem>
                <SelectItem value="dessert">Desserts</SelectItem>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="italian">Italian</SelectItem>
                <SelectItem value="thai">Thai</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </section>
      
      {/* Recipe grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, i) => (
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
      ) : filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No recipes found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search or filter criteria
          </p>
          <Button onClick={() => {
            setSearchQuery("");
            setFilter("all");
            fetchRecipes();
          }}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
