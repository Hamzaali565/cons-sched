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
function MealReport() {
  const [jsonData, setJsonData] = useState(null);
  const [category, setCategory] = useState([]);
  const [fileval, setfileval] = useState(null);
  const [open, setOpen] = useState(false);
  const [printType, setPrintType] = useState("");
  const [reportType, setReportType] = useState([
    { name: "--" },
    { name: "Meal Report" },
    { name: "Bed Statement" },
  ]);
  const fileInputRef = useRef(null);

  // Function to handle file upload and parse Excel
  const handleFileUpload = (event) => {
    setOpen(true);
    const file = event.target.files[0];
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
          printType === "Meal Report" ? 4 : 3
        );

        // Convert the remaining data back to JSON (assuming the first row contains headers)
        const JSONDATA = XLSX.utils.sheet_to_json(
          XLSX.utils.aoa_to_sheet(filteredData)
        );

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

    // const grouped = filterJson.reduce((acc, curr) => {
    //   // Find if the group already exists for the speciality
    //   let group = acc.find(
    //     (group) => group[0]?.["Item Name"] === curr["Item Name"]
    //   );

    //   // If group exists, push the current element into it
    //   if (group) {
    //     group.push(curr);
    //   } else {
    //     // If no group exists, create a new group
    //     acc.push([curr]);
    //   }

    //   return acc;
    // }, []);

    // grouped.sort((a, b) => a[0]["Item Name"].localeCompare(b[0]["Item Name"]));
    // console.log("grouped", grouped);
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
  };

  const updateRepotType = (name) => {
    setPrintType(name);
    console.log(name);
  };

  return (
    <div>
      <Header inpShow={false} />
      <div>
        {/* <h1>Upload Excel and Download as JSON</h1> */}
        {/* File upload input */}
        <div>
          <CenterHeading title={"MEAL REPORT"} />

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
              onClick={() => printBedStatementPDF("bedStatement")}
            />
          </div>
        )}
        <div className="flex justify-center mt-4">
          <ButtonDis title={"Reset"} onClick={resetFileInput} />
        </div>
        Optional: Displaying the JSON data *
        {jsonData && (
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        )}
        <Loader onClick={open} title={"Please Wait ..."} />
      </div>
    </div>
  );
}

export default MealReport;
