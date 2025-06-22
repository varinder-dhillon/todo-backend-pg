import { z } from "zod";


export const BoardSchema = z.object({
    name: z.string().trim().optional(),
    description: z.string().trim().optional(),
    created_at: z.date().optional(),
    updated_at: z.date().optional(),
})

export type IBoard = z.infer<typeof BoardSchema>;

// export interface IBoard extends Document {
//   name: string;
//   description: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

export const TaskSchema = z.object({
    name: z.string().trim(),
    description: z.string().trim(),
    icon: z.string().trim(),
    status: z.string().trim(),
    boardId: z.number().min(1, 'Board Id is required!'),
    created_at: z.date().optional(),
    updated_at: z.date().optional(),
});

export type ITask  = z.infer<typeof TaskSchema>;

// export interface ITask extends Document {
//     name: string;
//     description: string;
//     icon: string;
//     status: string;
//     boardId: Number;
//     createdAt?: Date;
//     updatedAt?: Date;
// }
