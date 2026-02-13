import { createClient } from "@/utils/supabase/supabase_ client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const supabase = createClient();
      if (data.commentId) {
        // Update existing comment - keep status as pending since content changed
        const { data: updatedComment, error } = await supabase
          .from("comments")
          .update({ content: data.content, status: "pending" })
          .eq("id", data.commentId)
          .select("*")
          .single();

        if (error) throw error;
        return { ...updatedComment, blogId: data.blogId };
      }

      // Create new comment with pending status
      const { data: newComment, error } = await supabase
        .from("comments")
        .insert({
          content: data.content,
          user_id: data.userId,
          status: "pending", // New comments are pending by default
        })
        .select("*")
        .single();
      if (error) throw error;

      // Create comment-post link
      await supabase.from("comments_post_link").insert({
        post_id: data.blogId,
        comment_id: newComment?.id,
      });

      return { ...newComment, blogId: data.blogId };
    },
    onSuccess: (data) => {
      // Invalidate the specific blog's comments query
      queryClient.invalidateQueries({
        queryKey: ["comments", data.blogId],
      });
    },
  });
};

// Get comments - returns all published comments + user's own pending comments
const get_comments = async (blogId: string, currentUserId?: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("comments_post_link")
    .select(
      `*, comments(*,
            users(*)
            )`
    )
    .eq("post_id", blogId)
    .order("created_at", { ascending: false, referencedTable: "comments" });
  
  if (error) throw error;

  // Filter comments: show published OR user's own pending comments
  const filteredData = data?.filter((item) => {
    const comment = item.comments;
    if (!comment) return false;
    
    // Show all published comments
    if (comment.status === "published") return true;
    
    // Show user's own pending comments
    if (currentUserId && comment.user_id === currentUserId && comment.status === "pending") {
      return true;
    }
    
    return false;
  });

  return filteredData;
};

export type ICommentsData = Awaited<ReturnType<typeof get_comments>>;

export const useGetComments = (blogId: string, currentUserId?: string) => {
  return useQuery({
    queryKey: ["comments", blogId, currentUserId],
    queryFn: () => get_comments(blogId, currentUserId),
    enabled: !!blogId,
  });
};
