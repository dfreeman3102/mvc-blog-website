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

User.hasMany(Comment, {
    foreignKey:'user_id',
    onDelete:"CASCADE"
});

Comment.belongsTo(User, {
    foreignKey:'user_id'
});

module.exports = { User , Blog , Comment};