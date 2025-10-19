import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  LinearProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Chip,
  TableSortLabel,
  IconButton,
  Tooltip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";




type CriterionScore = {
  id: string;
  criterionId: string;
  score: number;
  rationale: string;
  evidence: string;
};

type Artifact = {
  id: string;
  rubricId: string;
  artifactText: string;
  totalScore: number;
  outOf: number;
  normalized: number;
  createdAt: string;
  criteria: CriterionScore[];
};

export default function Dashboard() {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState<keyof Artifact>("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const fetchArtifacts = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/artifacts");
    const data = await res.json();
    setArtifacts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchArtifacts();
  }, []);

  const handleSort = (field: keyof Artifact) => {
    const isAsc = orderBy === field && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(field);
    const sorted = [...artifacts].sort((a, b) => {
      const valA = (a as any)[field];
      const valB = (b as any)[field];
      if (valA < valB) return isAsc ? -1 : 1;
      if (valA > valB) return isAsc ? 1 : -1;
      return 0;
    });
    setArtifacts(sorted);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        🧭 Assessment Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        View all previously scored student artifacts, their total scores, and rubric alignment.
      </Typography>

      <Card sx={{ mt: 3 }}>
        <CardHeader
          title="Stored Assessments"
          action={
            <Tooltip title="Refresh">
              <IconButton onClick={fetchArtifacts}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          }
        />
        <CardContent>
          {loading ? (
            <LinearProgress />
          ) : artifacts.length === 0 ? (
            <Typography color="text.secondary">No assessments saved yet.</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "rubricId"}
                        direction={order}
                        onClick={() => handleSort("rubricId")}
                      >
                        Rubric
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "normalized"}
                        direction={order}
                        onClick={() => handleSort("normalized")}
                      >
                        Overall Score
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "createdAt"}
                        direction={order}
                        onClick={() => handleSort("createdAt")}
                      >
                        Date Scored
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {artifacts.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>
                        <Typography variant="subtitle2">{a.rubricId}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Typography variant="body2">
                            {(a.normalized * 100).toFixed(1)}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={a.normalized * 100}
                            sx={{ width: "100px" }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        {new Date(a.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={a.normalized >= 0.75 ? "Strong" : a.normalized >= 0.5 ? "Developing" : "Needs Work"}
                          color={a.normalized >= 0.75 ? "success" : a.normalized >= 0.5 ? "warning" : "error"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="View Details">
                          <IconButton
                            onClick={() =>
                              alert(`Artifact ID: ${a.id}\nRubric: ${a.rubricId}\nScore: ${(a.normalized * 100).toFixed(1)}%`)
                            }
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export {};
