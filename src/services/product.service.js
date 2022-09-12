const httpStatus = require('http-status');
const logger = require('../config/logger');
const { Product} = require('../models');
const { findOneAndUpdate } = require('../models/token.model');
const ApiError = require('../utils/ApiError')




/**
 * Create a user
 * @param {Object} productBody
 * @returns {Promise<User>}
 */
const createProduct = async (productBody) => {
// logger.info("good")
  return Product.create(productBody);
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
const queryProducts = async (filter, options) => {

  
  const products = await Product.paginate(filter, options);
  return products;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getProductById = async (id) => {
  return Product.findById(id);
};


/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateProductById = async (productId, productBody) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }

  Object.assign(product, productBody);
  await product.save();
  return product;
};



/**
 * Delete user by id
 * @param {ObjectId} productId
 * @returns {Promise<User>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);

  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }
  await product.delete();
  return product;
};
const likeProduct = async (productId,userId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }
   product.like = product.like.filter((obj) => JSON.stringify(obj._userId) === JSON.stringify(userId)).length > 0 ? product.like.filter((obj) =>  JSON.stringify(obj._userId) !== JSON.stringify(userId)) : [...product.like, { _userId: userId }]


  Object.assign(product);
  await product.save();
  return product;
};

const commentProduct = async (productId,userId,productBody) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }
   product.comment = [...product.comment, {...productBody, _userId: userId }]

  Object.assign(product);
  await product.save();
  return product;
};

const showReplyProduct = async (productId,commentId,productBody) => {
  const product = await getProductById(productId);
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


const replyProduct = async (productId,commentId,userId,productBody) => {
  const product = await getProductById(productId);
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

const likeComment = async (productId,commentId,userId,) => {
  const product = await getProductById(productId);
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


const likeReply = async (productId,commentId,replyId,userId) => {
  const product = await getProductById(productId);
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
  createProduct,
  likeProduct,
  queryProducts,
  getProductById,

  updateProductById,
  showReplyProduct,
  deleteProductById,
};
