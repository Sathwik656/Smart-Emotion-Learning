import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../database/mongo.js";

import seedUsers from "./user.seed.js";
import seedContent from "./content.seed.js";
import seedEmotions from "./emotion.seed.js";

dotenv.config();

const runSeeds = async () => {
    try {
        await connectDB();

        console.log("Clearing existing data...");

        await mongoose.connection.dropDatabase();

        console.log("Seeding data...");

        await seedUsers();
        await seedContent();
        await seedEmotions();

        console.log("Seeding completed successfully!");

        process.exit();
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

runSeeds();