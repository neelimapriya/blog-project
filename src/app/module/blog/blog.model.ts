import mongoose, {  Schema } from "mongoose";
import { IBlog } from "./blog.interface";

const blogSchema = new Schema<IBlog>(
  {
   
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String },
    isPublished: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

export const Blog = mongoose.model<IBlog>("Blog", blogSchema);
