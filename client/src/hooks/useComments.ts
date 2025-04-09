import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Comment, CommentWithUser, CreateCommentFormData } from "@/types";

export function useComments(postId: number) {
  const queryClient = useQueryClient();
  
  const query = useQuery<CommentWithUser[]>({
    queryKey: [`/api/posts/${postId}/comments`],
    enabled: !!postId,
  });

  const mutation = useMutation({
    mutationFn: (comment: CreateCommentFormData) => 
      apiRequest("POST", `/api/posts/${postId}/comments`, comment)
        .then(res => res.json()),
    onSuccess: () => {
      // Invalidate both the post and its comments
      queryClient.invalidateQueries({ queryKey: [`/api/posts/${postId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/posts/${postId}/comments`] });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
    },
  });

  return {
    ...query,
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
}
