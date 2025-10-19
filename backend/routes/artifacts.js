import express from "express";
import { prisma } from "../app.js";

const router = express.Router();

// Save new scored artifact
router.post("/", async (req, res) => {
  try {
    const { rubricId, artifactText, overall, criteria } = req.body;
    if (!rubricId || !artifactText || !overall)
      return res.status(400).json({ error: "Missing rubricId, artifactText, or overall score" });

    const artifact = await prisma.artifact.create({
      data: {
        rubricId,
        artifactText,
        totalScore: overall.raw,
        outOf: overall.out_of,
        normalized: overall.normalized,
        criteria: {
          create: criteria.map(c => ({
            criterionId: c.criterion_id,
            score: c.score,
            rationale: c.rationale || "",
            evidence: (c.evidence || []).join("; ")
          }))
        }
      },
      include: { criteria: true }
    });

    res.json(artifact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// List all scored artifacts
router.get("/", async (req, res) => {
  const artifacts = await prisma.artifact.findMany({
    include: { criteria: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(artifacts);
});

// Get one artifact by ID
router.get("/:id", async (req, res) => {
  const artifact = await prisma.artifact.findUnique({
    where: { id: req.params.id },
    include: { criteria: true },
  });
  if (!artifact) return res.status(404).json({ error: "Artifact not found" });
  res.json(artifact);
});

export default router;
