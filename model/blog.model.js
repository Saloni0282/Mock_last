const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({

    username: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: { type: String }
});

const BlogModel = mongoose.model('Blog', BlogSchema);
module.exports = { BlogModel };
