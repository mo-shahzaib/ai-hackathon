import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Paper,
  LinearProgress,
  Divider,
} from "@mui/material";
import {
  Transform,
  Quiz,
  Article,
  VideoLibrary,
  Download,
  Refresh,
} from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";

const ContentRepurposingPage = () => {
  const [searchParams] = useSearchParams();
  const subject = searchParams.get("subject");
  const format = searchParams.get("format");
  const outputFormat = searchParams.get("outputFormat");
  const lectures = searchParams.get("lectures");
  const caseStudies = searchParams.get("caseStudies");
  const assignments = searchParams.get("assignments");

  console.log({
    subject,
    format,
    outputFormat,
    lectures,
    caseStudies,
    assignments,
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          component="h2"
          //   gutterBottom
          sx={{
            fontWeight: "bold",
            background:
              "linear-gradient(90deg,rgba(103, 58, 183, .8) 50%,rgba(63, 81, 181, 1) 90%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          AI Content Repurposing
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 400, mx: "auto" }}
        >
          Transform your educational content into multiple formats and languages
          automatically
        </Typography>
      </Box>

      <Grid container spacing={4}></Grid>

      <style jsx>{`
        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Container>
  );
};

export default ContentRepurposingPage;
