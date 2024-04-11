import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import dayjs from "dayjs";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./ownerPortalJournal.css";

function OwnerPortalJournal() {
  const location = useLocation();
  const propertyID = location.state.propertyID;
  const propertyAddr = location.state.propertyAddr;
  const [journal, setJournal] = useState([]);
  const [startDate, setStartDate] = useState(dayjs("2023-01-01"));
  const [endDate, setEndDate] = useState(dayjs());
  console.log("startDate, endDate", startDate, endDate);
  console.log("propertyID", propertyID);

  const fetchOwnerJournal = async (startDate, endDate) => {
    const url = window.location.href;
    try {
      const response = await axios.post("http://localhost:8080/ownerPropertyJournal", {
        propertyID,
        startDate,
        endDate,
        url,
      });
      let dataMap = [];
      let responseData = response.data.recordset;
      console.log("responseData", responseData);
      let id = 0;
      responseData.forEach((item) => {
        dataMap.push({
          id: id,
          amount: item.Amount,
          description: item.Description,
          incomeDate: dayjs(item.IncomeDate).format("MM/DD/YYYY"),
          memo: item.Memo,
          ownerBalance: item.OwnerBalance,
        });
        id++;
      });
      setJournal(dataMap);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOwnerJournal(startDate, endDate);
  }, []);

  useEffect(() => {
    fetchOwnerJournal(startDate, endDate);
  }, [startDate, endDate]);

  const columns = [
    { field: "amount", headerName: "Amount", width: 120, editable: false },
    { field: "incomeDate", headerName: "Income Date", width: 150, editable: false },
    { field: "ownerBalance", headerName: "Owner Balance", width: 150, editable: false },
  ];

  return (
    <DashboardLayout>
      <h2 className="ownerPortalJournalHeader">{propertyAddr}</h2>
      <div>
        <Box sx={{ height: 500, width: "100%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
              <span>
                <DatePicker
                  label="Select a start date:"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />
              </span>
              <span>
                <DatePicker
                  label="Select an end date:"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </span>
            </div>
          </LocalizationProvider>
          <DataGrid
            columns={[
              ...columns,
              {
                field: "description",
                sortable: false,
                headerName: "Description",
                width: 325,
                editable: false,
              },
              { field: "memo", sortable: false, headerName: "Memo", width: 325, editable: false },
            ]}
            rows={journal}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
          ></DataGrid>
        </Box>
      </div>
    </DashboardLayout>
  );
}

export default OwnerPortalJournal;
