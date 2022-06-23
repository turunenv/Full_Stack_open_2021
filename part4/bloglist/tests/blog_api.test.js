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

test('all blogs are returned in json format', async() => {
    const response = await api
                            .get('/api/blogs')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length);
    
});

test('all blogs have the id property', async() => {
    const response = await api.get('/api/blogs');
    
    //check that all blogs have the id property
    response.body.forEach(blog => expect(blog.id).toBeDefined());
});

describe('adding a new blog', () => {
    test('blog in the correct format is saved to the database', async() => {
        const newBlog = {
            title: "grinding HTML",
            author: "Veku Turunen",
            url: "mokkilife.fi",
            likes: 999,
        };
    
        await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
    
        const blogsAfterPosting = await helper.blogsInDb();
        expect(blogsAfterPosting).toHaveLength(helper.initialBlogs.length + 1);
    
        const blogTitles = blogsAfterPosting.map(blog => blog.title);
        expect(blogTitles).toContain("grinding HTML");
    });

    test('likes-property defaults to 0 when missing', async() => {
        const blogWithNoLikes = {
            title: "Cpp",
            author: "Bjarne Stroustrup",
            url: "cpp.com",
        }

        const response = await api
                            .post('/api/blogs')
                            .send(blogWithNoLikes)
                            .expect(201)
                            .expect('Content-Type', /application\/json/);
        expect(response.body.likes).toBe(0);
    });

    test('server responds with 400 Bad Request when title and url are missing', async() => {
        const blogWithNoUrlAndTitle = {
            author: "mr noOne",
            likes: 100000,
        };

        await api
                .post('/api/blogs')
                .send(blogWithNoUrlAndTitle)
                .expect(400);
    })

})
