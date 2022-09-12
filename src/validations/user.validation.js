const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role:Joi.string(),
    name:Joi.string(),
    // role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email:Joi.string().email(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      mobile:Joi.string(),
      photo:Joi.string(),
      bio:Joi.string(),
      gender:Joi.string(),   
      dob:Joi.string(),
      address:Joi.string().required(),

    })
    .min(1),
};
const updateUserWithoutPic = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email:Joi.string().email(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      mobile:Joi.string(),
      bio:Joi.string(),
      gender:Joi.string(),   
      dob:Joi.string(),

    })
    .min(1),
};

const changePassword = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      password: Joi.string().required().custom(password),
      newPassword: Joi.string().required().custom(password),

    })
    .min(1),
};

const updateOrg = {
  params: Joi.object().keys({
    orgId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};
const savePost = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
     productId:Joi.string().custom(objectId)
    })
    .min(1),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  updateOrg,
  deleteUser,
  changePassword,
  savePost,
  updateUserWithoutPic
};
