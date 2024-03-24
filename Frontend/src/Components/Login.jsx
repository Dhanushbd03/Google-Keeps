import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
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

function Login(props) {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      props.handleuser(user.sub);
    } else {
      props.handleuser(null);
    }
  }, [user, isAuthenticated, props]);

  return (
    <div
      className="profile"
      onClick={() => {
        {
          isAuthenticated
            ? logout({ logoutParams: { returnTo: window.location.origin } })
            : loginWithRedirect();
        }
      }}
    >
      {isAuthenticated ? (
        <Profile picture={user.picture} name={user.name} />
      ) : (
        <Button
          sx={{
            fontSize: "1rem",
            width: "80%",
            height: "80%",
            background: props.color,
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)", // Adding a boxShadow
            borderRadius: "18px", // Adding borderRadius for rounded corners
            color: "#fff", // Setting text color to white
            "&:hover": {
              backgroundColor: "#555", // Darken the background color on hover
            },
          }}
        >
          Login
        </Button>
      )}
    </div>
  );
}
export default Login;
