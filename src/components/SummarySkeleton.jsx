import {
  Box,
  Container,
  Typography,
  Skeleton,
  CardContent,
  Divider,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";

const SummarySkeleton = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box textAlign="center" mb={4}>
        <Skeleton
          variant="text"
          width={350}
          height={50}
          sx={{ mx: "auto", mb: 2 }}
        />
        <Skeleton variant="text" width={450} height={30} sx={{ mx: "auto" }} />

        {/* Metadata Chips */}
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={1}
          mt={3}
        >
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={100}
              height={32}
              sx={{ borderRadius: 5 }}
            />
          ))}
        </Box>
      </Box>

      {/* Main Content Card */}
      <Paper elevation={6} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Title and Summary */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={3}
          >
            <Box flex={1}>
              <Skeleton variant="text" width={280} height={40} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="90%" height={20} />
              <Skeleton variant="text" width="80%" height={20} />
            </Box>

            <IconButton sx={{ ml: 2 }}>
              <Skeleton variant="circular" width={40} height={40} />
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
              <Skeleton variant="text" width={150} height={20} />
              <Skeleton variant="text" width={40} height={20} />
            </Box>
            <LinearProgress
              variant="indeterminate"
              sx={{
                height: 8,
                borderRadius: 4,
              }}
            />
          </Box> */}

          <Divider sx={{ my: 3 }} />

          {/* Expandable Sections */}
          <Grid container spacing={3}>
            {[...Array(2)].map((_, sectionIndex) => (
              <Grid item xs={12} md={6} key={sectionIndex}>
                <Box>
                  <Skeleton
                    variant="text"
                    width={200}
                    height={30}
                    sx={{ mb: 2 }}
                  />
                  {[...Array(3)].map((_, i) => (
                    <Skeleton
                      key={i}
                      variant="text"
                      width={`${80 - i * 10}%`}
                      height={20}
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Box>
              </Grid>
            ))}

            {/* Action Items */}
            <Grid item xs={12}>
              <Skeleton variant="text" width={250} height={30} sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                {[...Array(4)].map((_, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={60}
                      sx={{ borderRadius: 2 }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>

      {/* Action Buttons */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={2}
        mt={4}
      >
        {[...Array(2)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width={150}
            height={45}
            sx={{ borderRadius: 2 }}
          />
        ))}
      </Box>
    </Container>
  );
};

export default SummarySkeleton;
