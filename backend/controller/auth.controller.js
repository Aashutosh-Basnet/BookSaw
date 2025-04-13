import bcrypt from "bcrypt";
import jwt from ("jsonwebtoken");
import User from "./Models/user.model.js";

const register = async(req, res) => {
    try {

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        await newUser.save();

        const {password, ...info} = newUser._doc;
        res.status(200).json({
            message: "user created successfully!",
            data: info,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "user creation failed!",
            error: error.message,
        });
    }
}

const login = async(req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(404).json({
                message: "user not found!"
            });
        }

        const comparePassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!comparePassword) {
            return res.status(400).json({
                message: "password or email is incorrect!"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_KEY,
            { expiresIn: "3d" }
        );

        const {password, ...info} = user._doc;

        res.status(200).json({
            data: {
                ...info, token
            },
            message: "login successfull!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "login failed!",
            error: error.message,
        });
    }
}

export default {login, register};