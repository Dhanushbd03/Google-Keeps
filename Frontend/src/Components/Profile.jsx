import React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    ochre: {
      main: "#FFBA00",
      light: "#FFBA00",
      dark: "#FFBA00",
      contrastText: "#242105",
    },
  },
});

function Profile() {
  return (
    <div className="profile">
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="ochre"
          className="login"
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            color: "#615F5F",
          }}
        >
          Login
        </Button>
      </ThemeProvider>
    </div>
  );
}
export default Profile;
