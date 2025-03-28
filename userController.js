
const { fetchUsers, fetchPosts } = require('../services/fetchData');
const User = require('../models/userModel');

const getTopUsers = async (req, res) => {
    try {
        const users = await fetchUsers();
        const posts = await fetchPosts();

        const userPostCounts = {};
        posts.forEach(post => {
            userPostCounts[post.userId] = (userPostCounts[post.userId] || 0) + 1;
        });

        const userList = users.map(user => new User(user.id, user.name, userPostCounts[user.id] || 0));
        userList.sort((a, b) => b.postCount - a.postCount);

        res.json(userList.slice(0, 5));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTopUsers };