import {
  Box,
  Container,
  Typography,
  Skeleton,
  CardContent,
  Grid,
  Paper,
} from "@mui/material";

const FlashcardsSkeleton = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box textAlign="center" mb={4}>
        <Skeleton
          variant="text"
          width={320}
          height={50}
          sx={{ mx: "auto", mb: 2 }}
        />
        <Skeleton
          variant="text"
          width={400}
          height={28}
          sx={{ mx: "auto", mb: 3 }}
        />

        {/* Metadata Chips + Dropdown */}
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={1}
          mb={3}
        >
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={110}
              height={36}
              sx={{ borderRadius: 5 }}
            />
          ))}
        </Box>
      </Box>

      {/* Main Content Card */}
      <Paper elevation={6} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Instructions */}
          <Box mb={4} textAlign="center">
            <Skeleton
              variant="text"
              width={180}
              height={36}
              sx={{ mx: "auto", mb: 1 }}
            />
            <Skeleton
              variant="text"
              width={400}
              height={24}
              sx={{ mx: "auto", mb: 2 }}
            />
            <Skeleton
              variant="text"
              width={280}
              height={20}
              sx={{ mx: "auto" }}
            />
          </Box>

          {/* Flashcards Grid */}
          <Grid container spacing={3}>
            {[...Array(6)].map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={200}
                  sx={{ borderRadius: 3 }}
                />
              </Grid>
            ))}
          </Grid>

          {/* Study Tip */}
          <Box mt={4} textAlign="center">
            <Skeleton
              variant="text"
              width={300}
              height={20}
              sx={{ mx: "auto" }}
            />
          </Box>
        </CardContent>
      </Paper>

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
          <Skeleton
            variant="text"
            width={200}
            height={30}
            sx={{ mx: "auto", mb: 3 }}
          />

          <Box display="flex" justifyContent="center" gap={4} flexWrap="wrap">
            {[...Array(3)].map((_, i) => (
              <Box key={i} textAlign="center">
                <Skeleton
                  variant="text"
                  width={60}
                  height={40}
                  sx={{ mx: "auto", mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width={100}
                  height={20}
                  sx={{ mx: "auto" }}
                />
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default FlashcardsSkeleton;
