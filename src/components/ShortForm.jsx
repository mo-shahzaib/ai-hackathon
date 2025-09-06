import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  Chip,
  Paper,
  Divider,
  Grid,
  Collapse,
  Alert,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import {
  ContentCopy,
  Bookmark,
  BookmarkBorder,
  ExpandMore,
  ExpandLess,
  AutoAwesome,
  Timer,
  Lightbulb,
  CheckCircle,
  Language,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { getSummary } from "../services/aiService";
import { useSearchParams } from "react-router";
import SummarySkeleton from "./SummarySkeleton";
import { languageOptions } from "../constants";

const GradientCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
  backdropFilter: "blur(10px)",
  border: `1px solid ${theme.palette.primary.main}20`,
  borderRadius: "0px 0px 12px 12px",
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
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  position: "relative",
  "&:hover": {
    boxShadow: theme.shadows[4],
    transition: "box-shadow 0.3s ease",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  textTransform: "none",
  fontWeight: 600,
  padding: theme.spacing(1, 3),
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[8],
  },
}));

const ShortForm = () => {
  const [searchParams] = useSearchParams();
  const lectures = searchParams.get("lectures");
  const caseStudies = searchParams.get("caseStudies");
  const assignments = searchParams.get("assignments");
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  //   const [regenerating, setRegenerating] = useState(false);

  // Sample AI-generated content structure
  const defaultContent = {
    title: "Business Communication Fundamentals",
    summary:
      "Master the essential principles of effective business communication in modern corporate environments.",
    keyPoints: [
      "Develop clear and concise written communication skills",
      "Master verbal communication techniques for presentations",
      "Understand non-verbal communication and body language",
      "Learn digital communication etiquette and best practices",
      "Practice active listening and feedback mechanisms",
    ],
    insights: [
      "Effective communication increases team productivity by 30%",
      "Written communication accounts for 70% of business interactions",
      "Non-verbal cues convey 55% of communication meaning",
    ],
    actionItems: [
      "Practice daily email writing with clear subject lines",
      "Join public speaking groups like Toastmasters",
      "Record yourself presenting to improve delivery",
      "Implement the STAR method for structured responses",
    ],
    readingTime: "3 min read",
    difficulty: "Beginner",
    completionRate: 95,
    language: "English",
  };

  //   const displayContent = content || defaultContent;
  const [displayContent, setDisplayContent] = useState(defaultContent);
  //   const displayMetadata = {
  //     generatedAt: new Date().toLocaleString(),
  //     aiModel: "Groq Llama-3",
  //     processingTime: "2.3s",
  //     subject: "Business Communication",
  //     format: "Short-form Summary",
  //   };

  const handleCopyContent = () => {
    const textContent = `
${displayContent?.["title" + "_" + selectedLanguage]}

${displayContent?.["summary" + "_" + selectedLanguage]}

Key Points:
${displayContent?.["keyPoints" + "_" + selectedLanguage]
  ?.map((point, index) => `${index + 1}. ${point}`)
  .join("\n")}

Key Insights:
${displayContent?.["insights" + "_" + selectedLanguage]
  ?.map((insight) => `• ${insight}`)
  .join("\n")}

Action Items:
${displayContent?.["actionItems" + "_" + selectedLanguage]
  ?.map((item, index) => `${index + 1}. ${item}`)
  .join("\n")}
    `;

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  //   const handleRegenerateContent = () => {
  //     setRegenerating(true);
  //     if (onRegenerateContent) {
  //       onRegenerateContent();
  //     }
  //     setTimeout(() => setRegenerating(false), 3000);
  //   };

  //   const handleShareContent = () => {
  //     if (navigator.share) {
  //       navigator.share({
  //         title: displayContent.title,
  //         text: displayContent.summary,
  //         url: window.location.href,
  //       });
  //     }
  //   };

  //   const handleDownload = () => {
  //     const element = document.createElement("a");
  //     const file = new Blob([JSON.stringify(displayContent, null, 2)], {
  //       type: "text/plain",
  //     });
  //     element.href = URL.createObjectURL(file);
  //     element.download = `${displayContent.title.replace(
  //       /\s+/g,
  //       "_"
  //     )}_summary.txt`;
  //     document.body.appendChild(element);
  //     element.click();
  //     document.body.removeChild(element);
  //   };

  useEffect(() => {
    if (lectures || caseStudies || assignments) {
      setIsLoading(true);
      getSummary(lectures || caseStudies || assignments).then((res) => {
        setDisplayContent(res.data);
        setIsLoading(false);
      });
    }
  }, [lectures, caseStudies, assignments]);

  if (isLoading) {
    return <SummarySkeleton sx={{ mt: 2 }} />;
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
          AI-Generated Summary
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Intelligent content transformation powered by advanced AI
        </Typography>

        {/* Metadata Chips */}
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={1}
          mb={3}
        >
          {/* <Chip
            icon={<AutoAwesome />}
            label={displayMetadata.aiModel}
            color="primary"
            variant="outlined"
          /> */}
          {/* <Chip
            icon={<Timer />}
            label={displayContent?.["readingTime" + "_" + selectedLanguage]}
            color="secondary"
            variant="outlined"
          /> */}
          {/* <Chip
            icon={<Language />}
            label={displayContent.language}
            color="info"
            variant="outlined"
          /> */}

          {/* <Chip
            label={displayContent?.["difficulty" + "_" + selectedLanguage]}
            color="warning"
            variant="outlined"
          />

          {/* Language Dropdown */}
          {/* <FormControl size="small" variant="outlined">
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
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>  */}

          {languageOptions.map((option) => (
            <Chip
              onClick={() => setSelectedLanguage(option.value)}
              key={option.value}
              label={option.label}
              color="secondary"
              variant={
                option.value === selectedLanguage ? "filled" : "outlined"
              }
            />
          ))}
        </Box>
      </Box>

      {/* Main Content Card */}
      <GradientCard elevation={6}>
        <CardContent sx={{ p: 4 }}>
          {/* Title and Summary Section */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={3}
          >
            <Box flex={1}>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                {displayContent?.["title" + "_" + selectedLanguage]}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1.1rem", lineHeight: 1.6 }}
              >
                {/* {selectedLanguage === "English"
                  ? displayContent.summaryEnglish
                  : selectedLanguage === "Hindi"
                  ? displayContent.summaryHindi
                  : displayContent.summaryMarathi} */}
                {displayContent?.["summary" + "_" + selectedLanguage]}
              </Typography>
            </Box>

            <IconButton
              onClick={() => setBookmarked(!bookmarked)}
              sx={{ ml: 2 }}
              color="primary"
            >
              {bookmarked ? <Bookmark /> : <BookmarkBorder />}
            </IconButton>
          </Box>

          {/* Progress Indicator */}
          {/* <Box mb={4}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography variant="body2" color="text.secondary">
                Content Comprehensiveness
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                {displayContent.completionRate}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={displayContent.completionRate}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: "rgba(0,0,0,0.1)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                  background: "linear-gradient(90deg, #667eea, #764ba2)",
                },
              }}
            />
          </Box> */}

          <Divider sx={{ my: 3 }} />

          {/* Expandable Content Section */}
          <Box>
            <Button
              onClick={() => setExpanded(!expanded)}
              endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
              sx={{ mb: 2, textTransform: "none", fontWeight: "bold" }}
            >
              {expanded ? "Collapse Details" : "View Detailed Content"}
            </Button>

            <Collapse in={expanded}>
              <Grid container spacing={3}>
                {/* Key Points Section */}
                <Grid item xs={12} md={6}>
                  <ContentSection>
                    <Box display="flex" alignItems="center" mb={2}>
                      <CheckCircle sx={{ color: "success.main", mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Key Learning Points
                      </Typography>
                    </Box>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {displayContent?.[
                        "keyPoints" + "_" + selectedLanguage
                      ]?.map((point, index) => (
                        <Typography
                          key={index}
                          component="li"
                          variant="body2"
                          sx={{ mb: 1, lineHeight: 1.6 }}
                        >
                          {point}
                        </Typography>
                      ))}
                    </Box>
                  </ContentSection>
                </Grid>

                {/* Insights Section */}
                <Grid item xs={12} md={6}>
                  <ContentSection>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Lightbulb sx={{ color: "warning.main", mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Key Insights
                      </Typography>
                    </Box>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {displayContent?.[
                        "insights" + "_" + selectedLanguage
                      ]?.map((insight, index) => (
                        <Typography
                          key={index}
                          component="li"
                          variant="body2"
                          sx={{ mb: 1, lineHeight: 1.6, fontStyle: "italic" }}
                        >
                          {insight}
                        </Typography>
                      ))}
                    </Box>
                  </ContentSection>
                </Grid>

                {/* Action Items Section */}
                <Grid item xs={12}>
                  <ContentSection>
                    <Box display="flex" alignItems="center" mb={2}>
                      <AutoAwesome sx={{ color: "primary.main", mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Recommended Action Items
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      {displayContent?.[
                        "actionItems" + "_" + selectedLanguage
                      ]?.map((item, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Paper
                            sx={{
                              p: 2,
                              backgroundColor: "primary.main",
                              color: "white",
                              borderRadius: 2,
                              textAlign: "center",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "medium" }}
                            >
                              {item}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </ContentSection>
                </Grid>
              </Grid>
            </Collapse>
          </Box>
        </CardContent>
      </GradientCard>

      {/* Action Buttons */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={2}
        mt={4}
      >
        <ActionButton
          variant="contained"
          startIcon={<ContentCopy />}
          onClick={handleCopyContent}
          color={copied ? "success" : "primary"}
        >
          {copied ? "Copied!" : "Copy Content"}
        </ActionButton>

        {/* <ActionButton
          variant="outlined"
          startIcon={<Download />}
          onClick={handleDownload}
          color="primary"
        >
          Download
        </ActionButton> */}

        {/* <ActionButton
          variant="outlined"
          startIcon={<Share />}
          onClick={handleShareContent}
          color="secondary"
        >
          Share
        </ActionButton> */}

        {/* <ActionButton
          variant="contained"
          startIcon={
            regenerating ? <AutoAwesome className="spinning" /> : <Refresh />
          }
          onClick={handleRegenerateContent}
          disabled={regenerating}
          sx={{
            // background: "linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)",
            // "&:hover": {
            //   background: "linear-gradient(45deg, #FF6B6B 50%, #4ECDC4 100%)",
            // },
            background: "linear-gradient(45deg, #673AB7 30%, #3F51B5 90%)",
          }}
        >
          {regenerating ? "Regenerating..." : "Regenerate"}
        </ActionButton> */}
      </Box>

      {/* Success Alert */}
      {copied && (
        <Alert
          severity="success"
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            minWidth: 250,
            zIndex: 1000,
          }}
        >
          Content copied to clipboard successfully!
        </Alert>
      )}

      {/* Regeneration Progress */}
      {/* {regenerating && (
        <Alert
          severity="info"
          sx={{
            position: "fixed",
            bottom: 20,
            left: 20,
            minWidth: 300,
            zIndex: 1000,
          }}
        >
          <Box>
            <Typography variant="body2" gutterBottom>
              Regenerating content with AI...
            </Typography>
            <LinearProgress sx={{ mt: 1 }} />
          </Box>
        </Alert>
      )} */}

      {/* Metadata Footer */}
      {/* <Paper
        sx={{
          mt: 4,
          p: 2,
          backgroundColor: "grey.50",
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Generated on {displayMetadata.generatedAt} • Processing time:{" "}
          {displayMetadata.processingTime} • Subject: {displayMetadata.subject}{" "}
          • Format: {displayMetadata.format}
        </Typography>
      </Paper> */}

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

export default ShortForm;
