const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    caption: Joi.string().required(),
    photo: Joi.string(),
    like: Joi.string(),
    comment: Joi.string(),
    location: Joi.string(),
    // role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getProducts = {
  query: Joi.object().keys({

    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      caption: Joi.string().required(), 
    photo: Joi.string(),
    like: Joi.string(),
    comment: Joi.string(),
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

const deleteProduct  = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
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
  createProduct,
  commentProduct,
  getProducts,
  likeReply,
  getProduct,
  updateProduct,
  replyProduct,
  updateOrg,
  deleteProduct,
  likeComment,
  likeProduct,
  showReplyProduct,
};
