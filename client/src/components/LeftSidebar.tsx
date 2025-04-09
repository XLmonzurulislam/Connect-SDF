import { Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  UsersRound, 
  ShoppingBag, 
  Tv, 
  History, 
  Bookmark, 
  Flag, 
  CalendarDays, 
  ChevronDown,
  Gamepad,
  Code,
  Utensils
} from "lucide-react";

const LeftSidebar = () => {
  return (
    <aside className="hidden lg:block lg:col-span-1 sticky top-20 self-start">
      <div className="bg-white rounded-lg shadow p-4">
        {/* User Profile Summary */}
        <Link href="#" className="flex items-center mb-4">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" alt="Alex Johnson" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <span className="font-medium text-foreground">Alex Johnson</span>
        </Link>
        
        {/* Navigation Links */}
        <nav className="space-y-1">
          <Link href="#" className="flex items-center p-2 rounded-lg hover:bg-[#F0F2F5] text-foreground">
            <Users className="h-5 w-5 text-primary mr-2" />
            <span>Friends</span>
          </Link>
          <Link href="#" className="flex items-center p-2 rounded-lg hover:bg-[#F0F2F5] text-foreground">
            <UsersRound className="h-5 w-5 text-primary mr-2" />
            <span>Groups</span>
          </Link>
          <Link href="#" className="flex items-center p-2 rounded-lg hover:bg-[#F0F2F5] text-foreground">
            <ShoppingBag className="h-5 w-5 text-primary mr-2" />
            <span>Marketplace</span>
          </Link>
          <Link href="#" className="flex items-center p-2 rounded-lg hover:bg-[#F0F2F5] text-foreground">
            <Tv className="h-5 w-5 text-primary mr-2" />
            <span>Watch</span>
          </Link>
          <Link href="#" className="flex items-center p-2 rounded-lg hover:bg-[#F0F2F5] text-foreground">
            <History className="h-5 w-5 text-primary mr-2" />
            <span>Memories</span>
          </Link>
          <Link href="#" className="flex items-center p-2 rounded-lg hover:bg-[#F0F2F5] text-foreground">
            <Bookmark className="h-5 w-5 text-primary mr-2" />
            <span>Saved</span>
          </Link>
          <Link href="#" className="flex items-center p-2 rounded-lg hover:bg-[#F0F2F5] text-foreground">
            <Flag className="h-5 w-5 text-primary mr-2" />
            <span>Pages</span>
          </Link>
          <Link href="#" className="flex items-center p-2 rounded-lg hover:bg-[#F0F2F5] text-foreground">
            <CalendarDays className="h-5 w-5 text-primary mr-2" />
            <span>Events</span>
          </Link>
          <Button 
            variant="ghost" 
            className="flex items-center p-2 rounded-lg hover:bg-[#F0F2F5] text-foreground w-full justify-start"
          >
            <ChevronDown className="h-5 w-5 text-gray-500 mr-2" />
            <span>See more</span>
          </Button>
        </nav>

        {/* Shortcuts */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <h3 className="text-muted-foreground text-sm font-medium mb-2">Your shortcuts</h3>
          <div className="space-y-1">
            <Link href="#" className="flex items-center p-2 rounded-lg hover:bg-[#F0F2F5]">
              <div className="bg-gray-200 w-8 h-8 rounded flex items-center justify-center mr-3">
                <Gamepad className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground">Gaming Group</span>
            </Link>
            <Link href="#" className="flex items-center p-2 rounded-lg hover:bg-[#F0F2F5]">
              <div className="bg-gray-200 w-8 h-8 rounded flex items-center justify-center mr-3">
                <Code className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground">Developers Hub</span>
            </Link>
            <Link href="#" className="flex items-center p-2 rounded-lg hover:bg-[#F0F2F5]">
              <div className="bg-gray-200 w-8 h-8 rounded flex items-center justify-center mr-3">
                <Utensils className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground">Foodies Community</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
