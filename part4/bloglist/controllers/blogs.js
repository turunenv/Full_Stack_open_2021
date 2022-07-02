const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// helper function to extract jsonwebtoken from the request
const extractToken = request => {
  //token will be sent in the Authorization header of the request useing the bearer scheme
  const authorization = request.get('authorization');
  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7);
  }
  return null;  
}

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', '-blogs');
    response.json(blogs);
  })
  
blogRouter.post('/', async (request, response) => {
    const params = request.body;

    //check if valid jwt-token was sent with the request
    const token = extractToken(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    // check if likes-property was set in the request, default to 0 if not
    if (!params.likes) {
      params["likes"] = 0;
    };

    // respond with HTTP 400 Bad Request when title and url are missing
    if (!params.title && !params.url) {
       return response.status(400).end();
    };

    const blog = new Blog(request.body)

    const user = await User.findById(decodedToken.id); 
    blog.user = user._id;
  
    const savedBlog = await blog.save();

    // save the id of the blog to the user
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);

  })

blogRouter.delete('/:id', async(request, response) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  });

blogRouter.put('/:id', async(request, response) => {
    const body = request.body;

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: body.user,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true});
    response.json(updatedBlog);
  })

module.exports = blogRouter;