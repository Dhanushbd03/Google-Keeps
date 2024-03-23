import React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    color: {
      main: "${props.color}",
      light: "${props.color}",
      dark: "${props.color}",
      contrastText: "${props.color}",
    },
  },
});

function Profile(props) {
  // Function to handle logout
  const handleLogout = () => {
    // Call the function passed from App.js to set isloggedin to false
    props.setIsloggedin(false);
  };

  return (
    <div className="profile">
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="color"
          className="login"
          sx={{
            fontWeight: 600,
            color: "#fff",
          }}
          onClick={handleLogout} // Call handleLogout when the button is clicked
        >
          Logout
        </Button>
      </ThemeProvider>
    </div>
  );
}
export default Profile;
