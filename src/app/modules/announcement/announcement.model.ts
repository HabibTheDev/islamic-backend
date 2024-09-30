import { Schema, model } from 'mongoose';
import { TBlog } from './announcement.interface';

const blogSchema = new Schema<TBlog>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

export const Blog = model<TBlog>('Blog', blogSchema);
