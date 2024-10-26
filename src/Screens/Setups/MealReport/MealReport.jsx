import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ButtonDis from "../../../Components/Button/ButtonDis";
import GRNReportPDF from "../../../Components/PDFDetails/GRNReportPDF";
import { pdf } from "@react-pdf/renderer";
import { v4 as uuidv4 } from "uuid";
import { json } from "react-router-dom";
import Loader from "../../../Components/Modal/Loader";
import Header from "../../../Components/Header/Header";
import MealReportPdf from "../../../Components/PDFDetails/MealReportPdf";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabelledDropDown from "../../../Components/LabelledDropDown/LabelledDropDown";
import BedStatementPDF from "../../../Components/PDFDetails/BedStatementPDF";
import LabReportPDf from "../../../Components/PDFDetails/LabReportPDF";
import CheckBoxInput from "../../../Components/CheckBoxInput.jsx/CheckBoxInput";
import { ErrorAlert } from "../../../Components/Alert/Alert";
import moment from "moment";
function MealReport() {
  const [time, setTime] = useState("");
  const [time1, setTime1] = useState("");
  const [message, setMessage] = useState("");
  const [DateName, setDateName] = useState("");
  const [jsonData, setJsonData] = useState(null);
  const [category, setCategory] = useState([]);
  const [fileval, setfileval] = useState(null);
  const [open, setOpen] = useState(false);
  const [printType, setPrintType] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [reportType, setReportType] = useState([
    { name: "--" },
    { name: "Meal Report" },
    { name: "Bed Statement" },
    { name: "Lab Report" },
  ]);
  const fileInputRef = useRef(null);

  // Function to handle file upload and parse Excel
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("file", file);
    if (file === undefined) {
      return setOpen(false);
    }
    setOpen(true);
    setfileval(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Get the first worksheet in the Excel file
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convert the worksheet to an array
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Get as array of arrays

        // Remove the first four rows

        const filteredData = sheetData.slice(
          printType === "Bed Statement" ? 3 : 4
        );

        // Convert the remaining data back to JSON (assuming the first row contains headers)
        const JSONDATA = XLSX.utils.sheet_to_json(
          XLSX.utils.aoa_to_sheet(filteredData)
        );

        if (printType === "Lab Report") {
          let firstFilter = JSONDATA.filter(
            (items) => items?.["Result Date & Time"]
          );
          let dateFormatted = firstFilter.map((items) => ({
            ...items,
            foramttedTime: moment(
              items?.["Result Date & Time"],
              "DD/MM/YYYY HH:mm:ss"
            ).format("HH:mm:ss"),
          }));
          // example date is "23/10/2024 12:25:13"
          console.log("dateFormatted", dateFormatted);
          let date = firstFilter[0]["Result Date & Time"][0];
          let monthName = moment(date, "DD/MM/YYYY hh:mm:ss").format(
            "DD/MM/YYYY"
          );
          setDateName(monthName);
          console.log(monthName);

          // let uniqueTypes = Array.from(
          //   new Set(firstFilter.map((item) => item["Result Input User"]))
          // ).map((type) => ({ type }));
          // // uniqueTypes.shift();
          // setCategory(uniqueTypes);
          // console.log(uniqueTypes);
          setJsonData(dateFormatted);
          setOpen(false);
          return;
        }

        setJsonData(JSONDATA);
        console.log(JSONDATA);
        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Function to download the JSON file
  const downloadJsonFile = (value) => {
    setOpen(true);
    const filterJson = jsonData.filter(
      (items) =>
        items?.["Service Description"]?.includes(value) && items?.Tagged === "1"
    );
    console.log("Filter Json", filterJson);

    let sortedData = filterJson.sort((a, b) => {
      let nameA = a["Ward Name"].toLowerCase();
      let nameB = b["Ward Name"].toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    printGRNReportPDF(sortedData, value);
  };

  const printGRNReportPDF = async (data, value) => {
    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(
      <MealReportPdf resultData={data} category={value} />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
    setOpen(false);
  };
  const printBedStatementPDF = async (data, value) => {
    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(<BedStatementPDF resultData={jsonData} />).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
    setOpen(false);
  };

  const resetFileInput = () => {
    setfileval(null); // Clear any state holding the file if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the input field
    }
    setJsonData(null);
    setAllUsers([]);
    setCategory([]);
    setTime("");
    setTime1("");
    setMessage("");
  };

  const updateRepotType = (name) => {
    setPrintType(name);
    console.log(name);
  };

  const filterReport = (report) => {
    // if (allUsers.length <= 0) {
    //   ErrorAlert({ text: "PLEASE SELECT USER !!!", timer: 2000 });
    //   return;
    // }
    setOpen(true);
    console.log(report);

    const filteredData = report.filter(
      (items) =>
        items?.["Source IPD/OPD"] !== "Cash" &&
        items?.["Source IPD/OPD"] !== "ER" &&
        items?.["Result Date & Time"]
      // allUsers.includes(items?.["Result Input User"])
    );
    let groupData = [];
    filteredData.forEach(({ "M.R. No.": mrNo, ...rest }) => {
      if (!groupData[mrNo]) {
        groupData[mrNo] = [];
      }
      groupData[mrNo].push({ ...rest, mrNo: mrNo });
    });
    let formatted = Object.values(groupData);

    printLabReportPDF(formatted);
  };

  const printLabReportPDF = async (data, value) => {
    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(
      <LabReportPDf resultData={data} category={value} todaysDate={DateName} />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
    setOpen(false);
  };

  // const ArrayUserSet = (Boolean, user) => {
  //   if (Boolean === true) {
  //     setAllUsers([...allUsers, user]);
  //     return;
  //   }
  //   const deleteUser = allUsers.filter((items) => items !== user);
  //   setAllUsers(deleteUser);
  //   console.log(deleteUser);
  // };

  const handleChange = (value, type) => {
    if (type === "Time") {
      setTime(value);
      setMessage("");
      return;
    } else {
      setTime1(value);
      setMessage("");
      return;
    }
  };

  const handleSubmit = () => {
    if (time === "") {
      setMessage("Please Enter From Time");
      return;
    }
    if (time1 === "") {
      return setMessage("Please Enter To Time");
    }
    // Validate the time format
    const timeFormat = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; // HH:MM:SS format
    if (time1 <= time) {
      ErrorAlert({
        text: "To time must be greater than from time",
        timer: 4000,
      });
      return;
    }
    if (timeFormat.test(time)) {
      if (timeFormat.test(time1)) {
        let filteredData = jsonData.filter((item) => {
          const times = moment(item?.foramttedTime, "HH:mm:ss");
          return times.isBetween(
            moment(time, "HH:mm:ss"),
            moment(time1, "HH:mm:ss"),
            null,
            "[]"
          ); // '[]' includes the endpoints
        });
        if (filteredData.length <= 0) {
          ErrorAlert({
            text: "DO ENTRY FOUND TO BE PRINT IN THIS TIME PERIOD !!!",
            timer: 4000,
          });
          return;
        }

        filterReport(filteredData);
        return;
      } else {
        console.log("Invalid time format of To Time. Please use HH:MM:SS.");
        setMessage("Invalid time format of To Time. Please use HH:MM:SS.");
        return;
      }
      return;
    } else {
      setMessage("Invalid time format of From Time. Please use HH:MM:SS.");
      console.log("Invalid time format of from Time. Please use HH:MM:SS.");
    }
  };
  return (
    <div>
      <Header inpShow={false} />
      <div>
        {/* <h1>Upload Excel and Download as JSON</h1> */}
        {/* File upload input */}
        <div>
          <CenterHeading title={"REPORTS"} />

          <div className="flex justify-center">
            <LabelledDropDown
              label={"Select Report Type"}
              data={reportType}
              onChange={updateRepotType}
            />
          </div>
          {printType === "Meal Report" && (
            <div>
              <CenterHeading
                title={" UPLOAD LIST OF SERVICE REQUISITION (CAFETERIA)"}
              />
              <CenterHeading
                title={"BEFORE UPLOADING NEW FIRST FILE CLICK ON RESET BUTTON"}
              />
            </div>
          )}
          {printType === "Bed Statement" && (
            <div>
              <CenterHeading
                title={"BEFORE UPLOADING NEW FIRST FILE CLICK ON RESET BUTTON"}
              />
              <CenterHeading title={"UPLOAD BED STATEMENT REPORT"} />
            </div>
          )}
          {printType === "Lab Report" && (
            <div>
              <CenterHeading
                title={"BEFORE UPLOADING NEW FIRST FILE CLICK ON RESET BUTTON"}
              />
              <CenterHeading title={"UPLOAD LAB TRACKING STATUS REPORT"} />
            </div>
          )}
        </div>
        {printType !== "" && (
          <div className="flex justify-center mt-4">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="bg-blue-500"
              ref={fileInputRef}
            />
          </div>
        )}
        {/* Download JSON button */}
        {jsonData && printType === "Meal Report" && (
          <div className="flex justify-center mt-4">
            {/* <ButtonDis
              onClick={() => downloadJsonFile(items?.type)}
              title={items?.type}
            /> */}
            <ButtonDis
              title={"BreakFast"}
              onClick={() => downloadJsonFile("Break")}
            />
            <ButtonDis
              title={"Lunch"}
              onClick={() => downloadJsonFile("Lunch")}
            />
            <ButtonDis
              title={"Dinner"}
              onClick={() => downloadJsonFile("Dinner")}
            />
          </div>
        )}
        {printType === "Bed Statement" && (
          <div className="flex justify-center mt-4">
            <ButtonDis
              title={"Print"}
              onClick={() => {
                setOpen(true);
                printBedStatementPDF("bedStatement");
              }}
              disabled={(!jsonData && true) || false}
            />
          </div>
        )}

        {printType === "Lab Report" && (
          <div>
            <div className="flex justify-center mt-3 space-x-4">
              <h1>From Time:</h1>
              <input
                type="text"
                value={time}
                onChange={(e) => handleChange(e.target.value, "Time")}
                placeholder="HH:MM:SS"
                maxLength={8}
                className="border-2 border-black rounded-md w-20"
              />
            </div>
            <div className="flex justify-center mt-3 space-x-4">
              <h1>To Time:</h1>
              <input
                type="text"
                value={time1}
                onChange={(e) => handleChange(e.target.value, "Time1")}
                placeholder="HH:MM:SS"
                maxLength={8}
                className="border-2 border-black rounded-md w-20"
              />
            </div>
          </div>
        )}
        {message && (
          <div className="flex justify-center text-red-600 font-bold underline">
            {message}
          </div>
        )}
        {printType === "Lab Report" && (
          <div className="flex justify-center mt-4">
            <ButtonDis
              title={"Print"}
              onClick={() => {
                handleSubmit();
              }}
              disabled={(!jsonData && true) || false}
            />
          </div>
        )}
        <div className="flex justify-center mt-4">
          <ButtonDis title={"Reset"} onClick={resetFileInput} />
        </div>
        {/* Optional: Displaying the JSON data * */}
        {/* {jsonData && (
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        )} */}
        <Loader onClick={open} title={"Please Wait ..."} />
      </div>
    </div>
  );
}

export default MealReport;
