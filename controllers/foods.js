const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// Index Route
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('foods/index.ejs', {
      foods: currentUser.foods,
    });
  } catch(error) {
    console.log(error);
    res.redirect('/');
  }
  });

// New Route  
router.get('/new', async (req, res) => {
    res.render('foods/new.ejs');
});

// Create Route
router.post('/', async (req, res) => {
  try {
  const currentUser = await User.findById(req.session.user._id);

  currentUser.foods.push(req.body);
  await currentUser.save();
  res.redirect(`/users/${currentUser._id}/foods`);
  } catch(error) {
    console.log(error);
    res.redirect('/');
  }
})

// Delete Route
router.delete('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.foods.id(req.params.foodId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch(error) {
    console.log(error);
    res.redirect('/');
  }
  });

module.exports = router;