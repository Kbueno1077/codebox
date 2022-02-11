import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "/pages/_app";
import { useTheme } from "@emotion/react";
import { Tooltip } from "@mui/material";

export default function Navbar() {
  const theme = useTheme();
  const { toggleTheme } = React.useContext(ColorModeContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Box>
            <Tooltip
              title={
                theme.palette.mode === "dark"
                  ? "Change to light mode"
                  : "Change to dark mode"
              }
            >
              <IconButton
                sx={{ ml: 1 }}
                onClick={
                  theme.palette.mode === "dark"
                    ? () => toggleTheme("light")
                    : () => toggleTheme("dark")
                }
                color="inherit"
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
