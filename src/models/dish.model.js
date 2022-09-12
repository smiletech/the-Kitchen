const { array, date } = require('joi');
const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcryptjs');
const { private, paginate, softDelete } = require('./plugins');
// const { roles } = require('../config/roles');

const dishSchema = mongoose.Schema(
  {
    name: {
      type: String
    },
    photo: {
      type: Array,
    },
    description:{
      type: String

    },
    rating:{
      type: String
    },
    price:{
      type: String
    },
    type:{
      type: String

    },
    status:{
      type: Boolean

    },
    _vender: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    

  },
  {
    timestamps: true,
  }
);

dishSchema.plugin(softDelete);
dishSchema.plugin(private);
dishSchema.plugin(paginate);

/**
 * Check if email is taken{...req.body}
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
// userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
//   const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
//   return !!user;
// };

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
// userSchema.methods.isPasswordMatch = async function (password) {
//   const user = this;
//   return bcrypt.compare(password, user.password);
// };

// userSchema.pre('save', async function (next) {
//   const user = this;
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

/**
 * @typedef Dish
 */
const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
