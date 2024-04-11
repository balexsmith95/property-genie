
// @mui material components
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import DataTable from "examples/Tables/DataTable";
import dayjs from "dayjs";
import MDButton from "../../../components/MDButton";
import { useUserInfo } from "../../../userContext";

function TenantPortal() {
  let {
    tenantID,
    userEmail,
    licenseID,
    setUserEmail,
    setTenantID,
    setLicenseID,
    userPass,
    setUserPass,
  } = useUserInfo();
  const [authenticated, setAuthenticated] = useState(null);
  const loggedInUser = localStorage.getItem("authenticated");
  const [properties, setProperties] = useState([]);
  const [journal, setJournal] = useState([]);
  // const tenantIdFromStorage = localStorage; //not actually
  useEffect(() => {
    console.log("loggedinuser", loggedInUser);
    if (loggedInUser) {
      setAuthenticated(loggedInUser);
    }
    const fetchTenantProperties = async () => {
      const url = window.location.href;
      try {
        const response = await axios.post("http://localhost:8080/tenantInfo", { tenantID, url });
        const {
          data: {
            recordset: { 0: arr },
          },
        } = response;

        setProperties(arr);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTenantProperties();

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

    const url = window.location.href;
    const licenseId = fetchLicenseId(url);
    setLicenseID(licenseId);

    const ownerPass = localStorage.getItem("tenantPassword");
    setUserPass(ownerPass);

    const tenant = localStorage.getItem("tenantId");
    console.log("tenantID before setting", tenantID);
    setTenantID(tenant);
  }, []);

  console.log("tenantID after setting", tenantID);

  console.log("localStorage", localStorage);

  useEffect(() => {
    const LeaseID = properties.PropTen_LeaseID;
    const url = window.location.href;
    const fetchTenantJournal = async () => {
      try {
        const response = await axios.post("http://localhost:8080/tenantJournal", { LeaseID, url });
        const arr = response.data.recordset;
        let balance = 0;
        arr.forEach((element, index) => {
          element["Transaction Date"] = `${dayjs(element["Transaction Date"]).format("M/DD/YYYY")}`;
          balance = balance + (element.Debit - element.Credit);
          element.Balance = balance.toFixed(2);
        });
        //we can just put this code in a card or something later
        arr.push({
          "Transaction Date": `${dayjs(dayjs()).format("M/DD/YYYY")}`,
          Reference: "CURRENT BALANCE",
          Balance: arr[arr.length - 1].Balance,
        });
        arr.reverse();
        setJournal(chunkArray(arr, arr.length));
      } catch (error) {
        console.error(error);

        console.log("we are h");
      }
    };

    fetchTenantJournal();
  }, []);

  useEffect(() => {
    if (!loggedInUser) {
      console.log("not authenticated (useeffect)");
      <Navigate replace to="/authentication/sign-in/cover" />;
    }
  }, [authenticated]);
  /*chunks array so that latest entries in the table appear on the bottom and not the top,
    built in toggle sort in DataTable is fucking stupid as shit and has fuckall customizability so this is a hacky but neat solution
    default pagination for DataTable is 10 entries so i made k=10 so if pagination entries changes we can change k's value in the future*/
  function chunkArray(arr, n, k = 10) {
    for (let i = 0; i < n; i += k) {
      let left = i;

      // To handle case when k is not
      // multiple of n
      let right = Math.min(i + k - 1, n - 1);
      let temp;

      // Reverse the sub-array [left, right]
      while (left < right) {
        temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left += 1;
        right -= 1;
      }
    }
    return arr;
  }

  // const { sales, tasks } = reportsLineChartData;
  // Action buttons for the BookingCard
  const actionButtons = (
    <>
      <Tooltip title="Refresh" placement="bottom">
        <MDTypography
          variant="body1"
          color="primary"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">refresh</Icon>
        </MDTypography>
      </Tooltip>
      <Tooltip title="Edit" placement="bottom">
        <MDTypography variant="body1" color="info" lineHeight={1} sx={{ cursor: "pointer", mx: 3 }}>
          <Icon color="inherit">edit</Icon>
        </MDTypography>
      </Tooltip>
    </>
  );

  console.log(properties);
  const makePayment = async (licenseID, userPwd, propID, isOwner, tenantID) => {
    const url = window.location.href;
    try {
      const response = await axios.post("http://localhost:8080/makePayment", {
        licenseID,
        userPwd,
        propID,
        isOwner,
        tenantID,
        url
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
    console.log("property", property);
    const propertyID = property;
    console.log("tenantID in handlepaymentclick", tenantID);
    console.log("licenseID, userPwd, propID, tenantID", licenseID, userPass, propertyID, tenantID);
    const paymentResponse = await makePayment(licenseID, userPass, propertyID, false, tenantID);
    console.log("paymentResponse", Object.values(paymentResponse)[0]);
    redirectToPayment(Object.values(paymentResponse)[0]);
  };

  const redirectToPayment = async (paymentID) => {
    window.open(`https://propertygenie.thesecurespace.com:12443/default.aspx?pglic=${paymentID}`);
  };

  if (!loggedInUser) {
    console.log("not authenticated (if statement)");
    return <Navigate replace to="/authentication/sign-in/cover" />;
  } // eslint-disable-next-line
  else {
    console.log("else in analytics");
    console.log("properties", properties);
    console.log("test commit");
    return (
      <DashboardLayout>
        <MDBox py={3}>
          <Grid container>
            <DataTable
              entriesPerPage={false}
              table={{
                columns: [
                  { Header: "Date", accessor: "Transaction Date", width: "10%" },
                  { Header: "Description", accessor: "Reference", width: "30%" },
                  { Header: "Charge", accessor: "Debit", width: "15%" },
                  { Header: "Payment", accessor: "Credit", width: "15%" },
                  { Header: "Balance", accessor: "Balance", width: "15%" },
                ],
                rows: journal,
              }}
              isSorted={false} // date sort is done by string comparison and not date comparison...................
            />
          </Grid>
          <MDBox mt={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <MDButton
                    variant="contained"
                    color="info"
                    onClick={() => handlePaymentClick(properties.PropTen_PropertyID)}
                  >
                    Make Payment
                  </MDButton>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox mt={1.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}></MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}></MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}></MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}></MDBox>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox mt={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mt={3}></MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mt={3}></MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mt={3}></MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }
}

export default TenantPortal;
