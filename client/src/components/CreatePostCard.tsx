import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Video, Image, Smile } from "lucide-react";

interface CreatePostCardProps {
  onOpenCreatePost: () => void;
}

const CreatePostCard = ({ onOpenCreatePost }: CreatePostCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" 
              alt="Alex Johnson" 
            />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <Button 
            variant="ghost" 
            className="bg-gray-100 rounded-full py-2 px-4 text-muted-foreground text-left flex-grow hover:bg-gray-200 justify-start"
            onClick={onOpenCreatePost}
          >
            What's on your mind, Alex?
          </Button>
        </div>
        
        <div className="border-t border-gray-200 mt-4 pt-2">
          <div className="flex justify-between">
            <Button variant="ghost" className="flex items-center rounded-lg text-muted-foreground flex-1 justify-center">
              <Video className="h-5 w-5 text-red-500 mr-2" />
              <span className="hidden sm:inline">Live Video</span>
            </Button>
            <Button variant="ghost" className="flex items-center rounded-lg text-muted-foreground flex-1 justify-center">
              <Image className="h-5 w-5 text-green-500 mr-2" />
              <span className="hidden sm:inline">Photos</span>
            </Button>
            <Button variant="ghost" className="flex items-center rounded-lg text-muted-foreground flex-1 justify-center">
              <Smile className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="hidden sm:inline">Feeling</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostCard;
