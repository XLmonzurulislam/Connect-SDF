export interface User {
  id: number;
  username: string;
  name: string;
  avatar: string;
  coverImage: string;
}

export interface Post {
  id: number;
  userId: number;
  content: string;
  image?: string;
  createdAt: Date;
  timeAgo: string;
  user?: User;
  likes: {
    count: number;
    types: Record<string, number>;
  };
  comments: {
    count: number;
    preview: CommentWithUser[];
  };
}

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  createdAt: Date;
  timeAgo: string;
}

export interface CommentWithUser extends Comment {
  user?: User;
}

export interface Like {
  id: number;
  postId: number;
  userId: number;
  type: string;
}

export interface Story {
  id: number;
  userId: number;
  image: string;
  createdAt: Date;
  expiresAt: Date;
  timeAgo: string;
  user?: User;
}

export interface UserStories {
  user?: User;
  stories: Story[];
}

export interface CreatePostFormData {
  userId: number;
  content: string;
  image?: string;
}

export interface CreateCommentFormData {
  userId: number;
  content: string;
}

export interface LikeData {
  userId: number;
  type: string;
}
