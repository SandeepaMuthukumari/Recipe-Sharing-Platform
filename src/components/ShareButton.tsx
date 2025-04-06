import { Button } from "@/components/ui/button";
import { Facebook, Share, Twitter, Linkedin } from "lucide-react";
import { FaInstagram } from "react-icons/fa"; // ✅ Updated Instagram icon
import { toast } from "sonner";

interface ShareButtonsProps {
  recipeId: string;
  recipeTitle: string;
}

const ShareButtons = ({ recipeId, recipeTitle }: ShareButtonsProps) => {
  const handleShare = (platform: string) => {
    toast.success(`Shared "${recipeTitle}" on ${platform}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => handleShare("Facebook")}
        className="rounded-full text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950"
      >
        <Facebook size={18} />
        <span className="sr-only">Share on Facebook</span>
      </Button>

      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => handleShare("Instagram")}
        className="rounded-full text-pink-600 hover:text-pink-800 hover:bg-pink-50 dark:hover:bg-pink-950"
      >
        <FaInstagram size={18} /> {/* ✅ Updated Icon */}
        <span className="sr-only">Share on Instagram</span>
      </Button>

      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => handleShare("Twitter")}
        className="rounded-full text-blue-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
      >
        <Twitter size={18} />
        <span className="sr-only">Share on Twitter</span>
      </Button>

      

      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => handleShare("Other")}
        className="rounded-full"
      >
        <Share size={18} />
        <span className="sr-only">Share to other platforms</span>
      </Button>
    </div>
  );
};

export default ShareButtons;
