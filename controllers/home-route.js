const router = require('express').Router();
const { Blog, User } = require('../models');
//add authentication later

router.get('/', async (req, res) => {
  try {
    // Get all blogs with name of writer
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', { 
      blogs
    //add auth here later
    });
  } catch (err) {
    res.status(500).json(err);
  }
});