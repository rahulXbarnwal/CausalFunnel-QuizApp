import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const NavBar = ({ email, time }) => {
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#212121" }}>
        {time > 0 && (
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              E-mail : {email}
            </Typography>
            <Typography variant="h6" component="div">
              Time Left :{" "}
              <span style={{ color: "yellow" }}>
                {Math.floor(time / 60)}:{time % 60 < 10 ? "0" : null}
                {time % 60}
              </span>
            </Typography>
          </Toolbar>
        )}
        {time === 0 && (
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              QUIZ REPORT
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ color: "white" }}>
                Return Home
              </Link>
            </Typography>
            <Typography variant="h6" component="div">
              E-mail : {email}
            </Typography>
          </Toolbar>
        )}
      </AppBar>
    </Box>
  );
};

export default NavBar;
