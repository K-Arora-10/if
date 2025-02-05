const express = require('express');

const { body, validationResult } = require('express-validator');
const Router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Company = require('../models/Company');
const JWT_secret = "I@am$@esKApe"
const fetchcompany = require('../middleware/fetchcompany')

//Creating a user 
Router.post(
  '/createCompany',
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
      const existingUser = await Company.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: 'A user with this email already exists.' });
      }

      // Create a new user
      const salt=await bcrypt.genSalt(10);
      const secPass=await bcrypt.hash(req.body.password,salt);
      const company = await Company.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })


      await company.save();
      // res.status(201).json(user); // Send created user as response
      const data= { 
        company:{
          id:company.id
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



Router.post(
  '/companyLogin',
  [
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    body('email').notEmpty().withMessage('Email is required'),
    body('password')
      .notEmpty().withMessage('Password is required'),

  ],
  async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false;
      // Return validation errors
      return res.status(400).json({success : success, errors: errors.array() });
    }
    success=false;
    const {email,password}=req.body;
    try{
      let company = await Company.findOne({email});
      if(!company)
      {
        return res.status(400).json({error:'Please try to login with correct credentials'});
      }

      const comparePassword = await bcrypt.compare(password,company.password);
      if(!comparePassword)
      {
        return res.status(400).json({error:'Please try to login with correct credentials'});
      }

      const data= { 
        company:{
          id:company.id
        }
      }
      success=true;
      const authtoken = jwt.sign(data,JWT_secret);
      res.json({success,authtoken});

    }catch(error){
      console.error(err.message);
      res.status(500).json({ error: 'Server error, please try again later.' });
    }
  }
);




Router.post(
    '/getcompany',fetchcompany,
    async(req,res)=>{
      companyId=req.company.id
      try {
        const company= await Company.findById(companyId).select("-password")
        res.send(company)
      } catch (error) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error, please try again later.' });
      }
    }
  )




module.exports = Router;
