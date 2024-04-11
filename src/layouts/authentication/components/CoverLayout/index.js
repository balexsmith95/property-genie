// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// Authentication layout components
import Footer from "layouts/authentication/components/Footer";

// Material Dashboard 2 PRO React page layout routes
import pageRoutes from "page.routes";

function CoverLayout({ coverHeight, image, children }) {
  return;
}

// Setting default props for the CoverLayout
CoverLayout.defaultProps = {
  coverHeight: "35vh",
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  coverHeight: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
