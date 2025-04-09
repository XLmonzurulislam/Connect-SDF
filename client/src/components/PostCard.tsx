import { useState } from "react";
import { useComments } from "@/hooks/useComments";
import { useLikes } from "@/hooks/useLikes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  MoreHorizontal, 
  Globe, 
  Heart, 
  Smile, 
  Camera, 
  Paperclip
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Comment from "@/components/Comment";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const { toast } = useToast();
  const [commentInput, setCommentInput] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  
  const { mutate: addComment } = useComments(post.id);
  const { mutate: toggleLike, isPending: isLikePending } = useLikes(post.id);

  const handleLike = () => {
    toggleLike(
      { userId: 1, type: "like" },
      {
        onSuccess: (data) => {
          if (data.liked) {
            toast({
              description: "Post liked successfully!",
              duration: 2000,
            });
          }
        },
        onError: () => {
          toast({
            variant: "destructive",
            description: "Failed to like post. Please try again.",
          });
        },
      }
    );
  };

  const handleAddComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && commentInput.trim() !== "") {
      addComment(
        { userId: 1, content: commentInput },
        {
          onSuccess: () => {
            setCommentInput("");
            toast({
              description: "Comment added successfully!",
              duration: 2000,
            });
          },
          onError: () => {
            toast({
              variant: "destructive",
              description: "Failed to add comment. Please try again.",
            });
          },
        }
      );
    }
  };

  const toggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={post.user?.avatar} alt={post.user?.name} />
              <AvatarFallback>{post.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-foreground">{post.user?.name}</h3>
              <p className="text-xs text-muted-foreground flex items-center">
                {post.timeAgo} · <Globe className="h-3 w-3 ml-1" />
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Post Content */}
        <div className="mb-3">
          <p className="text-foreground mb-3">{post.content}</p>
          {post.image && (
            <div className="rounded-lg overflow-hidden">
              <img src={post.image} alt="Post image" className="w-full h-auto object-cover" />
            </div>
          )}
        </div>
        
        {/* Post Stats */}
        {(post.likes.count > 0 || post.comments.count > 0) && (
          <div className="flex items-center justify-between text-muted-foreground text-sm py-2 border-b border-gray-200">
            {post.likes.count > 0 && (
              <div className="flex items-center">
                <span className="flex items-center">
                  {post.likes.types?.like && (
                    <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center mr-1">
                      <ThumbsUp className="h-3 w-3" />
                    </span>
                  )}
                  {post.likes.types?.love && (
                    <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center -ml-1 mr-1">
                      <Heart className="h-3 w-3" />
                    </span>
                  )}
                  {post.likes.count}
                </span>
              </div>
            )}
            {(post.comments.count > 0 || post.likes.count > 0) && (
              <div className="flex space-x-3">
                {post.comments.count > 0 && <span>{post.comments.count} comments</span>}
                {post.likes.count > 0 && <span>0 shares</span>}
              </div>
            )}
          </div>
        )}
        
        {/* Post Actions */}
        <div className="flex justify-between py-2">
          <Button 
            variant="ghost" 
            className="flex items-center rounded-lg text-muted-foreground flex-1 justify-center"
            onClick={handleLike}
            disabled={isLikePending}
          >
            <ThumbsUp className={`h-5 w-5 mr-2 ${post.likes.types?.like ? "fill-primary text-primary" : ""}`} />
            <span>Like</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex items-center rounded-lg text-muted-foreground flex-1 justify-center"
            onClick={toggleComments}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            <span>Comment</span>
          </Button>
          <Button variant="ghost" className="flex items-center rounded-lg text-muted-foreground flex-1 justify-center">
            <Share2 className="h-5 w-5 mr-2" />
            <span>Share</span>
          </Button>
        </div>
        
        {/* Comments Section */}
        {(showAllComments || post.comments.preview.length > 0) && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            {/* Comment Input */}
            <div className="flex items-center mb-3">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" 
                  alt="Alex Johnson" 
                />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Write a comment..."
                  className="bg-gray-100 rounded-full py-2 px-4 w-full"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  onKeyDown={handleAddComment}
                />
                <div className="absolute right-3 top-2 flex space-x-2 text-muted-foreground">
                  <Smile className="h-5 w-5 cursor-pointer" />
                  <Camera className="h-5 w-5 cursor-pointer" />
                  <Paperclip className="h-5 w-5 cursor-pointer" />
                </div>
              </div>
            </div>
            
            {/* Comment Items */}
            {post.comments.preview.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
            
            {!showAllComments && post.comments.count > post.comments.preview.length && (
              <div className="mt-3 text-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground text-sm font-medium"
                  onClick={toggleComments}
                >
                  View all {post.comments.count} comments
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
