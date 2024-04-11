// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import React, { useEffect, useState, useRef } from "react";

import { Button, FormLabel } from "@mui/material";
import axios from "axios";
import { useUserInfo } from "userContext";
import { Navigate, useLocation } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import dayjs from "dayjs";
import "./getMoreInfo.css";
import MapboxComponent from "components/Map/MapBox";
import CustomInput from "components/CustomInput";

function GetMoreInfo() {
  const { licenseID, setLicenseID } = useUserInfo();
  const location = useLocation();
  const property = location.state.property;
  const [propertyInfo, setPropertyInfo] = useState("");

  useEffect(() => {
    document.title = "Property Management";

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

    const fetchPropertyInfo = async () => {
      const propertyID = property.Property_ID;
      const url = window.location.href;
      try {
        const response = await axios.post("http://localhost:8080/propertyInfo", {
          propertyID,
          url,
        });
        setPropertyInfo(response.data.recordset[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPropertyInfo();
  }, []);

  let listOfProps = [];

  const itemData = [
    {
      img: `http://www.property-genie.com/ClientSites/${licenseID}/${property.Property_ID}/pic0.jpg`,
      title: "Property",
      rows: 3,
      cols: 3,
    },
    {
      img: `http://www.property-genie.com/ClientSites/${licenseID}/${property.Property_ID}/pic1.jpg`,
      title: "Property",
      rows: 2,
      cols: 1,
    },
    {
      img: `http://www.property-genie.com/ClientSites/${licenseID}/${property.Property_ID}/pic2.jpg`,
      title: "Property",
      rows: 2,
      cols: 1,
    },
    {
      img: `http://www.property-genie.com/ClientSites/${licenseID}/${property.Property_ID}/pic3.jpg`,
      title: "Property",
      rows: 2,
      cols: 1,
    },
  ];

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  let quiltedImages = [];

  quiltedImages.push(
    <ImageList
      sx={{ width: 1200, height: 840, margin: "auto" }}
      variant="quilted"
      cols={3}
      rowHeight={164}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img {...srcset(item.img, 121, item.rows, item.cols)} alt={item.title} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );

  const isPropAvailable = () => {
    const date = dayjs(propertyInfo.PropShow_AvailDate);
    if (dayjs(date).isBefore(dayjs())) {
      return "Now";
    } else {
      const future = dayjs(propertyInfo.PropShow_AvailDate, "MM-DD");
      console.log("future", future);
      return future;
    }
  };

  const lat = propertyInfo.Property_Latitude;
  const lng = propertyInfo.Property_Longitude;

  if (propertyInfo) {
    return (
      <DashboardLayout>
        <MDBox py={6}>{quiltedImages}</MDBox>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <div style={{ marginLeft: "300px", marginBottom: "50px" }}>
              <Card>
                <CardHeader>
                  <h4>Property Information</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={2}>
                      <FormLabel>Details:</FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={10}>
                      <div>
                        <p>{propertyInfo.PropShow_Description}</p>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={2}>
                      <FormLabel>Address:</FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={10}>
                      <div>
                        <p>{propertyInfo.Property_Addr1}</p>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={2}>
                      <FormLabel>City:</FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={10}>
                      <div>
                        <p>{`${propertyInfo.Property_City}, ${propertyInfo.Property_State}`}</p>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={2}>
                      <FormLabel>Bedrooms:</FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={10}>
                      <div>
                        <p>{propertyInfo.Property_Bedrooms}</p>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={2}>
                      <FormLabel>Bathrooms:</FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={10}>
                      <div>
                        <p>{propertyInfo.Property_Baths}</p>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={2}>
                      <FormLabel>Rent:</FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={10}>
                      <div>
                        <p>{propertyInfo.PropShow_RentAmt}</p>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={2}>
                      <FormLabel>Date available:</FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={10}>
                      <div>
                        <p>{isPropAvailable()}</p>
                      </div>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader>
                <div>
                  <p>&nbsp;</p>
                </div>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel>Pets allowed:</FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <div>
                      <p>{propertyInfo.Property_PetsAllowed ? "Yes" : "No"}</p>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={2}>
                    <FormLabel>Gated:</FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <div>
                      <p>{propertyInfo.Property_Gated ? "Yes" : "No"}</p>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={2}>
                    <FormLabel>Lawn care:</FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <div>
                      <p>{propertyInfo.Property_LawnCare ? "Yes" : "No"}</p>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={2}>
                    <FormLabel>Pool care:</FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <div>
                      <p>{propertyInfo.Property_PoolCare ? "Yes" : "No"}</p>
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <div style={{ marginLeft: "300px" }}>
              <Card>
                <CardHeader>
                  <h4>Request more information about this property:</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Name:"
                        id="name"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "name",
                        }}
                      ></CustomInput>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Address:"
                        id="address"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "address",
                        }}
                      ></CustomInput>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="City, State, ZIP:"
                        id="city_st_zip"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "city_st_zip",
                        }}
                      ></CustomInput>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Phone:"
                        id="phone"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "phone",
                        }}
                      ></CustomInput>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Fax:"
                        id="fax"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "fax",
                        }}
                      ></CustomInput>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Email:"
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "email",
                        }}
                      ></CustomInput>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Comments:"
                        id="comments"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "comments",
                        }}
                      ></CustomInput>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ color: "#ffffff", borderColor: "white" }}
                      >
                        Submit
                      </Button>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <div style={{ marginRight: "300px" }}>
              <Card>
                <CardBody>
                  <MapboxComponent lat={lat} lng={lng}></MapboxComponent>
                </CardBody>
              </Card>
            </div>
          </GridItem>
        </GridContainer>
      </DashboardLayout>
    );
  }
}

export default GetMoreInfo;
