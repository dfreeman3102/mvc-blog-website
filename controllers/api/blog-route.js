const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const authorize = require('../../utils/auth.js');

router.post('/', authorize, async (req, res) => {
    try{
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/comment', authorize, async (req, res) => {
    try{
        //get comment data from req.body
        const {user_comments, blog_id} = req.body;
        //create new comment in db
        const newComment = await Comment.create({
            user_comments,
            blog_id,
            user_id
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create comment' });
    }
});

router.delete('/:id', authorize, async (req,res) => {
    try{
        const blogData = await Blog.destroy({
            where:{
                id:req.params.id,
                user_id:req.session.user_id
            },
        });

        if(!blogData) {
            res.status(404).json({message: "No blog found with this id!"});
            return;
        }
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;