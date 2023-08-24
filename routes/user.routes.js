const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();
const { UserModel } = require("../model/user.model")

const userRouter = express.Router();
userRouter.post("/api/register", async (req, res) => {
    try {
        const { username, avatar, email, password} = req.body;
        const isUser = await UserModel.findOne({ email });
        if (isUser) {
            return res.send({ msg: "User already registered" });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new UserModel({ username, avatar, email, password:hashedPassword });
        await user.save();
        res.json({msg:"Register Successful",user});
    } catch (error) {
        res.status(400).json({ msg: "Error saving user" });
    }
})

userRouter.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.send({ msg: "User not found" });
        }
        const isCorrect = await bcrypt.compare(password, user.password);
        
        if (!isCorrect) { 
            res.status(400).json({ msg: "wrong credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.TOKENKEY, { expiresIn: "7d" });
        res.json({ msg: "Login successful", token });
    } catch (error) {
        res.status(400).json({ msg: "Error while logging" });
    }
})
module.exports = {
    userRouter
}
