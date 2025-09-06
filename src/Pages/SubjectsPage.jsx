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
import {
  formats,
  lectures,
  caseStudies,
  assignments,
  outputFormats,
} from "../constants";

const StyledCard = styled(Card)(({ theme }) => ({
  width: "350px",
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
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedOutputFormat, setSelectedOutputFormat] = useState("");
  const [selectedLectures, setSelectedLectures] = useState("");
  const [selectedCaseStudies, setSelectedCaseStudies] = useState("");
  const [selectedAssignments, setSelectedAssignments] = useState("");

  // Hardcoded subjects data organized by program type
  const subjectsByProgram = {
    BBA: [
      {
        id: 1,
        name: "Business Communication",
        code: "BM101",
        icon: <Business />,
        difficulty: "Beginner",
        credits: 4,
        ready: true,
      },
      {
        id: 2,
        name: "Financial Accounting",
        code: "FA102",
        icon: <AccountBalance />,
        difficulty: "Intermediate",
        credits: 4,
        ready: true,
      },
      {
        id: 3,
        name: "Marketing Management",
        code: "MM103",
        icon: <Psychology />,
        difficulty: "Intermediate",
        credits: 3,
        ready: false,
      },
      {
        id: 4,
        name: "Organizational Behavior",
        code: "OB104",
        icon: <Psychology />,
        difficulty: "Advanced",
        credits: 3,
        ready: false,
      },
      {
        id: 5,
        name: "Business Statistics",
        code: "BS105",
        icon: <Calculate />,
        difficulty: "Intermediate",
        credits: 4,
        ready: false,
      },
      {
        id: 6,
        name: "Business Law",
        code: "BL106",
        icon: <AccountBalance />,
        difficulty: "Advanced",
        credits: 3,
        ready: false,
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
        ready: false,
      },
      {
        id: 8,
        name: "Data Structures",
        code: "DS102",
        icon: <Computer />,
        difficulty: "Intermediate",
        credits: 4,
        ready: false,
      },
      {
        id: 9,
        name: "Database Management",
        code: "DB103",
        icon: <Computer />,
        difficulty: "Intermediate",
        credits: 4,
        ready: false,
      },
      {
        id: 10,
        name: "Web Development",
        code: "WD104",
        icon: <Computer />,
        difficulty: "Intermediate",
        credits: 3,
        ready: false,
      },
      {
        id: 11,
        name: "Software Engineering",
        code: "SE105",
        icon: <Computer />,
        difficulty: "Advanced",
        credits: 4,
        ready: false,
      },
      {
        id: 12,
        name: "Computer Networks",
        code: "CN106",
        icon: <Computer />,
        difficulty: "Advanced",
        credits: 3,
        ready: false,
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
        ready: false,
      },
      {
        id: 14,
        name: "Business Economics",
        code: "BE102",
        icon: <Business />,
        difficulty: "Beginner",
        credits: 4,
        ready: false,
      },
      {
        id: 15,
        name: "Income Tax",
        code: "IT103",
        icon: <AccountBalance />,
        difficulty: "Advanced",
        credits: 3,
        ready: false,
      },
      {
        id: 16,
        name: "Auditing",
        code: "AU104",
        icon: <AccountBalance />,
        difficulty: "Advanced",
        credits: 4,
        ready: false,
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
        ready: false,
      },
      {
        id: 20,
        name: "Financial Management",
        code: "FM202",
        icon: <AccountBalance />,
        difficulty: "Advanced",
        credits: 4,
        ready: false,
      },
      {
        id: 21,
        name: "Human Resource Management",
        code: "HR203",
        icon: <Psychology />,
        difficulty: "Advanced",
        credits: 3,
        ready: false,
      },
      {
        id: 22,
        name: "Operations Research",
        code: "OR204",
        icon: <Calculate />,
        difficulty: "Advanced",
        credits: 4,
        ready: false,
      },
      {
        id: 23,
        name: "International Business",
        code: "IB205",
        icon: <Business />,
        difficulty: "Advanced",
        credits: 3,
        ready: false,
      },
      {
        id: 24,
        name: "Business Analytics",
        code: "BA206",
        icon: <Science />,
        difficulty: "Advanced",
        credits: 4,
        ready: false,
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
        ready: false,
      },
      {
        id: 26,
        name: "Political Science",
        code: "PS102",
        icon: <AccountBalance />,
        difficulty: "Intermediate",
        credits: 4,
        ready: false,
      },
      {
        id: 27,
        name: "Sociology",
        code: "SO103",
        icon: <Psychology />,
        difficulty: "Intermediate",
        credits: 3,
        ready: false,
      },
      {
        id: 28,
        name: "History",
        code: "HI104",
        icon: <Book />,
        difficulty: "Beginner",
        credits: 3,
        ready: false,
      },
      {
        id: 29,
        name: "Philosophy",
        code: "PH105",
        icon: <Psychology />,
        difficulty: "Advanced",
        credits: 3,
        ready: false,
      },
      {
        id: 30,
        name: "Psychology",
        code: "PS106",
        icon: <Psychology />,
        difficulty: "Intermediate",
        credits: 4,
        ready: false,
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
        ready: false,
      },
      {
        id: 32,
        name: "Machine Learning",
        code: "ML302",
        icon: <Science />,
        difficulty: "Advanced",
        credits: 4,
        ready: false,
      },
      {
        id: 33,
        name: "System Analysis & Design",
        code: "SA303",
        icon: <Computer />,
        difficulty: "Advanced",
        credits: 4,
        ready: false,
      },
      {
        id: 34,
        name: "Mobile Computing",
        code: "MC304",
        icon: <Computer />,
        difficulty: "Advanced",
        credits: 3,
        ready: false,
      },
      {
        id: 35,
        name: "Cloud Computing",
        code: "CC305",
        icon: <Computer />,
        difficulty: "Advanced",
        credits: 3,
        ready: false,
      },
      {
        id: 36,
        name: "Cyber Security",
        code: "CS306",
        icon: <Computer />,
        difficulty: "Advanced",
        credits: 4,
        ready: false,
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
    setSelectedFormat("");
    setSelectedOutputFormat("");
    setSelectedFormat("");
  };

  const handleEnrollClick = () => {
    if (selectedFormat && selectedOutputFormat) {
      // Navigate to content repurposing page with subject info
      navigate(
        `/content-repurposing?subject=${selectedSubject?.name}&format=${selectedFormat}&outputFormat=${selectedOutputFormat}&lectures=${selectedLectures}&caseStudies=${selectedCaseStudies}&assignments=${selectedAssignments}`
      );
      handleModalClose();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Button
        variant="outlined"
        onClick={() => navigate("/")}
        sx={{ mb: 2, alignSelf: "flex-start" }}
      >
        ← Back to Programs
      </Button>
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            // background: "linear-gradient(45deg, #673AB7 30%, #3F51B5 90%)",
            background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
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
            <StyledCard
              onClick={() => handleSubjectClick(subject)}
              sx={{
                opacity: subject.ready ? 1 : 0.5,
                cursor: subject.ready ? "pointer" : "not-allowed",
              }}
            >
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
                  justifyContent="flex-end"
                  alignItems="center"
                  mt={2}
                >
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ fontWeight: "medium" }}
                  >
                    {subject.ready
                      ? "Click to Transform Content →"
                      : "Coming Soon"}
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
              Generate
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

              {/* Format Dropdown */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select Content Format</InputLabel>
                <Select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  label="Select Content Format"
                >
                  {formats.map((format) => (
                    <MenuItem key={format.id} value={format.id}>
                      {format.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Lectures Dropdown */}
              {selectedFormat === 1 && (
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel>Select Lectures</InputLabel>
                  <Select
                    value={selectedLectures}
                    onChange={(e) => setSelectedLectures(e.target.value)}
                    label="Select Lectures"
                  >
                    {lectures.map((lecture) => (
                      <MenuItem key={lecture.id} value={lecture.id}>
                        {lecture.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {/* Case Studies Dropdown */}
              {selectedFormat === 2 && (
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel>Select Case Studies</InputLabel>
                  <Select
                    value={selectedCaseStudies}
                    onChange={(e) => setSelectedCaseStudies(e.target.value)}
                    label="Select Case Studies"
                  >
                    {caseStudies.map((caseStudy) => (
                      <MenuItem key={caseStudy.id} value={caseStudy.id}>
                        {caseStudy.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {/* Assignments Dropdown */}

              {selectedFormat === 3 && (
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel>Select Assignments</InputLabel>
                  <Select
                    value={selectedAssignments}
                    onChange={(e) => setSelectedAssignments(e.target.value)}
                    label="Select Assignments"
                  >
                    {assignments.map((assignment) => (
                      <MenuItem key={assignment.id} value={assignment.id}>
                        {assignment.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {/* Output Format Dropdown */}
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel>Output Format</InputLabel>
                <Select
                  value={selectedOutputFormat}
                  onChange={(e) => setSelectedOutputFormat(e.target.value)}
                  label="Output Format"
                >
                  {outputFormats.map((format) => (
                    <MenuItem key={format.id} value={format.id}>
                      {format.name}
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
                disabled={
                  !selectedFormat &&
                  !selectedOutputFormat &&
                  !(
                    selectedLectures ||
                    selectedCaseStudies ||
                    selectedAssignments
                  )
                }
                sx={{
                  py: 1.5,
                  background:
                    selectedFormat && selectedOutputFormat
                      ? "linear-gradient(45deg, #673AB7 30%, #3F51B5 90%)"
                      : "grey",
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                Start Generating
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
