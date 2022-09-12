const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { private, paginate, softDelete } = require('./plugins');
const { roles } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    
    firstName: {
      type: String,

      trim: true,
    },
    lastName: {
      type: String,

      trim: true,
    },
    mobile: {
      type: String,

      trim: true,
    },
    photo: {
      type: String,

      trim: true,
    },
    bio: {
      type: String,

      trim: true,
    },
    dob: {
      type: String,

      trim: true,
    },
    address:{
      type: String,

      trim: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    saved:
      [
        {
          _productId: {
            type: mongoose.Types.ObjectId,
            ref: "Product"
          },


        }

      ],
    shopName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the private plugin
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      trim: true,   
    },
    // _org: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "organizations"
    // },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(softDelete);
userSchema.plugin(private);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
