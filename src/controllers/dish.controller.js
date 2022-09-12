// yet to edit


const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const logger = require('../config/logger');
const Dish=require('../models/dish.model')
const {productService,dishService} = require('../services');


const createDish = catchAsync(async (req, res) => {
  
  const dish = await dishService.createDish({   
    ...req.body,
    _vender:req.user._id,
    photo: req.files.map(({ filename, path }) => ({ filename, path:'http://localhost:8081/images/'+filename }))
  });
  console.log(req.files);
  res.status(httpStatus.CREATED).send(dish);
});

const getDishs = catchAsync(async (req, res) => {
  // logger.info("good")
  const filter = pick(req.query, ['caption']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await dishService.queryDishs(filter, {
    ...options,
      populate: [{
      path: "_vender",
      select: "_id name photo firstName shopName"
    }]
   });
  res.send(result);
  // const dishs = await Dish.find()
  // res.send(dishs);

});

const getDish = catchAsync(async (req, res) => {
  const dish = await (await dishService.getDishById(req.params.dishId))
  .populate([{
    path: "_vender",
    select: "_id name photo firstName shopName"
  }]);
  if (!dish) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  res.send(dish);
});

const updateDish = catchAsync(async (req, res) => {

  if(req.files.length){    
  
  const dish = await (await dishService.updateDishById(req.params.dishId, {   
    ...req.body,
     photo: req.files.map(({ filename, path }) => ({ filename, path:'http://localhost:8081/images/'+filename }))
  }))
    // .populate("_org", "_id name email");
    res.send(dish);
  
}

else{
  const dish = await (await dishService.updateDishById(req.params.dishId,req.body))
  res.send(dish);
}
},{new:true});



const deleteDish = catchAsync(async (req, res) => {
  await dishService.deleteDishById(req.params.dishId);
  res.status(httpStatus.NO_CONTENT).send();
});

const likeProduct = catchAsync(async (req, res) => {
  const product = await (await productService.likeProduct(req.params.dishId,req.user._id));
  res.send(product);
});







const commentProduct = catchAsync(async (req, res) => {
  const product = await (await productService.commentProduct(req.params.dishId,req.user._id,req.body))
    // .populate("_org", "_id name email");
  res.send(product);
},{new:true});

const showReplyProduct = catchAsync(async (req, res) => {
  const product = await (await productService.showReplyProduct(req.params.dishId,req.params.commentId,req.body))
    // .populate("_org", "_id name email");
  res.send(product);
},{new:true});



const replyProduct = catchAsync(async (req, res) => {
  const product = await (await productService.replyProduct(req.params.dishId,req.params.commentId,req.user._id,req.body))
    // .populate("_org", "_id name email");
  res.send(product);
},{new:true});

const likeComment = catchAsync(async (req, res) => {
  const product = await (await productService.likeComment(req.params.dishId,req.params.commentId,req.user._id))
    // .populate("_org", "_id name email");
  res.send(product);
},{new:true});

const likeReply = catchAsync(async (req, res) => {
  const product = await (await productService.likeReply(req.params.dishId,req.params.commentId,req.params.replyId,req.user._id))
    // .populate("_org", "_id name email");
  res.send(product);
},{new:true});


module.exports = {
  createDish,
  replyProduct,
  commentProduct,
  getDishs,
  getDish,
  updateDish,
  deleteDish,
  showReplyProduct,
  likeComment,
  likeReply,
  likeProduct
 
};
