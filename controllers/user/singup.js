const mongoose = require("mongoose");
const User = require("../../models/user");
const validator = require("validator");
const crypto = require("crypto");
const asyncHandler = require("../../services/asyncHandler");
const createCookie = require("../../services/createCookie");
const createAuthToken = require("../../services/createAuthToken");
const {ErrorHandler} = require("../../services/errorHandler");


module.exports = asyncHandler ( async ( req, res, next ) => {

    const username = validator.trim(req.body.username);
    const email = validator.trim( req.body.email );
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;


    if ( !password ) {
        throw new ErrorHandler( 400, 'Please enter a password!' );
    }

    if ( !validator.isLength( password, { min:8, max:22 } ) ){
        throw new ErrorHandler( 400, 'Your password must be between 8 and 22 characters long!' );
    }

    if ( password !== passwordConfirm ){
        throw new ErrorHandler( 400, 'Passwords are not the same!' );
    }

    if ( !username || !validator.isAlphanumeric( username ) ){
        throw new ErrorHandler( 400, 'You must provide valid username' );
    }

    if ( !validator.isLength( username, { min:4, max: 22 } ) ){
        throw new ErrorHandler( 400, 'Username must be between 4 and 22 characters long!' );
    }

    if ( !email || !validator.isEmail( email ) ){
        throw new ErrorHandler( 400, "Email is not valid!" );
    }

    const newUser = await User.create({
        username: username,
        email: validator.normalizeEmail(email),
        password: password,
    });

    const csrf = await crypto.randomBytes(36).toString("hex");
    const token = await createAuthToken(newUser._id, csrf);
    
    createCookie(res, token, "token");
    
   
    res.status(201).json({
        username: newUser.username,
        csrf: csrf,
    });
    
});