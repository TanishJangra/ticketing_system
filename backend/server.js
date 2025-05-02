import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import visitorRoutes from "./routes/visitorRoutes.js";
import chatCustomizationRoutes from "./routes/chatCustomizationRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/chatCustomization", chatCustomizationRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
