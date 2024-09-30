import { Request, Response } from 'express';

import { TBlog } from './announcement.interface';
import { BlogService } from './announcement.service';

export const createBlog = async (req: Request, res: Response) => {
  try {
    const blogData: TBlog = req.body;
    const blog = await BlogService.createBlog(blogData);
    return res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating blog', error });
  }
};

export const getBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const blog = await BlogService.getBlogById(blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching blog', error });
  }
};

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await BlogService.getAllBlogs();
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching blogs', error });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const blogData: Partial<TBlog> = req.body;
    const updatedBlog = await BlogService.updateBlog(blogId, blogData);
    if (!updatedBlog)
      return res.status(404).json({ message: 'Blog not found' });
    return res.status(200).json(updatedBlog);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating blog', error });
  }
};

export const BlogController = {
  createBlog,
  getBlog,
  getAllBlogs,
  updateBlog,
};
