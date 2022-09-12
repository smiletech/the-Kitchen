const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  authService,
  userService,
  tokenService,
  emailService
} = require('../services');

const register = catchAsync(async (req, res) => {
  // const org = await userService.createOrg(req.body);
  let user;
  try {
    user = await userService.createUser({
      
      ...req.body,
      role:"user",
      name : req.body.firstName+" "+req.body.lastName
    });
  } catch (e) {
    // await org.remove();
    throw e;
  }
 
  // user = await user.populate("_org", "name email");

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



const registerVender = catchAsync(async (req, res) => {
  // const org = await userService.createOrg(req.body);
  let user;
  try {
    user = await userService.createUser({
      
      ...req.body,
      role:"vender",
      name : req.body.firstName+" "+req.body.lastName
    });
  } catch (e) {
    // await org.remove();
    throw e;
  }
 
  // user = await user.populate("_org", "name email");

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




const google = catchAsync(async (req, res) => {
  // const org = await userService.createOrg(req.body);
  let user;
  try {
    user = await userService.createGoogleUser({
      
      ...req.body,
      name : req.body.firstName+" "+req.body.lastName,
      isEmailVerified:true,
      role:"user",
    });
  } catch (e) {
    // await org.remove();
    throw e;
  }
 
  // user = await user.populate("_org", "name email");

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
const login = catchAsync(async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
    const {
    token,
    expires
  } = await tokenService.generateAuthTokens(user);
  res.send({
    user,
    token,
    expires
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const self = catchAsync(async (req, res) => {
  res.send(req.user);
});

module.exports = {
  register,
  google,
  login,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  registerVender,
  self
};