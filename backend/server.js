import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { analyzeMessageAI } from "./aiAnalyzer.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const result = await analyzeMessageAI(message);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "AI analysis failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`FinGuard backend running on port ${PORT}`)
);
