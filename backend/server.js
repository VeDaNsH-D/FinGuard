import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { analyzeWithGemini } from "./geminiAnalyzer.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }

    const analysis = await analyzeWithGemini(message);
    res.json(analysis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini analysis failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`FinGuard backend running on port ${PORT}`)
);
