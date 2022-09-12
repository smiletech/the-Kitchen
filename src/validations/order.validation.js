const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createOrder = {

  body: Joi.object().keys({
    address: Joi.string(),
    finalTotal: Joi.string(),
    dishs: Joi.array(),
    razorpay_payment_id:Joi.string()
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

const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    orderId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      status: Joi.string(),
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

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};
const likeProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const commentProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      comment: Joi.string(),

    })
    .min(1),
};
const showReplyProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
    commentId: Joi.string().custom(objectId),
  })

    .min(1),
};

const replyProduct = {
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
const likeComment = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
    commentId: Joi.string().custom(objectId),
  })
    .min(1),
};
const likeReply = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
    commentId: Joi.string().custom(objectId),
    replyId: Joi.string().custom(objectId),
  })
    .min(1),
};
module.exports = {
  createOrder,
  commentProduct,
  getProducts,
  likeReply,
  getOrder,
  updateOrder,
  replyProduct,
  updateOrg,
  deleteProduct,
  likeComment,
  likeProduct,
  showReplyProduct,
};
