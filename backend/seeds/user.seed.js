import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const seedUsers = async () => {
    try {
        const users = [
            {
                name: "Admin",
                email: "admin@smartemotion.com",
                password: await bcrypt.hash("admin123", 10),
                role: "admin",
            },
            {
                name: "Student",
                email: "student@smartemotion.com",
                password: await bcrypt.hash("student123", 10),
                role: "student",
            },
        ];

        await User.insertMany(users);

        console.log("Users seeded");
    } catch (error) {
        console.error("User seed error:", error);
        throw error;
    }
};

export default seedUsers;