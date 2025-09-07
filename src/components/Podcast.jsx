import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Slider,
  Chip,
  Paper,
  Button,
  Grid,
  Avatar,
  Divider,
  Tooltip,
  LinearProgress,
  Alert,
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeDown,
  VolumeOff,
  Download,
  Share,
  Favorite,
  FavoriteBorder,
  Forward10,
  Replay10,
  Speed,
  Mic,
  AutoAwesome,
  Timer,
  Language,
  Headphones,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { getPodcast } from "../services/aiService";
import { useSearchParams } from "react-router";

const GradientCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
  backdropFilter: "blur(10px)",
  border: `1px solid ${theme.palette.primary.main}20`,
  borderRadius: "0px 0px 12px 12px",
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
  },
}));

const PlayerCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  position: "relative",
  "&:hover": {
    boxShadow: theme.shadows[4],
    transition: "box-shadow 0.3s ease",
  },
}));

const PlayButton = styled(IconButton)(({ theme, isPlaying }) => ({
  width: 60,
  height: 60,
  background: isPlaying
    ? `linear-gradient(45deg, ${theme.palette.error.main} 30%, ${theme.palette.error.dark} 90%)`
    : `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: "white",
  "&:hover": {
    background: isPlaying
      ? `linear-gradient(45deg, ${theme.palette.error.dark} 30%, ${theme.palette.error.main} 90%)`
      : `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
    transform: "scale(1.05)",
  },
  transition: "all 0.3s ease",
  boxShadow: theme.shadows[8],
  "& .MuiSvgIcon-root": {
    fontSize: "2rem",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  textTransform: "none",
  fontWeight: 600,
  padding: theme.spacing(1, 3),
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[8],
  },
}));

const CustomSlider = styled(Slider)(({ theme }) => ({
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: `2px solid ${theme.palette.primary.main}`,
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: `0px 0px 0px 8px ${theme.palette.primary.main}30`,
    },
    "&:before": {
      display: "none",
    },
  },
}));

const Podcast = ({ onLoadingComplete }) => {
  const [searchParams] = useSearchParams();
  const lectures = searchParams.get("lectures");
  const caseStudies = searchParams.get("caseStudies");
  const assignments = searchParams.get("assignments");
  const defaultPodcastData = {
    title: "Business Communication Fundamentals - AI Generated Podcast",
    description:
      "Dive deep into the essential principles of effective business communication. This AI-generated podcast covers key concepts, practical examples, and actionable insights.",
    duration: 1245, // 20:45 in seconds
    audioUrl:
      "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg", // Placeholder
    generatedAt: new Date().toLocaleString(),
    aiModel: "Groq Llama-3 + TTS",
    language: "English",
    category: "Business Education",
    narrator: "AI Voice - Sarah",
    fileSize: "15.2 MB",
    chapters: [
      { title: "Introduction to Business Communication", time: 0 },
      { title: "Written Communication Principles", time: 185 },
      { title: "Verbal Communication Mastery", time: 425 },
      { title: "Non-verbal Communication", time: 678 },
      { title: "Digital Communication Best Practices", time: 892 },
      { title: "Conclusion and Key Takeaways", time: 1089 },
    ],
  };

  //   const podcast = podcastData || defaultPodcastData;
  const [podcast, setPodcast] = useState(defaultPodcastData);

  // Audio player state
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [playbackRate, setPlaybackRate] = useState(1);
  //   const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format time helper
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleLoadedData = () => {
      setIsLoading(false);
      if (onLoadingComplete) onLoadingComplete();
    };
    const handleError = () => {
      setError("Audio will be generated by backend");
      setIsLoading(false);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("error", handleError);
    };
  }, [onLoadingComplete]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    console.log(audio, error);
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (event, newValue) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const handleVolumeChange = (event, newValue) => {
    const audio = audioRef.current;
    if (!audio) return;

    setVolume(newValue);
    audio.volume = newValue;
  };

  const skip = (seconds) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.max(
      0,
      Math.min(podcast.duration, audio.currentTime + seconds)
    );
  };

  const handleSpeedChange = () => {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackRate);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];

    setPlaybackRate(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  //   const getCurrentChapter = () => {
  //     return podcast.chapters.reduce((current, chapter) => {
  //       return currentTime >= chapter.time ? chapter : current;
  //     }, podcast.chapters[0]);
  //   };

  //   const currentChapter = getCurrentChapter();

  useEffect(() => {
    if (lectures || caseStudies || assignments) {
      getPodcast(lectures || caseStudies || assignments)
        .then((res) => {
          setPodcast({
            //   audioUrl: res.data.podcast_en,
            audioUrl: res.data.podcast_en?.includes("wav")
              ? res.data.podcast_en
              : "https://ia601006.us.archive.org/22/items/accounting-lec-2/Accounting_Lec2.wav",
            title: res.data.title || "Podcast",
            description:
              res.data.description ||
              "A brief description of a topic covered in the podcast",
            duration: res.data.duration || 300,
            aiModel: res.data.aiModel || "Groq",
            category: res.data.category || "Education",
            narrator: res.data.narrator || "AI Voice",
            fileSize: res.data.fileSize || "15.2 MB",
          });
        })
        .catch(() => {
          setPodcast({
            //   audioUrl: res.data.podcast_en,
            audioUrl:
              "https://ia601006.us.archive.org/22/items/accounting-lec-2/Accounting_Lec2.wav",
            title: "Podcast",
            description:
              "A brief description of a topic covered in the podcast",
            duration: 300,
            aiModel: "Groq",
            category: "Education",
            narrator: "AI Voice",
            fileSize: "15.2 MB",
          });
        });
    }
  }, [lectures, caseStudies, assignments]);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header Section */}
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h4"
          component="h2"
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
          AI-Generated Podcast
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Immersive audio learning powered by advanced AI
        </Typography>

        {/* Metadata Chips */}
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={1}
          mt={3}
        >
          <Chip
            icon={<AutoAwesome />}
            label={podcast.aiModel}
            color="primary"
            variant="outlined"
          />
          <Chip
            icon={<Timer />}
            label={formatTime(podcast.duration)}
            color="secondary"
            variant="outlined"
          />
          {/* <Chip
            icon={<Language />}
            label={podcast.language}
            color="info"
            variant="outlined"
          /> */}
          <Chip
            icon={<Headphones />}
            label={podcast.category}
            color="warning"
            variant="outlined"
          />
        </Box>
      </Box>

      {/* Main Podcast Card */}
      <GradientCard elevation={6}>
        <CardContent sx={{ p: 4 }}>
          {/* Podcast Info */}
          <Grid container spacing={4} alignItems="center" mb={3}>
            <Grid item xs={12} md={2}>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  mx: "auto",
                  background:
                    "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                  fontSize: "3rem",
                }}
              >
                <Mic />
              </Avatar>
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                {podcast.title}
              </Typography>
              {/*  <Typography variant="body1" color="text.secondary" paragraph>
                {podcast.description}
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{ fontWeight: "medium" }}
              >
                Narrated by: {podcast.narrator} • Generated:{" "}
                {podcast.generatedAt}
              </Typography> */}
            </Grid>

            <Grid item xs={12} md={2} textAlign="center">
              {/* <IconButton
                onClick={() => setIsLiked(!isLiked)}
                sx={{ mb: 2 }}
                color="error"
              >
                {isLiked ? <Favorite /> : <FavoriteBorder />}
              </IconButton> */}
              {/* <Typography variant="body2" color="text.secondary">
                {podcast.fileSize}
              </Typography> */}
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Audio Player */}
          <PlayerCard>
            {/* Loading/Error States */}
            {isLoading && (
              <Box textAlign="center" mb={3}>
                <LinearProgress
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "rgba(0,0,0,0.1)",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 3,
                      background: "linear-gradient(90deg, #667eea, #764ba2)",
                    },
                  }}
                />
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Loading podcast...
                </Typography>
              </Box>
            )}

            {/* {error && (
              <Alert severity="info" sx={{ mb: 3 }}>
                {error} - This is a demo UI component for podcast playback
              </Alert>
            )} */}

            {/* Current Chapter Info */}
            {/* {!isLoading && (
              <Box textAlign="center" mb={3}>
                <Chip
                  label={`Now Playing: ${currentChapter.title}`}
                  color="primary"
                  variant="outlined"
                  sx={{ fontSize: "0.9rem", px: 2 }}
                />
              </Box>
            )} */}

            {/* Main Controls */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={3}
            >
              <Tooltip title="Replay 10s">
                <IconButton
                  onClick={() => skip(-10)}
                  color="primary"
                  size="large"
                >
                  <Replay10 />
                </IconButton>
              </Tooltip>

              <PlayButton
                onClick={togglePlayPause}
                // disabled={!!error}
                isPlaying={isPlaying}
              >
                {isPlaying ? <Pause /> : <PlayArrow />}
              </PlayButton>

              <Tooltip title="Forward 10s">
                <IconButton
                  onClick={() => skip(10)}
                  color="primary"
                  size="large"
                >
                  <Forward10 />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Progress Bar */}
            <Box mb={2}>
              <CustomSlider
                value={currentTime}
                max={podcast.duration}
                onChange={handleSeek}
                disabled={!!error}
              />
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography variant="body2" color="text.secondary">
                  {formatTime(currentTime)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatTime(podcast.duration)}
                </Typography>
              </Box>
            </Box>

            {/* Secondary Controls */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              {/* Volume Control */}
              <Box display="flex" alignItems="center" minWidth={150}>
                <IconButton
                  onClick={() =>
                    handleVolumeChange(null, volume === 0 ? 0.7 : 0)
                  }
                >
                  {volume === 0 ? (
                    <VolumeOff />
                  ) : volume < 0.5 ? (
                    <VolumeDown />
                  ) : (
                    <VolumeUp />
                  )}
                </IconButton>
                <CustomSlider
                  value={volume}
                  max={1}
                  step={0.1}
                  onChange={handleVolumeChange}
                  sx={{ mx: 2, width: 80 }}
                />
              </Box>

              {/* Playback Speed */}
              <Tooltip title={`Speed: ${playbackRate}x`}>
                <Chip
                  icon={<Speed />}
                  label={`${playbackRate}x`}
                  onClick={handleSpeedChange}
                  clickable
                  color="primary"
                  variant="outlined"
                />
              </Tooltip>
            </Box>
          </PlayerCard>

          {/* Chapters List */}
          {/* <Box mt={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Chapters
            </Typography>
            <Grid container spacing={1}>
              {podcast.chapters.map((chapter, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper
                    sx={{
                      p: 2,
                      cursor: "pointer",
                      backgroundColor:
                        currentChapter === chapter
                          ? "primary.light"
                          : "background.paper",
                      color:
                        currentChapter === chapter ? "white" : "text.primary",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor:
                          currentChapter === chapter
                            ? "primary.main"
                            : "primary.light",
                        color: "white",
                      },
                    }}
                    onClick={() => handleSeek(null, chapter.time)}
                  >
                    <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                      {formatTime(chapter.time)} - {chapter.title}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box> */}

          {/* Audio Element */}
          <audio
            ref={audioRef}
            src={podcast.audioUrl}
            onLoadStart={() => setIsLoading(true)}
          />
        </CardContent>
      </GradientCard>

      {/* Action Buttons */}
      {/* <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={2}
        mt={4}
      >
        <ActionButton
          variant="contained"
          startIcon={<Download />}
          sx={{
            background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
          }}
        >
          Download Podcast
        </ActionButton>

        <ActionButton variant="outlined" startIcon={<Share />} color="primary">
          Share
        </ActionButton>

        <ActionButton
          variant="outlined"
          startIcon={isLiked ? <Favorite /> : <FavoriteBorder />}
          onClick={() => setIsLiked(!isLiked)}
          color="error"
        >
          {isLiked ? "Liked" : "Like"}
        </ActionButton>
      </Box> */}

      {/* Metadata Footer */}
      {/* <Paper
        sx={{
          mt: 4,
          p: 2,
          backgroundColor: "grey.50",
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Generated with {podcast.aiModel} • Duration:{" "}
          {formatTime(podcast.duration)} • Language: {podcast.language} • File
          size: {podcast.fileSize}
        </Typography>
      </Paper> */}
    </Box>
  );
};

export default Podcast;
