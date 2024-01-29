const express = require('express');
const {body,validationResult}=require('express-validator');
const isAuth =require('../middlewares/jwt');
const UserController = require('../controllers/auth');
const User = require('../models/user');
const router = express.Router();

router.post('/login',
[body('id').trim(),body('password').trim().isLength({min:8})]
,UserController.Login);

router.put('/signup',
  [
    body('id').isEmail().withMessage('Please enter a valid mail')
    .custom(value => {
      return User.findById(value).then(userDoc => {
        if(userDoc) {
          return Promise.reject('아이디가 존재합니다');
        }
      });
    })
    .normalizeEmail(),
    body('password').trim().isLength({min:8}),
    body('name').trim().not().isEmpty()
  ],
  (req, res, next) => {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());  
    }
    next();  
  },
  UserController.Signup
);

router.post('/logout',isAuth,UserController.logout);
router.delete('/delete/:id',isAuth,UserController.UserDelete);

module.exports = router;
