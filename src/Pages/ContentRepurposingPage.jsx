import React, { useState } from "react";
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
  Alert,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  CloudUpload,
  Transform,
  Language,
  Quiz,
  Article,
  VideoLibrary,
  Download,
  Refresh,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[8],
  },
}));

const UploadArea = styled(Paper)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.light + "10",
  },
}));

const ContentRepurposingPage = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState([]);
  const [processingStep, setProcessingStep] = useState("");

  const contentFormats = [
    {
      id: "short-form",
      label: "Short-form Content",
      icon: <Article />,
      description: "Bite-sized summaries and key points",
    },
    {
      id: "quiz",
      label: "Interactive Quiz",
      icon: <Quiz />,
      description: "Auto-generated questions and answers",
    },
    {
      id: "video-script",
      label: "Video Script",
      icon: <VideoLibrary />,
      description: "Structured script for video content",
    },
    {
      id: "infographic",
      label: "Infographic Text",
      icon: <Transform />,
      description: "Visual content structure",
    },
    {
      id: "flashcards",
      label: "Flashcards",
      icon: <Refresh />,
      description: "Study cards with key concepts",
    },
  ];

  const languages = [
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "bn", name: "Bengali", flag: "🇧🇩" },
    { code: "ta", name: "Tamil", flag: "🇮🇳" },
    { code: "te", name: "Telugu", flag: "🇮🇳" },
    { code: "mr", name: "Marathi", flag: "🇮🇳" },
    { code: "gu", name: "Gujarati", flag: "🇮🇳" },
    { code: "kn", name: "Kannada", flag: "🇮🇳" },
    { code: "ml", name: "Malayalam", flag: "🇮🇳" },
    { code: "pa", name: "Punjabi", flag: "🇮🇳" },
    { code: "or", name: "Odia", flag: "🇮🇳" },
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleFormatChange = (formatId) => {
    setSelectedFormats((prev) =>
      prev.includes(formatId)
        ? prev.filter((id) => id !== formatId)
        : [...prev, formatId]
    );
  };

  const handleLanguageChange = (event) => {
    const value = event.target.value;
    setSelectedLanguages(typeof value === "string" ? value.split(",") : value);
  };

  const processContent = async () => {
    if (!uploadedFile || selectedFormats.length === 0) {
      return;
    }

    setProcessing(true);
    setResults([]);

    try {
      const { aiService } = await import("../services/aiService");

      // Show processing steps
      setProcessingStep("Reading and analyzing content...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setProcessingStep("Generating different formats...");
      const processedResults = await aiService.processContent(
        uploadedFile,
        selectedFormats,
        selectedLanguages
      );

      setProcessingStep("Finalizing outputs...");
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Format results for display
      const formattedResults = processedResults.map((result) => {
        const format = contentFormats.find((f) => f.id === result.formatId);
        return {
          id: result.formatId,
          format: format.label,
          languages: Object.keys(result.contentVersions),
          content: result.contentVersions,
          downloadUrl: "#",
        };
      });

      setResults(formattedResults);
    } catch (error) {
      console.error("Processing error:", error);
    } finally {
      setProcessing(false);
      setProcessingStep("");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          AI Content Repurposing & Localization
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 800, mx: "auto" }}
        >
          Transform your educational content into multiple formats and languages
          automatically
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Upload Section */}
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                display="flex"
                alignItems="center"
              >
                <CloudUpload sx={{ mr: 1 }} />
                Upload Content
              </Typography>

              <input
                accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
                style={{ display: "none" }}
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
              />

              <label htmlFor="file-upload">
                <UploadArea component="div">
                  <CloudUpload
                    sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
                  />
                  <Typography variant="body1" gutterBottom>
                    {uploadedFile
                      ? uploadedFile.name
                      : "Click to upload your content"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Supports PDF, DOC, TXT, PPT files
                  </Typography>
                </UploadArea>
              </label>

              {uploadedFile && (
                <Box mt={2}>
                  <Alert severity="success">
                    File uploaded successfully: {uploadedFile.name}
                  </Alert>
                </Box>
              )}
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Format Selection */}
        <Grid item xs={12} md={4}>
          <StyledCard sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                display="flex"
                alignItems="center"
              >
                <Transform sx={{ mr: 1 }} />
                Output Formats
              </Typography>

              <FormGroup>
                {contentFormats.map((format) => (
                  <Tooltip
                    key={format.id}
                    title={format.description}
                    placement="right"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedFormats.includes(format.id)}
                          onChange={() => handleFormatChange(format.id)}
                          color="primary"
                        />
                      }
                      label={
                        <Box display="flex" alignItems="center">
                          {format.icon}
                          <Typography sx={{ ml: 1 }}>{format.label}</Typography>
                        </Box>
                      }
                    />
                  </Tooltip>
                ))}
              </FormGroup>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Language Selection */}
        <Grid item xs={12} md={4}>
          <StyledCard sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                display="flex"
                alignItems="center"
              >
                <Language sx={{ mr: 1 }} />
                Languages
              </Typography>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Select Languages</InputLabel>
                <Select
                  multiple
                  value={selectedLanguages}
                  onChange={handleLanguageChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => {
                        const lang = languages.find((l) => l.code === value);
                        return (
                          <Chip
                            key={value}
                            label={`${lang?.flag} ${lang?.name}`}
                            size="small"
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {languages.map((language) => (
                    <MenuItem key={language.code} value={language.code}>
                      {language.flag} {language.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Leave empty for English only
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Process Button */}
      <Box textAlign="center" my={4}>
        <Button
          variant="contained"
          size="large"
          onClick={processContent}
          disabled={!uploadedFile || selectedFormats.length === 0 || processing}
          startIcon={
            processing ? <Refresh className="spinning" /> : <Transform />
          }
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            background: "linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)",
          }}
        >
          {processing ? "Processing..." : "Transform Content"}
        </Button>
      </Box>

      {/* Processing Status */}
      {processing && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Processing Content...
            </Typography>
            <LinearProgress sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              {processingStep}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results.length > 0 && (
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              display="flex"
              alignItems="center"
            >
              <Download sx={{ mr: 1 }} />
              Generated Content
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              {results.map((result) => (
                <Grid item xs={12} sm={6} md={4} key={result.id}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {result.format}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {result.content}
                    </Typography>
                    <Box>
                      {result.languages.map((langCode) => {
                        const lang = languages.find(
                          (l) => l.code === langCode
                        ) || { code: "en", name: "English", flag: "🇺🇸" };
                        return (
                          <Chip
                            key={langCode}
                            label={`${lang.flag} ${lang.name}`}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        );
                      })}
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Download />}
                      sx={{ mt: 1 }}
                      fullWidth
                    >
                      Download
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

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
