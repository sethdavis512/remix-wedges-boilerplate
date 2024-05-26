import { z } from 'zod';

export const contactUsSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .email('Email is invalid'),
    message: z
        .string({ required_error: 'Message is required' })
        .min(10, 'Message is too short')
        .max(100, 'Message is too long'),
});

export const newProjectSchema = z.object({
    name: z
        .string({ required_error: 'Project name is required' })
        .min(2)
        .max(50),
    slug: z.string({ required_error: 'Slug is required' }),
    userId: z.string({ required_error: 'User ID is required' }),
});
