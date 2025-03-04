import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { addToBlacklist } from "../utils/tokenBlacklist.js";

export const register = async (req, res) => {
    const { name, email, password, role, contactDetails } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            contactDetails
        })

        await user.save();

        return res
            .status(201)
            .json({ message: "User registered successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Something went wrong" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found" })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res
                .status(400)
                .json({ message: "Invalid credentials" })
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        return res
            .status(200)
            .json({ token })
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Something went wrong" })
    }
}

export const logout = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(token){
        addToBlacklist(token);
    }
    return res
        .status(200)
        .json({ message: "Logged out successfully"});
}