import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Paper,
  Avatar,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import {
  Warning,
  Info,
  Email,
  Person,
  LocationOn,
  Code,
  GitHub,
  Cloud,
  AttachMoney,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

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

const TeamCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
  border: `2px solid ${theme.palette.primary.main}20`,
  borderRadius: "16px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
    background: `linear-gradient(135deg, ${theme.palette.secondary.main}12 0%, ${theme.palette.primary.main}12 100%)`,
  },
}));

const DisclaimerPage = () => {
  const teamMembers = [
    {
      name: "Mohammad Shahzaib",
      role: "Team Lead",
      email: "mohammad.shahzaib@upgrad.com",
      location: "Pune",
      avatar: "MS",
      color: "#667eea",
    },
    {
      name: "Manu Gupta",
      role: "Team Member",
      email: "manu.gupta@upgrad.com",
      location: "Pune",
      avatar: "MG",
      color: "#764ba2",
    },
    {
      name: "Yogendra Mahajan",
      role: "Team Member",
      email: "yogendra.mahajan@upgrad.com",
      location: "Pune",
      avatar: "YM",
      color: "#f093fb",
    },
    {
      name: "Nicola Mascarenhas",
      role: "Team Member",
      email: "nicola.mascarenhas@upgrad.com",
      location: "Pune",
      avatar: "NM",
      color: "#f5576c",
    },
  ];

  const limitations = [
    "Free API rate limits may cause temporary service interruptions",
    "Limited storage capacity for generated content",
    "Processing time may vary based on external service availability",
    "Some advanced features may have usage restrictions",
    // "Audio generation quality depends on third-party TTS services",
  ];

  const technologies = [
    "React.js - Frontend Framework",
    "Material-UI - Component Library",
    "Groq API - AI Language Processing",
    // "Free TTS Services - Audio Generation",
    "Open Source Libraries - Various utilities",
  ];

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
          Project Disclaimer
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          AI Hackathon Project - Service Limitations & Contact Information
        </Typography>

        {/* Status Chips */}
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={1}
          mb={3}
        >
          <Chip
            icon={<Warning />}
            label="Hackathon Project"
            color="warning"
            variant="outlined"
          />
          <Chip
            icon={<Code />}
            label="Open Source"
            color="primary"
            variant="outlined"
          />
          <Chip
            icon={<AttachMoney />}
            label="Free Services Only"
            color="secondary"
            variant="outlined"
          />
        </Box>

        <Button
          size="large"
          variant="contained"
          color="primary"
          component={Link}
          to="/home"
          sx={{
            background: "linear-gradient(45deg, #673AB7 30%, #3F51B5 90%)",
          }}
        >
          Get Started
        </Button>
      </Box>

      {/* Main Disclaimer Card */}
      <GradientCard elevation={6} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Important Notice
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body1">
              This is a hackathon project built using exclusively{" "}
              <strong>free and open-source services</strong>. We may have
              reached the free tier limits of various external APIs and services
              due to the lack of provided credits for hosting and third-party
              integrations.
            </Typography>
          </Alert>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", mt: 3 }}
          >
            Service Limitations
          </Typography>
          <List>
            {limitations.map((limitation, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Info color="warning" />
                </ListItemIcon>
                <ListItemText primary={limitation} />
              </ListItem>
            ))}
          </List>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", mt: 3 }}
          >
            Technologies Used
          </Typography>
          <List>
            {technologies.map((tech, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <GitHub color="primary" />
                </ListItemIcon>
                <ListItemText primary={tech} />
              </ListItem>
            ))}
          </List>

          <Box mt={3}>
            <Alert severity="warning">
              <Typography variant="body2">
                <strong>Expected Issues:</strong> Due to free tier limitations,
                you may encounter rate limiting, reduced functionality, or
                temporary unavailability of certain features.
              </Typography>
            </Alert>
          </Box>
        </CardContent>
      </GradientCard>

      {/* Team Contact Information */}
      <GradientCard elevation={6}>
        <CardContent sx={{ p: 4 }}>
          <Box textAlign="center" mb={4}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Meet Our Team
            </Typography>
            <Typography variant="body1" color="text.secondary">
              If you encounter any issues or have questions, please reach out to
              any of our team members
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <TeamCard>
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <Avatar
                      sx={{
                        width: 64,
                        height: 64,
                        bgcolor: member.color,
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      {member.avatar}
                    </Avatar>

                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      {member.name}
                    </Typography>

                    {/* <Chip
                      label={member.role}
                      color={index === 0 ? "primary" : "secondary"}
                      variant="outlined"
                      size="small"
                      sx={{ mb: 2 }}
                    /> */}

                    <Divider sx={{ my: 2 }} />

                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mb={1}
                    >
                      <Email
                        sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
                      />
                      <Typography
                        variant="body2"
                        color="primary"
                        sx={{ fontWeight: "medium" }}
                      >
                        {member.email}
                      </Typography>
                    </Box>

                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <LocationOn
                        sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {member.location}
                      </Typography>
                    </Box>
                  </CardContent>
                </TeamCard>
              </Grid>
            ))}
          </Grid>

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
              <Typography
                variant="body1"
                color="text.primary"
                sx={{ fontWeight: "medium", mb: 1 }}
              >
                Need Support?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Feel free to contact any team member if you experience issues
                with the platform. We're here to help and explain our
                implementation approach.
              </Typography>
            </Paper>
          </Box>
        </CardContent>
      </GradientCard>
    </Container>
  );
};

export default DisclaimerPage;
