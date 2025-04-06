
import { Link } from "react-router-dom";
import { ChefHat, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <ChefHat className="h-8 w-8 text-recipe-primary" />
            <span className="text-2xl font-bold ml-2 text-recipe-primary">FlavorExchange</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-500 hover:text-recipe-primary">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-500 hover:text-recipe-primary">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-500 hover:text-recipe-primary">
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 border-t border-b">
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <p className="text-muted-foreground">
              FlavorExchange is a community-driven platform where food enthusiasts can discover, 
              share, and save delicious recipes from around the world.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-recipe-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-muted-foreground hover:text-recipe-primary">
                  Create Recipe
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-muted-foreground hover:text-recipe-primary">
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-muted-foreground hover:text-recipe-primary">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <address className="not-italic text-muted-foreground">
              <p>Email: info@flavorexchange.com</p>
              <p>Phone: (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FlavorExchange. All rights reserved.</p>
          <p className="mt-1">
            <Link to="/terms" className="hover:text-recipe-primary">Terms of Service</Link>
            {" • "}
            <Link to="/privacy" className="hover:text-recipe-primary">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
