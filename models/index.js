const User = require('./user.js');
const Blog = require('./blogs.js');

User.hasMany(Blog, {
    foreignKey:'user_id',
    onDelete:"CASCADE"
});

Blog.belongsTo(User, {
    foreignKey:'user_id'
});

module.exports = { User , Blog };