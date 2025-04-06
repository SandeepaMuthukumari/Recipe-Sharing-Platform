import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Search,
  Menu,
  X,
  ChefHat,
  User,
  Heart,
  LogOut,
  PlusSquare,
  Home,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRecipeStore } from "@/store/recipeStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuthStore();
  const { searchRecipes } = useRecipeStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchRecipes(searchQuery);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-black shadow-sm sticky top-0 z-50">
      <nav className="relative container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <ChefHat className="h-6 w-6 text-recipe-primary" />
          <span className="text-xl font-bold text-recipe-primary">
            FlavorExchange
          </span>
        </Link>

        {/* Centered Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-1/3"
        >
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-recipe-primary focus:border-transparent"
          />
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        </form>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="text-gray-600 dark:text-gray-200 hover:text-recipe-primary">
            Home
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/create" className="text-gray-600 dark:text-gray-200 hover:text-recipe-primary">
                Create Recipe
              </Link>
              <Link to="/favorites" className="text-gray-600 dark:text-gray-200 hover:text-recipe-primary">
                Favorites
              </Link>
            </>
          )}

          <ThemeToggle />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">Welcome, {user?.username}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-recipes">My Recipes</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black pb-4 px-4">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-recipe-primary focus:border-transparent"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Button type="submit" className="absolute right-1 top-1 h-8">
                Search
              </Button>
            </div>
          </form>

          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/create"
                  className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <PlusSquare className="h-5 w-5" />
                  <span>Create Recipe</span>
                </Link>
                <Link
                  to="/favorites"
                  className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="h-5 w-5" />
                  <span>Favorites</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/my-recipes"
                  className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ChefHat className="h-5 w-5" />
                  <span>My Recipes</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-2 py-2" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" className="px-2 py-2" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </>
            )}

            {/* Theme Toggle on mobile */}
            <div className="mt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
