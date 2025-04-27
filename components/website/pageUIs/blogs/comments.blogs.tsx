"use client";
import { Form, FormControl, FormMessage } from "@/components/ui/form";
import { commentSchema, ICommentSchema } from "@/utils/schema/comment.schema";
// Add useState import
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/AuthContextProvider";
import { socialAuth } from "../../utils/functions";
import { useCreateComment, useGetComments } from "@/hooks/api/use_comments";
import { toast } from "sonner";
import CommentsList from "../../shared/comments";

type Props = {
  blogId: string;
};

export default function CommentsBlogs({ blogId }: Props) {
  const { auth_user: user } = useAuth();
  const { mutateAsync: createComment, isPending } = useCreateComment();
  const { data: commentsData, isLoading, error } = useGetComments(blogId);

  // Add state for tracking comment being edited
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

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
  }, [user]);

  // Function to handle form submission for both new comments and edits
  const onSubmit = async (data: ICommentSchema) => {
    const isEditing = !!editingCommentId;
    const actionText = isEditing ? "Updating" : "Creating";

    // Include the commentId in the payload if editing
    const payload = isEditing ? { ...data, commentId: editingCommentId } : data;

    toast.promise(createComment(payload), {
      loading: `${actionText} comment...`,
      success: () => {
        form.reset();
        // Reset editing state if we were editing
        if (isEditing) {
          setEditingCommentId(null);
        }
        return `Comment ${isEditing ? "updated" : "created"} successfully!`;
      },
      error: (err) => {
        console.log(err);
        return `Error ${actionText.toLowerCase()} comment`;
      },
    });
  };

  // Function to handle edit button click
  const handleEditComment = (commentId: string) => {
    // Find the comment data
    const commentToEdit = commentsData?.find(
      (item) => item.comments?.id === commentId
    )?.comments;

    if (commentToEdit?.content) {
      // Set the form content to the comment being edited
      form.setValue("content", commentToEdit.content);
      // Set the editing state
      setEditingCommentId(commentId);
      // Focus the textarea
      document.getElementById("comment-textarea")?.focus();
    } else {
      toast.error("Could not find comment to edit");
    }
  };

  // Function to cancel editing
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    form.reset(); // Reset form to clear the editing content
  };

  return (
    <div className="space-y-8">
      {/* Comment Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col"
        >
          <h1 className="text-2xl font-semibold">
            {editingCommentId ? "Edit your comment" : "Leave a comment"}
          </h1>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    id="comment-textarea"
                    {...field}
                    className="w-full h-[100px] p-2 border border-gray-300 rounded-md"
                    placeholder="Write your comment here..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2">
            {/* Show cancel button when editing */}
            {editingCommentId && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelEdit}
                disabled={isPending}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              onClick={() => {
                console.log({
                  errors: form.formState.errors,
                  values: form.getValues(),
                });
                if (!user) {
                  socialAuth("google");
                }
              }}
              disabled={isPending || !form.formState.isDirty}
            >
              {isPending
                ? editingCommentId
                  ? "Updating..."
                  : "Submitting..."
                : editingCommentId
                ? "Update"
                : "Submit"}
            </Button>
          </div>
        </form>
      </Form>

      {/* Render the Comments List */}
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
