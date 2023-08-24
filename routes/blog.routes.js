const express = require('express');
require("dotenv").config();
const { BlogModel } = require("../model/blog.model")

const blogRouter = express.Router();

//This endpoint should give all the blogs(only for the logged in users, use JWT token based authorisation)
blogRouter.get("/api/blogs", async (req, res) => {
    try {
        const blogs = await BlogModel.find();
        return res.json({ blogs });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching blogs" });
    }
})

//This endpoint should allow users to search for blogs using their title.
blogRouter.get("/api/blogs?title=”Present”", async (req, res) => {
    // try {


    // } catch (error) {
    //     res.status(400).json({ msg: "Error saving user" });
    // }
})

//This endpoint should give only those blogs whose category is tech. (Should work with all the categories, not just tech)
blogRouter.get("/api/blogs?category=tech", async (req, res) => {
    try {
        const { category } = req.query;
        const filteredBlogs = await BlogModel.find({ category });
        return res.json({ filteredBlogs });
    } catch (error) {
        res.status(500).json({ msg: "Error filtering blogs" });
    }
})

//This endpoint allow the users to sort the blogs based on date.
blogRouter.get("/api/blogs?sort=date&order=asc", async (req, res) => {
    try {
        const { sortBy, order } = req.query;
        const sortOrder = order === "asc" ? 1 : -1;
        const sortedBlogs = await BlogModel.find().sort({ date: sortOrder });
        return res.json({ sortedBlogs });
    } catch (error) {
        res.status(500).json({ msg: "Error sorting blogs" });
    }
})

//This endpoint should allow logged in user to create a new blog. (Use JWT Authorization)
blogRouter.post("/api/blogs",async (req, res) => {
    try {
        const { title, content, category, date, likes, comments } = req.body;
        const { username } = req.user; 

        const newBlog = new BlogModel({
            username,
            title,
            content,
            category,
            date,
            likes,
            comments
        });
        await newBlog.save();

        return res.json({ msg: "Blog created successfully", blog: newBlog });

    } catch (error) {
        res.status(400).json({ msg: "Error creating blog" });
    }
});
//This endpoint should allow the logged in user to edit or update his / her blog identified by its id.  (Use JWT Authorization)
blogRouter.patch("/api/blogs/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const body=req.body;
        const blog = await BlogModel.findByIdAndUpdate({ _id: id },body);
        if (!blog) {
            res.status(404).json({ msg: "blog not found" });
        }
        return res.json({ msg: "blog updated" })
    } catch (error) {
        res.status(400).json({ msg: "Error while updating" });
    }
})
//This endpoint should allow the logged in user to delete his/her blog identified by its id.  (Use JWT Authorization)
blogRouter.delete("/api/blogs/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await BlogModel.findByIdAndDelete({ _id: id });
        if (!blog) { 
            res.status(404).json({msg:"blog not found"});
        }
        return res.json({ msg: "blog deleted" })

    } catch (error) {
        res.status(400).json({ msg: "Error while deleting" });
    }
})
//This endpoint should allow the logged in user to “like” a particular blog.
blogRouter.patch("/api/blogs/:id/like", async (req, res) => {
    // try {

    //     const { sortby } = req.query;

    //     const filtered = await BlogModel.find().sort({ date: sortby == "asc?1:-1" });
    //     return res.json({ filtered });
    // } catch (error) {
    //     res.status(400).json({ msg: "Error while logging" });
    // }
})
blogRouter.patch("/api/blogs/:id/comment", async (req, res) => {
    // try {
    //     const { sortby } = req.query;

    //     const filtered = await BlogModel.find().sort({ date: sortby == "asc?1:-1" });
    //     return res.json({ filtered });

    // } catch (error) {
    //     res.status(400).json({ msg: "Error while logging" });
    // }
})
module.exports = {
    blogRouter
}
