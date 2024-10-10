import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function EXToJson() {
  const [jsonData, setJsonData] = useState(null);

  // Function to handle file upload and parse Excel
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Get the first worksheet in the Excel file
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convert the worksheet to JSON
        const json = XLSX.utils.sheet_to_json(worksheet);
        setJsonData(json);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Function to download the JSON file
  const downloadJsonFile = () => {
    if (!jsonData) return;

    const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });
    saveAs(jsonBlob, "data.json");
  };

  return (
    <div>
      <h1>Upload Excel and Download as JSON</h1>

      {/* File upload input */}
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
      />

      {/* Download JSON button */}
      {jsonData && (
        <button onClick={downloadJsonFile}>
          Download JSON
        </button>
      )}

      {/* Optional: Displaying the JSON data */}
      {jsonData && (
        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default EXToJson;
