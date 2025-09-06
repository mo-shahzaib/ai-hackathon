import React, { useState } from "react";
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
} from "@mui/material";
import {
  Quiz,
  Lightbulb,
  AutoAwesome,
  Refresh,
  School,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

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

const FlashCard = styled(Paper)(({ theme }) => ({
  height: "220px",
  cursor: "pointer",
  position: "relative",
  borderRadius: "16px",
  transition: "all 0.3s ease",
  background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
  border: `2px solid ${theme.palette.primary.main}20`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
  "&:hover": {
    boxShadow: theme.shadows[8],
    transform: "translateY(-4px)",
    borderColor: theme.palette.primary.main,
    background: `linear-gradient(135deg, ${theme.palette.secondary.main}12 0%, ${theme.palette.primary.main}12 100%)`,
  },
}));

const Flashcards = ({ flashcardsData }) => {
  const [flippedCards, setFlippedCards] = useState({});

  // Default data for demonstration
  const defaultData = {
    source_file: "Introduction to Business Communication",
    flashcards: [
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

  const displayData = flashcardsData || defaultData;

  const handleCardClick = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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
            label={displayData.source_file}
            color="primary"
            variant="outlined"
          />
          <Chip
            icon={<Quiz />}
            label={`${displayData.flashcards.length} Cards`}
            color="secondary"
            variant="outlined"
          />
          <Chip
            icon={<AutoAwesome />}
            label="AI Generated"
            color="info"
            variant="outlined"
          />
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
              Hover over any card to reveal the answer, or click to keep it
              revealed
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
            {displayData.flashcards.map((card, index) => (
              <Grid item xs={12} key={index} width="30%">
                <FlashCard
                  onClick={() => handleCardClick(index)}
                  elevation={4}
                  onMouseEnter={(e) => {
                    if (!flippedCards[index]) {
                      e.currentTarget.setAttribute("data-hovered", "true");
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!flippedCards[index]) {
                      e.currentTarget.removeAttribute("data-hovered");
                    }
                  }}
                  sx={{
                    '&[data-hovered="true"]': {
                      "& .question-content": { display: "none" },
                      "& .answer-content": { display: "block" },
                    },
                    ...(flippedCards[index] && {
                      "& .question-content": { display: "none" },
                      "& .answer-content": { display: "block" },
                      borderColor: "secondary.main",
                      background: `linear-gradient(135deg, rgba(156, 39, 176, 0.12) 0%, rgba(63, 81, 181, 0.12) 100%)`,
                    }),
                  }}
                >
                  <Box textAlign="center" sx={{ width: "100%" }}>
                    {/* Question Content */}
                    <Box
                      className="question-content"
                      sx={{
                        transition: "opacity 0.3s ease",
                        opacity: 1,
                      }}
                    >
                      <Quiz
                        sx={{
                          fontSize: 40,
                          color: "primary.main",
                          mb: 2,
                        }}
                      />
                      <Typography
                        variant="h6"
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
                        Hover to reveal answer
                      </Typography>
                    </Box>

                    {/* Answer Content */}
                    <Box
                      className="answer-content"
                      sx={{
                        display: "none",
                        transition: "opacity 0.3s ease",
                        opacity: 1,
                      }}
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
                  </Box>
                </FlashCard>
              </Grid>
            ))}
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
                {displayData.flashcards.length}
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
                    displayData.flashcards.length) *
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
