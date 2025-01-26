const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const Router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_secret = "I@am$@esKApe"
const fetchuser = require('../middleware/fetchuser')

//Creating a user 
Router.post(
  '/createUser',
  [//Validation of email and password
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password should be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email } = req.body;

      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: 'A user with this email already exists.' });
      }

      // Create a new user
      const salt=await bcrypt.genSalt(10);
      const secPass=await bcrypt.hash(req.body.password,salt);
      const user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })


      await user.save();
      // res.status(201).json(user); // Send created user as response
      const data= { 
        user:{
          id:user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_secret);
      res.json({authtoken});

    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error, please try again later.' });
    }
  }
);



module.exports = Router;