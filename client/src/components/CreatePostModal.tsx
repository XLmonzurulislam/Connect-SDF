import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  X, 
  Globe, 
  ChevronDown, 
  Image as ImageIcon, 
  UserPlus, 
  Smile, 
  MapPin, 
  MoreHorizontal 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    if (content.trim() === "") {
      toast({
        variant: "destructive",
        description: "Please enter some content for your post.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/posts", {
        userId: 1, // Current user ID (hardcoded for now)
        content: content
      });
      
      // Reset state and close modal
      setContent("");
      onClose();
      
      // Refetch the posts to update the feed
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      
      toast({
        description: "Your post was published successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to publish your post. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold">Create Post</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4 rounded-full" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" 
                alt="Alex Johnson" 
              />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium text-foreground">Alex Johnson</h4>
              <Button variant="ghost" size="sm" className="bg-gray-100 rounded text-sm px-2 py-1 h-auto flex items-center">
                <Globe className="h-3 w-3 mr-1" />
                <span>Public</span>
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
          
          <Textarea
            placeholder="What's on your mind, Alex?"
            className="w-full min-h-[120px] border-none focus:outline-none focus:ring-0 text-foreground text-lg resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 flex items-center justify-between">
            <span className="text-foreground font-medium">Add to your post</span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="rounded-full text-green-500 h-9 w-9 p-2">
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-blue-500 h-9 w-9 p-2">
                <UserPlus className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-yellow-500 h-9 w-9 p-2">
                <Smile className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-red-500 h-9 w-9 p-2">
                <MapPin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-gray-500 h-9 w-9 p-2">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <Button 
            className="bg-primary text-white rounded-lg w-full py-2 font-medium"
            onClick={handleSubmit}
            disabled={isSubmitting || content.trim() === ""}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
