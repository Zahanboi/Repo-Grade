import express from "express";
import cors from "cors";
import analyzeRoute from "./routes/analyze.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/analyze", analyzeRoute);

export default app;
