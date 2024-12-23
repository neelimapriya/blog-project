import { Types } from "mongoose";

export interface IBlog {
  userId: Types.ObjectId;
  title: string;
  content: string;
  author: string;
}
