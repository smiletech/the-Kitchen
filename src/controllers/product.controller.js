// yet to edit


const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const logger = require('../config/logger');
const {productService} = require('../services');


const createProduct = catchAsync(async (req, res) => {
  
  const product = await productService.createProduct({   
    ...req.body,
    _createdBy:req.user._id,
    photo: req.files.map(({ filename, path }) => ({ filename, path:'http://localhost:8081/images/'+filename }))
  });
  console.log(req.files);
  res.status(httpStatus.CREATED).send(product);
});

const getProducts = catchAsync(async (req, res) => {
  // logger.info("good")
  const filter = pick(req.query, ['caption']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(filter, {
    ...options,
      populate: [{
      path: "_createdBy comment._userId comment.reply._userId like._userId comment.like._userId comment.reply.like._userId",
      select: "_id name photo firstName"
    }]
   });
  res.send(result);
});

const getProduct = catchAsync(async (req, res) => {
  const product = await (await productService.getProductById(req.params.productId))
  .populate([{
    path: "_createdBy comment._userId comment.reply._userId like._userId comment.like._userId comment.reply.like._userId",
    select: "_id name photo firstName"
  }]);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  res.send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await (await productService.updateProductById(req.params.productId, {   
    ...req.body,
    
    photo: req.files.map(({ filename, path }) => ({ filename, path:'http://localhost:8081/images/'+filename }))
  }))
    // .populate("_org", "_id name email");
  res.send(product);
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
  createProduct,
  replyProduct,
  commentProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  showReplyProduct,
  likeComment,
  likeReply,
  likeProduct
 
};
