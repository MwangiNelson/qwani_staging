"use client";
import { Form, FormControl, FormMessage } from "@/components/ui/form";
import { commentSchema, ICommentSchema } from "@/utils/schema/comment.schema";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/AuthContextProvider";
import { useCreateComment, useGetComments } from "@/hooks/api/use_comments";
import { toast } from "sonner";
import CommentsList from "../../shared/comments";
import { AuthModal } from "../../shared/auth";
import { MessageCircle, User } from "lucide-react";

type Props = {
  blogId: string;
};

export default function CommentsBlogs({ blogId }: Props) {
  const { auth_user: user } = useAuth();
  const { mutateAsync: createComment, isPending } = useCreateComment();
  const { data: commentsData, isLoading, error } = useGetComments(blogId, user?.id);

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const form = useForm<ICommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      blogId: blogId,
      content: "",
      userId: user?.id ?? "",
    },
  });

  useEffect(() => {
    form.setValue("userId", user?.id ?? "");
  }, [user, form]);

  const onSubmit = async (data: ICommentSchema) => {
    // Check if user is authenticated
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const isEditing = !!editingCommentId;
    const actionText = isEditing ? "Updating" : "Submitting";

    const payload = isEditing ? { ...data, commentId: editingCommentId } : data;

    toast.promise(createComment(payload), {
      loading: `${actionText} comment...`,
      success: () => {
        form.reset();
        if (isEditing) {
          setEditingCommentId(null);
        }
        return isEditing 
          ? "Comment updated! It will be visible after review." 
          : "Comment submitted! It will be visible after admin approval.";
      },
      error: (err) => {
        console.log(err);
        return `Error ${actionText.toLowerCase()} comment`;
      },
    });
  };

  const handleEditComment = (commentId: string) => {
    const commentToEdit = commentsData?.find(
      (item) => item.comments?.id === commentId
    )?.comments;

    if (commentToEdit?.content) {
      form.setValue("content", commentToEdit.content);
      setEditingCommentId(commentId);
      document.getElementById("comment-textarea")?.focus();
    } else {
      toast.error("Could not find comment to edit");
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    form.reset();
  };

  const handleFocusCommentArea = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      document.getElementById("comment-textarea")?.focus();
    }
  };

  return (
    <div className="space-y-8">
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false);
          // Focus on textarea after successful auth
          setTimeout(() => {
            document.getElementById("comment-textarea")?.focus();
          }, 100);
        }}
      />

      {/* Comments Section Header */}
      <div className="flex items-center gap-3 pb-4 border-b">
        <MessageCircle className="h-6 w-6 text-primary" />
        <h2 className="font-playfair text-2xl font-semibold">
          Join the Conversation
        </h2>
        <span className="text-sm text-muted-foreground font-dm-sans">
          ({commentsData?.length ?? 0} comments)
        </span>
      </div>

      {/* Comment Form */}
      {user ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="flex items-start gap-4">
              {/* User Avatar */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              
              <div className="flex-1 space-y-3">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Textarea
                          id="comment-textarea"
                          {...field}
                          className="w-full min-h-[100px] p-4 border border-gray-200 rounded-lg font-dm-sans resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder={editingCommentId ? "Edit your comment..." : "Share your thoughts..."}
                        />
                      </FormControl>
                      <FormMessage className="font-dm-sans text-xs" />
                    </FormItem>
                  )}
                />
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground font-dm-sans">
                    Comments are reviewed before publishing
                  </p>
                  <div className="flex gap-2">
                    {editingCommentId && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleCancelEdit}
                        disabled={isPending}
                        className="font-dm-sans"
                      >
                        Cancel
                      </Button>
                    )}
                    <Button
                      type="submit"
                      size="sm"
                      disabled={isPending || !form.formState.isDirty}
                      className="font-dm-sans"
                    >
                      {isPending
                        ? editingCommentId
                          ? "Updating..."
                          : "Submitting..."
                        : editingCommentId
                          ? "Update Comment"
                          : "Post Comment"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      ) : (
        /* Sign in prompt for non-authenticated users */
        <div 
          className="p-6 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
          onClick={handleFocusCommentArea}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-dm-sans font-medium text-foreground">
                Sign in to join the conversation
              </p>
              <p className="text-sm text-muted-foreground font-dm-sans mt-1">
                Share your thoughts and engage with our community
              </p>
            </div>
            <Button variant="outline" size="sm" className="mt-2 font-dm-sans">
              Sign In to Comment
            </Button>
          </div>
        </div>
      )}

      {/* Comments List */}
      <CommentsList
        comments={commentsData}
        isLoading={isLoading}
        error={error as Error | null}
        onEdit={handleEditComment}
        currentUserId={user?.id}
        editingCommentId={editingCommentId}
      />
    </div>
  );
}
