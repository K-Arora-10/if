const express = require('express');
const Form = require('../models/Form');
const Router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const JWT_secret = "I@am$@esKApe"
const fetchuser = require('../middleware/fetchuser')


Router.post(
  '/fillForm',
  [//Validation of email and password and all
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('phone').notEmpty().withMessage('Phone No. is required'),
    body('company').notEmpty().withMessage('Company is required'),
    body('role').notEmpty().withMessage('Internship Role is required'),
    body('resume').notEmpty().withMessage('Resume is required'),
    
  ],
  async (req, res) => {
    success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return validation errors
      return res.status(400).json({sucess, errors: errors.array() });
    }

  
      // Create a New Application
      
     try{
         const form = await Form.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        company: req.body.company,
        role: req.body.role,
        resume: req.body.resume,
      })


      await form.save();
      success=true;
      res.json({success,message:"Application submitted Successfully"});
     }

    catch (err) {
      console.error(err.message);
      res.status(500).json({sucess, error: 'Server error, please try again later.' });
    }
  }
);

module.exports = Router;