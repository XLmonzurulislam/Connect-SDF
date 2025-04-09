import { useQuery } from "@tanstack/react-query";
import type { Post } from "@/types";

export function usePosts() {
  return useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });
}

export function usePost(postId: number) {
  return useQuery<Post>({
    queryKey: [`/api/posts/${postId}`],
    enabled: !!postId,
  });
}
