import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLanguage } from "../LanguageContext";

export default function RegisterForm({ onSwitchTab }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useLanguage();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:5002/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || t.registrationSuccess);
        setSeverity("success");
      } else {
        setMessage(data.message || t.registrationError);
        setSeverity("error");
      }
    } catch (err) {
      setMessage(t.networkError);
      setSeverity("error");
    }
  };

  return (
    <Box>
      <Typography variant="h5" component="h1" gutterBottom align="center">
        {t.register}
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          margin="normal"
          name="name"
          label={t.name}
          value={form.name}
          onChange={handleChange}
          required
          variant="outlined"
        />
        
        <TextField
          fullWidth
          margin="normal"
          name="email"
          type="email"
          label={t.email}
          value={form.email}
          onChange={handleChange}
          required
          variant="outlined"
        />
        
        <TextField
          fullWidth
          margin="normal"
          name="password"
          type={showPassword ? "text" : "password"}
          label={t.newPassword}
          value={form.password}
          onChange={handleChange}
          required
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          size="large"
        >
          {t.register}
        </Button>
        
        {message && (
          <Alert severity={severity} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
        
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            {t.haveAccount} {" "}
            <Link href="#" underline="hover" sx={{ cursor: "pointer" }} onClick={e => { e.preventDefault(); if (onSwitchTab) onSwitchTab(); }}>
              {t.loginHere}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
} 