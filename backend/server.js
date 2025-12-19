const express = require("express");
const cors = require("cors");
const { analyzeMessage } = require("./fraudRules");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze", (req, res) => {
  const { message } = req.body;
  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message is required" });
  }

  const result = analyzeMessage(message);
  res.json(result);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`FinGuard backend running on http://localhost:${PORT}`);
});
