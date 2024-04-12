// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import BookingCard from "examples/Cards/BookingCard";

import React, { useEffect, useState } from "react";

import Select from "@mui/material/Select";
import { Button, Tooltip } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { useUserInfo } from "userContext";
import ArticleIcon from "@mui/icons-material/Article";
import MDTypography from "components/MDTypography";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "examples/Footer";

function Homepage() {
  //
  //
  const [avbleProps, setAvbleProps] = useState(null);

  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [listingType, setListingType] = useState(""); //true for For Sale, false for For Rent
  const [selectedFilters, setSelectedFilters] = useState(new Object());
  const { licenseID, setLicenseID } = useUserInfo();

  const navigate = useNavigate();

  const handleBedroomChange = (event) => {
    setBedrooms(event.target.value);
    setSelectedFilters({ ...selectedFilters, ...{ bedrooms: event.target.value } });
  };

  const handleBathroomChange = (event) => {
    setBathrooms(event.target.value);
    setSelectedFilters({ ...selectedFilters, ...{ bathrooms: event.target.value } });
  };

  const handleListingType = (event) => {
    setListingType(event.target.value);
    setSelectedFilters({ ...selectedFilters, ...{ listingType: event.target.value } });
  };

  const handleClearFilters = (event) => {
    setSelectedFilters({});
    setBedrooms("");
    setBathrooms("");
    setListingType("");
  };

  useEffect(() => {
    // if (loggedInUser) {
    //   setAuthenticated(loggedInUser);
    // }
    document.title = "Property Management";

    const fetchAvbleProps = async () => {
      try {
        //url
        const url = window.location.href;
        console.log("url", url);
        const host = window.location.host;
        console.log("host", host);
        const response = await axios.post("http://localhost:8080/availableProperties", { url });
        setAvbleProps(response.data.recordset);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAvbleProps();

    const fetchLicenseId = async (url) => {
      try {
        const response = await axios.post("http://localhost:8080/getLicense", { url });
        setLicenseID(response.data.recordset[0].Lic_License);
      } catch (error) {
        console.error(error);
      }
    };
    const url = window.location.href;
    fetchLicenseId(url);
  }, []);

  let listOfProps = [];

  if (avbleProps) {
    let filteredProps = avbleProps;
    if (Object.keys(selectedFilters).length) {
      filteredProps = avbleProps;
      if (selectedFilters.bedrooms) {
        filteredProps = filteredProps.filter(
          (prop) => prop.Property_Bedrooms >= selectedFilters.bedrooms
        );
      }
      if (selectedFilters.bathrooms) {
        filteredProps = filteredProps.filter(
          (prop) => prop.Property_Baths >= selectedFilters.bathrooms
        );
      }
      if (selectedFilters.listingType) {
        if (selectedFilters.listingType === "For Rent") {
          filteredProps = filteredProps.filter((prop) => prop.Property_ForSale === null);
        } else {
          filteredProps = filteredProps.filter((prop) => prop.Property_ForSale !== null);
        }
      }
    }

    const handleGetMoreInfo = (property) => {
      console.log("handlegetmoreinfo");
      let prop = property;
      // console.log("prop", prop);
      navigate("/dashboards/getMoreInfo", {
        state: { property: prop },
      });
    };

    const actionButtons = (property) => {
      return (
        <>
          <>
            <Tooltip title="Get More Info" placement="bottom">
              <MDTypography
                variant="body1"
                sx={{ cursor: "pointer", mx: 3 }}
                color="dark"
                lineHeight={1}
              >
                <ArticleIcon
                  fontSize="medium"
                  onClick={() => handleGetMoreInfo(property)}
                  className="getMoreInfoButton"
                ></ArticleIcon>
              </MDTypography>
            </Tooltip>
          </>
        </>
      );
    };

    filteredProps.map((prop) => {
      if (prop.PropShow_Active) {
        listOfProps.push(
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mt={3}>
              <BookingCard
                title={prop.Property_Addr1}
                image={`http://www.property-genie.com/ClientSites/${licenseID}/${prop.Property_ID}/pic0.jpg`}
                description={prop.Property_ForSale ? "For Sale" : "For Rent"}
                price={
                  prop.Property_ForSale ? `$${prop.Property_ForSale}` : `$${prop.PropShow_RentAmt}`
                }
                bedrooms={`${prop.Property_Bedrooms}/${prop.Property_Baths}`}
                location={prop.Property_City}
                action={actionButtons(prop)}
              />
            </MDBox>
          </Grid>
        );
      }
    });
  }

  // if (!loggedInUser) {
  //   return <Navigate replace to="/authentication/sign-in/cover" />;
  // } // eslint-disable-next-line
  // else {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <MDBox p={1}>
          <InputLabel>Search Filters:</InputLabel>
          <FormControl sx={{ m: 1, width: 120 }} variant="standard" size="medium">
            <InputLabel>Bedrooms</InputLabel>
            <Select value={bedrooms} onChange={handleBedroomChange}>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 120 }} variant="standard" size="medium">
            <InputLabel>Bathrooms</InputLabel>
            <Select
              labelId="bathrooms-filter-label"
              label="Bathrooms"
              id="bathrooms-filter"
              value={bathrooms}
              onChange={handleBathroomChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 120 }} variant="standard" size="medium">
            <InputLabel>Listing Type</InputLabel>
            <Select value={listingType} onChange={handleListingType}>
              <MenuItem value={"For Sale"}>For Sale</MenuItem>
              <MenuItem value={"For Rent"}>For Rent</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 120 }} variant="standard" size="small">
            <Button
              variant="contained"
              size="small"
              sx={{ color: "#ffffff", borderColor: "white" }}
              onClick={handleClearFilters}
            >
              Clear
            </Button>
          </FormControl>
        </MDBox>
        <MDBox mt={2}>
          <Grid container spacing={3}>
            {listOfProps}
          </Grid>
        </MDBox>
      </MDBox>
      <Footer></Footer>
    </DashboardLayout>
  );
  // }
}

export default Homepage;
