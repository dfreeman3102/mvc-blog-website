const User = require('./user.js');
const Blog = require('./blogs.js');
const Comment = require('./comments.js');

User.hasMany(Blog, {
    foreignKey:'user_id',
    onDelete:"CASCADE"
});

Blog.belongsTo(User, {
    foreignKey:'user_id'
});

Blog.hasMany(Comment, {
    foreignKey:'blog_id',
    onDelete:"CASCADE"
});

Comment.belongsTo(Blog, {
    foreignKey:'blog_id'
});

module.exports = { User , Blog , Comment};