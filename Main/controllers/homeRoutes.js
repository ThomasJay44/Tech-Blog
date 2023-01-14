const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

const Post=require('../models/post');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
    })
    const posts=postData.map((post)=>post.get({plain: true}))
    res.render('home', {
      posts,
      loddenIn: req.session.loggedIn
    })
  } catch(err){
    res.status(500).json(err);
  }
})

router.get('./login', (req, res) => {
  if (req.session.loggenIn) {
    res.redirect('/');
    return;
  }
  res.render('login')
});

routger.get('/dashboard', async(req,res) => {
  try {
    const data=await Post.findall({
      where: {
        used_id: req.session.user_id
      }
    });
      const posts= data.map((post)=>post.get({plan:true}));
      res.render('dashboard', {posts, loggedIn:true})
  } catch(err){
    res.status(500).json(err);
  }
})

router.get('/post', async (req, res) =>{
  res.render('post')
})

module.exports = router;
