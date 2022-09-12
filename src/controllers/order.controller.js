// yet to edit


const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const logger = require('../config/logger');
const Dish=require('../models/dish.model')
const {productService,dishService,orderService} = require('../services');


const createOrder = catchAsync(async (req, res) => {
  
  const order = await orderService.createOrder({   
    ...req.body,
    _user:req.user._id,
    status:"pending"
    
  });
  
  res.status(httpStatus.CREATED).send(order);
});

const getOrders = catchAsync(async (req, res) => {
  // logger.info("good")
  const filter = pick(req.query, ['caption']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.queryOrder(filter, {
    ...options,
      populate: [{
      path: "_user",
      select: "_id name photo firstName"
    }]
   });
  res.send(result);
  // const dishs = await Dish.find()
  // res.send(dishs);

});

const getOrder = catchAsync(async (req, res) => {
  const order = await (await orderService.getOrderById(req.params.orderId))
  .populate([{
    path: "_user",
    select: "_id name photo firstName"
  }]);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  res.send(order);
});

const updateOrder = catchAsync(async (req, res) => {
  const order = await (await orderService.updateOrderById(req.params.orderId, req.body))
    // .populate("_org", "_id name email");
  res.send(order);
},{new:true});



const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});

const likeProduct = catchAsync(async (req, res) => {
  const product = await (await productService.likeProduct(req.params.productId,req.user._id));
  res.send(product);
});







const commentProduct = catchAsync(async (req, res) => {
  const product = await (await productService.commentProduct(req.params.productId,req.user._id,req.body))
    // .populate("_org", "_id name email");
  res.send(product);
},{new:true});

const showReplyProduct = catchAsync(async (req, res) => {
  const product = await (await productService.showReplyProduct(req.params.productId,req.params.commentId,req.body))
    // .populate("_org", "_id name email");
  res.send(product);
},{new:true});



const replyProduct = catchAsync(async (req, res) => {
  const product = await (await productService.replyProduct(req.params.productId,req.params.commentId,req.user._id,req.body))
    // .populate("_org", "_id name email");
  res.send(product);
},{new:true});

const likeComment = catchAsync(async (req, res) => {
  const product = await (await productService.likeComment(req.params.productId,req.params.commentId,req.user._id))
    // .populate("_org", "_id name email");
  res.send(product);
},{new:true});

const likeReply = catchAsync(async (req, res) => {
  const product = await (await productService.likeReply(req.params.productId,req.params.commentId,req.params.replyId,req.user._id))
    // .populate("_org", "_id name email");
  res.send(product);
},{new:true});


module.exports = {
  createOrder,
  replyProduct,
  commentProduct,
  getOrder,
  getOrders,
  updateOrder,
  deleteProduct,
  showReplyProduct,
  likeComment,
  likeReply,
  likeProduct
 
};
