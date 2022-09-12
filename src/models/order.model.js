const { array, date } = require('joi');
const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcryptjs');
const { private, paginate, softDelete } = require('./plugins');
// const { roles } = require('../config/roles');

const orderSchema = mongoose.Schema(
  {
    _user: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    status: {
      type: String
    },
    dishs:[],
    address:{
      type:String
    },
    razorpay_payment_id:{
      type:String
    },
    finalTotal:{
      type:String
    }


  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(softDelete);
orderSchema.plugin(private);
orderSchema.plugin(paginate);

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
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
