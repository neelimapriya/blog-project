import { model, Schema } from "mongoose";
import { IBlog } from "./blog.interface";



const blogSchema = new Schema<IBlog>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   userId: { 
//     type: Schema.Types.ObjectId, 
//     ref: "User", // Refers to the User model
//     required: true 
// },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, },
}, { timestamps: true },);

export const Blog=model<IBlog>('Blog',blogSchema)