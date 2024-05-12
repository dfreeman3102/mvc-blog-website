const router = require('express').Router();
const { Blog, User } = require('../models');
const authorize = require('../utils/auth.js');

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
      blogs,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a blog by the id
router.get('/blog/:id', async (req, res) =>{
  try{
    const blogData = await Blog.findByPk(req.params.id, {
      include:[
        {
          model: User,
          attributes: ['name']
        }
      ]
    });

    const blogs = blogData.get({ plain: true });

    res.render('blog', {
      ...blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', authorize, async (req, res) => {
  try{
      const userData = await User.findByPk(req.session.user_id, {
        attributes:{ exclude: ['password'] },
        include: [{ model: Blog }]
      });
      const user = userData.get({plain: true});

      res.render('profile', {
        ...user,
        logged_in: true
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;