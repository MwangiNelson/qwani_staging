import { createClient } from "@/utils/supabase/supabase_ client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const supabase = createClient();
      if (data.commentId) {
        const { data: updatedComment, error } = await supabase
          .from("comments")
          .update({ content: data.content })
          .eq("id", data.commentId)
          .select("*")
          .single();

        if (error) throw error;
        return { ...updatedComment, blogId: data.blogId };
      }

      const { data: newComment, error } = await supabase
        .from("comments")
        .insert({
          content: data.content,
          user_id: data.userId,
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
const get_comments = async (blogId: string) => {
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

  return data;
};
export type ICommentsData = Awaited<ReturnType<typeof get_comments>>;
export const useGetComments = (blogId: string) => {
  return useQuery({
    queryKey: ["comments", blogId],
    queryFn: () => get_comments(blogId),
    enabled: !!blogId,
  });
};
