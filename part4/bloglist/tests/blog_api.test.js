const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const Blog = require('../models/blog');

const api = supertest(app);
const helper = require('./test_helper');

beforeEach(async() => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});

test('all blogs are returned in json format', async () => {
    const response = await api
                            .get('/api/blogs')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length);
    
});

test('all blogs have the id property', async () => {
    const response = await api.get('/api/blogs');
    
    //check that all blogs have the id property
    response.body.forEach(blog => expect(blog.id).toBeDefined());
})