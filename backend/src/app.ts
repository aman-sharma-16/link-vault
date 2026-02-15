import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConnection";
import { createUploadsFolder } from "./utils/createUploadsFolder";
import { startCleanupJob } from "./jobs/cleanup";

dotenv.config();
connectDB();
createUploadsFolder();
startCleanupJob();

const app = express();

export { app };
