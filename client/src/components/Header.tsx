import { useState } from "react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  SearchIcon, 
  BellIcon, 
  MessageSquareIcon, 
  HomeIcon, 
  UsersIcon, 
  TvIcon, 
  ShoppingBagIcon, 
  Users, 
  GlobeIcon,
  ShieldIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo and Search */}
          <div className="flex items-center flex-1">
            <Link href="/" className="font-bold text-primary text-2xl mr-4 flex items-center">
              <GlobeIcon className="mr-1" />
              <span className="hidden sm:inline">SocialConnect</span>
            </Link>
            <div className="relative hidden md:block flex-1 max-w-sm">
              <Input
                type="text"
                placeholder="Search SocialConnect"
                className="bg-gray-100 rounded-full py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          {/* Main Navigation - Desktop */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <Link href="/" className="mx-2 px-6 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <HomeIcon className="h-6 w-6" />
            </Link>
            <Link href="#" className="mx-2 px-6 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <UsersIcon className="h-6 w-6" />
            </Link>
            <Link href="#" className="mx-2 px-6 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <TvIcon className="h-6 w-6" />
            </Link>
            <Link href="#" className="mx-2 px-6 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <ShoppingBagIcon className="h-6 w-6" />
            </Link>
            <Link href="#" className="mx-2 px-6 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <Users className="h-6 w-6" />
            </Link>
            <Link href="/admin" className="mx-2 px-6 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <ShieldIcon className="h-6 w-6" />
            </Link>
          </nav>
          
          {/* User Actions */}
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden rounded-full w-9 h-9 bg-gray-100"
              onClick={() => setIsMobileSearchVisible(!isMobileSearchVisible)}
            >
              <SearchIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="ml-2 rounded-full w-9 h-9 bg-gray-100 relative">
              <BellIcon className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 bg-red-500 h-5 w-5 flex items-center justify-center p-0">3</Badge>
            </Button>
            <Button variant="ghost" size="icon" className="ml-2 rounded-full w-9 h-9 bg-gray-100 relative">
              <MessageSquareIcon className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 bg-red-500 h-5 w-5 flex items-center justify-center p-0">5</Badge>
            </Button>
            <div className="ml-2 relative">
              <Avatar className="cursor-pointer h-9 w-9">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" alt="User avatar" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      {isMobileSearchVisible && (
        <div className="md:hidden px-4 pb-2">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Search SocialConnect" 
              className="bg-gray-100 rounded-full py-2 px-4 pl-10 w-full"
            />
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
