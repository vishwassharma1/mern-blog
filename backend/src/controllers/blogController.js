const Blog = require('../models/Blog');

// Create blog logic
const createBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await Blog.create({ title, content, user: req.user._id });
    res.status(201).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all blogs logic
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('user', 'username');
    res.json({ success: true, blogs });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update blog logic
const updateBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }
    blog.title = title;
    blog.content = content;
    await blog.save();
    res.json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete blog logic
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }
    await blog.remove();
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { createBlog, getBlogs, updateBlog, deleteBlog };