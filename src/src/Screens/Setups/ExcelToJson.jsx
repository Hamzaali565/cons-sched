import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ButtonDis from "../../Components/Button/ButtonDis";
import GRNReportPDF from "../../Components/PDFDetails/GRNReportPDF";
import { pdf } from "@react-pdf/renderer";
import { v4 as uuidv4 } from "uuid";
import { json } from "react-router-dom";
import Loader from "../../Components/Modal/Loader";
import Header from "../../Components/Header/Header";
import GRNReportPDFNew from "../../Components/PDFDetails/GRNReportPDFNew";
import GRNReportSummaryPDF from "../../Components/PDFDetails/GRNReportSummaryPDF";
import LabelledDropDown from "../../Components/LabelledDropDown/LabelledDropDown";
function ExcelToJson() {
  const [jsonData, setJsonData] = useState(null);
  const [category, setCategory] = useState([]);
  const [detail, setDetail] = useState(false);

  const [summary, setSummary] = useState(false);
  const [TOGGLE, setTOGGLE] = useState(false);
  const [fileval, setfileval] = useState(null);
  const [dropData, setDropData] = useState([
    { name: "--" },
    { name: "Detail" },
    { name: "Summary" },
  ]);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setDropData([{ name: "--" }, { name: "Detail" }, { name: "Summary" }]);
  }, [TOGGLE]);

  // Function to handle file upload and parse Excel
  const handleFileUpload = (event) => {
    setOpen(true);
    const file = event.target.files[0];
    setfileval(event.target.files[0]);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Get the first worksheet in the Excel file
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Get as array of arrays

        // Remove the first four rows
        const filteredData = sheetData.slice(4);

        // Convert the worksheet to JSON
        const JSONDATA = XLSX.utils.sheet_to_json(
          XLSX.utils.aoa_to_sheet(filteredData)
        );
        setJsonData(JSONDATA);
        console.log(JSONDATA);

        // Extract unique "Item Category" values and log them
        const uniqueTypes = Array.from(
          new Set(JSONDATA.map((item) => item["Item Category"]))
        ).map((type) => ({ type }));

        setCategory(uniqueTypes);
      };
      reader.readAsArrayBuffer(file);
      setOpen(false);
    }
  };

  // Function to download the JSON file
  const downloadJsonFile = (value) => {
    // if (!jsonData) return;

    // const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], {
    //   type: "application/json",
    // });
    // saveAs(jsonBlob, "data.json");

    // value = "General Item"
    setOpen(true);
    // Step 1: Filter based on Item Category and Deleted status
    const filterJson = jsonData.filter(
      (items) =>
        items?.["Item Category"] === value && items?.["Deleted"] !== true
    );
    console.log("Filtered Json", filterJson);

    const grouped = filterJson.reduce((acc, curr) => {
      // Find if the group already exists for the speciality
      let group = acc.find(
        (group) => group[0]?.["Item Name"] === curr["Item Name"]
      );

      // If group exists, push the current element into it
      if (group) {
        group.push(curr);
      } else {
        // If no group exists, create a new group
        acc.push([curr]);
      }

      return acc;
    }, []);

    grouped.sort((a, b) => a[0]["Item Name"].localeCompare(b[0]["Item Name"]));
    console.log("grouped", grouped);
    printGRNReportPDF(grouped, value);
  };

  const SummaryReport = () => {
    setOpen(true)
    const filterJson = jsonData.filter((items) => items?.["Deleted"] !== true);
    console.log("Filtered Json", filterJson);
    // Step 2: Count occurrences of each supplier
    const supplierCount = filterJson.reduce((acc, item) => {
      const supplierName = item["Supplier Name"];
      const amount = item["Net Amount"];

      if (!acc[supplierName]) {
        acc[supplierName] = { count: 0, totalAmount: 0 }; // Initialize if supplier doesn't exist
      }

      acc[supplierName].count += 1; // Increment the count
      acc[supplierName].totalAmount += amount; // Add the amount

      return acc; // Return the accumulator
    }, {});
    console.log("supplierCount", supplierCount);

    const suppCountJsonData = Object.entries(supplierCount).map(
      ([name, count]) => ({
        SupplierName: name,
        count: count?.count,
        amount: count?.totalAmount,
      })
    );

    console.log("suppCountJsonData", suppCountJsonData);
    const mostDealtSupp = suppCountJsonData.filter((items) => items.count >= 1);

    mostDealtSupp.sort((a, b) => {
      let nameA = a.count;
      let nameb = b.count;
      if (nameA > nameb) {
        return -1;
      }
      if (nameb > nameA) {
        return 1;
      }
      return 0;
    });
    console.log("mostDealtSupp", mostDealtSupp);
    printGRNReportPDFSummary(mostDealtSupp);
  };

  const printGRNReportPDFSummary = async (data, value) => {
    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(
      <GRNReportSummaryPDF resultData={data} category={"value"} />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
    setOpen(false);
  };
  const printGRNReportPDF = async (data, value) => {
    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(
      <GRNReportPDFNew resultData={data} category={value} />
    ).toBlob();

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
    setDropData([]);
    setJsonData(null);
    setSummary(false);
    setDetail(false);
    setTOGGLE(!TOGGLE);
  };

  const handleChange = (name) => {
    if (name === "Detail") {
      setDetail(true);
      setSummary(false);
      return;
    } else {
      setSummary(true);
      setDetail(false);
    }
  };

  return (
    <div>
      <Header inpShow={false} />
      {/* File upload input */}
      <div className="flex justify-center mt-4">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="bg-blue-500"
          ref={fileInputRef}
        />
      </div>
      {jsonData && (
        <div className="flex justify-center my-4">
          <LabelledDropDown
            label={"Select Report Type"}
            data={dropData}
            onChange={handleChange}
          />
        </div>
      )}
      {/* Download JSON button */}
      {detail === true &&
        category.map((items, index) => (
          <div className="flex justify-center mt-4">
            <ButtonDis
              onClick={() => downloadJsonFile(items?.type)}
              title={items?.type}
            />
          </div>
        ))}

      {summary === true && (
        <div className="flex justify-center mt-4">
          <ButtonDis title={"Summary"} onClick={SummaryReport} />
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
  );
}

export default ExcelToJson;
