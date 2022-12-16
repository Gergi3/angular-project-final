const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALTROUNDS) || 5;

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Username should be at least 5 characters'],
    maxlength: [50, 'Username should be at less than 50 characters'],
    validate: {
      validator: function (v) {
        return /[a-zA-Z0-9]+/g.test(v);
      },
      message: props => `${props.value} must contains only latin letters and digits!`
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [5, 'Password should be at least 5 characters'],
    maxlength: [50, 'Password should less than 50 characters'],
  },
  phoneNumber: {
    type: String,
  },
  isMale: {
    type: Boolean
  },
  articles: [{
    type: ObjectId,
    ref: 'Article'
  }],
  comments: [{
    type: ObjectId,
    ref: 'Comment'
  }]
}, { timestamps: { createdAt: 'createdAt' } });

userSchema.methods = {
  matchPassword: function (password) {
    return bcrypt.compare(password, this.password);
  }
}

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        next(err);
      }
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          next(err);
        }
        this.password = hash;
        next();
      })
    })
    return;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
