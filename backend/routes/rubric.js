import express from "express";
import fs from "fs";
import path from "path";
const router = express.Router();
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const filePath = path.resolve("./rubrics/" + id + ".json");
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: "Rubric not found" });
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  res.json(data);
});

export default router;
