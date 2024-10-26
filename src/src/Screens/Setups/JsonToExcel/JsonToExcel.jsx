import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ButtonDis from "../../../Components/Button/ButtonDis";
import Loader from "../../../Components/Modal/Loader";

function JsonToExcel() {
  const [jsonData, setJsonData] = useState(null);
  const [fileval, setFileVal] = useState(null);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);

  // Function to handle file upload and parse JSON
  const handleJsonUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setJsonData(json);
          console.log(json);
        } catch (error) {
          console.error("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  // Function to download the Excel file
  const downloadExcelFile = () => {
    if (!jsonData) return;

    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Convert to a Blob and download it
    const excelBlob = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBlob], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "data.xlsx");
  };

  const resetFileInput = () => {
    setFileVal(null); // Clear any state holding the file if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the input field
    }
    setJsonData(null);
  };

  return (
    <div>
      {/* Upload JSON file */}
      <div className="flex justify-center mt-4">
        <input
          type="file"
          accept=".json"
          onChange={handleJsonUpload}
          className="bg-blue-500"
          ref={fileInputRef}
        />
      </div>

      {/* Download Excel button */}
      {jsonData && (
        <div className="flex justify-center mt-4">
          <ButtonDis onClick={downloadExcelFile} title={"Download Excel"} />
        </div>
      )}

      <div className="flex justify-center mt-4">
        <ButtonDis title={"Reset"} onClick={resetFileInput} />
      </div>

      {/* Optional: Displaying the JSON data */}
      {jsonData && (
        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      )}

      <Loader onClick={open} title={"Please Wait ..."} />
    </div>
  );
}

export default JsonToExcel;
