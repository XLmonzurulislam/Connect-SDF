import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusIcon } from "lucide-react";

const StoriesSection = () => {
  const stories = [
    {
      id: 1,
      user: {
        id: 2,
        name: "Sara Wilson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80"
      },
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=356&q=80",
      active: true
    },
    {
      id: 2,
      user: {
        id: 3,
        name: "James Lee",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80"
      },
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=356&q=80",
      active: true
    },
    {
      id: 3,
      user: {
        id: 4,
        name: "Elena Ray",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80"
      },
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=356&q=80",
      active: false
    },
    {
      id: 4,
      user: {
        id: 5,
        name: "Daniel Kim",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80"
      },
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=356&q=80",
      active: false
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-foreground">Stories</h2>
        <a href="#" className="text-primary text-sm">See all</a>
      </div>
      
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide py-2">
        {/* Create Story */}
        <div className="flex-shrink-0 w-28 relative cursor-pointer group">
          <div className="relative pb-[177.77%] bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=356&q=80" 
              alt="Your story" 
              className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:brightness-90 transition"
            />
            <div className="absolute inset-x-0 bottom-0 p-2 text-white text-xs font-medium">Your Story</div>
            <div className="absolute top-2 left-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white border-4 border-white">
              <PlusIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
        
        {/* User Stories */}
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0 w-28 relative cursor-pointer group">
            <div className="relative pb-[177.77%] bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={story.image} 
                alt={`${story.user.name}'s story`} 
                className="absolute inset-0 w-full h-full object-cover brightness-90 group-hover:brightness-100 transition"
              />
              <div className={`absolute inset-0 border-4 rounded-lg ${story.active ? 'border-primary' : 'border-gray-300'}`}></div>
              <div className="absolute top-2 left-2">
                <Avatar className="w-8 h-8 border-4 border-primary">
                  <AvatarImage src={story.user.avatar} alt={story.user.name} />
                  <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-2 text-white text-xs font-medium">{story.user.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesSection;
