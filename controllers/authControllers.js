const express = require('express');
const User = require("../models/User")
// const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');

const bcrypt = require("bcrypt")











const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, phone, password } = req.body;

    // Check if any required fields are missing in the request body
    if (!firstName || !lastName || !username || !email || !phone || !password) {
      return res.status(400).json('All fields must be completed.');
    }

    // Validate email format
    if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/.test(email)) {
      return res.status(400).json('Invalid email address.');
    }

    // Create a new User document
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      phone,
    });

    // Hash the password and save it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    newUser.password = hashedPassword;

    // Save the User document
    await newUser.save();
console.log(newUser);
    res.status(201).json('User registered successfully.');
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: 'Validation failed', details: err.errors });
    } else {
      res.status(500).json({ error: 'Internal server error', details: err.message });
    }
  }
};


const comparePasswords = async (passwordInDatabase, passwordFromRequest) => {
  try {
    return await bcrypt.compare(passwordInDatabase, passwordFromRequest);
  } catch (error) {
    throw error;
  }
};






//LOGIN 
const loginUser = async(req,res)=>{
  try {
    const { username,password } = req.body;

console.log("cool")
    if (!req.body || !username|| !password) {
      return res.status(401).json("missing fields");
    } else {
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json("user not found");
      } else {
        console.log("befro cjs")
        console.log(user)
const isPasswordValid = await comparePasswords( user.password ,password);
        if (isPasswordValid) {
          return res.status(401).json("Incorrect Login details");
        }else{
          const accessToken = jwt.sign({
            id:user.id,
           
          },process.env.SECRET_KEY,
          {expiresIn:"1d"})
            const {password , ...others} = user._doc;
            console.log(accessToken)
        return res.status(200).json({...others,accessToken});
        
        }
       
      }
    
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
 }

module.exports = {registerUser,loginUser};

