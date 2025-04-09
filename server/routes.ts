import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertPostSchema, 
  insertCommentSchema, 
  insertLikeSchema, 
  insertStorySchema,
  type Post
} from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup the HTTP server
  const httpServer = createServer(app);

  // === Users API ===
  // Get all users
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.listUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  // Get user by ID
  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // === Posts API ===
  // Get all posts with users and like counts
  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await storage.listPosts();
      
      // Get additional details for each post
      const postsWithDetails = await Promise.all(
        posts.map(async (post) => {
          const user = await storage.getUser(post.userId);
          const likes = await storage.getLikesByPost(post.id);
          const comments = await storage.listCommentsByPost(post.id);
          
          // Get preview of 2 comments with user details
          const commentsWithUsers = await Promise.all(
            comments.slice(0, 2).map(async (comment) => {
              const commentUser = await storage.getUser(comment.userId);
              return {
                ...comment,
                user: commentUser,
                timeAgo: formatDistanceToNow(comment.createdAt, { addSuffix: true })
              };
            })
          );
          
          return {
            ...post,
            user,
            likes: {
              count: likes.length,
              types: likes.reduce((acc: Record<string, number>, like) => {
                acc[like.type] = (acc[like.type] || 0) + 1;
                return acc;
              }, {})
            },
            comments: {
              count: comments.length,
              preview: commentsWithUsers
            },
            timeAgo: formatDistanceToNow(post.createdAt, { addSuffix: true })
          };
        })
      );
      
      res.json(postsWithDetails);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  // Create a new post
  app.post("/api/posts", async (req, res) => {
    try {
      const postData = insertPostSchema.parse(req.body);
      const post = await storage.createPost(postData);
      
      // Get user data for the response
      const user = await storage.getUser(post.userId);
      
      res.status(201).json({
        ...post,
        user,
        likes: { count: 0, types: {} },
        comments: { count: 0, preview: [] },
        timeAgo: formatDistanceToNow(post.createdAt, { addSuffix: true })
      });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(400).json({ message: "Invalid post data", error });
    }
  });

  // Get post by ID with comments
  app.get("/api/posts/:id", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      const post = await storage.getPost(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const user = await storage.getUser(post.userId);
      const comments = await storage.listCommentsByPost(postId);
      const likes = await storage.getLikesByPost(postId);
      
      // Get user details for each comment
      const commentsWithUsers = await Promise.all(
        comments.map(async (comment) => {
          const commentUser = await storage.getUser(comment.userId);
          return {
            ...comment,
            user: commentUser,
            timeAgo: formatDistanceToNow(comment.createdAt, { addSuffix: true })
          };
        })
      );

      res.json({
        ...post,
        user,
        comments: commentsWithUsers,
        likes: {
          count: likes.length,
          types: likes.reduce((acc: Record<string, number>, like) => {
            acc[like.type] = (acc[like.type] || 0) + 1;
            return acc;
          }, {})
        },
        timeAgo: formatDistanceToNow(post.createdAt, { addSuffix: true })
      });
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });
  
  // Update a post (for admin)
  app.patch("/api/posts/:id", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      
      const post = await storage.getPost(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      // Only allow updating certain fields
      const { content, image } = req.body;
      const updateData: Partial<Post> = {};
      
      if (content !== undefined) {
        updateData.content = content;
      }
      
      if (image !== undefined) {
        updateData.image = image;
      }
      
      const updatedPost = await storage.updatePost(postId, updateData);
      
      if (!updatedPost) {
        return res.status(500).json({ message: "Failed to update post" });
      }
      
      // Get additional data for the response
      const user = await storage.getUser(updatedPost.userId);
      const likes = await storage.getLikesByPost(postId);
      const comments = await storage.listCommentsByPost(postId);
      
      // Get preview of comments with user details
      const commentsWithUsers = await Promise.all(
        comments.slice(0, 2).map(async (comment) => {
          const commentUser = await storage.getUser(comment.userId);
          return {
            ...comment,
            user: commentUser,
            timeAgo: formatDistanceToNow(comment.createdAt, { addSuffix: true })
          };
        })
      );
      
      res.json({
        ...updatedPost,
        user,
        likes: {
          count: likes.length,
          types: likes.reduce((acc: Record<string, number>, like) => {
            acc[like.type] = (acc[like.type] || 0) + 1;
            return acc;
          }, {})
        },
        comments: {
          count: comments.length,
          preview: commentsWithUsers
        },
        timeAgo: formatDistanceToNow(updatedPost.createdAt, { addSuffix: true })
      });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Failed to update post" });
    }
  });
  
  // Delete a post (for admin)
  app.delete("/api/posts/:id", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      
      const post = await storage.getPost(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      const success = await storage.deletePost(postId);
      
      if (!success) {
        return res.status(500).json({ message: "Failed to delete post" });
      }
      
      res.json({
        success: true,
        message: "Post deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  // === Comments API ===
  // Get all comments (for admin)
  app.get("/api/comments", async (req, res) => {
    try {
      // Get all posts first
      const posts = await storage.listPosts();
      
      // Get all comments from all posts
      let allComments = [];
      for (const post of posts) {
        const comments = await storage.listCommentsByPost(post.id);
        const formattedComments = comments.map(comment => ({
          ...comment,
          timeAgo: formatDistanceToNow(comment.createdAt, { addSuffix: true })
        }));
        allComments.push(...formattedComments);
      }
      
      res.json(allComments);
    } catch (error) {
      console.error("Error fetching all comments:", error);
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });
  
  // Get comments for a post
  app.get("/api/posts/:postId/comments", async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      const post = await storage.getPost(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const comments = await storage.listCommentsByPost(postId);
      
      // Get user details for each comment
      const commentsWithUsers = await Promise.all(
        comments.map(async (comment) => {
          const user = await storage.getUser(comment.userId);
          return {
            ...comment,
            user,
            timeAgo: formatDistanceToNow(comment.createdAt, { addSuffix: true })
          };
        })
      );

      res.json(commentsWithUsers);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

  // Add a comment to a post
  app.post("/api/posts/:postId/comments", async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      const post = await storage.getPost(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const commentData = insertCommentSchema.parse({ ...req.body, postId });
      const comment = await storage.createComment(commentData);
      
      // Get user data for the response
      const user = await storage.getUser(comment.userId);
      
      res.status(201).json({
        ...comment,
        user,
        timeAgo: formatDistanceToNow(comment.createdAt, { addSuffix: true })
      });
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(400).json({ message: "Invalid comment data", error });
    }
  });

  // === Likes API ===
  // Like or unlike a post
  app.post("/api/posts/:postId/likes", async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      const post = await storage.getPost(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const likeData = insertLikeSchema.parse({ ...req.body, postId });
      
      // Check if like already exists
      const existingLike = await storage.getLikeByPostAndUser(postId, likeData.userId);
      
      if (existingLike && existingLike.type === likeData.type) {
        // If the same type, remove the like
        await storage.deleteLike(postId, likeData.userId);
        
        // Get updated likes
        const likes = await storage.getLikesByPost(postId);
        
        return res.json({
          liked: false,
          count: likes.length,
          types: likes.reduce((acc: Record<string, number>, like) => {
            acc[like.type] = (acc[like.type] || 0) + 1;
            return acc;
          }, {})
        });
      } else {
        // Create or update like
        await storage.createLike(likeData);
        
        // Get updated likes
        const likes = await storage.getLikesByPost(postId);
        
        return res.json({
          liked: true,
          likeType: likeData.type,
          count: likes.length,
          types: likes.reduce((acc: Record<string, number>, like) => {
            acc[like.type] = (acc[like.type] || 0) + 1;
            return acc;
          }, {})
        });
      }
    } catch (error) {
      console.error("Error handling like:", error);
      res.status(400).json({ message: "Invalid like data", error });
    }
  });

  // Get likes for a post
  app.get("/api/posts/:postId/likes", async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      const post = await storage.getPost(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const likes = await storage.getLikesByPost(postId);
      
      res.json({
        count: likes.length,
        types: likes.reduce((acc: Record<string, number>, like) => {
          acc[like.type] = (acc[like.type] || 0) + 1;
          return acc;
        }, {})
      });
    } catch (error) {
      console.error("Error fetching likes:", error);
      res.status(500).json({ message: "Failed to fetch likes" });
    }
  });

  // === Stories API ===
  // Get active stories
  app.get("/api/stories", async (req, res) => {
    try {
      const stories = await storage.listActiveStories();
      
      // Group stories by user
      const userStoryMap = new Map<number, any[]>();
      
      for (const story of stories) {
        const user = await storage.getUser(story.userId);
        if (!user) continue;
        
        if (!userStoryMap.has(user.id)) {
          userStoryMap.set(user.id, []);
        }
        
        userStoryMap.get(user.id)?.push({
          ...story,
          timeAgo: formatDistanceToNow(story.createdAt, { addSuffix: true })
        });
      }
      
      // Convert to array of user stories
      const userStories = Array.from(userStoryMap.entries()).map(([userId, stories]) => {
        const user = storage.getUser(userId);
        return {
          user,
          stories,
        };
      });
      
      res.json(userStories);
    } catch (error) {
      console.error("Error fetching stories:", error);
      res.status(500).json({ message: "Failed to fetch stories" });
    }
  });

  // Create a new story
  app.post("/api/stories", async (req, res) => {
    try {
      const storyData = insertStorySchema.parse(req.body);
      const story = await storage.createStory(storyData);
      
      // Get user data for the response
      const user = await storage.getUser(story.userId);
      
      res.status(201).json({
        ...story,
        user,
        timeAgo: formatDistanceToNow(story.createdAt, { addSuffix: true })
      });
    } catch (error) {
      console.error("Error creating story:", error);
      res.status(400).json({ message: "Invalid story data", error });
    }
  });

  return httpServer;
}
