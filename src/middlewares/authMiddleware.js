import { isTokenBlacklisted } from "../utils/tokenBlacklist.js";
import jwt from 'jsonwebtoken'

export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res
            .status(401)
            .json({ message: "No token provided." });
    }

    if (isTokenBlacklisted(token)) {
        return res
            .status(401)
            .json({ message: "Token invalidated. Please log in again." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .json({ message: "Invalid token" })
        }

        req.user = decoded;
        next();
    })
}