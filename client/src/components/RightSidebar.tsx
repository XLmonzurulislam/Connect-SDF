import { Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SearchIcon, MoreHorizontal, Users } from "lucide-react";

const RightSidebar = () => {
  return (
    <aside className="hidden lg:block lg:col-span-1 sticky top-20 self-start">
      {/* Sponsored Section */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h3 className="font-semibold text-foreground mb-4">Sponsored</h3>
        <Link href="#" className="flex mb-4 group">
          <div className="w-32 h-32 bg-gray-100 rounded mr-3 overflow-hidden flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80" 
              alt="New Athletic Shoes" 
              className="w-full h-full object-cover group-hover:opacity-90 transition" 
            />
          </div>
          <div>
            <p className="text-foreground font-medium group-hover:underline">New Athletic Shoes</p>
            <p className="text-muted-foreground text-sm">shoprunner.com</p>
          </div>
        </Link>
        
        <Link href="#" className="flex group">
          <div className="w-32 h-32 bg-gray-100 rounded mr-3 overflow-hidden flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80" 
              alt="Tech Learning Platform" 
              className="w-full h-full object-cover group-hover:opacity-90 transition" 
            />
          </div>
          <div>
            <p className="text-foreground font-medium group-hover:underline">Tech Learning Platform</p>
            <p className="text-muted-foreground text-sm">techskills.io</p>
          </div>
        </Link>
      </div>

      {/* Contacts Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Contacts</h3>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <SearchIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Link href="#" className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
            <div className="relative">
              <Avatar className="h-9 w-9 mr-3">
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" 
                  alt="Sara Wilson" 
                />
                <AvatarFallback>SW</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-2 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
            </div>
            <span className="font-medium text-foreground">Sara Wilson</span>
          </Link>
          
          <Link href="#" className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
            <div className="relative">
              <Avatar className="h-9 w-9 mr-3">
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" 
                  alt="James Lee" 
                />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-2 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
            </div>
            <span className="font-medium text-foreground">James Lee</span>
          </Link>
          
          <Link href="#" className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
            <div className="relative">
              <Avatar className="h-9 w-9 mr-3">
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" 
                  alt="Daniel Kim" 
                />
                <AvatarFallback>DK</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-2 bg-gray-400 w-3 h-3 rounded-full border-2 border-white"></span>
            </div>
            <span className="font-medium text-foreground">Daniel Kim</span>
          </Link>
          
          <Link href="#" className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
            <div className="relative">
              <Avatar className="h-9 w-9 mr-3">
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" 
                  alt="Elena Ray" 
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-2 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
            </div>
            <span className="font-medium text-foreground">Elena Ray</span>
          </Link>
        </div>
        
        {/* Group Conversations */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <h3 className="text-muted-foreground text-sm font-medium mb-2">Group conversations</h3>
          <Link href="#" className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
            <div className="rounded-full w-9 h-9 bg-gray-200 flex items-center justify-center mr-3">
              <Users className="h-5 w-5 text-gray-600" />
            </div>
            <span className="font-medium text-foreground">Product Team</span>
          </Link>
          <Link href="#" className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
            <div className="rounded-full w-9 h-9 bg-gray-200 flex items-center justify-center mr-3">
              <Users className="h-5 w-5 text-gray-600" />
            </div>
            <span className="font-medium text-foreground">Weekend Plans</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
