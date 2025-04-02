class BlogModel {
    constructor(data) {
        this.id = data._id;
        this.title = data.title;
        this.content = data.content;
        this.author = data.author;
        this.thumbnail = data.thumbnail || "/static/images/blog/default.jpg";
        this.createdAt = new Date(data.createdAt);
    }
}
module.exports = BlogModel;
