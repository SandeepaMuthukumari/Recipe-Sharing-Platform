
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useRecipeStore } from "@/store/recipeStore";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";
import { ChefHat, LogOut } from "lucide-react";

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { userRecipes, favorites, fetchUserRecipes, fetchFavorites } = useRecipeStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please sign in to view your profile");
      navigate("/login");
      return;
    }
    
    fetchUserRecipes(user!.id);
    fetchFavorites(user!.id);
  }, [isAuthenticated, user, fetchUserRecipes, fetchFavorites, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  if (!user) return null;
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-3">
          <div className="h-24 w-24 rounded-full bg-recipe-primary text-white flex items-center justify-center text-3xl">
            {user.username[0].toUpperCase()}
          </div>
        </div>
        <h1 className="text-3xl font-bold">{user.username}</h1>
        <p className="text-muted-foreground">{user.email}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Account Summary</h2>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Username</p>
              <p className="font-medium">{user.username}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
          
          <div className="border-t mt-6 pt-6">
            <p className="text-sm text-muted-foreground mb-2">Profile Actions</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => navigate("/change-password")} disabled>
                Change Password
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => navigate("/edit-profile")} disabled>
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Activity Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center px-4 py-3 bg-muted rounded-md">
              <div className="flex items-center gap-3">
                <ChefHat className="h-5 w-5 text-recipe-primary" />
                <span>Created Recipes</span>
              </div>
              <span className="font-semibold">{userRecipes.length}</span>
            </div>
            
            <div className="flex justify-between items-center px-4 py-3 bg-muted rounded-md">
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>Saved Favorites</span>
              </div>
              <span className="font-semibold">{favorites.length}</span>
            </div>
          </div>
          
          <div className="border-t mt-6 pt-6">
            <p className="text-sm text-muted-foreground mb-2">Quick Links</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => navigate("/my-recipes")}>
                My Recipes
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => navigate("/favorites")}>
                Favorites
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
