import { useState, useContext, useEffect } from "react";
import { useUserInfo } from "userContext";
import axios from "axios";

// react-router-dom components
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-in-cover.jpeg";

function Cover() {
  const { setUserEmail, setOwnerID, setTenantID, setLicenseID, setUserPass } = useUserInfo();
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [username, setUsername] = useState("");
  const [password, setOwnerPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);
  const [wrongInfo, setWrongInfo] = useState(false);
  const navigate = useNavigate();

  const navigateAfterLogin = (route) => {
    if (route === "owner") {
      navigate("/dashboards/ownerPortal");
    } else {
      navigate("/dashboards/tenantPortal");
    }
  };

  const fetchLicenseId = async (url) => {
    try {
      const response = await axios.post("http://localhost:8080/getLicense", { url });
      console.log("response", response);
      let responseData = response.data.recordset;
      return responseData;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("ownerId");
    console.log("localStorage", localStorage);
    if (localStorage.getItem("ownerEmail")) {
      const ownerEmail = localStorage.getItem("ownerEmail");
      setUserEmail(ownerEmail);
      setUserPass(password);
    } else if (localStorage.getItem("tenantEmail")) {
      const tenantEmail = localStorage.getItem("tenantEmail");
      setUserEmail(tenantEmail);
      setUserPass(password);
    }

    const url = window.location.href;
    console.log("url", url);
    const licenseId = fetchLicenseId(url);
    setLicenseID(licenseId);
    console.log("licenseId", licenseId);
  }, []);

  const tenantLogin = async () => {
    const url = window.location.href;
    axios
      .post("http://localhost:8080/tenantLogin", { username, password, url })
      .then((response) => {
        if (response.data.recordset.length > 0) {
          console.log("response in tenantLogin", response);
          setLoginStatus(true);
          console.log("response.data.recordset[0]", response.data.recordset[0]);
          console.log("response.recordset", response.data.recordset[0].PropTen_ID);
          setTenantID(response.data.recordset[0].PropTen_ID);
          localStorage.setItem("authenticated", true);
          localStorage.setItem("tenantId", response.data.recordset[0].PropTen_ID);
          localStorage.setItem("tenantEmail", username);
          localStorage.setItem("tenantPassword", password);
          setUserEmail(username);
          navigateAfterLogin("tenant");
        } else {
          setLoginStatus(false);
          setWrongInfo(true);
        }
      });
  };

  const login = async () => {
    const url = window.location.href;
    axios
      .post("http://localhost:8080/ownerLogin", {
        username,
        password,
        url,
      })
      .then(async (response) => {
        if (response.data.recordset.length > 0) {
          console.log("splitResponse[0]", response);
          setLoginStatus(true);
          setOwnerID(response.data.recordset[0].Owner_ID);
          localStorage.setItem("authenticated", true);
          localStorage.setItem("ownerId", response.data.recordset[0].Owner_ID);
          localStorage.setItem("ownerEmail", username);
          localStorage.setItem("ownerPassword", password);
          setUserEmail(username);
          navigateAfterLogin("owner");
        } else if (response.data.recordset.length === 0) {
          console.log("in if");
          const tenantResponse = await tenantLogin(); //navigateAfterTenantLogin
        } else {
          setLoginStatus(false);
          setWrongInfo(true);
        }
      });
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to Sign In
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="username"
                label="Username"
                variant="standard"
                fullWidth
                placeholder="john@example.com"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                placeholder="************"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  setOwnerPassword(e.target.value);
                }}
              />
            </MDBox>
            {wrongInfo ? (
              <MDBox mb={2}>
                <MDTypography variant="button" color="error">
                  Wrong username or password!
                </MDTypography>
              </MDBox>
            ) : null}
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={login}>
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
