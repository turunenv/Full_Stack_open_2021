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
    };

    // respond with HTTP 400 Bad Request when title and url are missing
    if (!params.title && !params.url) {
       return response.status(400).end();
    };

    const blog = new Blog(request.body)
  
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);

  })

  blogRouter.delete('/:id', async(request, response) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  })

  module.exports = blogRouter;