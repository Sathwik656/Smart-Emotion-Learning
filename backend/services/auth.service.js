import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const registerUser = async (userData = {}) => {
    const { name, email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = new Error("User already exists");
        error.status = 409; // Conflict
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return user;
};

export const loginUser = async (userData = {}) => {
    const { email, password } = userData;

    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error("Invalid credentials");
        error.status = 401; // Unauthorized
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        const error = new Error("Invalid credentials");
        error.status = 401; // Unauthorized
        throw error;
    }

    return user;
};