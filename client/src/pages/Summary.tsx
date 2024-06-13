import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
} from "@mui/material";

const Summary: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [text, setText] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [error, setError] = useState<string>("");
  const loggedIn = JSON.parse(localStorage.getItem("authToken") || "false");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/openai/summary", { text });
      console.log(data);
      setSummary(data);
    } catch (err: any) {
      console.log(err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      {!loggedIn ? (
        <Box p={10} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Typography variant="h3">
            Please <Link to="/login">Log In</Link> to Continue
          </Typography>
        </Box>
      ) : (
        <Box
          width={isNotMobile ? "40%" : "80%"}
          p="2rem"
          m="2rem auto"
          borderRadius={5}
          sx={{ boxShadow: 5 }}
          bgcolor={theme.palette.background.paper}
        >
          <Collapse in={error !== ''}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Collapse>
          <form onSubmit={handleSubmit}>
            <Typography variant="h3">Summarize Text</Typography>

            <TextField
              placeholder="Add your text (150 characters)"
              type="text"
              multiline
              required
              margin="normal"
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ color: "white", mt: 2 }}
            >
              Submit
            </Button>
            <Typography mt={2}>
              Not this tool? <Link to="/">GO BACK</Link>
            </Typography>
          </form>

          {summary ? (
            <Card
              sx={{
                mt: 4,
                border: 1,
                boxShadow: 0,
                height: "500px",
                borderRadius: 5,
                borderColor: "neutral.medium",
                bgcolor: "background.default",
              }}
            >
              <Typography p={2}>{summary}</Typography>
            </Card>
          ) : (
            <Card
              sx={{
                mt: 4,
                border: 1,
                boxShadow: 0,
                height: "500px",
                borderRadius: 5,
                borderColor: "neutral.medium",
                bgcolor: "background.default",
              }}
            >
              <Typography
                variant="h5"
                color="neutral.main"
                sx={{
                  textAlign: "center",
                  verticalAlign: "middle",
                  lineHeight: "450px",
                }}
              >
                Summary Will Appear Here
                (Please wait for few secs after submitting...)
              </Typography>
            </Card>
          )}
        </Box>
      )}
    </>
  );
};

export default Summary;
