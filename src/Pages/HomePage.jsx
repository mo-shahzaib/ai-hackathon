import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[8],
  },
}));

const HomePage = () => {
  const navigate = useNavigate();

  // Academic degree programs data
  const programs = [
    {
      id: 1,
      title: "Bachelor of Business Administration (BBA)",
      description:
        "Comprehensive business program covering management, finance, marketing, and entrepreneurship fundamentals.",
      duration: "3 years",
      level: "Undergraduate",
      category: "Business",
      ready: true,
    },
    {
      id: 2,
      title: "Bachelor of Computer Applications (BCA)",
      description:
        "Computer science degree focusing on programming, software development, and IT applications.",
      duration: "3 years",
      level: "Undergraduate",
      category: "Technology",
      ready: false,
    },
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case "Undergraduate":
        return "primary";
      case "Postgraduate":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          component="h1"
          // gutterBottom
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: "4px",
          }}
        >
          Programs
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 600, mx: "auto" }}
        >
          Explore our comprehensive academic degree programs designed to shape
          your future and build a strong foundation for your career.
        </Typography>
      </Box>

      {/* Programs Row Layout */}
      <Box sx={{ pb: 2 }}>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            minWidth: "fit-content",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {programs.map((program) => (
            <StyledCard
              key={program.id}
              sx={{
                minWidth: 350,
                maxWidth: 350,
                opacity: program.ready ? 1 : 0.5,
                cursor: program.ready ? "pointer" : "not-allowed",
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  p: 3,
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Chip
                    label={program.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label={program.level}
                    size="small"
                    color={getLevelColor(program.level)}
                  />
                </Box>

                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {program.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {program.description}
                </Typography>

                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ fontWeight: "medium" }}
                >
                  Duration: {program.duration}
                </Typography>
              </CardContent>

              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                  disabled={!program.ready}
                  variant="contained"
                  fullWidth
                  onClick={() =>
                    navigate(
                      `/subjects?program=${encodeURIComponent(program.title)}`
                    )
                  }
                  sx={{
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  {program.ready ? "View Subjects" : "Coming Soon"}
                </Button>
              </CardActions>
            </StyledCard>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
