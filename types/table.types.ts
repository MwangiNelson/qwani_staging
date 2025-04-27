import { Database } from "@/database.types";
export type IUser = Database["public"]["Tables"]["users"]["Row"];
export type ICommentPostLink = Database["public"]["Tables"]["comments_post_link"]["Row"];
export type IComment = Database["public"]["Tables"]["comments"]["Row"];
