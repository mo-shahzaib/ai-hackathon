import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
} from "@mui/material";
import { PlayCircleOutline, Code, Assessment } from "@mui/icons-material";

const DemoPage = () => {
  const demoFeatures = [
    {
      title: "Real-time Content Analysis",
      description:
        "Upload any educational content and watch AI analyze and extract key concepts instantly.",
      icon: <Assessment sx={{ fontSize: 40 }} />,
      demo: "Try uploading a PDF lecture or case study",
    },
    {
      title: "Multi-format Generation",
      description:
        "Transform content into quizzes, short-form summaries, video scripts, and more.",
      icon: <PlayCircleOutline sx={{ fontSize: 40 }} />,
      demo: "See live examples of generated formats",
    },
    {
      title: "Smart Localization",
      description:
        "Automatically translate content into 10+ regional Indian languages while preserving context.",
      icon: <Code sx={{ fontSize: 40 }} />,
      demo: "Watch AI translate technical content accurately",
    },
  ];

  const sampleOutputs = {
    original: `Machine learning is a method of data analysis that automates analytical model building. It is a branch of artificial intelligence (AI) based on the idea that systems can learn from data, identify patterns and make decisions with minimal human intervention.`,

    shortForm: `🔍 **Machine Learning Essentials:**
• Automates data analysis through model building
• Branch of AI focused on pattern recognition
• Systems learn from data with minimal human input
• Identifies patterns → Makes decisions independently`,

    quiz: `**Q1:** What is machine learning?
A) Manual data analysis
B) Automated analytical model building ✓
C) Human decision making
D) Pattern destruction

**Q2:** Machine learning is a branch of which field?
A) Statistics
B) Mathematics  
C) Artificial Intelligence ✓
D) Computer Science`,

    hindi: `मशीन लर्निंग डेटा विश्लेषण की एक विधि है जो विश्लेषणात्मक मॉडल निर्माण को स्वचालित करती है। यह कृत्रिम बुद्धिमत्ता (AI) की एक शाखा है जो इस विचार पर आधारित है कि सिस्टम डेटा से सीख सकते हैं, पैटर्न की पहचान कर सकते हैं और न्यूनतम मानवीय हस्तक्षेप के साथ निर्णय ले सकते हैं।`,
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
            background: "linear-gradient(45deg, #9C27B0 30%, #E91E63 90%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Live Demo
        </Typography>
        <Typography variant="h6" color="text.secondary">
          See AI-Powered Content Repurposing in Action
        </Typography>
      </Box>

      {/* Features Demo */}
      <Grid container spacing={4} mb={6}>
        {demoFeatures.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <Box sx={{ color: "primary.main", mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {feature.description}
                </Typography>
                <Chip label={feature.demo} color="primary" variant="outlined" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Sample Transformations */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom textAlign="center" mb={4}>
            Sample Content Transformations
          </Typography>

          <Grid container spacing={3}>
            {/* Original Content */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: 2 }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  📄 Original Content
                </Typography>
                <Typography variant="body2">
                  {sampleOutputs.original}
                </Typography>
              </Box>
            </Grid>

            {/* Short Form */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "info.light",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  ⚡ Short-form Summary
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                  {sampleOutputs.shortForm}
                </Typography>
              </Box>
            </Grid>

            {/* Quiz */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "success.light",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  📝 Interactive Quiz
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                  {sampleOutputs.quiz}
                </Typography>
              </Box>
            </Grid>

            {/* Hindi Translation */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "warning.light",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  🇮🇳 Hindi Translation
                </Typography>
                <Typography variant="body2">{sampleOutputs.hindi}</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Box textAlign="center" mt={6}>
        <Typography variant="h6" gutterBottom>
          Ready to Transform Your Content?
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            px: 4,
            py: 2,
            background: "linear-gradient(45deg, #9C27B0 30%, #E91E63 90%)",
          }}
          href="/content-repurposing"
        >
          Try It Now
        </Button>
      </Box>
    </Container>
  );
};

export default DemoPage;
