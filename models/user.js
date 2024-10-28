const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  food: {type: String, required: true},
  calories: {type: Number, required: true},
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  foods: [foodSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;



