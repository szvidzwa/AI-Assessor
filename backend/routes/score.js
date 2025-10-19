import express from "express";
import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { prisma } from "../app.js";
import artifactRoutes from "./routes/artifact.js";
app.use("/api/artifacts", artifactRoutes);



const router = express.Router();

// Initialize OpenAI with key from environment
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // set this in your .env file
});

/**
 * Build a structured scoring prompt for the LLM.
 */
function buildPrompt(artifactText, rubric) {
  return `
You are an academic evaluator scoring student work strictly using the rubric below.
Each criterion defines performance levels from 1 (Benchmark) to 4 (Capstone).

Rubric JSON:
${JSON.stringify(rubric.criteria, null, 2)}

Student Artifact:
"""
${artifactText.slice(0, 5000)}
"""

Return a JSON array ONLY, using this schema:
[
  {
    "criterion_id": "<criterion id>",
    "score": <integer 1-4>,
    "rationale": "<brief justification referencing rubric>",
    "evidence": ["<short supporting quote 1>", "<short supporting quote 2>"]
  }
]
`;
}

/**
 * Calls OpenAI model safely and parses structured JSON.
 */
async function callAIScorer(prompt, rubricId) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // fast and cost-efficient model
      messages: [
        { role: "system", content: "You are a fair, consistent academic evaluator." },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 800,
      timeout: 60000, // 60s safeguard
    });

    const text = completion.choices[0]?.message?.content?.trim();
    if (!text) throw new Error("Empty response from model.");

    // Attempt to parse valid JSON
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");
    const clean = text.slice(start, end + 1);
    const parsed = JSON.parse(clean);

    return { rubricId, criteria: parsed };
  } catch (err) {
    console.error("AI scorer error:", err.message);
    // Fallback safe mock
    return {
      rubricId,
      criteria: [
        {
          criterion_id: "default",
          score: 2,
          rationale: "Default score due to AI error.",
          evidence: [],
        },
      ],
    };
  }
}

/**
 * POST /api/score
 * Body: { artifactText: string, rubricId: string }
 */
router.post("/", async (req, res) => {
  try {
    const { artifactText, rubricId } = req.body;
    if (!artifactText || !rubricId)
      return res.status(400).json({ error: "artifactText and rubricId are required" });

    const rubricPath = path.resolve(`./rubrics/${rubricId}.json`);
    if (!fs.existsSync(rubricPath))
      return res.status(404).json({ error: `Rubric not found: ${rubricId}` });

    const rubric = JSON.parse(fs.readFileSync(rubricPath, "utf8"));
    const prompt = buildPrompt(artifactText, rubric);

    const aiResult = await callAIScorer(prompt, rubricId);

    // Compute totals
    const totalScore = aiResult.criteria.reduce((s, c) => s + (c.score || 0), 0);
    const outOf = rubric.criteria.length * 4;
    const normalized = totalScore / outOf;

    const response = {
      artifactId: "artifact_" + Date.now(),
      rubricId,
      overall: { raw: totalScore, out_of: outOf, normalized },
      criteria: aiResult.criteria,
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

import { prisma } from "../app.js"; 

// Save scored artifact to DB
await prisma.artifact.create({
  data: {
    rubricId,
    artifactText,
    totalScore,
    outOf,
    normalized,
    criteria: {
      create: aiResult.criteria.map(c => ({
        criterionId: c.criterion_id,
        score: c.score,
        rationale: c.rationale,
        evidence: (c.evidence || []).join("; ")
      }))
    }
  }
});


export default router;


