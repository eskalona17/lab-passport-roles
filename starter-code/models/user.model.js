const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
const Username = 'paco';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password needs at last 8 chars']
  },
  role: {
    type: String,
    enum: ['Boss', 'Developer', 'TA']
  }
}, { timestamps: true })


userSchema.pre('save', function(next) {
  const user = this;

  if (user.username === Username) {
    user.role = 'Boss';
  }

  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
          .then(hash => {
            user.password = hash;
            next();
          });
      })
      .catch(error => next(error));
  } else {
    next();
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;