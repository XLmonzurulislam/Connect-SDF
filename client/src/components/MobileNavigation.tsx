import { Link, useLocation } from "wouter";
import { Home, Users, Tv, ShoppingBag, Bell, ShieldIcon } from "lucide-react";

const MobileNavigation = () => {
  const [location] = useLocation();
  
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-40 lg:hidden">
      <div className="flex justify-between">
        <Link href="/" className={`flex flex-col items-center p-2 flex-1 ${location === '/' ? 'text-primary border-t-2 border-primary' : 'text-gray-500'}`}>
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/friends" className={`flex flex-col items-center p-2 flex-1 ${location === '/friends' ? 'text-primary border-t-2 border-primary' : 'text-gray-500'}`}>
          <Users className="h-6 w-6" />
          <span className="text-xs mt-1">Friends</span>
        </Link>
        <Link href="/watch" className={`flex flex-col items-center p-2 flex-1 ${location === '/watch' ? 'text-primary border-t-2 border-primary' : 'text-gray-500'}`}>
          <Tv className="h-6 w-6" />
          <span className="text-xs mt-1">Watch</span>
        </Link>
        <Link href="/marketplace" className={`flex flex-col items-center p-2 flex-1 ${location === '/marketplace' ? 'text-primary border-t-2 border-primary' : 'text-gray-500'}`}>
          <ShoppingBag className="h-6 w-6" />
          <span className="text-xs mt-1">Market</span>
        </Link>
        <Link href="/admin" className={`flex flex-col items-center p-2 flex-1 ${location === '/admin' ? 'text-primary border-t-2 border-primary' : 'text-gray-500'}`}>
          <ShieldIcon className="h-6 w-6" />
          <span className="text-xs mt-1">Admin</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNavigation;
