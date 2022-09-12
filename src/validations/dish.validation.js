const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createDish = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    photo: Joi.string(),
    price: Joi.string(),
    status: Joi.boolean(),
    description:Joi.string(),
    type: Joi.string(),
    // role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getDishs = {
  query: Joi.object().keys({

    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDish = {
  params: Joi.object().keys({
    dishId: Joi.string().custom(objectId),
  }),
};

const updateDish = {
  params: Joi.object().keys({
    dishId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
    photo: Joi.string(),
    price: Joi.string(),
    status: Joi.boolean(),
    description:Joi.string(),
    type: Joi.string(), 
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

const deleteDish  = {
  params: Joi.object().keys({
    dishId: Joi.string().custom(objectId),
  }),
};
const likeProduct  = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const commentProduct  = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
  .keys({
    comment: Joi.string(),
    
  })
  .min(1),
};
const showReplyProduct  = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
    commentId: Joi.string().custom(objectId),
  })

  .min(1),
};

const replyProduct  = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
    commentId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
  .keys({
    comment: Joi.string(),
  })
  .min(1),
};
const likeComment  = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
    commentId: Joi.string().custom(objectId),
  })
  .min(1),
};
const likeReply  = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
    commentId: Joi.string().custom(objectId),
    replyId: Joi.string().custom(objectId),
  })
  .min(1),
};
module.exports = {
  createDish,
  commentProduct,
  getDishs,
  likeReply,
  getDish,
  updateDish,
  replyProduct,
  updateOrg,
  deleteDish,
  likeComment,
  likeProduct,
  showReplyProduct,
};
