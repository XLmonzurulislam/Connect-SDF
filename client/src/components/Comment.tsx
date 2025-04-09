import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { CommentWithUser } from "@/types";

interface CommentProps {
  comment: CommentWithUser;
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <div className="flex mb-3">
      <Avatar className="h-8 w-8 mr-2 self-start">
        <AvatarImage src={comment.user?.avatar} alt={comment.user?.name} />
        <AvatarFallback>{comment.user?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <div className="bg-gray-100 rounded-2xl py-2 px-3">
          <h4 className="font-medium text-foreground text-sm">{comment.user?.name}</h4>
          <p className="text-foreground text-sm">{comment.content}</p>
        </div>
        <div className="flex items-center mt-1 ml-2 text-xs text-muted-foreground">
          <Button variant="ghost" size="sm" className="h-auto px-2 py-0 font-medium">Like</Button>
          <Button variant="ghost" size="sm" className="h-auto px-2 py-0 font-medium">Reply</Button>
          <span>{comment.timeAgo}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
