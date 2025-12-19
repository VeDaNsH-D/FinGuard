import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { analyzeMessage } from "./geminiAnalyzer.js";
import { bankRiskCheck } from "./bankMock.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

let logs = []; // in-memory for hackathon

app.post("/analyze", async (req, res) => {
  try {
    const { message } = req.body;
    const analysis = await analyzeMessage(message);
    const bankDecision = bankRiskCheck(analysis.risk_score);

    const record = { ...analysis, time: new Date().toISOString() };
    logs.push(record);

    res.json({ ...analysis, bankDecision });
  } catch (e) {
    res.status(500).json({ error: "Analysis failed" });
  }
});

app.get("/admin/logs", (req, res) => {
  res.json(logs.slice(-50)); // last 50 events
});

app.listen(5000, () => console.log("FinGuard running"));
