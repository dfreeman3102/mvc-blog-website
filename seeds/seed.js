//adding sequelize and adding access to the models folder
const sequelize = require('../config/connection.js');
const {User, Blog} = require('../models');
//adding both .json folders to get the seed data from
const userData = require('./userData.json');
const blogData = require('./blogData.json');
//adding function to seed the database
const seedDatabase = async () => {
    await sequelize.sync({force: true});
    //adding userData
    const users = await User.bulkCreate(userData, {
        individualHooks:true,
        returning:true,
    });
    //adding blogData
    for (const blog of blogData) {
        await Blog.create({
            ...blog,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
}

seedDatabase();