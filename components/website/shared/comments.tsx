import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { ICommentsData } from "@/hooks/api/use_comments";
import { Search, Clock, Pencil, MessageCircle } from "lucide-react";

type CommentsListProps = {
  comments: ICommentsData | null | undefined;
  isLoading: boolean;
  error: Error | null;
  onEdit: (commentId: string) => void;
  currentUserId?: string;
  editingCommentId: string | null;
};

// Skeleton loader component for comments
function CommentSkeleton() {
  return (
    <div className="flex gap-4 p-4 animate-pulse">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-3 w-16 bg-gray-100 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-100 rounded" />
          <div className="h-3 w-3/4 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function CommentsList({
  comments,
  isLoading,
  error,
  onEdit,
  currentUserId,
  editingCommentId,
}: CommentsListProps) {
  const [filter, setFilter] = useState("");

  const filteredComments = comments?.filter((commentLink) => {
    const content = commentLink.comments?.content?.toLowerCase() || "";
    const userName =
      commentLink.comments?.users?.display_name?.toLowerCase() || "";
    const searchTerm = filter.toLowerCase();

    return content.includes(searchTerm) || userName.includes(searchTerm);
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center rounded-lg bg-red-50 border border-red-100">
        <p className="text-red-600 font-dm-sans">
          Error loading comments. Please try again later.
        </p>
      </div>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <MessageCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="font-dm-sans text-muted-foreground">
          No comments yet. Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter input */}
      {comments.length > 3 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search comments..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-10 font-dm-sans h-10 bg-muted/30 border-0 focus-visible:ring-1 focus-visible:ring-primary/30"
          />
        </div>
      )}

      {/* Comments list */}
      <ul className="space-y-1 divide-y divide-gray-100">
        {filteredComments?.map((commentLink) => {
          const comment = commentLink.comments;
          const user = comment?.users;
          if (!comment || !user) return null;

          const isBeingEdited = editingCommentId === comment.id;
          const isUserComment = currentUserId === user.id;
          const isPending = comment.status === "pending";

          return (
            <li
              key={commentLink.id}
              className={cn(
                "py-5 first:pt-0 transition-colors",
                isBeingEdited && "bg-primary/5 -mx-4 px-4 rounded-lg"
              )}
            >
              <div className="flex gap-4">
                {/* Avatar */}
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage
                    src={user.profile_image ?? undefined}
                    alt={user.display_name ?? "User"}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-dm-sans font-medium">
                    {user.display_name?.charAt(0).toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-dm-sans font-semibold text-foreground">
                      {user.display_name ?? "Anonymous"}
                    </span>
                    
                    {isUserComment && (
                      <span className="text-xs font-dm-sans font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        You
                      </span>
                    )}
                    
                    {isPending && isUserComment && (
                      <span className="inline-flex items-center gap-1 text-xs font-dm-sans font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                        <Clock className="h-3 w-3" />
                        Pending approval
                      </span>
                    )}
                    
                    <span className="text-xs text-muted-foreground font-dm-sans">
                      {formatDistanceToNow(new Date(comment.created_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  {/* Comment content */}
                  <p className="mt-2 text-foreground/80 font-dm-sans leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                  </p>

                  {/* Actions */}
                  {isUserComment && (
                    <div className="mt-3 flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs font-dm-sans text-muted-foreground hover:text-primary gap-1"
                        onClick={() => onEdit(comment.id)}
                        disabled={!!editingCommentId}
                      >
                        <Pencil className="h-3 w-3" />
                        {isBeingEdited ? "Editing..." : "Edit"}
                      </Button>
                    </div>
                  )}

                  {/* Editing indicator */}
                  {isBeingEdited && (
                    <p className="mt-2 text-xs text-primary font-dm-sans animate-pulse">
                      Editing this comment above...
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}

        {/* No results from filter */}
        {filteredComments?.length === 0 && (
          <li className="py-8 text-center text-muted-foreground font-dm-sans">
            No comments match your search.
          </li>
        )}
      </ul>
    </div>
  );
}
