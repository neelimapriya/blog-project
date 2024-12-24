import { Types } from "mongoose";

export interface IBlog {
  title: string;
  content: string;
  author: string;
  isPublished?: boolean;
  userId: Types.ObjectId;
}
