const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const logger = require('../config/logger');


const {
  authService,
  userService,
  tokenService
} = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser({
      ...req.body,
      name : req.body.firstName+" "+req.body.lastName
  });
  res.status(httpStatus.CREATED).send(user);
});


// createGoogleUser
const createGoogleUser=catchAsync(async (req, res) => {
  const user = await userService.createGoogleUser({
      ...req.body,
      name : req.body.firstName+" "+req.body.lastName
  });
  
  const {
    token,
    expires
  } = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({
    user,
    token,
    expires
  });
});


const getUsers = catchAsync(async (req, res) => {


  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, {
    ...options,
    populate: [{
      path: "saved._productId",
      select: "_id caption photo"
    }]
  });
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await (await userService.getUserById(req.params.userId))
   .populate([{
    path: "saved._productId",
    select: "_id caption photo"
  }]);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  console.log(req.file);
  if (req.file) {
    const user = await (await userService.updateUserById(req.params.userId, {   
      ...req.body, 
      name:req.body.firstName+" "+req.body.lastName,   
      photo: req.file.filename
    }))
      
    res.send(user);
  }
  else{
    const users = await userService.getUserById(req.params.userId);
    const user = await (await userService.updateUserById(req.params.userId,   
      {...req.body,
        name:req.body.firstName+" "+req.body.lastName,
        photo:users.photo
      
      } 
     ))
      
    res.send(user);
  }
  
});

const updateUserWithoutPic = catchAsync(async (req, res) => {
  const user = await (await userService.updateUserById(req.params.userId, {   
    ...req.body, 
    name:req.body.firstName+" "+req.body.lastName,   
    
  }))
    
  res.send(user);
});


const changePassword = catchAsync(async (req, res) => {
  const user = await (await userService.changePassword(req.params.userId, req.body ))    
  res.send(user);
});

const updateOrg = catchAsync(async (req, res) => {
  const org = await userService.updateOrgById(req.params.orgId, req.body);
  res.send(org);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});



const savePost = catchAsync(async (req, res) => {


  const user = await (await userService.savePost(req.params.userId,req.body));
  res.send(user);
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateOrg,
  changePassword,
  createGoogleUser,
  savePost,
  updateUserWithoutPic
  
};
