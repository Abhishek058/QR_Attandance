import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import QrReader from "react-qr-reader";
import students from "../students";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");

  const handleErrorWebCam = (error) => {
    console.error(error);
    setScanResultWebCam("Error scanning QR code. Please try again.");
  };

  const handleScanWebCam = (result) => {
    if (result) {
      for (var i = 0; i < students.length; i++) {
        if (result == students[i].rollNo) {
          var isPresent = true;
          var index = i;
          break;
        }
      }
      if (isPresent) {
        setScanResultWebCam(
          `${students[index].name} - ${students[index].rollNo}`
        );
        setName(students[index].name);
        setRollNo(students[index].rollNo);

        handleSetAttendance(name, rollNo);
      } else {
        setScanResultWebCam(`${result} - Student Not Found`);
      }
    }
  };

  const handleSetAttendance = async (name, rollNo) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/in", {
        name: name,
        rollNo: rollNo,
      });
      if (response.data.message) {
        alert(response.data.message);
      } else {
        alert("Attendance marked successfully");
      }
      console.log("Attendance marked:", response.data);
    } catch (error) {
      console.error("Error recording attendance:", error);
    }
  };

  return (
    <div>
      <center>
        <Grid item xl={4} lg={5} md={6} sm={9} xs={9}>
          <h1>Scan Your QR ID</h1>
          <QrReader
            delay={500}
            style={{ width: "100%" }}
            onError={handleErrorWebCam}
            onScan={handleScanWebCam}
          />
          <h3>{scanResultWebCam}</h3>
        </Grid>
      </center>
    </div>
  );
}
