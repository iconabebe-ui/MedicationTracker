// index.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Medication backend running 🚀" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
