import { 
  users, type User, type InsertUser,
  posts, type Post, type InsertPost,
  comments, type Comment, type InsertComment,
  likes, type Like, type InsertLike,
  stories, type Story, type InsertStory
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  listUsers(): Promise<User[]>;
  
  // Post methods
  getPost(id: number): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<Post>): Promise<Post | undefined>;
  deletePost(id: number): Promise<boolean>;
  listPosts(): Promise<Post[]>;
  listPostsByUser(userId: number): Promise<Post[]>;
  
  // Comment methods
  getComment(id: number): Promise<Comment | undefined>;
  createComment(comment: InsertComment): Promise<Comment>;
  listCommentsByPost(postId: number): Promise<Comment[]>;
  
  // Like methods
  createLike(like: InsertLike): Promise<Like>;
  deleteLike(postId: number, userId: number): Promise<void>;
  getLikesByPost(postId: number): Promise<Like[]>;
  getLikeByPostAndUser(postId: number, userId: number): Promise<Like | undefined>;
  
  // Story methods
  createStory(story: InsertStory): Promise<Story>;
  listActiveStories(): Promise<Story[]>;
  listStoriesByUser(userId: number): Promise<Story[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private posts: Map<number, Post>;
  private comments: Map<number, Comment>;
  private likes: Map<number, Like>;
  private stories: Map<number, Story>;
  
  private userId: number;
  private postId: number;
  private commentId: number;
  private likeId: number;
  private storyId: number;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.comments = new Map();
    this.likes = new Map();
    this.stories = new Map();
    
    this.userId = 1;
    this.postId = 1;
    this.commentId = 1;
    this.likeId = 1;
    this.storyId = 1;
    
    // Initialize with some sample users
    this.createUser({
      username: "alexjohnson",
      password: "password123",
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80",
      coverImage: ""
    });
    
    this.createUser({
      username: "sarawilson",
      password: "password123",
      name: "Sara Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80",
      coverImage: ""
    });
    
    this.createUser({
      username: "jameslee",
      password: "password123",
      name: "James Lee",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80",
      coverImage: ""
    });
    
    this.createUser({
      username: "elenaray",
      password: "password123",
      name: "Elena Ray",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80",
      coverImage: ""
    });
    
    this.createUser({
      username: "danielkim",
      password: "password123",
      name: "Daniel Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80",
      coverImage: ""
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async listUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Post methods
  async getPost(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = this.postId++;
    const post: Post = { 
      ...insertPost, 
      id, 
      createdAt: new Date() 
    };
    this.posts.set(id, post);
    return post;
  }

  async listPosts(): Promise<Post[]> {
    return Array.from(this.posts.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updatePost(id: number, postData: Partial<Post>): Promise<Post | undefined> {
    const post = this.posts.get(id);
    if (!post) {
      return undefined;
    }

    const updatedPost = { ...post, ...postData };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async deletePost(id: number): Promise<boolean> {
    // First check if the post exists
    if (!this.posts.has(id)) {
      return false;
    }
    
    // Delete all comments associated with this post
    const commentsToDelete = Array.from(this.comments.values())
      .filter(comment => comment.postId === id);
    
    for (const comment of commentsToDelete) {
      this.comments.delete(comment.id);
    }
    
    // Delete all likes associated with this post
    const likesToDelete = Array.from(this.likes.values())
      .filter(like => like.postId === id);
    
    for (const like of likesToDelete) {
      this.likes.delete(like.id);
    }
    
    // Finally delete the post
    return this.posts.delete(id);
  }

  async listPostsByUser(userId: number): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Comment methods
  async getComment(id: number): Promise<Comment | undefined> {
    return this.comments.get(id);
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = this.commentId++;
    const comment: Comment = { 
      ...insertComment, 
      id, 
      createdAt: new Date() 
    };
    this.comments.set(id, comment);
    return comment;
  }

  async listCommentsByPost(postId: number): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.postId === postId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  // Like methods
  async createLike(insertLike: InsertLike): Promise<Like> {
    // Check if like already exists
    const existingLike = await this.getLikeByPostAndUser(insertLike.postId, insertLike.userId);
    if (existingLike) {
      // If it exists, update the type
      const updatedLike = { ...existingLike, type: insertLike.type };
      this.likes.set(existingLike.id, updatedLike);
      return updatedLike;
    }
    
    // Otherwise create new like
    const id = this.likeId++;
    const like: Like = { ...insertLike, id };
    this.likes.set(id, like);
    return like;
  }

  async deleteLike(postId: number, userId: number): Promise<void> {
    const like = await this.getLikeByPostAndUser(postId, userId);
    if (like) {
      this.likes.delete(like.id);
    }
  }

  async getLikesByPost(postId: number): Promise<Like[]> {
    return Array.from(this.likes.values())
      .filter(like => like.postId === postId);
  }

  async getLikeByPostAndUser(postId: number, userId: number): Promise<Like | undefined> {
    return Array.from(this.likes.values())
      .find(like => like.postId === postId && like.userId === userId);
  }

  // Story methods
  async createStory(insertStory: InsertStory): Promise<Story> {
    const id = this.storyId++;
    const story: Story = { 
      ...insertStory, 
      id, 
      createdAt: new Date() 
    };
    this.stories.set(id, story);
    return story;
  }

  async listActiveStories(): Promise<Story[]> {
    const now = new Date();
    return Array.from(this.stories.values())
      .filter(story => story.expiresAt > now)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async listStoriesByUser(userId: number): Promise<Story[]> {
    const now = new Date();
    return Array.from(this.stories.values())
      .filter(story => story.userId === userId && story.expiresAt > now)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export const storage = new MemStorage();
