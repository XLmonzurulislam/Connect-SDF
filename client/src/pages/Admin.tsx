import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  ChevronDown, 
  FilePenLine, 
  Trash2, 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  BookImage, 
  Search 
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Post, User, Comment } from "@/types";

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("posts");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<Post | User | Comment | null>(null);
  const [editFormData, setEditFormData] = useState({
    content: "",
    name: "",
    username: "",
  });

  // Fetch data
  const { data: posts = [] } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const { data: users = [] } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  const { data: allComments = [] } = useQuery<Comment[]>({
    queryKey: ["/api/comments"],
  });

  // Mutations
  const deletePostMutation = useMutation({
    mutationFn: (postId: number) => 
      apiRequest("DELETE", `/api/posts/${postId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        description: "Post deleted successfully",
      });
      setDeleteDialogOpen(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Failed to delete post",
      });
    }
  });

  const updatePostMutation = useMutation({
    mutationFn: (post: Partial<Post>) => 
      apiRequest("PATCH", `/api/posts/${post.id}`, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        description: "Post updated successfully",
      });
      setEditDialogOpen(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Failed to update post",
      });
    }
  });

  // Filter items based on search term
  const filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredComments = allComments.filter(comment => 
    comment.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle editing
  const handleEdit = (item: Post | User | Comment) => {
    setItemToEdit(item);
    if ('content' in item) {
      setEditFormData({
        ...editFormData,
        content: item.content,
        name: '',
        username: '',
      });
    } else if ('username' in item) {
      setEditFormData({
        ...editFormData,
        content: '',
        name: item.name,
        username: item.username,
      });
    }
    setEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!itemToEdit) return;

    if ('content' in itemToEdit && 'userId' in itemToEdit) {
      // It's a post
      updatePostMutation.mutate({
        id: itemToEdit.id,
        content: editFormData.content,
      });
    }
    // We could add similar handlers for users and comments
  };

  // Handle deletion
  const handleDelete = (item: Post | User | Comment) => {
    setItemToEdit(item);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!itemToEdit) return;

    if ('content' in itemToEdit && 'userId' in itemToEdit) {
      // It's a post
      deletePostMutation.mutate(itemToEdit.id);
    }
    // We could add similar handlers for users and comments
  };

  // Dashboard stats
  const stats = [
    { 
      title: "Total Users", 
      value: users.length, 
      icon: <Users className="h-5 w-5 text-blue-500" /> 
    },
    { 
      title: "Total Posts", 
      value: posts.length, 
      icon: <BookImage className="h-5 w-5 text-green-500" /> 
    },
    { 
      title: "Total Comments", 
      value: allComments.length, 
      icon: <MessageSquare className="h-5 w-5 text-orange-500" /> 
    },
    { 
      title: "Total Likes", 
      value: posts.reduce((acc, post) => acc + post.likes.count, 0), 
      icon: <ThumbsUp className="h-5 w-5 text-red-500" /> 
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">Admin Dashboard</h1>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className="rounded-full bg-gray-100 p-3">
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="bg-white rounded-lg shadow p-4">
          <Table>
            <TableCaption>A list of all posts</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={post.user?.avatar} alt={post.user?.name} />
                        <AvatarFallback>{post.user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{post.user?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{post.content}</TableCell>
                  <TableCell>{post.timeAgo}</TableCell>
                  <TableCell>{post.likes.count}</TableCell>
                  <TableCell>{post.comments.count}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEdit(post)}
                      >
                        <FilePenLine className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(post)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="users" className="bg-white rounded-lg shadow p-4">
          <Table>
            <TableCaption>A list of all users</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Posts</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    {posts.filter(post => post.userId === user.id).length}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEdit(user)}
                      >
                        <FilePenLine className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(user)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="comments" className="bg-white rounded-lg shadow p-4">
          <Table>
            <TableCaption>A list of all comments</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Post ID</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>{comment.id}</TableCell>
                  <TableCell>
                    {users.find(user => user.id === comment.userId)?.name || `User ${comment.userId}`}
                  </TableCell>
                  <TableCell>{comment.postId}</TableCell>
                  <TableCell className="max-w-xs truncate">{comment.content}</TableCell>
                  <TableCell>{comment.timeAgo}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEdit(comment)}
                      >
                        <FilePenLine className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(comment)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit {activeTab.slice(0, -1)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {activeTab === "posts" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Input
                  value={editFormData.content}
                  onChange={(e) => setEditFormData({...editFormData, content: e.target.value})}
                />
              </div>
            )}

            {activeTab === "users" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input
                    value={editFormData.username}
                    onChange={(e) => setEditFormData({...editFormData, username: e.target.value})}
                  />
                </div>
              </>
            )}

            {activeTab === "comments" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Input
                  value={editFormData.content}
                  onChange={(e) => setEditFormData({...editFormData, content: e.target.value})}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the 
              {activeTab === "posts" ? " post" : activeTab === "users" ? " user account and all associated content" : " comment"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}