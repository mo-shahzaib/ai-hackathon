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
import ShortForm from "../components/ShortForm";
import RegionalLanguages from "../components/RegionalLanguages";
import InteractiveQuiz from "../components/InteractiveQuiz";
import Flashcards from "../components/Flashcards";
import Podcast from "../components/Podcast";

const ContentRepurposingPage = () => {
  const [searchParams] = useSearchParams();
  //   const subject = searchParams.get("subject");
  //   const format = searchParams.get("format");
  const outputFormat = searchParams.get("outputFormat");
  //   const lectures = searchParams.get("lectures");
  //   const caseStudies = searchParams.get("caseStudies");
  //   const assignments = searchParams.get("assignments");

  const renderContent = () => {
    if (outputFormat == 1) {
      return <ShortForm />;
    } else if (outputFormat == 2) {
      return <RegionalLanguages />;
    } else if (outputFormat == 3) {
      return <InteractiveQuiz />;
    } else if (outputFormat == 4) {
      return <Flashcards />;
    } else if (outputFormat == 5) {
      return <Podcast />;
    } else {
      return <Typography variant="h6">No output format selected</Typography>;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      {/* <Box textAlign="center" mb={6}>
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
      </Box> */}

      <Grid container spacing={4}>
        {renderContent()}
      </Grid>

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
