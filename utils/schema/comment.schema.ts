import {z} from 'zod';

export const commentSchema = z.object({
    blogId:z.string().uuid(),
    userId:z.string().uuid(),
    content:z.string().min(1).max(500),
})
export type ICommentSchema = z.infer<typeof commentSchema>;