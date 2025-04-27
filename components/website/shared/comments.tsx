import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils"; // Make sure this utility is available
import { ICommentsData } from "@/hooks/api/use_comments";

type CommentsListProps = {
  comments: ICommentsData | null | undefined;
  isLoading: boolean;
  error: Error | null;
  onEdit: (commentId: string) => void; // Callback for edit action
  currentUserId?: string; // To conditionally show edit button
  editingCommentId: string | null; // ID of the comment currently being edited
};

export default function CommentsList({
  comments,
  isLoading,
  error,
  onEdit,
  currentUserId,
  editingCommentId,
}: CommentsListProps) {
  const [filter, setFilter] = useState("");

  // Filter comments based on content or user name
  const filteredComments = comments?.filter((commentLink) => {
    const content = commentLink.comments?.content?.toLowerCase() || "";
    const userName =
      commentLink.comments?.users?.display_name?.toLowerCase() || "";
    const searchTerm = filter.toLowerCase();

    return content.includes(searchTerm) || userName.includes(searchTerm);
  });

  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500">Loading comments...</div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading comments: {error.message}
      </div>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-semibold">Comments ({comments.length})</h2>

        {/* Filter input */}
        <div className="w-full sm:w-auto">
          <Input
            placeholder="Filter comments..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-64"
          />
        </div>
      </div>

      <ul className="space-y-4">
        {filteredComments?.map((commentLink) => {
          const comment = commentLink.comments;
          const user = comment?.users;
          if (!comment || !user) return null;

          const isBeingEdited = editingCommentId === comment.id;
          const isUserComment = currentUserId === user.id;

          return (
            <li
              key={commentLink.id}
              className={cn(
                "flex space-x-3 p-4 rounded-lg border",
                isBeingEdited
                  ? "bg-blue-50 border-blue-300"
                  : "bg-white border-gray-200"
              )}
            >
              <Avatar>
                <AvatarImage
                  src={user.profile_image ?? undefined}
                  alt={user.display_name ?? "User"}
                />
                <AvatarFallback>
                  {user.display_name?.charAt(0).toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {user.display_name ?? "Anonymous"}
                    </span>
                    {isUserComment && (
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                        You
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(comment.created_at), {
                      addSuffix: true,
                    })}
                  </span>
                </div>

                {/* Comment content */}
                <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">
                  {comment.content}
                </p>

                {/* Edit button - only show for user's own comments and if not currently editing any comment */}
                {isUserComment && (
                  <div className="mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto text-xs text-blue-600 hover:text-blue-800 p-0"
                      onClick={() => onEdit(comment.id)}
                      disabled={!!editingCommentId} // Disable if any comment is being edited
                    >
                      {isBeingEdited ? "Editing..." : "Edit"}
                    </Button>
                  </div>
                )}

                {/* Visual indicator when comment is being edited */}
                {isBeingEdited && (
                  <div className="mt-2 text-xs text-blue-600 animate-pulse">
                    You are currently editing this comment
                  </div>
                )}
              </div>
            </li>
          );
        })}

        {/* Show message when filter returns no results */}
        {filteredComments?.length === 0 && (
          <li className="text-center p-4 text-gray-500">
            No comments match your filter.
          </li>
        )}
      </ul>
    </div>
  );
}
