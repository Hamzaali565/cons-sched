import React, { useCallback, useState } from "react";
import Header from "../../../Components/Header/Header";
import * as XLSX from "xlsx";
import ButtonDis from "../../../Components/Button/ButtonDis";
import { saveAs } from "file-saver";

const DvagoRep = () => {
  const [open, setOpen] = useState(false);
  const [fileval, setfileval] = useState(null);
  const [printType, setPrintType] = useState("");
  const [listOfIssance, setListOfIssuance] = useState(null);
  const [listOfRefund, setListOfRefund] = useState(null);
  const [panelReceiving, setPanelReceiving] = useState(null);

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

        const filteredData = sheetData.slice(4);

        // Convert the remaining data back to JSON (assuming the first row contains headers)
        let JSONDATA = XLSX.utils.sheet_to_json(
          XLSX.utils.aoa_to_sheet(filteredData)
        );
        JSONDATA = JSONDATA.map((items) => {
          return Object.fromEntries(
            Object.entries(items).map(([key, value]) => [
              key.trim(),
              value?.toString().trim(),
            ])
          );
        });
        setListOfIssuance(JSONDATA);
        console.log(JSONDATA);
        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleFileUploadRefund = (event) => {
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

        const filteredData = sheetData.slice(4);

        // Convert the remaining data back to JSON (assuming the first row contains headers)
        const JSONDATA = XLSX.utils.sheet_to_json(
          XLSX.utils.aoa_to_sheet(filteredData)
        );

        setListOfRefund(JSONDATA);
        console.log("refund", JSONDATA);
        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleFileUploadPanelRec = (event) => {
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

        const filteredData = sheetData.slice(4);

        // Convert the remaining data back to JSON (assuming the first row contains headers)
        let JSONDATA = XLSX.utils.sheet_to_json(
          XLSX.utils.aoa_to_sheet(filteredData)
        );

        JSONDATA = JSONDATA.map((items) => {
          return Object.fromEntries(
            Object.entries(items).map(([key, value]) => [
              key.trim(),
              value?.toString().trim(),
            ])
          );
        });

        setPanelReceiving(JSONDATA);
        console.log("panel receiving", JSONDATA);
        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const calculate = () => {
    // let refundData = listOfRefund.map((items) => items?.["Issuance No."]);
    let refundData = listOfRefund.map((items) => ({
      issuanceNo: items["Issuance No."],
      itemName: items["Item Code"],
    }));

    let issuanceData = listOfIssance.filter(
      (items) =>
        !refundData.some(
          (refund) =>
            refund.issuanceNo === items["Issuance No."] &&
            refund.itemName === items["Item Name"]
        )
    );

    console.log("Filtered issuanceData:", issuanceData);

    issuanceData.forEach((items) => {
      let findItems = panelReceiving.find(
        (panelPercent) =>
          items?.["Issuance No."] === panelPercent?.["Issuance No."] &&
          items?.["Coporate No."] === panelPercent?.["Welfare No."] &&
          items?.["Party Name"] === panelPercent?.["Party Name"]
      );

      if (findItems) {
        items.panelPercent = findItems?.["Adjustment (%)"];
      }
    });

    console.log("issuance Data", issuanceData);
    // Step 1: Calculate total Net Amount for each unique combination
    let alOutput = [];

    // Loop over the issuance data
    // Convert issuanceData into a map for quick lookup
    // Step 1: Create a Map from issuanceData for quick lookup
    // Step 1: Create a Set to track existing keys from issuanceData
    const existingKeys = new Set(
      issuanceData.map(
        (item) => `${item["Issuance No."]}_${item["Party Name"]}`
      )
    );

    // Step 2: Loop through panelReceiving and add records to alOutput
    panelReceiving.forEach((partyInfo) => {
      const key = `${partyInfo["Issuance No."]}_${partyInfo["Party Name"]}`;

      // Find matching records in issuanceData
      const matchingRecords = issuanceData.filter(
        (i) => i["Issuance No."] === partyInfo["Issuance No."]
      );

      // Loop through each matching record and handle Net Amount
      matchingRecords.forEach((record) => {
        alOutput.push({
          ...record,
          "Party Name": partyInfo["Party Name"],
          panelPercent: partyInfo["Adjustment (%)"],
          "Net Amount": existingKeys.has(key) ? record["Net Amount"] : 0,
        });
      });
    });

    // Sort the output to ensure sequence is maintained
    alOutput.sort((a, b) => {
      if (a["Issuance No."] === b["Issuance No."]) {
        return a["Party Name"].localeCompare(b["Party Name"]);
      }
      return a["Issuance No."] - b["Issuance No."];
    });

    console.log(alOutput);

    const totalsByMcNoAndParty = alOutput.reduce((acc, item) => {
      const key = `${item["Issuance No."]}_${item["Party Name"]}`;
      if (!acc[key]) acc[key] = 0;
      acc[key] += +item["Net Amount"];
      return acc;
    }, {});

    // Step 2: Build the output array
    let output = [];
    const seenKeys = new Set();

    alOutput.forEach((item) => {
      const key = `${item["Issuance No."]}_${item["Party Name"]}`;

      if (!seenKeys.has(key)) {
        // First occurrence of the combination: include panelPercent and total
        output.push({
          ...item,
          total: totalsByMcNoAndParty[key],
        });
        seenKeys.add(key);
      } else {
        // Subsequent occurrences: remove panelPercent
        const { panelPercent, ...rest } = item;
        output.push(rest);
      }
    });

    output = output.map((items, index) => ({
      "S. No.": index + 1,
      "Issuance No.": items?.["Issuance No."],
      "Issuance Date": items?.["Issuance Date"],
      "Item Code": items?.["Item Code"],
      "Item Name": items?.["Item Name"],
      Unit: items?.["Unit"],
      "Batch No.": items?.["Batch No."],
      "Expiry Date": items?.["Expiry Date"],
      "Sale Rate": items?.["Sale Rate"],
      Qty: items?.["Qty"],
      "Gross Amount": items?.["Gross Amount"],
      "Discount%age": items?.["Discount%age"],
      "Discount Amount": items?.["Discount Amount"],
      "Dvago Discount %": 0,
      "Net Amount": items?.["Net Amount"],
      "Dvago Discount": items?.["Dvago Discount"],
      "Party Code": items?.["Party Code"],
      "Party Name": items?.["Party Name"],
      "User ID": items?.["User ID"],
      "Shift No.": items?.["Shift No."],
      "CoporateNo.": items?.["Coporate No."],
      "Invoice Total": items?.total,
      // "Invoice Total": 0,
      "After Dvago %": 0,
      "Panel %": items?.panelPercent,
      "Panel Receivable": items?.panelPercent
        ? items?.panelPercent == 100
          ? items?.total
          : (items?.total * items?.panelPercent) / 100
        : "",
      "ZMC Receivable": items?.["ZMC Receivable"],
    }));
    downloadExcelFile(output);

    // let panelData = panelReceiving.filter(
    //   (items) => !refundData.includes(items?.["Issuance No."])
    // );
    console.log("output", issuanceData);
  };

  const downloadExcelFile = (data) => {
    if (!data) return setOpen(false);

    // Create the main worksheet from the data
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add formulas for columns P, W, and Z
    data.forEach((_, index) => {
      const rowNumber = index + 2; // Row 2 corresponds to the first row of data (row 1 is for headers)

      // Add formula for P column
      worksheet[`P${rowNumber}`] = {
        f: `IFERROR(O${rowNumber}-((O${rowNumber}*N${rowNumber})/100),O${rowNumber})`,
      };

      // Add formula for V column

      // Add formula for W column
      worksheet[`W${rowNumber}`] = {
        f: `IF(B${rowNumber}=B${
          rowNumber - 1
        },"",SUMIF($B$2:$B$48373,B${rowNumber},$P$2:$P$1048576))`,
      };

      // Add formula for Z column
      worksheet[`Z${rowNumber}`] = {
        f: `IFERROR(IF(X${rowNumber}>0,(SUMIF($B$2:$B$999999,B${rowNumber},$W$2:$W$999999)*X${rowNumber})/100,""),"")`,
      };

      // ✅ Add formula for Y column
      worksheet[`Y${rowNumber}`] = {
        f: `IFERROR(IF(X${rowNumber}>0,(SUMIF($B$2:$B$999999,B${rowNumber},$V$2:$V$999999)*X${rowNumber})/100,""),"")`,
      };
    });

    // Group data by Party Name to create the summary sheet
    const summaryData = [];
    const partySummary = {};

    data.forEach((row) => {
      const partyName = row["Party Name"];

      if (!partySummary[partyName]) {
        partySummary[partyName] = {
          "Party Name": partyName,
          "Total Bill's": 0,
          "Panel Recivable": 0,
          "ZMC Recivable": 0,
        };
      }
    });

    // Convert the summary object to an array
    for (const party in partySummary) {
      summaryData.push(partySummary[party]);
    }

    // Create the summary worksheet
    const summaryWorksheet = XLSX.utils.json_to_sheet(summaryData);

    // Add formulas for columns B, C, and D in the summary sheet
    summaryData.forEach((_, index) => {
      const rowNumber = index + 2; // Formula starts from row 2 in the Summary sheet
      summaryWorksheet[`B${rowNumber}`] = {
        f: `SUMIF(Sheet1!$R$2:$R$5666,Summary!A${rowNumber},Sheet1!$V$2:$V$5666)`,
      };

      summaryWorksheet[`C${rowNumber}`] = {
        f: `SUMIF(Sheet1!$R$2:$R$5666,Summary!A${rowNumber},Sheet1!$Y$2:$Y$5666)`,
      };

      summaryWorksheet[`D${rowNumber}`] = {
        f: `SUMIF(Sheet1!$R$2:$R$5666,Summary!A${rowNumber},Sheet1!$Z$2:$Z$5666)`,
      };
    });

    // Apply basic formatting to the Summary sheet
    const headerStyle = {
      font: { bold: true },
      fill: {
        patternType: "solid",
        fgColor: { rgb: "FFCC00" }, // Light Yellow background
      },
      alignment: { horizontal: "center", vertical: "center" },
    };

    // Apply styles to header row (row 1)
    summaryWorksheet["A1"].s = headerStyle;
    summaryWorksheet["B1"].s = headerStyle;
    summaryWorksheet["C1"].s = headerStyle;
    summaryWorksheet["D1"].s = headerStyle;

    // Set column widths for readability
    summaryWorksheet["!cols"] = [
      { wch: 20 }, // Party Name
      { wch: 20 }, // Total Bill's
      { wch: 20 }, // Panel Receivable
      { wch: 20 }, // ZMC Receivable
    ];

    // Create a new workbook and append both worksheets
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.utils.book_append_sheet(workbook, summaryWorksheet, "Summary");

    // Convert the workbook to a Blob and download the file
    const excelBlob = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBlob], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "issuance.xlsx");
    setOpen(false);
  };

  return (
    <div>
      <Header inpShow={false} />
      <div>
        <div className="flex justify-center mt-4 items-center space-x-4">
          <label htmlFor="" className="underline font-bold">
            LIST OF ISSUANCE:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="bg-blue-500"
            //   ref={fileInputRef}
          />
        </div>
        <div className="flex justify-center mt-4 items-center space-x-4">
          <label htmlFor="" className="underline font-bold">
            LIST OF REFUND:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUploadRefund}
            className="bg-blue-500"
            //   ref={fileInputRef}
          />
        </div>
        <div className="flex justify-center mt-4 items-center space-x-4">
          <label htmlFor="" className="underline font-bold">
            PANEL RECEIVING REPORT:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUploadPanelRec}
            className="bg-blue-500"
            //   ref={fileInputRef}
          />
        </div>
        <div className="flex justify-center mt-4">
          <ButtonDis title={"Calculate"} onClick={calculate} />
        </div>
      </div>
    </div>
  );
};
export default DvagoRep;

let refund = [
  { mcNo: 1, refNo: 2, name: "cap" },
  { mcNo: 2, refNo: 3, name: "cap1" },
  { mcNo: 3, refNo: 5, name: "cap2" },
];

let iussuance = [
  {
    mcNo: 1,
    name: "cap",
    price: 200,
    partyAdj: 100,
    party: "Saylani",
    panelPercent: 70,
  },
  { mcNo: 1, name: "cap1", price: 100, partyAdj: 100, party: "Saylani" },
  { mcNo: 1, name: "cap2", price: 100, partyAdj: 100, party: "Saylani" },
  { mcNo: 1, name: "cap3", price: 100, partyAdj: 100, party: "Saylani" },
  {
    mcNo: 2,
    name: "cap1",
    price: 100,
    partyAdj: 100,
    party: "Jamuna",
    panelPercent: 70,
  },
  { mcNo: 2, name: "cap1", price: 100, partyAdj: 100, party: "Jamuna" },
  { mcNo: 2, name: "cap12", price: 100, partyAdj: 100, party: "Jamuna" },
  { mcNo: 2, name: "cap32", price: 100, partyAdj: 100, party: "Jamuna" },
  {
    mcNo: 3,
    name: "cap21",
    price: 100,
    partyAdj: 100,
    party: "kamuna",
    panelPercent: 70,
  },
  { mcNo: 3, name: "cap22", price: 100, partyAdj: 100, party: "kamuna" },
  { mcNo: 3, name: "cap23", price: 100, partyAdj: 100, party: "kamuna" },
  {
    mcNo: 4,
    name: "cap2",
    price: 100,
    partyAdj: 100,
    party: "Namuna",
    panelPercent: 70,
  },
  { mcNo: 4, name: "cap4", price: 100, partyAdj: 100, party: "Namuna" },
  { mcNo: 4, name: "cap3", price: 100, partyAdj: 100, party: "Namuna" },
  {
    mcNo: 5,
    name: "cap2",
    price: 100,
    partyAdj: 100,
    party: "Damuna",
    panelPercent: 70,
  },
  {
    mcNo: 6,
    name: "cap2",
    price: 100,
    partyAdj: 100,
    party: "Samuna",
    panelPercent: 70,
  },
  { mcNo: 6, name: "cap3", price: 100, partyAdj: 100, party: "Samuna" },
];

let panelReceiving = [
  { mcNo: 1, party: "Saylani", panelPercent: 70 },
  { mcNo: 1, party: "Z Account", panelPercent: 30 },
  { mcNo: 2, party: "Jamuna", panelPercent: 70 },
  { mcNo: 3, party: "kamuna", panelPercent: 70 },
  { mcNo: 4, party: "Namuna", panelPercent: 70 },
  { mcNo: 5, party: "Damuna", panelPercent: 70 },
  { mcNo: 6, party: "Samuna", panelPercent: 70 },
];

// output = [
//   {
//     mcNo: 1,
//     name: "cap",
//     price: 200,
//     partyAdj: 100,
//     party: "Saylani",
//     panelPercent: 70,
//   },
//   { mcNo: 1, name: "cap1", price: 100, partyAdj: 100, party: "Saylani" },
//   { mcNo: 1, name: "cap2", price: 100, partyAdj: 100, party: "Saylani" },
//   { mcNo: 1, name: "cap3", price: 100, partyAdj: 100, party: "Saylani" },
//   {
//     mcNo: 1,
//     name: "cap",
//     price: 200,
//     partyAdj: 100,
//     party: "Z Account",
//     panelPercent: 30,
//   },
//   { mcNo: 1, name: "cap1", price: 100, partyAdj: 100, party: "Z Account" },
//   { mcNo: 1, name: "cap2", price: 100, partyAdj: 100, party: "Z Account" },
//   { mcNo: 1, name: "cap3", price: 100, partyAdj: 100, party: "Z Account" },
//   {
//     mcNo: 2,
//     name: "cap1",
//     price: 100,
//     partyAdj: 100,
//     party: "Jamuna",
//     panelPercent: 70,
//   },
//   { mcNo: 2, name: "cap1", price: 100, partyAdj: 100, party: "Jamuna" },
//   { mcNo: 2, name: "cap12", price: 100, partyAdj: 100, party: "Jamuna" },
//   { mcNo: 2, name: "cap32", price: 100, partyAdj: 100, party: "Jamuna" },
//   {
//     mcNo: 3,
//     name: "cap21",
//     price: 100,
//     partyAdj: 100,
//     party: "kamuna",
//     panelPercent: 70,
//   },
//   { mcNo: 3, name: "cap22", price: 100, partyAdj: 100, party: "kamuna" },
//   { mcNo: 3, name: "cap23", price: 100, partyAdj: 100, party: "kamuna" },
//   {
//     mcNo: 4,
//     name: "cap2",
//     price: 100,
//     partyAdj: 100,
//     party: "Namuna",
//     panelPercent: 70,
//   },
//   { mcNo: 4, name: "cap4", price: 100, partyAdj: 100, party: "Namuna" },
//   { mcNo: 4, name: "cap3", price: 100, partyAdj: 100, party: "Namuna" },
//   {
//     mcNo: 5,
//     name: "cap2",
//     price: 100,
//     partyAdj: 100,
//     party: "Damuna",
//     panelPercent: 70,
//   },
//   {
//     mcNo: 6,
//     name: "cap2",
//     price: 100,
//     partyAdj: 100,
//     party: "Samuna",
//     panelPercent: 70,
//   },
//   { mcNo: 6, name: "cap3", price: 100, partyAdj: 100, party: "Samuna" },
// ];

let output = [
  { mcNo: 1, name: "cap", price: 200, total: 600, partyAdj: 100 },
  { mcNo: 1, name: "cap1", price: 100 },
  { mcNo: 1, name: "cap2", price: 100 },
  { mcNo: 1, name: "cap3", price: 100 },
  { mcNo: 2, name: "cap1", price: 100, total: 400, partyAdj: 100 },
  { mcNo: 2, name: "cap1", price: 100 },
  { mcNo: 2, name: "cap12", price: 100 },
  { mcNo: 2, name: "cap32", price: 100 },
  { mcNo: 3, name: "cap21", price: 100, total: 300, partyAdj: 100 },
  { mcNo: 3, name: "cap22", price: 100 },
  { mcNo: 3, name: "cap23", price: 100 },
  { mcNo: 4, name: "cap2", price: 100, total: 300, partyAdj: 100 },
  { mcNo: 4, name: "cap4", price: 100 },
  { mcNo: 4, name: "cap3", price: 100 },
  { mcNo: 5, name: "cap2", price: 100, total: 100, partyAdj: 100 },
  { mcNo: 6, name: "cap2", price: 100, total: 200, partyAdj: 100 },
  { mcNo: 6, name: "cap3", price: 100 },
];

let receivable = [
  { welfareNo: 2, mcNo: 1, name: "cap" },
  { welfareNo: 23, mcNo: 2, name: "cap1" },
  { welfareNo: 24, mcNo: 3, name: "cap2" },
  { welfareNo: 22, mcNo: 4, name: "cap2" },
  { welfareNo: 21, mcNo: 5, name: "cap2" },
  { welfareNo: 25, mcNo: 6, name: "cap2" },
];
