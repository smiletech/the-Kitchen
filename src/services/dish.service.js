const httpStatus = require('http-status');
const logger = require('../config/logger');
const { Product,Dish} = require('../models');
const { findOneAndUpdate } = require('../models/token.model');
const ApiError = require('../utils/ApiError')




/**
 * Create a user
 * @param {Object} productBody
 * @returns {Promise<User>}
 */
const createDish = async (productBody) => {
// logger.info("good")
  return Dish.create(productBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDishs = async (filter, options) => {
  const dishs = await Dish.paginate(filter, options);
  return dishs;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getDishById = async (id) => {
  return Dish.findById(id);
};


/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateDishById = async (dishId, productBody) => {
  const dish = await getDishById(dishId);
  if (!dish) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }

  Object.assign(dish, productBody);
  await dish.save();
  return dish;
};



/**
 * Delete user by id
 * @param {ObjectId} dishId
 * @returns {Promise<User>}
 */
const deleteDishById = async (dishId) => {
  const dish = await getDishById(dishId);

  if (!dish) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }
  await dish.delete();
  return dish;
};
const likeProduct = async (dishId,userId) => {
  const product = await getProductById(dishId);
  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }
   product.like = product.like.filter((obj) => JSON.stringify(obj._userId) === JSON.stringify(userId)).length > 0 ? product.like.filter((obj) =>  JSON.stringify(obj._userId) !== JSON.stringify(userId)) : [...product.like, { _userId: userId }]


  Object.assign(product);
  await product.save();
  return product;
};

const commentProduct = async (dishId,userId,productBody) => {
  const product = await getProductById(dishId);
  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }
   product.comment = [...product.comment, {...productBody, _userId: userId }]

  Object.assign(product);
  await product.save();
  return product;
};

const showReplyProduct = async (dishId,commentId,productBody) => {
  const product = await getProductById(dishId);
  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }

  const comment= product.comment.find(data=>JSON.stringify(data._id)===JSON.stringify(commentId))
  if (!comment) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Comment not found');
  }
  comment.show = (comment.show)?false:true;

  Object.assign(product);
  await product.save();
  return product;
};


const replyProduct = async (dishId,commentId,userId,productBody) => {
  const product = await getProductById(dishId);
  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }
  const comment= product.comment.find(data=>JSON.stringify(data._id)===JSON.stringify(commentId))
  if (!comment) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Comment not found');
  }
  comment.reply = [...comment.reply, {...productBody, _userId: userId }]

  await product.save();
  return product;
};

const likeComment = async (dishId,commentId,userId,) => {
  const product = await getProductById(dishId);
  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }
  const comment= product.comment.find(data=>JSON.stringify(data._id)===JSON.stringify(commentId))
  if (!comment) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Comment not found');
  }
  comment.like = comment.like.filter((obj) => JSON.stringify(obj._userId) === JSON.stringify(userId)).length > 0 ? comment.like.filter((obj) =>  JSON.stringify(obj._userId) !== JSON.stringify(userId)) : [...comment.like, { _userId: userId }]


  Object.assign(product);
  await product.save();
  return product;
};


const likeReply = async (dishId,commentId,replyId,userId) => {
  const product = await getProductById(dishId);
  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }
  const comment= product.comment.find(data=>JSON.stringify(data._id)===JSON.stringify(commentId))
  if (!comment) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Comment not found');
  }
  const reply= comment.reply.find(data=>JSON.stringify(data._id)===JSON.stringify(replyId))
  if (!reply) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Reply not found');
  }
  reply.like = reply.like.filter((obj) => JSON.stringify(obj._userId) === JSON.stringify(userId)).length > 0 ? reply.like.filter((obj) =>  JSON.stringify(obj._userId) !== JSON.stringify(userId)) : [...reply.like, { _userId: userId }]


  Object.assign(product);
  await product.save();
  return product;
};
module.exports = {
  commentProduct,
  likeComment,
  likeReply,
  replyProduct,
  createDish,
  likeProduct,
  queryDishs,
  getDishById,

  updateDishById,
  showReplyProduct,
  deleteDishById,
};
