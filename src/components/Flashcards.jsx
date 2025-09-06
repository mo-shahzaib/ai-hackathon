import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Paper,
  IconButton,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Quiz,
  Lightbulb,
  AutoAwesome,
  Refresh,
  School,
  Language,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useSearchParams } from "react-router";
import { getFlashcards } from "../services/aiService";
import { languageOptions } from "../constants";
import FlashCardSkeleton from "./FlashCardSkeleton";

const GradientCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
  backdropFilter: "blur(10px)",
  border: `1px solid ${theme.palette.primary.main}20`,
  borderRadius: "12px",
  position: "relative",
  overflow: "visible",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: "12px 12px 0 0",
  },
}));

const FlashCard = styled(Box)(() => ({
  height: "220px",
  cursor: "pointer",
  position: "relative",
  perspective: "1000px",
  "&:hover": {
    "& .card-inner": {
      transform: "rotateY(180deg)",
    },
  },
}));

const CardInner = styled(Box)(({ isflipped }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  textAlign: "center",
  transition: "transform 0.6s",
  transformStyle: "preserve-3d",
  transform: isflipped ? "rotateY(180deg)" : "rotateY(0deg)",
}));

const CardFace = styled(Paper)(({ theme, isback }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
  border: `2px solid ${theme.palette.primary.main}20`,
  transition: "all 0.3s ease",
  ...(isback && {
    transform: "rotateY(180deg)",
    background: `linear-gradient(135deg, ${theme.palette.secondary.main}12 0%, ${theme.palette.primary.main}12 100%)`,
    borderColor: theme.palette.secondary.main,
  }),
  ...(!isback && {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
  }),
  "&:hover": {
    boxShadow: theme.shadows[8],
    borderColor: isback
      ? theme.palette.secondary.main
      : theme.palette.primary.main,
  },
}));

const Flashcards = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const [searchParams] = useSearchParams();
  const lectures = searchParams.get("lectures");
  const caseStudies = searchParams.get("caseStudies");
  const assignments = searchParams.get("assignments");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(true);
  // Default data for demonstration
  const defaultData = {
    source_file_en: "Introduction to Business Communication",
    flashcards_en: [
      {
        question: "What is communication?",
        answer:
          "The process of transmitting and receiving information between individuals or groups.",
      },
      {
        question:
          "Who are the two individuals involved in the communication process?",
        answer:
          "Sender and receiver - the sender transmits the message while the receiver interprets it.",
      },
      {
        question: "What is encoding in the context of communication?",
        answer:
          "The transformation of thoughts and ideas into understandable symbols, words, or signals.",
      },
      {
        question: "What are the key elements of effective communication?",
        answer:
          "Clarity, conciseness, completeness, correctness, and consideration of the audience.",
      },
      {
        question: "What is feedback in communication?",
        answer:
          "The response or reaction from the receiver back to the sender, confirming understanding.",
      },
      {
        question: "What are communication barriers?",
        answer:
          "Obstacles that prevent effective exchange of ideas, such as language, cultural, or technical barriers.",
      },
    ],
  };

  const [displayData, setDisplayData] = useState(defaultData);

  const handleCardClick = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    if (lectures || caseStudies || assignments) {
      setIsLoading(true);
      getFlashcards(lectures || caseStudies || assignments).then((res) => {
        setDisplayData(res.data);
        setIsLoading(false);
      });
    }
  }, [lectures, caseStudies, assignments]);

  if (isLoading) {
    return <FlashCardSkeleton />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          AI-Generated Flashcards
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Interactive learning cards from your content
        </Typography>

        {/* Metadata Chips */}
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={1}
          mb={3}
        >
          <Chip
            icon={<School />}
            label={displayData?.["source_file" + "_" + selectedLanguage]}
            color="primary"
            variant="outlined"
          />
          <Chip
            icon={<Quiz />}
            label={`${
              displayData?.["flashcards_" + selectedLanguage]?.length
            } Cards`}
            color="secondary"
            variant="outlined"
          />
          <Chip
            icon={<AutoAwesome />}
            label="AI Generated"
            color="info"
            variant="outlined"
          />
          {/* Language Dropdown */}
          <FormControl size="small" variant="outlined">
            <Select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              displayEmpty
              startAdornment={<Language sx={{ mr: 1, color: "info.main" }} />}
              sx={{
                // minWidth: 120,
                borderRadius: 20,
                // height: 32,
                backgroundColor: "rgba(33, 150, 243, 0.04)",
                border: "1px solid rgba(33, 150, 243, 0.23)",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover": {
                  backgroundColor: "rgba(33, 150, 243, 0.08)",
                },
                "& .MuiSelect-select": {
                  paddingLeft: "6px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                },
              }}
            >
              {languageOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  disabled={!["en", "hi"].includes(option.value)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Main Content Card */}
      <GradientCard elevation={6}>
        <CardContent sx={{ p: 4 }}>
          {/* Instructions */}
          <Box mb={4} textAlign="center">
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Study Mode
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Hover over any card to flip and reveal the answer, or click to
              keep it flipped
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <Lightbulb sx={{ color: "warning.main" }} />
              <Typography variant="body2" color="text.secondary">
                Test your knowledge before revealing the answers
              </Typography>
            </Box>
          </Box>

          {/* Flashcards Grid */}
          <Grid container spacing={3}>
            {displayData?.["flashcards_" + selectedLanguage]?.map(
              (card, index) => (
                <Grid item xs={12} key={index} width="30%">
                  <FlashCard onClick={() => handleCardClick(index)}>
                    <CardInner
                      className="card-inner"
                      isflipped={flippedCards[index] ? 1 : 0}
                    >
                      {/* Front Face - Question */}
                      <CardFace
                        isback={0}
                        elevation={4}
                        sx={{ overflow: "auto" }}
                      >
                        <Box
                          textAlign="center"
                          sx={{ width: "100%", height: "100%" }}
                        >
                          <Quiz
                            sx={{
                              fontSize: 40,
                              color: "primary.main",
                              mb: 2,
                            }}
                          />
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: "bold",
                              lineHeight: 1.3,
                              color: "text.primary",
                              mb: 2,
                            }}
                          >
                            {card.question}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "text.secondary",
                              fontStyle: "italic",
                            }}
                          >
                            Hover or click to reveal answer
                          </Typography>
                        </Box>
                      </CardFace>

                      {/* Back Face - Answer */}
                      <CardFace
                        isback={1}
                        elevation={4}
                        sx={{ overflow: "auto" }}
                      >
                        <Box
                          textAlign="center"
                          sx={{ width: "100%", height: "100%" }}
                        >
                          <Lightbulb
                            sx={{
                              fontSize: 40,
                              color: "secondary.main",
                              mb: 2,
                            }}
                          />
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: "medium",
                              lineHeight: 1.4,
                              color: "text.primary",
                              mb: 1,
                            }}
                          >
                            {card.answer}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "secondary.main",
                              fontStyle: "italic",
                            }}
                          >
                            {flippedCards[index]
                              ? "Click to show question"
                              : "Answer revealed"}
                          </Typography>
                        </Box>
                      </CardFace>
                    </CardInner>
                  </FlashCard>
                </Grid>
              )
            )}
          </Grid>

          {/* Study Tips */}
          <Box mt={4} textAlign="center">
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              💡 Study Tip: Try to answer each question mentally before
              revealing the answer
            </Typography>
            {/* <Box display="flex" justifyContent="center" gap={1}>
              <Tooltip title="Shuffle Cards">
                <IconButton color="primary" onClick={() => setFlippedCards({})}>
                  <Refresh />
                </IconButton>
              </Tooltip>
            </Box> */}
          </Box>
        </CardContent>
      </GradientCard>

      {/* Progress Section */}
      <Box mt={4} textAlign="center">
        <Paper
          sx={{
            p: 3,
            backgroundColor: "grey.50",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Learning Progress
          </Typography>
          <Box display="flex" justifyContent="center" gap={4} flexWrap="wrap">
            <Box>
              <Typography
                variant="h4"
                color="primary.main"
                sx={{ fontWeight: "bold" }}
              >
                {
                  Object.keys(flippedCards).filter((key) => flippedCards[key])
                    .length
                }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cards Reviewed
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h4"
                color="secondary.main"
                sx={{ fontWeight: "bold" }}
              >
                {displayData?.["flashcards_" + selectedLanguage]?.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Cards
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h4"
                color="success.main"
                sx={{ fontWeight: "bold" }}
              >
                {Math.round(
                  (Object.keys(flippedCards).filter((key) => flippedCards[key])
                    .length /
                    displayData?.["flashcards_" + selectedLanguage]?.length) *
                    100
                )}
                %
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completion
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Flashcards;
