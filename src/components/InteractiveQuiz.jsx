import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Paper,
  LinearProgress,
  Chip,
  Grid,
  Alert,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Fade,
} from "@mui/material";
import {
  Quiz,
  Timer,
  CheckCircle,
  Refresh,
  Share,
  Download,
  EmojiEvents,
  School,
  Close,
  PlayArrow,
  Pause,
  SkipNext,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useSearchParams } from "react-router";
import { getQuiz } from "../services/aiService";
import QuizSkeleton from "./QuizSkeleton";

const GradientCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
  backdropFilter: "blur(10px)",
  border: `1px solid ${theme.palette.primary.main}20`,
  borderRadius: theme.spacing(3),
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

const QuestionCard = styled(Card)(({ theme, isActive }) => ({
  background: isActive
    ? `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.secondary.main}10 100%)`
    : theme.palette.background.paper,
  border: isActive
    ? `2px solid ${theme.palette.primary.main}40`
    : `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(2),
  transition: "all 0.3s ease",
  transform: isActive ? "scale(1.02)" : "scale(1)",
  boxShadow: isActive ? theme.shadows[8] : theme.shadows[2],
}));

const OptionButton = styled(Button)(({ theme, selected }) => ({
  justifyContent: "flex-start",
  textAlign: "left",
  padding: theme.spacing(2),
  margin: theme.spacing(0.5, 0),
  borderRadius: theme.spacing(2),
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: selected ? 600 : 400,
  border: `2px solid ${
    selected ? theme.palette.primary.main : theme.palette.divider
  }`,
  backgroundColor: selected ? `${theme.palette.primary.main}15` : "transparent",
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: `${theme.palette.primary.main}20`,
    transform: "translateY(-1px)",
  },
}));

const ActionButton = styled(Button)(() => ({
  textTransform: "none",
  fontWeight: 600,
  transition: "all 0.3s ease",
}));

// Dummy quiz data
const defaultQuizData = {
  title: "Business Communication Fundamentals Quiz",
  description:
    "Test your knowledge of essential business communication concepts",
  timeLimit: 600,
  passingScore: 70,
  questions: [
    {
      id: 1,
      question:
        "What percentage of communication effectiveness comes from body language?",
      options: ["25%", "35%", "55%", "75%"],
      correctAnswer: 2,
      explanation:
        "Research shows that 55% of communication effectiveness comes from body language and non-verbal cues.",
    },
    {
      id: 2,
      question:
        "Which of the following is NOT a key principle of effective business writing?",
      options: [
        "Clarity and conciseness",
        "Using complex vocabulary to sound professional",
        "Audience-focused content",
        "Proper structure and organization",
      ],
      correctAnswer: 1,
      explanation:
        "Effective business writing should use clear, simple language rather than complex vocabulary.",
    },
    {
      id: 3,
      question:
        "What is the primary purpose of active listening in business communication?",
      options: [
        "To prepare your counter-arguments",
        "To understand the speaker's message completely",
        "To demonstrate your expertise",
        "To identify flaws in the speaker's logic",
      ],
      correctAnswer: 1,
      explanation:
        "Active listening focuses on fully understanding the speaker's message, emotions, and intentions.",
    },
    {
      id: 4,
      question:
        "In email communication, what should be the maximum recommended length of a subject line?",
      options: ["5-10 words", "15-20 words", "25-30 words", "No limit needed"],
      correctAnswer: 0,
      explanation:
        "Email subject lines should be concise (5-10 words) to ensure they display fully on mobile devices.",
    },
    {
      id: 5,
      question:
        "Which communication model best represents modern digital business communication?",
      options: [
        "Linear model",
        "Interactive model",
        "Transactional model",
        "Shannon-Weaver model",
      ],
      correctAnswer: 2,
      explanation:
        "The transactional model recognizes that communication is simultaneous, contextual, and influenced by multiple factors.",
    },
  ],
};

const InteractiveQuiz = ({ onQuizComplete }) => {
  const [searchParams] = useSearchParams();
  const lectures = searchParams.get("lectures");
  const caseStudies = searchParams.get("caseStudies");
  const assignments = searchParams.get("assignments");
  const [quiz, setQuiz] = useState(defaultQuizData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (lectures || caseStudies || assignments) {
      setIsLoading(true);
      getQuiz(lectures || caseStudies || assignments).then((res) => {
        console.log("quiz", res.data);
        setQuiz(res.data);
        setIsLoading(false);
      });
    }
  }, [lectures, caseStudies, assignments]);

  //   const quiz = quizData || defaultQuizData;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizPaused, setQuizPaused] = useState(false);

  const handleQuizSubmit = useCallback(() => {
    let correctAnswers = 0;
    quiz.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round(
      (correctAnswers / quiz.questions.length) * 100
    );
    setScore(finalScore);
    setShowResults(true);

    if (onQuizComplete) {
      onQuizComplete({
        score: finalScore,
        correctAnswers,
        totalQuestions: quiz.questions.length,
        timeTaken: quiz.timeLimit - timeLeft,
        passed: finalScore >= quiz.passingScore,
      });
    }
  }, [
    quiz.questions,
    quiz.timeLimit,
    quiz.passingScore,
    onQuizComplete,
    selectedAnswers,
    timeLeft,
  ]);

  // Timer effect
  useEffect(() => {
    if (quizStarted && !quizPaused && !showResults && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleQuizSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizStarted, quizPaused, showResults, timeLeft, handleQuizSubmit]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowExplanation(false);
    } else {
      handleQuizSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setShowExplanation(false);
    }
  };

  const handleQuizRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setTimeLeft(quiz.timeLimit);
    setQuizStarted(false);
    setShowExplanation(false);
    setQuizPaused(false);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "success";
    if (score >= quiz.passingScore) return "primary";
    return "error";
  };

  const getScoreIcon = (score) => {
    if (score >= 90) return <EmojiEvents />;
    if (score >= quiz.passingScore) return <CheckCircle />;
    return <School />;
  };

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  if (isLoading) {
    return <QuizSkeleton />;
  }

  // Quiz Start Screen
  if (!quizStarted && !showResults) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
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
            Interactive Quiz
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Challenge yourself with AI-powered assessment
          </Typography>
        </Box>

        <GradientCard elevation={6} sx={{ maxWidth: 600, mx: "auto" }}>
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <Box sx={{ color: "primary.main", mb: 3 }}>
              <Quiz sx={{ fontSize: 64 }} />
            </Box>

            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              {quiz.title}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ mb: 4 }}
            >
              {quiz.description}
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: "center",
                    backgroundColor: "primary.light",
                    color: "white",
                  }}
                >
                  <Typography variant="h6">{quiz.questions.length}</Typography>
                  <Typography variant="body2">Questions</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: "center",
                    backgroundColor: "secondary.light",
                    color: "white",
                  }}
                >
                  <Typography variant="h6">
                    {formatTime(quiz.timeLimit)}
                  </Typography>
                  <Typography variant="body2">Time Limit</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: "center",
                    backgroundColor: "success.light",
                    color: "white",
                  }}
                >
                  <Typography variant="h6">{quiz.passingScore}%</Typography>
                  <Typography variant="body2">Passing Score</Typography>
                </Paper>
              </Grid>
            </Grid>

            <ActionButton
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={() => setQuizStarted(true)}
              sx={{
                fontSize: "1.2rem",
                background: "linear-gradient(45deg, #673AB7 30%, #3F51B5 90%)",
              }}
            >
              Start Quiz
            </ActionButton>
          </CardContent>
        </GradientCard>
      </Container>
    );
  }

  // Quiz Results Screen
  if (showResults) {
    const correctCount = quiz.questions.filter(
      (q) => selectedAnswers[q.id] === q.correctAnswer
    ).length;
    const isPassed = score >= quiz.passingScore;

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              background: isPassed
                ? "linear-gradient(45deg, #4caf50 30%, #8bc34a 90%)"
                : "linear-gradient(45deg, #f44336 30%, #ff9800 90%)",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Quiz Completed!
          </Typography>
        </Box>

        <GradientCard elevation={6} sx={{ maxWidth: 800, mx: "auto", mb: 4 }}>
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <Box sx={{ color: getScoreColor(score), mb: 3 }}>
              {React.cloneElement(getScoreIcon(score), {
                sx: { fontSize: 80 },
              })}
            </Box>

            <Typography
              variant="h2"
              gutterBottom
              sx={{ fontWeight: "bold", color: getScoreColor(score) }}
            >
              {score}%
            </Typography>

            <Typography variant="h5" gutterBottom>
              {isPassed ? "Congratulations! 🎉" : "Keep Learning! 📚"}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ mb: 4 }}
            >
              {isPassed
                ? "You've successfully passed the quiz! Great job on mastering the concepts."
                : "Don't worry! Review the material and try again. Every attempt makes you stronger."}
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor: "primary.light",
                    color: "white",
                  }}
                >
                  <Typography variant="h6">
                    {correctCount}/{quiz.questions.length}
                  </Typography>
                  <Typography variant="body2">Correct Answers</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor: "secondary.light",
                    color: "white",
                  }}
                >
                  <Typography variant="h6">
                    {formatTime(quiz.timeLimit - timeLeft)}
                  </Typography>
                  <Typography variant="body2">Time Taken</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{ p: 2, backgroundColor: "info.light", color: "white" }}
                >
                  <Typography variant="h6">{quiz.passingScore}%</Typography>
                  <Typography variant="body2">Passing Score</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor: isPassed ? "success.light" : "error.light",
                    color: "white",
                  }}
                >
                  <Typography variant="h6">
                    {isPassed ? "PASSED" : "FAILED"}
                  </Typography>
                  <Typography variant="body2">Result</Typography>
                </Paper>
              </Grid>
            </Grid>

            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
              <ActionButton
                variant="contained"
                startIcon={<Refresh />}
                onClick={handleQuizRestart}
                sx={{
                  background:
                    "linear-gradient(45deg, #673AB7 30%, #3F51B5 90%)",
                }}
              >
                Retake Quiz
              </ActionButton>

              {/* <ActionButton
                variant="outlined"
                startIcon={<Share />}
                color="secondary"
              >
                Share Result
              </ActionButton> */}

              {/* <ActionButton
                variant="outlined"
                startIcon={<Download />}
                color="info"
              >
                Download Certificate
              </ActionButton> */}
            </Box>
          </CardContent>
        </GradientCard>
      </Container>
    );
  }

  // Main Quiz Interface
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header with Progress and Timer */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Question {currentQuestion + 1} of {quiz.questions.length}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              width: 300,
              height: 8,
              borderRadius: 4,
              mt: 1,
              backgroundColor: "rgba(0,0,0,0.1)",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                background: "linear-gradient(90deg, #667eea, #764ba2)",
              },
            }}
          />
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Chip
            icon={<Timer />}
            label={formatTime(timeLeft)}
            color={timeLeft < 60 ? "error" : "primary"}
            variant="outlined"
            sx={{ fontSize: "1rem", px: 1 }}
          />

          <IconButton
            onClick={() => setQuizPaused(!quizPaused)}
            color="primary"
            sx={{ backgroundColor: "primary.light", color: "white" }}
          >
            {quizPaused ? <PlayArrow /> : <Pause />}
          </IconButton>
        </Box>
      </Box>

      {/* Question Card */}
      <QuestionCard elevation={4} isActive={true} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            {currentQ.question}
          </Typography>

          <Grid container spacing={2} flexDirection="column">
            {currentQ.options.map((option, index) => (
              <Grid item xs={12} key={index}>
                <OptionButton
                  fullWidth
                  variant="outlined"
                  selected={selectedAnswers[currentQ.id] === index}
                  onClick={() => handleAnswerSelect(currentQ.id, index)}
                  startIcon={
                    selectedAnswers[currentQ.id] === index ? (
                      <CheckCircle sx={{ color: "primary.main" }} />
                    ) : (
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          border: "2px solid",
                          borderColor: "divider",
                        }}
                      />
                    )
                  }
                >
                  {option}
                </OptionButton>
              </Grid>
            ))}
          </Grid>

          {showExplanation && (
            <Fade in={showExplanation}>
              <Alert
                severity="info"
                sx={{ mt: 3 }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setShowExplanation(false)}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                }
              >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Explanation:
                </Typography>
                <Typography variant="body2">{currentQ.explanation}</Typography>
              </Alert>
            </Fade>
          )}
        </CardContent>
      </QuestionCard>

      {/* Navigation Buttons */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <ActionButton
          variant="outlined"
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
          color="primary"
        >
          Previous
        </ActionButton>

        <Box display="flex" gap={2}>
          {selectedAnswers[currentQ.id] !== undefined && (
            <ActionButton
              variant="text"
              onClick={() => setShowExplanation(true)}
              startIcon={<School />}
              color="info"
            >
              Show Explanation
            </ActionButton>
          )}

          <ActionButton
            variant="contained"
            onClick={handleNextQuestion}
            disabled={selectedAnswers[currentQ.id] === undefined}
            endIcon={
              currentQuestion === quiz.questions.length - 1 ? (
                <CheckCircle />
              ) : (
                <SkipNext />
              )
            }
            sx={{
              background:
                selectedAnswers[currentQ.id] !== undefined
                  ? "linear-gradient(45deg, #673AB7 30%, #3F51B5 90%)"
                  : "grey",
            }}
          >
            {currentQuestion === quiz.questions.length - 1
              ? "Submit Quiz"
              : "Next Question"}
          </ActionButton>
        </Box>
      </Box>

      {/* Pause Dialog */}
      <Dialog open={quizPaused} maxWidth="sm" fullWidth>
        <DialogContent sx={{ textAlign: "center", py: 4 }}>
          <Pause sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Quiz Paused
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Take your time! Click resume when you're ready to continue.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button
            variant="contained"
            onClick={() => setQuizPaused(false)}
            startIcon={<PlayArrow />}
            size="large"
          >
            Resume Quiz
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InteractiveQuiz;
