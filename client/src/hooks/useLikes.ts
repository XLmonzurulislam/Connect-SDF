import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { LikeData } from "@/types";

export function useLikes(postId: number) {
  const queryClient = useQueryClient();
  
  const query = useQuery<{ count: number; types: Record<string, number> }>({
    queryKey: [`/api/posts/${postId}/likes`],
    enabled: !!postId,
  });

  const mutation = useMutation({
    mutationFn: (like: LikeData) => 
      apiRequest("POST", `/api/posts/${postId}/likes`, like)
        .then(res => res.json()),
    onSuccess: () => {
      // Invalidate both the post and its likes
      queryClient.invalidateQueries({ queryKey: [`/api/posts/${postId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/posts/${postId}/likes`] });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
    },
  });

  return {
    ...query,
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
}
