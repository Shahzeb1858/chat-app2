import { webToken } from "../lib/utlis.js"
import User from "../model/user.model.js"
import bycrypt from 'bcryptjs'

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body
    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (password < 6) {
            return res.status(400).json({ message: "Password must be of 6 or more characters" })
        }
        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: "Email is already there" })
        }

        const salt = await bycrypt.genSalt(10)
        const hashedPass = await bycrypt.hash(password, salt)

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPass
        })

        if (newUser) {
            webToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }
        else {
            res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: 'Internal Server Error 1' })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Please enter the correct email" })
        }
        
        const isPass = await bycrypt.compare(password, user.password)
        
        if(!isPass){
            return res.status(400).json({ message: "Please enter the correct password" })
        }

        webToken(user._id,res)

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })


    } catch (error) {
        console.log("Error Message : ", error)
        res.status(500).json({message:'There is an internal error'})
    }
}

export const logout = (req, res) => {
    res.send('Logout route')
}