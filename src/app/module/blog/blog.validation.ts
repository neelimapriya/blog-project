import { z } from "zod";

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    content: z.string({ required_error: "Content is required" }),
  }),
});
const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: "Title is required" })
      .min(5, "Blog title should be minimum 5 characters")
      .max(150, "Blog title can't be more than 150 characters")
      .optional(),
    content: z
      .string({ required_error: "Content is required" })
      .min(5, "Blog content should be minimum 100 characters")
      .optional(),
    isPublished: z.boolean().optional(),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
