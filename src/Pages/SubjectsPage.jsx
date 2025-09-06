import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  Button,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Book,
  Science,
  Calculate,
  Language,
  Psychology,
  AccountBalance,
  Computer,
  Business,
  Close,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useSearchParams, useNavigate } from "react-router-dom";

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

const ModalContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
}));

const SubjectsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const programName = searchParams.get("program") || "All Programs";

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");

  // Hardcoded subjects data organized by program type
  const subjectsByProgram = {
    BBA: [
      {
        id: 1,
        name: "Business Management",
        code: "BM101",
        icon: <Business />,
        difficulty: "Beginner",
        credits: 4,
      },
      {
        id: 2,
        name: "Financial Accounting",
        code: "FA102",
        icon: <AccountBalance />,
        difficulty: "Intermediate",
        credits: 4,
      },
      {
        id: 3,
        name: "Marketing Management",
        code: "MM103",
        icon: <Psychology />,
        difficulty: "Intermediate",
        credits: 3,
      },
      {
        id: 4,
        name: "Organizational Behavior",
        code: "OB104",
        icon: <Psychology />,
        difficulty: "Advanced",
        credits: 3,
      },
      {
        id: 5,
        name: "Business Statistics",
        code: "BS105",
        icon: <Calculate />,
        difficulty: "Intermediate",
        credits: 4,
      },
      {
        id: 6,
        name: "Business Law",
        code: "BL106",
        icon: <AccountBalance />,
        difficulty: "Advanced",
        credits: 3,
      },
    ],
    BCA: [
      {
        id: 7,
        name: "Programming in C",
        code: "PC101",
        icon: <Computer />,
        difficulty: "Beginner",
        credits: 4,
      },
      {
        id: 8,
        name: "Data Structures",
        code: "DS102",
        icon: <Computer />,
        difficulty: "Intermediate",
        credits: 4,
      },
      {
        id: 9,
        name: "Database Management",
        code: "DB103",
        icon: <Computer />,
        difficulty: "Intermediate",
        credits: 4,
      },
      {
        id: 10,
        name: "Web Development",
        code: "WD104",
        icon: <Computer />,
        difficulty: "Intermediate",
        credits: 3,
      },
      {
        id: 11,
        name: "Software Engineering",
        code: "SE105",
        icon: <Computer />,
        difficulty: "Advanced",
        credits: 4,
      },
      {
        id: 12,
        name: "Computer Networks",
        code: "CN106",
        icon: <Computer />,
        difficulty: "Advanced",
        credits: 3,
      },
    ],
    "B.Com": [
      {
        id: 13,
        name: "Corporate Accounting",
        code: "CA101",
        icon: <AccountBalance />,
        difficulty: "Intermediate",
        credits: 4,
      },
      {
        id: 14,
        name: "Business Economics",
        code: "BE102",
        icon: <Business />,
        difficulty: "Beginner",
        credits: 4,
      },
      {
        id: 15,
        name: "Income Tax",
        code: "IT103",
        icon: <AccountBalance />,
        difficulty: "Advanced",
        credits: 3,
      },
      {
        id: 16,
        name: "Auditing",
        code: "AU104",
        icon: <AccountBalance />,
        difficulty: "Advanced",
        credits: 4,
      },
      {
        id: 17,
        name: "Cost Accounting",
        code: "CA105",
        icon: <Calculate />,
        difficulty: "Intermediate",
        credits: 4,
      },
      {
        id: 18,
        name: "Banking & Insurance",
        code: "BI106",
        icon: <Business />,
        difficulty: "Intermediate",
        credits: 3,
      },
    ],
    MBA: [
      {
        id: 19,
        name: "Strategic Management",
        code: "SM201",
        icon: <Business />,
        difficulty: "Advanced",
        credits: 4,
      },
      {
        id: 20,
        name: "Financial Management",
        code: "FM202",
        icon: <AccountBalance />,
        difficulty: "Advanced",
        credits: 4,
      },
      {
        id: 21,
        name: "Human Resource Management",
        code: "HR203",
        icon: <Psychology />,
        difficulty: "Advanced",
        credits: 3,
      },
      {
        id: 22,
        name: "Operations Research",
        code: "OR204",
        icon: <Calculate />,
        difficulty: "Advanced",
        credits: 4,
      },
      {
        id: 23,
        name: "International Business",
        code: "IB205",
        icon: <Business />,
        difficulty: "Advanced",
        credits: 3,
      },
      {
        id: 24,
        name: "Business Analytics",
        code: "BA206",
        icon: <Science />,
        difficulty: "Advanced",
        credits: 4,
      },
    ],
    BA: [
      {
        id: 25,
        name: "English Literature",
        code: "EL101",
        icon: <Language />,
        difficulty: "Beginner",
        credits: 4,
      },
      {
        id: 26,
        name: "Political Science",
        code: "PS102",
        icon: <AccountBalance />,
        difficulty: "Intermediate",
        credits: 4,
      },
      {
        id: 27,
        name: "Sociology",
        code: "SO103",
        icon: <Psychology />,
        difficulty: "Intermediate",
        credits: 3,
      },
      {
        id: 28,
        name: "History",
        code: "HI104",
        icon: <Book />,
        difficulty: "Beginner",
        credits: 3,
      },
      {
        id: 29,
        name: "Philosophy",
        code: "PH105",
        icon: <Psychology />,
        difficulty: "Advanced",
        credits: 3,
      },
      {
        id: 30,
        name: "Psychology",
        code: "PS106",
        icon: <Psychology />,
        difficulty: "Intermediate",
        credits: 4,
      },
    ],
    MCA: [
      {
        id: 31,
        name: "Advanced Programming",
        code: "AP301",
        icon: <Computer />,
        difficulty: "Advanced",
        credits: 4,
      },
      {
        id: 32,
        name: "Machine Learning",
        code: "ML302",
        icon: <Science />,
        difficulty: "Advanced",
        credits: 4,
      },
      {
        id: 33,
        name: "System Analysis & Design",
        code: "SA303",
        icon: <Computer />,
        difficulty: "Advanced",
        credits: 4,
      },
      {
        id: 34,
        name: "Mobile Computing",
        code: "MC304",
        icon: <Computer />,
        difficulty: "Advanced",
        credits: 3,
      },
      {
        id: 35,
        name: "Cloud Computing",
        code: "CC305",
        icon: <Computer />,
        difficulty: "Advanced",
        credits: 3,
      },
      {
        id: 36,
        name: "Cyber Security",
        code: "CS306",
        icon: <Computer />,
        difficulty: "Advanced",
        credits: 4,
      },
    ],
  };

  // Get subjects based on selected program
  const getSubjectsForProgram = (program) => {
    if (program === "All Programs") {
      return Object.values(subjectsByProgram).flat();
    }

    // Extract the program acronym from full name
    const programKey = program.split("(")[1]?.replace(")", "") || program;
    return subjectsByProgram[programKey] || [];
  };

  const subjects = getSubjectsForProgram(programName);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "success";
      case "Intermediate":
        return "warning";
      case "Advanced":
        return "error";
      default:
        return "default";
    }
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedSubject(null);
    setSelectedSemester("");
    setSelectedFormat("");
  };

  const handleEnrollClick = () => {
    if (selectedSemester && selectedFormat) {
      // Navigate to content repurposing page with subject info
      navigate(
        `/content-repurposing?subject=${selectedSubject?.name}&semester=${selectedSemester}&format=${selectedFormat}`
      );
      handleModalClose();
    }
  };

  const semesters = [
    "Semester 1",
    "Semester 2",
    "Semester 3",
    "Semester 4",
    "Semester 5",
    "Semester 6",
  ];
  const formats = [
    "Online Live Classes",
    "Recorded Videos",
    "Self-Paced Learning",
    "Hybrid Mode",
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Button
          variant="outlined"
          onClick={() => navigate("/")}
          sx={{ mb: 2, alignSelf: "flex-start" }}
        >
          ← Back to Programs
        </Button>

        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #673AB7 30%, #3F51B5 90%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Subjects
        </Typography>

        <Chip
          label={programName}
          color="primary"
          variant="outlined"
          sx={{ fontSize: "1rem", py: 2, px: 1, mb: 2 }}
        />

        <Typography variant="h6" color="text.secondary">
          Choose from {subjects.length} available subjects in {programName}
        </Typography>
      </Box>

      {/* Subjects Grid */}
      <Grid container spacing={3}>
        {subjects.map((subject) => (
          <Grid item xs={12} sm={6} md={4} key={subject.id}>
            <StyledCard onClick={() => handleSubjectClick(subject)}>
              <CardContent sx={{ p: 3 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Box sx={{ color: "primary.main", fontSize: 30 }}>
                    {subject.icon}
                  </Box>
                  <Chip
                    label={subject.difficulty}
                    size="small"
                    color={getDifficultyColor(subject.difficulty)}
                  />
                </Box>

                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {subject.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Subject Code: {subject.code}
                </Typography>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={2}
                >
                  <Chip
                    label={`${subject.credits} Credits`}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ fontWeight: "medium" }}
                  >
                    Click to Enroll →
                  </Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {subjects.length === 0 && (
        <Box textAlign="center" mt={6}>
          <Typography variant="h6" color="text.secondary">
            No subjects found for {programName}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{ mt: 2 }}
          >
            Browse All Programs
          </Button>
        </Box>
      )}

      {/* Enrollment Modal */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <ModalContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
              Enroll in Subject
            </Typography>
            <IconButton onClick={handleModalClose} size="small">
              <Close />
            </IconButton>
          </Box>

          {selectedSubject && (
            <>
              <Box display="flex" alignItems="center" mb={3}>
                <Box sx={{ color: "primary.main", mr: 2, fontSize: 30 }}>
                  {selectedSubject.icon}
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {selectedSubject.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedSubject.code} • {selectedSubject.credits} Credits
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Semester Dropdown */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select Semester</InputLabel>
                <Select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  label="Select Semester"
                >
                  {semesters.map((semester) => (
                    <MenuItem key={semester} value={semester}>
                      {semester}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Format Dropdown */}
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel>Learning Format</InputLabel>
                <Select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  label="Learning Format"
                >
                  {formats.map((format) => (
                    <MenuItem key={format} value={format}>
                      {format}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* CTA Button */}
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleEnrollClick}
                disabled={!selectedSemester || !selectedFormat}
                sx={{
                  py: 1.5,
                  background:
                    "linear-gradient(45deg, #673AB7 30%, #3F51B5 90%)",
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                Start Learning Journey
              </Button>

              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                sx={{ mt: 2 }}
              >
                You'll be redirected to our AI-powered content platform
              </Typography>
            </>
          )}
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default SubjectsPage;
