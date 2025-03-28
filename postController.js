
const { fetchPosts } = require('../services/fetchData');
const Post = require('../models/postModel');

const getPosts = async (req, res) => {
    try {
        const { type } = req.query;
        const posts = await fetchPosts();

        if (type === 'latest') {
            posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        } else if (type === 'popular') {
            posts.sort((a, b) => b.likes - a.likes);
        } else {
            return res.status(400).json({ message: "Invalid type. Use 'latest' or 'popular'." });
        }

        res.json(posts.slice(0, 5));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPosts };