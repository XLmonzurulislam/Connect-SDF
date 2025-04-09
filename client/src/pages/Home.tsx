import { useState } from "react";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import StoriesSection from "@/components/StoriesSection";
import CreatePostCard from "@/components/CreatePostCard";
import PostCard from "@/components/PostCard";
import MobileNavigation from "@/components/MobileNavigation";
import CreatePostModal from "@/components/CreatePostModal";
import { usePosts } from "@/hooks/usePosts";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const { data: posts, isLoading, isError } = usePosts();

  const handleOpenCreatePost = () => {
    setIsCreatePostModalOpen(true);
  };

  const handleCloseCreatePost = () => {
    setIsCreatePostModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Header />
      
      <main className="container mx-auto px-2 md:px-4 py-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <LeftSidebar />
        
        <div className="col-span-1 md:col-span-2 space-y-4">
          <StoriesSection />
          <CreatePostCard onOpenCreatePost={handleOpenCreatePost} />
          
          {isLoading ? (
            // Loading skeletons for posts
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow p-4 space-y-4">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-64 w-full rounded-lg" />
                </div>
              ))}
            </>
          ) : isError ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-destructive font-medium">Failed to load posts. Please try again later.</p>
            </div>
          ) : (
            // Render posts
            posts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
          
          {/* Loading more indicator */}
          {!isError && posts && posts.length > 0 && (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
        
        <RightSidebar />
      </main>
      
      <MobileNavigation />
      
      <CreatePostModal 
        isOpen={isCreatePostModalOpen} 
        onClose={handleCloseCreatePost} 
      />
    </div>
  );
}
