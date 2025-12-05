import User from '../models/userModel.js';
import createError from '../utility/appErros.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//register
const signup = async (req,res,next) =>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(user){
            return next(new createError('user already exist!',400));
        }
        const hashedPassword= await bcrypt.hash(req.body.password,12);
        const newUser= await User.create({
            ...req.body,
            password: hashedPassword,
        });
        //JWT
        const token = jwt.sign({_id: newUser._id}, "secretkey123", {
            expiresIn: '90d'
        });
        res.status(201).json({
            status: 'success',
            message:'user register successfull',
            token,
            user:{
                _id:newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        next(error);
    }
};
//login
const login = async (req,res,next) =>{
    // res.send('Login');
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {return next(new createError('User not found',404))};
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return next(new createError('Invalid password',401));
        }
        const token = jwt.sign({_id: user._id}, "secretkey123", {
            expiresIn: '90d'
        });
        res.status(200).json({
            status: 'success',
            token,
            message:'user login successfull',
            user:{
                _id:user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        })
    } catch (error) {
        next(error);
    }
};
export {signup,login};