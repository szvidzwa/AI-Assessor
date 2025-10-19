import express from "express";
import cors from "cors";
import scoreRoutes from "./routes/score.js";
import rubricRoutes from "./routes/rubric.js";
import dotenv from "dotenv";
dotenv.config();
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
dotenv.config();

export const prisma = new PrismaClient();



const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/score", scoreRoutes);
app.use("/api/rubrics", rubricRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
