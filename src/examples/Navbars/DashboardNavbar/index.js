import { useState } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Custom styles for DashboardNavbar
import { navbar, navbarContainer, navbarRow } from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller] = useMaterialUIController();
  const { transparentNavbar, darkMode } = controller;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("ownerEmail");
    localStorage.removeItem("ownerId");
    localStorage.removeItem("tenantEmail");
    localStorage.removeItem("tenantId");
    localStorage.removeItem("authenticated");
    localStorage.removeItem("ownerPassword");
    localStorage.removeItem("tenantPassword");

    navigate("/authentication/sign-in/cover");
  };

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  const handleHomeButton = () => {
    navigate("/dashboards/homepage");
  };

  console.log("localStorage", localStorage);

  const getSignOnButtonText = () => {
    if (
      (localStorage.ownerEmail !== null && localStorage.ownerEmail !== undefined) ||
      (localStorage.tenantEmail !== null && localStorage.tenantEmail !== undefined)
    ) {
      return "Sign Out";
    } else {
      return "Sign In";
    }
  };

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <IconButton onClick={handleHomeButton} icon="home">
            <HomeIcon fontSize="small" sx={iconsStyle}></HomeIcon>
            <div style={{ fontSize: "medium", paddingLeft: "1px", paddingTop: "4px" }}>
              Home Page
            </div>
          </IconButton>
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? "white" : "inherit"}>
              <Button
                variant="contained"
                size="small"
                sx={{ color: "#ffffff", borderColor: "white" }}
                onClick={handleLogout}
              >
                {getSignOnButtonText()}
              </Button>
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;