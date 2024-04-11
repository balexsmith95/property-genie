import React, { useEffect, useState, useContext } from "react";
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import BookingCard from "examples/Cards/BookingCard";
import { useUserInfo } from "userContext";
import { Navigate, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import ArticleIcon from "@mui/icons-material/Article";
import Tooltip from "@mui/material/Tooltip";
import MDTypography from "components/MDTypography";
import "./ownerPortal.css";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function OwnerPortal() {
  console.log("localStorage", localStorage);
  const ownerIdFromStorage = localStorage.getItem("ownerId");
  let {
    ownerID,
    userEmail,
    licenseID,
    setUserEmail,
    setOwnerID,
    setLicenseID,
    userPass,
    setUserPass,
  } = useUserInfo();
  console.log("ownerID, userEmail, licenseID", ownerID, userEmail, licenseID);
  const [authenticated, setAuthenticated] = useState(null);
  const loggedInUser = localStorage.getItem("authenticated");
  const [properties, setProperties] = useState([]);
  const [statements, setStatements] = useState(new Map());
  const [paymentID, setPaymentID] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      setAuthenticated(loggedInUser);
    }
    if (ownerID === null) {
      ownerIdFromStorage ? (ownerID = ownerIdFromStorage) : ownerID;
      if (!ownerIdFromStorage) {
        navigate("/authentication/sign-in/cover");
      }
    }
    const fetchOwnerProperties = async () => {
      const url = window.location.href;
      try {
        const response = await axios.post("http://localhost:8080/ownerProperties", {
          ownerID, url
        });

        let dataMap = new Map();
        response.data.recordset.forEach((record) => {
          dataMap.set(record.Property_ID, record);
        });
        let array = Array.from(dataMap, ([Property_ID, record]) => ({ Property_ID, record }));
        setProperties(array);
        console.log("fetchownerproperties", array);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOwnerProperties();
  }, []);

  const fetchLicenseId = async (url) => {
    try {
      const response = await axios.post("http://localhost:8080/getLicense", { url });
      let responseData = response.data.recordset;
      setLicenseID(responseData[0].Lic_License);
      return responseData;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("ownerId");
    setOwnerID(loggedInUser);

    const ownerEmail = localStorage.getItem("ownerEmail");
    setUserEmail(ownerEmail);

    const ownerPass = localStorage.getItem("ownerPassword");
    setUserPass(ownerPass);

    const url = window.location.href;
    const licenseId = fetchLicenseId(url);
    setLicenseID(licenseId);
  }, []);

  useEffect(() => {
    const fetchOwnerStatements = async () => {
      const url = window.location.href;
      try {
        const response = await axios.post("http://localhost:8080/ownerStatements", {
          ownerID,
        });

        let dataMap = new Map();
        response.data.recordset.forEach((record) => {
          dataMap.set(`${record.OS_PropertyID}-${record.OS_ID}`, record);
        });
        console.log("fetchownerstatements", dataMap);
        setStatements(dataMap);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOwnerStatements();
  }, []);

  const makePayment = async (licenseID, userPwd, propID, isOwner, ownerID) => {
    const url = window.location.href;
    try {
      const response = await axios.post("http://localhost:8080/makePayment", {
        licenseID,
        userPwd,
        propID,
        isOwner,
        ownerID,
        url,
      });
      let responseData = response.data.recordset;
      let returnData;
      responseData.map((item) => {
        console.log("item", item);
        returnData = item;
      });
      console.log("responseData", responseData);
      console.log("returnData", returnData);
      return returnData;
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlePaymentClick = async (property) => {
    const propertyID = property.Property_ID;
    console.log(
      "HANDLEPAYMENT licenseID, userPass, propertyID, true, ownerID",
      licenseID,
      userPass,
      propertyID,
      true,
      ownerID
    );
    const paymentResponse = await makePayment(licenseID, userPass, propertyID, true, ownerID);
    console.log("paymentResponse", Object.values(paymentResponse)[0]);
    redirectToPayment(Object.values(paymentResponse)[0]);
  };

  const redirectToPayment = async (paymentID) => {
    window.open(`https://propertygenie.thesecurespace.com:12443/default.aspx?pglic=${paymentID}`);
  };

  useEffect(() => {
    if (!loggedInUser) {
      console.log("not logged in");
      navigate("/authentication/sign-in/cover");
    }
  }, [authenticated]);

  const handleJournalClick = (property) => {
    let propertyID = property.Property_ID;
    let propertyAddr = property.record.Property_Addr1;
    navigate("/dashboards/OwnerPortalJournal", {
      state: { propertyID: propertyID, propertyAddr: propertyAddr },
    });
  };

  const actionButtons = (property, statementArr) => {
    return (
      <>
        <>
          <Tooltip title="Select Statement" placement="bottom">
            <select
              name="statement"
              id={`statement${property.record.Property_ID}`}
              defaultValue={"Placeholder"}
              className="statement"
            >
              {statementArr.map((stm) => {
                return stm.record.OS_PropertyID === property.Property_ID ? (
                  <option value={stm.record.statementID} key={stm.record.statementID}>
                    {`${dayjs(stm.record.OS_StatementStartDate).format("MM/DD/YYYY")} - ${dayjs(
                      stm.record.OS_StatementEndDate
                    ).format("MM/DD/YYYY")}`}
                  </option>
                ) : (
                  ""
                );
              })}
            </select>
          </Tooltip>
        </>
        <>
          <Tooltip title="View Journal" placement="bottom">
            <MDTypography
              variant="body1"
              sx={{ cursor: "pointer", mx: 3 }}
              color="dark"
              lineHeight={1}
            >
              <ArticleIcon
                fontSize="medium"
                onClick={() => handleJournalClick(property)}
                className="journalButton"
              ></ArticleIcon>
            </MDTypography>
          </Tooltip>
        </>
        <>
          <Tooltip title="Make a Payment" placement="bottom">
            <MDTypography
              variant="body1"
              sx={{ cursor: "pointer", mx: 3 }}
              color="dark"
              lineHeight={1}
            >
              <AttachMoneyIcon
                fontSize="medium"
                onClick={() => handlePaymentClick(property)}
                className="paymentButton"
              ></AttachMoneyIcon>
            </MDTypography>
          </Tooltip>
        </>
      </>
    );
  };

  let listOfProperties = [];

  let array = Array.from(statements, ([Property_ID, record]) => ({ Property_ID, record }));

  if (properties) {
    properties.map((property) => {
      if (statements.size > 0) {
        listOfProperties.push(
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mt={3}>
              <BookingCard
                title=""
                image={`http://www.property-genie.com/ClientSites/${licenseID}/${property.record.Property_ID}/pic0.jpg`}
                description={property.record.Property_Addr1}
                price="$1,119/month"
                location={property.record.Property_City}
                action={actionButtons(property, array)}
              />
            </MDBox>
          </Grid>
        );
      }
    });
  }

  if (!loggedInUser) {
    return <Navigate replace to="/authentication/sign-in/cover" />;
  } else {
    return (
      <DashboardLayout>
        <MDBox py={3}>
          <MDBox mt={2}>
            <Grid container spacing={3}>
              {listOfProperties}
            </Grid>
          </MDBox>
        </MDBox>
      </DashboardLayout>
    );
  }
}

export default OwnerPortal;
