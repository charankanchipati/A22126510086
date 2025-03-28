
class Post {
    constructor(id, userId, content, likes, timestamp) {
        this.id = id;
        this.userId = userId;
        this.content = content;
        this.likes = likes;
        this.timestamp = timestamp;
    }
}

module.exports = Post;