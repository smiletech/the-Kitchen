const { array, date } = require('joi');
const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcryptjs');
const { private, paginate, softDelete } = require('./plugins');
// const { roles } = require('../config/roles');

const productSchema = mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    _createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },

    photo: {
      type: Array,

    },
    like:
      [
        {
          _userId: {
            type: mongoose.Types.ObjectId,
            ref: "User"
          },


        }

      ],

    comment: [
      {
        like:
          [
            {
              _userId: {
                type: mongoose.Types.ObjectId,
                ref: "User"
              },


            }

          ],

        _userId: {
          type: mongoose.Types.ObjectId,
          ref: "User"
        },
        comment: {
          type: String,
        },
        reply: [
          {
            _userId: {
              type: mongoose.Types.ObjectId,
              ref: "User"
            },
            comment: {
              type: String,
            },
            like:
              [
                {
                  _userId: {
                    type: mongoose.Types.ObjectId,
                    ref: "User"
                  },


                }

              ],

            date: {
              type: Date,
              default: Date.now()
            }

          }

        ],
        show: {
          type: Boolean,
          default: false,
        },
        date: {
          type: Date,
          default: Date.now()
        }

      }

    ],
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(softDelete);
productSchema.plugin(private);
productSchema.plugin(paginate);

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
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
