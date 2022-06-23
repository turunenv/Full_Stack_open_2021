const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
  })
  
  blogRouter.post('/', async (request, response) => {
    const params = request.body;

    // check if likes-property was set in the request, default to 0 if not
    if (!params.likes) {
      params["likes"] = 0;
    }
    const blog = new Blog(request.body)
  
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);

  })

  module.exports = blogRouter;