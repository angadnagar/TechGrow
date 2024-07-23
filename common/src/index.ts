import z from 'zod';

export const signUpSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
})

export type SignupInput=z.infer<typeof signUpSchema>

export const signInSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6)
})

export type SigninInput=z.infer<typeof signInSchema>

export const createBlogSchema=z.object({
    title:z.string(),
    content:z.string()
})

export type CreateBlogInput=z.infer<typeof createBlogSchema>

export const updateBlogSchema=z.object({
    title:z.string(),
    content:z.string(),
    id:z.string()
})

export type UpdateBlogInput=z.infer<typeof updateBlogSchema>