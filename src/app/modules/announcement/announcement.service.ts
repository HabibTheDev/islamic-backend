import { TBlog } from './announcement.interface';
import { Blog } from './announcement.model';

export const createBlog = async (blogData: TBlog) => {
  const blog = new Blog(blogData);
  return await blog.save();
};

export const getBlogById = async (id: string) => {
  return await Blog.findById(id);
};

export const getAllBlogs = async () => {
  return await Blog.find();
};

export const updateBlog = async (id: string, blogData: Partial<TBlog>) => {
  return await Blog.findByIdAndUpdate(id, blogData, { new: true });
};

const deleteBlog = async (id: string) => {
  return await Blog.findByIdAndDelete(id);
};

export const BlogService = {
  createBlog,
  getBlogById,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
