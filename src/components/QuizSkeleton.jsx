import {
  Box,
  Container,
  Typography,
  Skeleton,
  CardContent,
  Grid,
  Paper,
} from "@mui/material";

const QuizIntroSkeleton = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Skeleton
          variant="text"
          width={280}
          height={50}
          sx={{ mx: "auto", mb: 2 }}
        />
        <Skeleton
          variant="text"
          width={400}
          height={28}
          sx={{ mx: "auto", mb: 4 }}
        />
      </Box>

      {/* Main Card */}
      <Paper elevation={6} sx={{ maxWidth: 600, mx: "auto", borderRadius: 3 }}>
        <CardContent sx={{ p: 4, textAlign: "center" }}>
          {/* Quiz Icon Placeholder */}
          <Skeleton
            variant="circular"
            width={64}
            height={64}
            sx={{ mx: "auto", mb: 3 }}
          />

          {/* Title */}
          <Skeleton
            variant="text"
            width={220}
            height={36}
            sx={{ mx: "auto", mb: 2 }}
          />

          {/* Description */}
          <Skeleton
            variant="text"
            width="90%"
            height={20}
            sx={{ mx: "auto", mb: 1 }}
          />
          <Skeleton
            variant="text"
            width="80%"
            height={20}
            sx={{ mx: "auto", mb: 4 }}
          />

          {/* Stats Grid */}
          <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
            {[...Array(3)].map((_, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: "center",
                    borderRadius: 2,
                  }}
                >
                  <Skeleton
                    variant="text"
                    width={40}
                    height={30}
                    sx={{ mx: "auto", mb: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    width={80}
                    height={20}
                    sx={{ mx: "auto" }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Start Button */}
          <Skeleton
            variant="rectangular"
            width={200}
            height={50}
            sx={{ mx: "auto", borderRadius: 2 }}
          />
        </CardContent>
      </Paper>
    </Container>
  );
};

export default QuizIntroSkeleton;
