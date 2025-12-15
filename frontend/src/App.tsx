import React, { useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container, Box, Grid, Card, CardContent, CardHeader, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Chip, Divider, Tabs, Tab, Accordion, AccordionSummary, AccordionDetails, LinearProgress, Stack, IconButton, Tooltip, Snackbar, Alert } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function App() {

  // Rubric definitions and helpers
  const PHASE1_RUBRICS = [
    // ...existing rubrics...
    {
      rubric_id: "critical_thinking_v1",
      title: "Critical Thinking VALUE",
      criteria: [
        { id: "explanation_of_issues", name: "Explanation of Issues", levels: { "4": "Issue stated clearly and described comprehensively with relevant context.", "3": "Issue stated and clarified with some context and scope.", "2": "Issue stated but description is vague or limited.", "1": "Issue is unclear or simplistic; little context provided." } },
        { id: "evidence", name: "Evidence", levels: { "4": "Information interpreted/evaluated with high-quality analysis; strong support.", "3": "Information interpreted with some analysis; generally appropriate support.", "2": "Information taken mostly at face value; limited support.", "1": "Information inaccurate, irrelevant, or unsupported." } },
        { id: "context_assumptions", name: "Context & Assumptions", levels: { "4": "Thoroughly analyzes context/assumptions, including own and others'.", "3": "Identifies and examines important assumptions and context.", "2": "Acknowledges some assumptions; limited examination of context.", "1": "Little to no recognition of context or assumptions." } },
        { id: "position", name: "Position (Perspective/Thesis)", levels: { "4": "Specific, imaginative position that is compellingly justified.", "3": "Clear position with logical reasoning and support.", "2": "Position present but simplified or inconsistently supported.", "1": "Position unclear or absent." } },
        { id: "conclusions", name: "Conclusions & Related Outcomes", levels: { "4": "Conclusions are logical, reflect informed evaluation, and consider implications.", "3": "Conclusions logically tied to analysis; outcomes identified.", "2": "Conclusions simplistic or partially tied to evidence; limited outcomes.", "1": "Conclusions not tied to evidence; outcomes oversimplified or missing." } }
      ]
    },
    {
      rubric_id: "inquiry_analysis_v1",
      title: "Inquiry & Analysis",
      criteria: [
        { id: "topic_selection", name: "Topic Selection", levels: { "4": "Creative, focused, manageable topic that addresses a significant question.", "3": "Focused and manageable topic appropriate to the assignment.", "2": "Topic somewhat unfocused, too broad or narrow.", "1": "Topic lacks focus or does not suit the assignment." } },
        { id: "existing_knowledge", name: "Existing Knowledge / Research", levels: { "4": "Comprehensive synthesis of prior knowledge and scholarship.", "3": "Appropriate summary of prior knowledge with some synthesis.", "2": "Partial review of prior knowledge with gaps.", "1": "Minimal engagement with prior knowledge." } },
        { id: "design_process", name: "Design/Methodology", levels: { "4": "Methodology is skillfully developed; appropriate and justified.", "3": "Methodology appropriately developed; generally justified.", "2": "Methodology incomplete, unfocused, or weakly justified.", "1": "Misunderstanding of methodology or inappropriate approach." } },
        { id: "analysis", name: "Analysis", levels: { "4": "Organizes and synthesizes evidence to reveal insightful patterns.", "3": "Organizes evidence appropriately with clear analysis.", "2": "Presents evidence with limited analysis or linkage.", "1": "Lists evidence without analysis or connection." } },
        { id: "conclusions_limitations", name: "Conclusions, Limitations & Implications", levels: { "4": "Conclusions well-grounded; limitations and implications discussed insightfully.", "3": "Conclusions grounded; limitations/implications identified.", "2": "Some conclusions with limited discussion of limits/implications.", "1": "Conclusions weak or missing; little recognition of limits/implications." } }
      ]
    },
    {
      rubric_id: "written_comm_v1",
      title: "Written Communication (CSS Revised)",
      criteria: [
        { id: "context_purpose", name: "Context & Purpose", levels: { "4": "Thorough understanding of context, audience, and purpose; clear focus on task.", "3": "Adequate consideration of context, audience, and purpose; mostly focused.", "2": "Some awareness but inconsistent focus on context/audience/purpose.", "1": "Minimal attention to context, audience, or purpose; unfocused." } },
        { id: "content_dev", name: "Content Development", levels: { "4": "Appropriate, relevant, and compelling content demonstrates mastery.", "3": "Appropriate and relevant content develops ideas with some depth.", "2": "Some appropriate content but with limited depth or development.", "1": "Minimal, repetitive, or irrelevant content." } },
        { id: "sources_evidence", name: "Sources & Evidence", levels: { "4": "Skillfully integrates credible sources with discipline-appropriate conventions.", "3": "Integrates sources adequately; generally credible and relevant.", "2": "Attempts to use sources but inconsistently or with limited integration.", "1": "Relies on unsupported assertions or poor/absent sourcing." } },
        { id: "syntax_mechanics", name: "Syntax & Mechanics", levels: { "4": "Virtually error-free prose; style enhances clarity and readability.", "3": "Minor errors that do not impede readability.", "2": "Noticeable errors that occasionally impede readability.", "1": "Frequent errors that impede readability." } }
      ]
    },
    {
      rubric_id: "intercultural_knowledge_v1",
      title: "Intercultural Knowledge and Competence",
      criteria: [
        { id: "cultural_self_awareness", name: "Cultural Self-Awareness", levels: { "4": "Articulates insights into own cultural rules and biases with depth and clarity.", "3": "Recognizes new perspectives about own cultural rules and biases.", "2": "Identifies own cultural rules and biases but with minimal depth.", "1": "Shows minimal awareness of own cultural rules and biases." } },
        { id: "knowledge_of_cultural_worldview", name: "Knowledge of Cultural Worldview Frameworks", levels: { "4": "Demonstrates sophisticated understanding of cultural worldview frameworks.", "3": "Demonstrates adequate understanding of cultural worldview frameworks.", "2": "Demonstrates partial understanding of cultural worldview frameworks.", "1": "Demonstrates minimal understanding of cultural worldview frameworks." } },
        { id: "empathy", name: "Empathy", levels: { "4": "Interprets intercultural experience from multiple perspectives and acts in supportive ways.", "3": "Recognizes feelings of others and responds appropriately.", "2": "Identifies feelings of others but struggles to respond appropriately.", "1": "Expresses own perspective without recognizing feelings of others." } },
        { id: "verbal_nonverbal_communication", name: "Verbal and Nonverbal Communication", levels: { "4": "Skillfully adapts language and behaviors to context and audience.", "3": "Adapts language and behaviors to context and audience with minor lapses.", "2": "Attempts to adapt language and behaviors but with limited effectiveness.", "1": "Rarely adapts language or behaviors to context and audience." } },
        { id: "curiosity_openness", name: "Curiosity and Openness", levels: { "4": "Asks complex questions and seeks out and articulates answers to these questions that reflect multiple cultural perspectives.", "3": "Asks deeper questions about other cultures and seeks out answers.", "2": "Asks simple or surface questions about other cultures.", "1": "States minimal interest in learning about other cultures." } }
      ]
    },
    {
      rubric_id: "oral_comm_v1",
      title: "Oral Communication (CSS Revised)",
      criteria: [
        { id: "organization", name: "Organization", levels: { "4": "Presentation is consistently clear, logical, and well-organized.", "3": "Presentation is mostly clear and logical with minor lapses in organization.", "2": "Presentation is somewhat organized but lacks clarity or logical flow.", "1": "Presentation is disorganized and difficult to follow." } },
        { id: "language", name: "Language", levels: { "4": "Language choices are imaginative, memorable, and enhance the effectiveness of the presentation.", "3": "Language choices are appropriate and generally support the effectiveness of the presentation.", "2": "Language choices are mundane and only partially support the effectiveness of the presentation.", "1": "Language choices are unclear and minimally support the effectiveness of the presentation." } },
        { id: "delivery", name: "Delivery", levels: { "4": "Delivery techniques (posture, gesture, eye contact, vocal expressiveness) make the presentation compelling.", "3": "Delivery techniques make the presentation interesting, though not compelling.", "2": "Delivery techniques make the presentation understandable, but not interesting.", "1": "Delivery techniques detract from the understandability of the presentation." } },
        { id: "supporting_material", name: "Supporting Material", levels: { "4": "A variety of types of supporting materials make appropriate reference to information or analysis that significantly supports the presentation.", "3": "Supporting materials make appropriate reference to information or analysis that generally supports the presentation.", "2": "Supporting materials make appropriate reference to information or analysis that partially supports the presentation.", "1": "Insufficient supporting materials are used or supporting materials do not support the presentation." } },
        { id: "central_message", name: "Central Message", levels: { "4": "Central message is compelling, precisely stated, appropriately repeated, and strongly supported.", "3": "Central message is clear and consistent with the supporting material.", "2": "Central message is basically understandable but is not often repeated and is not memorable.", "1": "Central message can be deduced, but is not explicitly stated in the presentation." } }
      ]
    }
  ];

  const SAMPLE_ARTIFACT = `In this essay, we argue that urban green roofs can mitigate heat islands while improving biodiversity.
  We review prior research from 2010–2024, including Smith (2017) and Alvarez (2021), and several reports [1,2]. However, gaps persist regarding long-term maintenance and equity of access.

  Methods: We designed a mixed-methods study with 12 buildings, temperature loggers, and resident interviews. The methodology integrates an energy-balance framework and participatory design with local stakeholders.

  Results & Analysis: Average roof-surface temperature decreased by 7–11°C; moreover, insect richness increased by 22%. However, some sites showed no change due to irrigation failures. Consequently, adoption should include maintenance training. On the other hand, cost barriers remain for low-income housing.

  Limitations & Implications: Our sample is small and the monitoring lasted one summer, which introduces threats to validity. Future work should examine long-term performance and maintenance models.

  In conclusion, cities should prioritize incentive programs for green roofs while partnering with community groups to ensure equitable outcomes.`;

  // Helper components
  function ScoreChip({ score }: { score: 1|2|3|4 }) {
    const labels: Record<number,string> = { 1: "Benchmark", 2: "Milestone", 3: "Milestone", 4: "Capstone" };
    return <Chip label={`${score}/4 • ${labels[score]}`} color="primary" variant="outlined" />;
  }

  function ConfidenceBar({ value }: { value: number }) {
    return (<Box><Typography variant="caption">Confidence: {(value * 100).toFixed(0)}%</Typography><LinearProgress variant="determinate" value={Math.round(value * 100)} /></Box>);
  }

    function RubricAccordion({ criterion }: { criterion: { id: string; name: string; levels?: Record<string, string> } }) {
      return (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1">Rubric Descriptors</Typography></AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" gutterBottom><strong>{criterion.name}</strong></Typography>
            {criterion.levels && (
              <Stack spacing={1}>
                {Object.entries(criterion.levels).sort(([a],[b]) => Number(b) - Number(a)).map(([level, desc]) => (
                  <Box key={level}><Typography variant="body2"><strong>Level {level}:</strong> {desc}</Typography></Box>
                ))}
              </Stack>
            )}
          </AccordionDetails>
        </Accordion>
      );
    }

  // State and handlers
  const [artifactText, setArtifactText] = useState<string>("");
  const [rubricId, setRubricId] = useState<string>(PHASE1_RUBRICS[0].rubric_id);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState(0);
  const [snackOpen, setSnackOpen] = useState(false);
  const rubric = useMemo(() => PHASE1_RUBRICS.find(r => r.rubric_id === rubricId)!, [rubricId]);

  // Main scoring handler
  const handleScore = async () => {
    if (!artifactText.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("http://localhost:5000/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artifactText, rubricId }),
      });

      if (!res.ok) throw new Error(`Backend error: ${res.statusText}`);
      const data = await res.json();

      // Normalize backend structure (make sure all fields exist)
      const overall = data.overall || {
        raw: data.totalScore ?? 0,
        out_of: data.outOf ?? rubric.criteria.length * 4,
        normalized:
          data.normalized ?? (data.totalScore ?? 0) / (rubric.criteria.length * 4),
      };

      const mappedCriteria = Array.isArray(data.criteria)
        ? data.criteria.map((c: any, idx: number) => ({
            id: c.criterion_id || c.id || `criterion_${idx}`,
            score: Math.max(1, Math.min(4, Number(c.score) || 1)) as 1 | 2 | 3 | 4,
            confidence: c.confidence ?? 0.8,
            rationale: c.rationale || "No rationale provided.",
            evidence: Array.isArray(c.evidence)
              ? c.evidence
              : typeof c.evidence === "string"
              ? c.evidence.split(/;|\n/).map((e: string) => e.trim()).filter(Boolean)
              : [],
          }))
        : [];

      setResult({
        artifactId: data.artifactId || "temp_" + Date.now(),
        rubricId,
        overall,
        criteria: mappedCriteria,
      });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // 🧾 Export JSON
  const handleExport = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `score_${result.artifactId}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setSnackOpen(true);
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <img src="/logo.png" alt="College logo" style={{ height: 56 }} />
          <Box>
            <Typography variant="h4">AI Assessor</Typography>
            <Typography variant="body2" color="text.secondary">
              Paste a student artifact, pick a rubric, and generate AI scores using the backend evaluator.
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* 🧾 Left Panel: Artifact Input */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title="Artifact Text"
                action={
                  <Tooltip title="Copy sample text">
                    <IconButton onClick={() => setArtifactText(SAMPLE_ARTIFACT)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                }
              />
              <CardContent>
                <TextField
                  multiline
                  minRows={16}
                  fullWidth
                  placeholder="Paste essay/report text here…"
                  value={artifactText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setArtifactText(e.target.value)}
                />
                <Box mt={2} display="flex" gap={2}>
                  <FormControl fullWidth>
                    <InputLabel id="rubric-label">Rubric</InputLabel>
                    <Select
                      labelId="rubric-label"
                      label="Rubric"
                      value={rubricId}
                      onChange={(e: any) => setRubricId(e.target.value)}
                    >
                      {PHASE1_RUBRICS.map((r: any) => (
                        <MenuItem key={r.rubric_id} value={r.rubric_id}>{r.title}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    onClick={handleScore}
                    disabled={!artifactText.trim() || loading}
                  >
                    {loading ? "Scoring..." : "Score"}
                  </Button>
                </Box>
                {error && (
                  <Typography color="error" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* 📊 Right Panel: Results */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title="Results"
                action={<Button onClick={handleExport} disabled={!result} variant="outlined">Export JSON</Button>}
              />
              <CardContent>
                {!result ? (
                  <Typography color="text.secondary">
                    {!loading
                      ? "No results yet. Paste text and click Score."
                      : "Evaluating... please wait."}
                  </Typography>
                ) : (
                  <>
                    <Box mb={2}>
                      <Typography variant="h6">{rubric.title}</Typography>
                      <Typography variant="body2">
                        Overall: <strong>{result.overall.raw}</strong> / {result.overall.out_of} (
                        {Math.round(result.overall.normalized * 100)}%)
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 1 }} />
                    <Tabs value={tab} onChange={(_: any, v: any) => setTab(v)} variant="scrollable" allowScrollButtonsMobile>
                      {rubric.criteria.map((c: any) => (
                        <Tab key={c.id} label={c.name} />
                      ))}
                    </Tabs>

                    <Box mt={2}>
                      {result.criteria[tab] && (
                        <Stack spacing={2}>
                          <Box display="flex" alignItems="center" gap={2}>
                            <ScoreChip score={result.criteria[tab].score} />
                            <ConfidenceBar value={result.criteria[tab].confidence} />
                          </Box>
                          <Typography variant="subtitle2">AI Rationale</Typography>
                          <Typography variant="body2">{result.criteria[tab].rationale}</Typography>

                          <Typography variant="subtitle2">Evidence</Typography>
                          <Stack spacing={0.5}>
                            {result.criteria[tab].evidence.map((e: string, i: number) => (
                              <Typography key={i} variant="body2">• {e}</Typography>
                            ))}
                          </Stack>
                          <RubricAccordion criterion={rubric.criteria[tab]} />
                        </Stack>
                      )}
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

  {/* Developer Notes hidden as requested */}

        <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)}>
          <Alert severity="success" onClose={() => setSnackOpen(false)}>
            Exported score JSON
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

