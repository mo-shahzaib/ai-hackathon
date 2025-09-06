import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Summarize,
  Quiz,
  Style,
  Podcasts,
  AutoAwesome,
  Language,
  SmartToy,
  Mic,
} from "@mui/icons-material";

// Styled components
const FeatureCard = styled(Card)(() => ({
  height: "100%",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  border: "none",
  borderRadius: "20px",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  //   cursor: "pointer",
  //   "&:hover": {
  //     transform: "translateY(-12px) scale(1.02)",
  //     boxShadow: `0 20px 40px rgba(102, 126, 234, 0.3)`,
  //   },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
    zIndex: 1,
  },
}));

const FeatureCardContent = styled(CardContent)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  color: "white",
  padding: theme.spacing(3),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
}));

const IconWrapper = styled(Box)(() => ({
  width: 80,
  height: 80,
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 16px",
  backdropFilter: "blur(10px)",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  transition: "all 0.3s ease",
  "& svg": {
    fontSize: 40,
    color: "white",
  },
}));

const FeatureChip = styled(Chip)(() => ({
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  color: "white",
  fontWeight: "bold",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(10px)",
  "& .MuiChip-icon": {
    color: "white",
  },
}));

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "Short-form Content",
      description:
        "Get AI-powered summarization of complex content in multiple languages. Perfect for quick understanding and revision.",
      icon: <Summarize />,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      tags: ["AI Powered", "Multi-language"],
      tagIcons: [<AutoAwesome key="ai" />, <Language key="lang" />],
    },

    {
      id: 4,
      title: "AI Podcasts",
      description:
        "Transform your lectures and case studies into engaging AI-generated podcasts. Learn while you listen.",
      icon: <Podcasts />,
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      tags: ["Voice AI", "On-the-go"],
      tagIcons: [<Mic key="voice" />, <Podcasts key="podcast" />],
    },
    {
      id: 3,
      title: "Flash Cards",
      description:
        "Smart flashcards automatically generated from your content. Enhance memory retention with spaced repetition.",
      icon: <Style />,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      tags: ["Smart Cards", "Memory Boost"],
      tagIcons: [<AutoAwesome key="smart" />, <Style key="cards" />],
    },
    {
      id: 2,
      title: "Interactive Quiz",
      description:
        "AI-generated quizzes tailored to your content. Test your knowledge with smart, adaptive questions.",
      icon: <Quiz />,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      tags: ["AI Generated", "Adaptive"],
      tagIcons: [<SmartToy key="ai" />, <AutoAwesome key="adaptive" />],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 1, mb: 8 }}>
      {/* Header Section */}
      <Box textAlign="center" mb={2}>
        <Typography
          variant="h4"
          component="h2"
          //   gutterBottom
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            // mb: "4px",
          }}
        >
          Core Features
        </Typography>
        {/* <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 700, mx: "auto", lineHeight: 1.6 }}
        >
          Discover our AI-powered learning tools designed to transform how you
          study, understand, and retain knowledge across all your academic
          programs.
        </Typography> */}
      </Box>

      {/* Features Grid */}
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={3} key={feature.id} width="350px">
            <FeatureCard
              sx={{
                background: feature.gradient,
              }}
            >
              <FeatureCardContent>
                <IconWrapper>{feature.icon}</IconWrapper>

                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    // textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.95,
                    lineHeight: 1.5,
                    flexGrow: 1,
                    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  {feature.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "center",
                    flexWrap: "wrap",
                    mt: 2,
                  }}
                >
                  {feature.tags.map((tag, index) => (
                    <FeatureChip
                      key={tag}
                      label={tag}
                      size="small"
                      icon={feature.tagIcons[index]}
                      variant="outlined"
                    />
                  ))}
                </Box>
              </FeatureCardContent>
            </FeatureCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FeaturesSection;
