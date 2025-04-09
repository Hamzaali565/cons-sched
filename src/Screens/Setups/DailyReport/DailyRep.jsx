import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header/Header";
import * as XLSX from "xlsx";
import DailyReportPDF from "../../../Components/PDFDetails/DailyReportPDF";
import { pdf } from "@react-pdf/renderer";
import { v4 as uuidv4 } from "uuid";
import ButtonDis from "../../../Components/Button/ButtonDis";
import moment from "moment";
import { Outlet } from "react-router-dom";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import { useSelector } from "react-redux";
import { ErrorAlert, SuccessAlert } from "../../../Components/Alert/Alert";
import axios from "axios";
import Myheader from "../../../Components/New Header/newHeader";

const DailyRep = () => {
  const [open, setOpen] = useState(false);
  const [fileval, setfileval] = useState(null);
  const [admissionWise, setAdmissionWise] = useState(null);
  const [dSSummary, setDSSummary] = useState(null);
  const [allAdmissionWise, setAllAdmissionWise] = useState(null);
  const [DVGRefund, setDVGRefund] = useState(null);
  const [ipdRefund, setIPDRefund] = useState(null);
  const [otAdm, setOtAdm] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [prevAdm, setPrevAdm] = useState(false);
  const [reportData, setReportData] = useState({
    opdCountPvt: 0,
    opdCountPanel: 0,
    opdRevenueDay: 0,
    opdRevenueMonth: 0,
    physioIPD: 0,
    physioOPD: 0,
    ErServiceDay: 0,
    ErServiceMonth: 0,
    ErMedicineDay: 0,
    ErMedicineMonth: 0,
    DsSaleDay: 0,
    dsSaleMonth: 0,
    dvagoSaleDay: 0,
    dvagoSaleMonth: 0,
    ipdSaleDay: 0,
    ipdSaleMonth: 0,
    dvagoRefundDay: 0,
    dvagoRefundMonth: 0,
    ipdRefundDay: 0,
    ipdRefundMonth: 0,
    RadioRevenueDay: 0,
    RadioRevenueMonth: 0,
    LabRevDay: 0,
    LabRevMonth: 0,
    IPDDay: 0,
    IPDMonth: 0,
    labOPD: 0,
    labIPD: 0,
    labER: 0,
    labOut: 0,
    labTotal: 0,
    radioOPD: 0,
    radioIPD: 0,
    radioER: 0,
    radioOut: 0,
    radioTotal: 0,
    ultraOPD: 0,
    ultraIPD: 0,
    ultraER: 0,
    ultraOut: 0,
    ultraTotal: 0,
    OTDay: 0,
    OTMonth: 0,
    ECG: 0,
    E_R: 0,
    otherErService: 0,
    Admission: 0,
    Dressing: 0,
    GA: 0,
    SA: 0,
    LA: 0,
    execAll: 4,
    pvtAll: 15,
    sPvtAll: 8,
    mgwAll: 15,
    fgwAll: 15,
    gynaeAll: 9,
    pgwAll: 13,
    picuAll: 4,
    pgwIsoAll: 1,
    picuIsoAll: 1,
    nicuAll: 8,
    icuAll: 10,
    icuIsoAll: 1,
    isoWardAll: 4,
    prevAdmission: 0,
    curAdmission: 0,
    discharge: 0,
    presentPatients: 0,
    death: 0,
    lama: 0,
    privatePatient: 0,
    corpPatient: 0,
    welfPatient: 0,
  });
  const [uploadedReports, setUploadedReports] = useState([
    { upload: 0, name: "Admission Wise" },
    { upload: 0, name: "List of Service Requisition IPD" },
    { upload: 0, name: "List of OPD" },
    { upload: 0, name: "List of Patient ER" },
    { upload: 0, name: "List of Services ER" },
    { upload: 0, name: "List of Direct Services Summary" },
    { upload: 0, name: "List of Direct Services Detail" },
    { upload: 0, name: "List of Refund Dvago" },
    { upload: 0, name: "List of Issuance Dvago" },
    { upload: 0, name: "List of Refund IPD" },
    { upload: 0, name: "List of Issuance IPD" },
    { upload: 0, name: "Daily Patient Examination Sheet" },
    { upload: 0, name: "Lab Revenue Statement Day" },
    { upload: 0, name: "Lab Revenue Statement Month" },
    { upload: 0, name: "Test Tracking Status" },
    { upload: 0, name: "List Of Bills (IPD) (Summary)" },
    { upload: 0, name: "Prev Admissions" },
  ]);

  useEffect(() => {
    getPrevAdmissions();
  }, []);

  const url = useSelector((item) => item.url);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("file", file);
    if (file === undefined) {
      setUploadedReports((prev) =>
        prev.map((item) =>
          item.name === "Admission Wise" ? { ...item, upload: 0 } : item
        )
      );
      return;
    }
    setOpen(true);
    setfileval(file);
    if (file) {
      if (!file?.name.includes("AdmissionWise")) {
        ErrorAlert({ text: "Wrong File Selected" });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Get the first worksheet in the Excel file
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convert the worksheet to an array
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Get as array of arrays

        // Remove the first four rows

        const filteredData = sheetData.slice(8);

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

        setAllAdmissionWise(JSONDATA);
        const OtAdmission = JSONDATA.filter(
          (items) => items["Ward Name"] === "OT"
        );
        setOtAdm(OtAdmission);

        const dayCarePatients = JSONDATA.filter(
          (items) =>
            moment(items["Admission Date"], "DD/MM/YYYY HH:mm:ss").format(
              "DD/MM/YYYY"
            ) === moment().subtract(1, "days").format("DD/MM/YYYY") &&
            moment(items["Admission Date"], "DD/MM/YYYY HH:mm:ss").format(
              "DD/MM/YYYY"
            ) ===
              moment(items["Discharge Date"], "DD/MM/YYYY HH:mm:ss").format(
                "DD/MM/YYYY"
              ) &&
            !items["Ward Name"].includes("OT")
        );
        // console.log("dayCarePatients", dayCarePatients);

        JSONDATA = JSONDATA.filter(
          (item) =>
            moment(item["Discharge Date"], "DD/MM/YYYY HH:mm:ss").format(
              "DD/MM/YYYY"
            ) === moment().format("DD/MM/YYYY") || !item["Discharge Date"]
        );

        const isoBeds = JSONDATA.filter(
          (items) =>
            items["Ward Name"] !== "OT" && items["Bed No."].includes("ISO")
        );

        const isoDetails = isoBeds.reduce((acc, item) => {
          acc[item["Ward Name"] + " ISO"] = (acc[item["Ward Name"]] || 0) + 1;
          return acc;
        }, {});

        // console.log();

        JSONDATA = JSONDATA.filter(
          (items) =>
            items["Ward Name"] !== "OT" && !items["Bed No."].includes("DC")
          // &&
          // !items["Bed No."].includes("COT")
        );

        const curAdmissionData = JSONDATA.filter(
          (items) =>
            moment(items["Admission Date"], "DD/MM/YYYY HH:mm:ss").format(
              "DD/MM/YYYY"
            ) === moment().subtract(1, "days").format("DD/MM/YYYY")
        );

        const presentData = JSONDATA.length;
        // .filter(
        //   (item) =>
        //     moment(item["Discharge Date"], "DD/MM/YYYY HH:mm:ss").format(
        //       "DD/MM/YYYY"
        //     ) === moment().format("DD/MM/YYYY") || !item["Discharge Date"]
        // );
        // console.log("Total present", presentData);

        // let wardCount = presentData.reduce((acc, item) => {
        //   let wardName = item["Ward Name"];
        //   acc[wardName] = (acc[wardName] || 0) + 1;
        //   return acc;
        // });
        const privatePatient = JSONDATA.filter((items) =>
          items["Party Name"].includes("PRIVATE")
        ).length;

        const corpPatient = JSONDATA.filter((items) =>
          items["Party Code"].includes("01-02-")
        ).length;
        const welfPatient = JSONDATA.filter(
          (items) =>
            items["Party Name"] !== "PRIVATE" &&
            !items["Party Code"].includes("01-02-")
        ).length;

        JSONDATA = JSONDATA.filter(
          (items) => !items["Bed No."].includes("ISO")
        );

        let wardCount = JSONDATA.reduce((acc, item) => {
          acc[item["Ward Name"]] = (acc[item["Ward Name"]] || 0) + 1; // Increment count for each ward
          return acc;
        }, {});
        setReportData((prev) => ({
          ...prev,
          ...isoDetails,
          curAdmission: curAdmissionData.length + dayCarePatients.length,
          presentPatients: presentData,
          ...wardCount,
          privatePatient,
          corpPatient,
          welfPatient,
        }));

        // console.log(wardCount);
        setUploadedReports((prev) =>
          prev.map((item) =>
            item.name === "Admission Wise" ? { ...item, upload: 1 } : item
          )
        );
        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const handleFileListOfOPD = (event) => {
    const file = event.target.files[0];
    if (file === undefined) {
      setUploadedReports((prev) =>
        prev.map((item) =>
          item.name === "List of OPD" ? { ...item, upload: 0 } : item
        )
      );
      return;
    }
    setOpen(true);
    setfileval(file);
    if (file) {
      if (!file?.name.includes("List Of OPD Registration")) {
        ErrorAlert({ text: "Wrong File Selected" });
        return;
      }
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

        JSONDATA = JSONDATA.filter((items) => items["Status"] !== "Cancelled");
        // let Date = moment().format("DD/MM/YYYY");
        let latestData = JSONDATA.filter(
          (item) =>
            moment(item["OPD Registration Date"], "DD/MM/YYYY HH:mm:ss").format(
              "DD/MM/YYYY"
            ) === moment().subtract(1, "days").format("DD/MM/YYYY")
        );

        let pvtOPD = latestData.filter(
          (items) => items["Party Code"] === "01-01-001"
        ).length;

        let sumToday = latestData.reduce((total, sim) => {
          return total + parseInt(sim["Consultation Charges"]);
        }, 0);
        let sumMonth = JSONDATA.reduce((total, sim) => {
          return total + parseInt(sim["Consultation Charges"]);
        }, 0);

        setReportData((prev) => ({
          ...prev,
          opdCountPvt: pvtOPD,
          opdCountPanel: latestData.length - pvtOPD,
          opdRevenueDay: sumToday,
          opdRevenueMonth: sumMonth,
        }));

        setAdmissionWise(JSONDATA);
        setUploadedReports((prev) =>
          prev.map((item) =>
            item.name === "List of OPD" ? { ...item, upload: 1 } : item
          )
        );
        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const handleFileListOfSR = (event) => {
    const file = event.target.files[0];
    if (file === undefined) {
      setUploadedReports((prev) =>
        prev.map((item) =>
          item.name === "List of Service Requisition IPD"
            ? { ...item, upload: 0 }
            : item
        )
      );
      return setOpen(false);
    }
    setOpen(true);
    setfileval(file);
    if (file) {
      if (!file?.name.includes("List Of Service Requisition")) {
        ErrorAlert({ text: "Wrong File Selected" });
        return;
      }
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

        JSONDATA = JSONDATA.filter((items) => items["Tagged"] !== 0);
        // let Date = moment().format("DD/MM/YYYY");
        let latestData = JSONDATA.filter(
          (item) =>
            moment(item["Service Req. Date"], "DD/MM/YYYY HH:mm:ss").format(
              "DD/MM/YYYY"
            ) === moment().subtract(1, "days").format("DD/MM/YYYY")
        );

        let PhysiotherapyIPD = latestData.filter(
          (items) =>
            items["Service Code"] === "01-08-071" ||
            items["Service Code"] === "01-08-010" ||
            items["Service Code"] === "15-01-001" ||
            items["Service Code"] === "15-01-002" ||
            items["Service Code"] === "15-01-003" ||
            items["Service Code"] === "15-01-004" ||
            items["Service Code"] === "15-01-005" ||
            items["Service Code"] === "15-01-006" ||
            items["Service Code"] === "15-01-002"
        ).length;
        console.log(PhysiotherapyIPD);

        setReportData((prev) => ({
          ...prev,
          physioIPD: PhysiotherapyIPD,
        }));

        setUploadedReports((prev) =>
          prev.map((item) =>
            item.name === "List of Service Requisition IPD"
              ? { ...item, upload: 1 }
              : item
          )
        );

        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const handleFileListOfDSSummary = (event) => {
    const file = event.target.files[0];
    if (file === undefined) {
      setUploadedReports((prev) =>
        prev.map((item) =>
          item.name === "List of Direct Services Summary"
            ? { ...item, upload: 0 }
            : item
        )
      );

      return setOpen(false);
    }
    setOpen(true);
    setfileval(file);
    if (file) {
      if (!file.name.includes("List Of Direct Service")) {
        ErrorAlert({ text: "Wrong file selected" });
        return;
      }
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

        JSONDATA = JSONDATA.filter((items) => items["Refund Amount"] != 0);

        setDSSummary(JSONDATA);

        setUploadedReports((prev) =>
          prev.map((item) =>
            item.name === "List of Direct Services Summary"
              ? { ...item, upload: 1 }
              : item
          )
        );

        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const handleFileListOfDSDetail = (event) => {
    const file = event.target.files[0];
    if (file === undefined) {
      setUploadedReports((prev) =>
        prev.map((item) =>
          item.name === "List of Direct Services Detail"
            ? { ...item, upload: 0 }
            : item
        )
      );

      return setOpen(false);
    }
    setOpen(true);
    setfileval(file);
    if (file) {
      if (!file.name.includes("List Of Direct Service")) {
        ErrorAlert({ text: "Wrong file selected" });
        return;
      }
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

        JSONDATA = JSONDATA.filter((items) => items["Tagged"] !== 0);
        JSONDATA = JSONDATA.filter(
          (item1) =>
            !dSSummary.some(
              (item2) =>
                item1["Direct Service Requisition No."] ===
                item2["Direct Service Requisition No."]
            )
        );
        JSONDATA = JSONDATA.map((items) => ({
          ...items,
          amount: parseInt(items["Rate"] * parseInt(items["No. of Times"])),
        }));
        // let Date = moment().format("DD/MM/YYYY");
        let latestData = JSONDATA.filter(
          (item) =>
            moment(
              item["Direct Service Requisition Date"],
              "DD/MM/YYYY HH:mm:ss"
            ).format("DD/MM/YYYY") ===
            moment().subtract(1, "days").format("DD/MM/YYYY")
        );

        let PhysiotherapyOPD = latestData.filter(
          (items) =>
            items["Service Code"] === "01-08-071" ||
            items["Service Code"] === "01-08-010" ||
            items["Service Code"] === "15-01-001" ||
            items["Service Code"] === "15-01-002" ||
            items["Service Code"] === "15-01-003" ||
            items["Service Code"] === "15-01-004" ||
            items["Service Code"] === "15-01-005" ||
            items["Service Code"] === "15-01-006" ||
            items["Service Code"] === "15-01-002"
        ).length;

        let dsSaleDay = latestData.reduce(
          (a, b) => a + parseInt(b["amount"]),
          0
        );
        let dsSaleMonth = JSONDATA.reduce((a, b) => a + +b["amount"], 0);

        setReportData((prev) => ({
          ...prev,
          physioOPD: PhysiotherapyOPD,
          DsSaleDay: dsSaleDay,
          dsSaleMonth: dsSaleMonth,
        }));

        // setAdmissionWise(JSONDATA);
        setUploadedReports((prev) =>
          prev.map((item) =>
            item.name === "List of Direct Services Detail"
              ? { ...item, upload: 1 }
              : item
          )
        );
        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const handleFileListOfSerER = (event) => {
    const file = event.target.files[0];
    if (file === undefined) {
      setUploadedReports((prev) =>
        prev.map((item) =>
          item.name === "List of Services ER" ? { ...item, upload: 0 } : item
        )
      );
      return setOpen(false);
    }
    setOpen(true);
    setfileval(file);
    if (file) {
      if (!file.name.includes("List Of Service Requisition")) {
        ErrorAlert({ text: "Wrong file selected" });
        return;
      }
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

        let latestData = JSONDATA.filter(
          (item) =>
            moment(item["E.R. Reg. Date"], "DD/MM/YYYY HH:mm:ss").format(
              "DD/MM/YYYY"
            ) === moment().subtract(1, "days").format("DD/MM/YYYY")
        );

        let PhysiotherapyOPD = latestData.filter(
          (items) =>
            items["Service Code"] === "01-08-071" ||
            items["Service Code"] === "01-08-010" ||
            items["Service Code"] === "15-01-001" ||
            items["Service Code"] === "15-01-002" ||
            items["Service Code"] === "15-01-003" ||
            items["Service Code"] === "15-01-004" ||
            items["Service Code"] === "15-01-005" ||
            items["Service Code"] === "15-01-006" ||
            items["Service Code"] === "15-01-002"
        ).length;

        let erServicesSaleDay = latestData.reduce(
          (a, b) => a + parseInt(b["Amount"]),
          0
        );

        let erServicesSaleMonth = JSONDATA.reduce(
          (a, b) => a + parseInt(b["Amount"]),
          0
        );
        setReportData((prev) => ({
          ...prev,
          physioOPD: prev.physioOPD + PhysiotherapyOPD,
          ErServiceDay: erServicesSaleDay,
          ErServiceMonth: erServicesSaleMonth,
        }));

        // setAdmissionWise(JSONDATA);
        setUploadedReports((prev) =>
          prev.map((item) =>
            item.name === "List of Services ER" ? { ...item, upload: 1 } : item
          )
        );
        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const handleFileListOfPatER = (event) => {
    const file = event.target.files[0];
    if (file === undefined) {
      setUploadedReports((prev) =>
        prev.map((item) =>
          item.name === "List of Patient ER" ? { ...item, upload: 0 } : item
        )
      );
      return setOpen(false);
    }
    setOpen(true);
    setfileval(file);
    if (file) {
      if (!file.name.includes("List Of Patient")) {
        ErrorAlert({ text: "Wrong file selected" });
        return;
      }
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

        let latestData = JSONDATA.filter(
          (item) =>
            moment(item["ER Date"], "DD/MM/YYYY HH:mm:ss").format(
              "DD/MM/YYYY"
            ) === moment().subtract(1, "days").format("DD/MM/YYYY")
        );

        let erMedicineSaleDay = latestData.reduce(
          (a, b) => a + parseInt(b["Pharmacy Charges"]),
          0
        );

        let erMedicineSaleMonth = JSONDATA.reduce(
          (a, b) => a + parseInt(b["Pharmacy Charges"]),
          0
        );
        setReportData((prev) => ({
          ...prev,
          ErMedicineDay: erMedicineSaleDay,
          ErMedicineMonth: erMedicineSaleMonth,
        }));
        setUploadedReports((prev) =>
          prev.map((item) =>
            item.name === "List of Patient ER" ? { ...item, upload: 1 } : item
          )
        );
        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const handleFileListOfRefundDVG = (event) => {
    const file = event.target.files[0];
    if (file === undefined) {
      setUploadedReports((prev) =>
        prev.map((item) =>
          item.name === "List of Refund Dvago" ? { ...item, upload: 0 } : item
        )
      );
      return setOpen(false);
    }
    setOpen(true);
    setfileval(file);
    if (file) {
      if (!file.name.includes("List Of Refund Report")) {
        ErrorAlert({ text: "Wrong file selected" });
        return;
      }
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

        let latestData = JSONDATA.filter(
          (item) =>
            moment(item["Refund Date"], "DD/MM/YYYY HH:mm:ss").format(
              "DD/MM/YYYY"
            ) === moment().subtract(1, "days").format("DD/MM/YYYY")
        );

        let refundDayOne = latestData.reduce(
          (a, b) => a + parseInt(b["Gross Amount"]),
          0
        );

        let refundMonth = JSONDATA.reduce((a, b) => a + +b["Gross Amount"], 0);

        setReportData((prev) => ({
          ...prev,
          dvagoRefundDay: refundDayOne,
          dvagoRefundMonth: refundMonth,
        }));
        setUploadedReports((prev) =>
          prev.map((item) =>
            item.name === "List of Refund Dvago" ? { ...item, upload: 1 } : item
          )
        );
        setDVGRefund(JSONDATA);
        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const handleFileListOfIssuanceDVG = (event) => {
    const file = event.target.files[0];
    if (file === undefined) {
      setUploadedReports((prev) =>
        prev.map((item) =>
          item.name === "List of Issuance Dvago" ? { ...item, upload: 0 } : item
        )
      );
      return setOpen(false);
    }
    setOpen(true);
    setfileval(file);
    if (file) {
      if (!file.name.includes("List Of Issuance Report")) {
        ErrorAlert({ text: "Wrong file selected" });
        return;
      }
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
        JSONDATA = JSONDATA.map((items) => ({
          ...items,
          "Gross Amount": +items["Sale Rate"] * +items["Qty"],
        }));
        let latestData = JSONDATA.filter(
          (item) =>
            moment(item["Issuance Date"], "DD/MM/YYYY HH:mm:ss").format(
              "DD/MM/YYYY"
            ) === moment().subtract(1, "days").format("DD/MM/YYYY")
        );

        let dvagoSaleDay = latestData.reduce(
          (a, b) => a + +b["Gross Amount"],
          0
        );

        dvagoSaleDay = Math.floor(dvagoSaleDay);

        let dvagoSaleMonth = JSONDATA.reduce(
          (a, b) => a + +b["Gross Amount"],
          0
        );
        dvagoSaleMonth = Math.floor(dvagoSaleMonth);
        setReportData((prev) => ({
          ...prev,
          dvagoSaleDay: dvagoSaleDay - prev.dvagoRefundDay,
          dvagoSaleMonth: dvagoSaleMonth - prev.dvagoRefundMonth,
        }));
        setUploadedReports((prev) =>
          prev.map((item) =>
            item.name === "List of Issuance Dvago"
              ? { ...item, upload: 1 }
              : item
          )
        );
        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const handleFileListOfRefundIPD = (event) => {
    const file = event.target.files[0];
    if (file === undefined) {
      setUploadedReports((prev) =>
        prev.map((item) =>
          item.name === "List of Refund IPD" ? { ...item, upload: 0 } : item
        )
      );
      return setOpen(false);
    }
    setOpen(true);
    setfileval(file);
    if (file) {
      if (!file.name.includes("List Of Refund Report")) {
        ErrorAlert({ text: "Wrong file selected" });
        return;
      }
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

        JSONDATA = JSONDATA.map((items) => ({
          ...items,
          "Gross Amount": items["Sale Rate"] * items["Refund Qty"],
        }));

        JSONDATA = JSONDATA.filter((items) =>
          items["Issuance No."].includes("MDP/")
        );

        let latestData = JSONDATA.filter(
          (item) =>
            moment(item["Refund Date"], "DD/MM/YYYY HH:mm:ss").format(
              "DD/MM/YYYY"
            ) === moment().subtract(1, "days").format("DD/MM/YYYY")
        );

        let refundDayOne = latestData.reduce(
          (a, b) => a + b["Gross Amount"],
          0
        );

        let refundMonth = JSONDATA.reduce((a, b) => a + +b["Gross Amount"], 0);

        setReportData((prev) => ({
          ...prev,
          ipdRefundDay: Math.ceil(refundDayOne),
          ipdRefundMonth: Math.ceil(refundMonth),
        }));
        setUploadedReports((prev) =>
          prev.map((item) =>
            item.name === "List of Refund IPD" ? { ...item, upload: 1 } : item
          )
        );
        setIPDRefund(JSONDATA);
        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const handleFileListOfIssuanceIPD = (event) => {
    const file = event.target.files[0];
    console.log("file", file);
    if (file === undefined) {
      setUploadedReports((prev) =>
        prev.map((item) =>
          item.name === "List of Issuance IPD" ? { ...item, upload: 0 } : item
        )
      );
      return setOpen(false);
    }
    setOpen(true);
    setfileval(file);
    if (file) {
      if (!file.name.includes("List Of Issuance Report")) {
        ErrorAlert({ text: "Wrong file selected" });
        return;
      }
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
        JSONDATA = JSONDATA.filter((items) =>
          items["Issuance No."].includes("MDP/")
        );
        JSONDATA = JSONDATA.map((items) => ({
          ...items,
          "Gross Amount": +items["Sale Rate"] * +items["Qty"],
        }));

        let latestData = JSONDATA.filter(
          (item) =>
            moment(item["Issuance Date"], "DD/MM/YYYY HH:mm:ss").format(
              "DD/MM/YYYY"
            ) === moment().subtract(1, "days").format("DD/MM/YYYY")
        );

        let ipdSaleDay = Math.ceil(
          latestData.reduce((a, b) => a + +b["Gross Amount"], 0)
        );

        let ipdSaleMonth = Math.ceil(
          JSONDATA.reduce((a, b) => a + +b["Gross Amount"], 0)
        );

        setReportData((prev) => ({
          ...prev,
          ipdSaleDay: ipdSaleDay - prev.ipdRefundDay,
          ipdSaleMonth: ipdSaleMonth - prev.ipdRefundMonth,
        }));
        setUploadedReports((prev) =>
          prev.map((item) =>
            item.name === "List of Issuance IPD" ? { ...item, upload: 1 } : item
          )
        );
        // // setAdmissionWise(JSONDATA);
        // console.log(JSONDATA);
        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const handleFileListOfRadiology = (event) => {
    const file = event.target.files[0];
    if (file === undefined) {
      setUploadedReports((prev) =>
        prev.map((item) =>
          item.name === "Daily Patient Examination Sheet"
            ? { ...item, upload: 0 }
            : item
        )
      );
      return setOpen(false);
    }
    setOpen(true);
    setfileval(file);
    if (file) {
      if (!file.name.includes("Daily Patient Examination Sheet")) {
        ErrorAlert({ text: "Wrong file selected" });
        return;
      }
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
        let RadioData = JSONDATA.filter(
          (item) =>
            moment(item["Radiology Date"], "DD/MM/YYYY HH:mm:ss").format(
              "DD/MM/YYYY"
            ) === moment().subtract(1, "days").format("DD/MM/YYYY") &&
            item["Tag Flag"] !== "N" &&
            !item["Service Code"].includes("04-01-")
        );

        let radioOPD = RadioData.filter(
          (items) => items["Transaction Type"] === "Cash"
        );

        let radioER = RadioData.filter(
          (items) => items["Transaction Type"] === "ER"
        );

        let radioIPD = RadioData.filter(
          (items) => items["Transaction Type"] === "IPD"
        );

        let ultraRadio = JSONDATA.filter(
          (item) =>
            moment(item["Radiology Date"], "DD/MM/YYYY HH:mm:ss").format(
              "DD/MM/YYYY"
            ) === moment().subtract(1, "days").format("DD/MM/YYYY") &&
            item["Tag Flag"] !== "N" &&
            item["Service Code"].includes("04-01-")
        );

        let ultraOPD = ultraRadio.filter(
          (items) => items["Transaction Type"] === "Cash"
        );

        let ultraER = ultraRadio.filter(
          (items) => items["Transaction Type"] === "ER"
        );

        let ultraIPD = ultraRadio.filter(
          (items) => items["Transaction Type"] === "IPD"
        );

        JSONDATA = JSONDATA.filter(
          (items) =>
            items["Transaction Type"] !== "IPD" && items["Tag Flag"] !== "N"
          // items["Credit Voucher No."] === "" &&
        );

        let latestData = JSONDATA.filter(
          (item) =>
            moment(item["Radiology Date"], "DD/MM/YYYY HH:mm:ss").format(
              "DD/MM/YYYY"
            ) === moment().subtract(1, "days").format("DD/MM/YYYY")
        );

        let RadioRevenueDay = latestData.reduce(
          (a, b) => a + parseInt(b["Amount"]),
          0
        );

        let RadioRevenueMonth = JSONDATA.reduce((a, b) => a + +b["Amount"], 0);
        setReportData((prev) => ({
          ...prev,
          RadioRevenueDay,
          RadioRevenueMonth,
          radioOPD: radioOPD.length,
          radioIPD: radioIPD.length,
          radioER: radioER.length,
          radioOut: 0,
          radioTotal: RadioData.length,
          ultraOPD: ultraOPD.length,
          ultraIPD: ultraIPD.length,
          ultraER: ultraER.length,
          ultraOut: 0,
          ultraTotal: ultraRadio.length,
        }));
        setUploadedReports((prev) =>
          prev.map((item) =>
            item.name === "Daily Patient Examination Sheet"
              ? { ...item, upload: 1 }
              : item
          )
        );
        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const handleFileListOfLabDay = (event) => {
    const file = event.target.files[0];
    if (file === undefined) {
      setUploadedReports((prev) =>
        prev.map((item) =>
          item.name === "Lab Revenue Statement Day"
            ? { ...item, upload: 0 }
            : item
        )
      );
      return setOpen(false);
    }
    setOpen(true);
    setfileval(file);
    if (file) {
      if (!file.name.includes("Laboratory Revenue Statement")) {
        ErrorAlert({ text: "Wrong file selected" });
        return;
      }
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

        let LabRevDay = JSONDATA.reduce((total, item) => {
          const opdRevenue = parseFloat(item["OPD Revenue"]) || 0;
          const erRevenue = parseFloat(item["ER Revenue"]) || 0;

          return total + opdRevenue + erRevenue;
        }, 0);
        setReportData((prev) => ({
          ...prev,
          LabRevDay,
        }));
        setUploadedReports((prev) =>
          prev.map((item) =>
            item.name === "Lab Revenue Statement Day"
              ? { ...item, upload: 1 }
              : item
          )
        );
        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const handleFileListOfLabMonth = (event) => {
    const file = event.target.files[0];
    if (file === undefined) {
      setUploadedReports((prev) =>
        prev.map((item) =>
          item.name === "Lab Revenue Statement Month"
            ? { ...item, upload: 0 }
            : item
        )
      );
      return setOpen(false);
    }
    setOpen(true);
    setfileval(file);
    if (file) {
      if (!file.name.includes("Laboratory Revenue Statement")) {
        ErrorAlert({ text: "Wrong file selected" });
        return;
      }
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

        let LabRevMonth = JSONDATA.reduce((total, item) => {
          const opdRevenue = parseFloat(item["OPD Revenue"]) || 0;
          const erRevenue = parseFloat(item["ER Revenue"]) || 0;

          return total + opdRevenue + erRevenue;
        }, 0);
        setReportData((prev) => ({
          ...prev,
          LabRevMonth,
        }));
        setUploadedReports((prev) =>
          prev.map((item) =>
            item.name === "Lab Revenue Statement Month"
              ? { ...item, upload: 1 }
              : item
          )
        );
        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const handleFileListOfBills = (event) => {
    const file = event.target.files[0];
    console.log("file", file);
    if (file === undefined) {
      setUploadedReports((prev) =>
        prev.map((item) =>
          item.name === "List Of Bills (IPD) (Summary)"
            ? { ...item, upload: 0 }
            : item
        )
      );
      return setOpen(false);
    }
    setOpen(true);
    setfileval(file);
    if (file) {
      if (!file.name.includes("ListOfBillsSummary")) {
        ErrorAlert({ text: "Wrong file selected" });
        return;
      }
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
        const otBills = JSONDATA.filter((item1) =>
          otAdm.some(
            (item2) => item1["Admission No."] === item2["Admission No."]
          )
        );
        let latestDataOT = otBills.filter(
          (item) =>
            moment(item["Bill Date"], "DD/MM/YYYY HH:mm:ss").format(
              "DD/MM/YYYY"
            ) === moment().subtract(1, "days").format("DD/MM/YYYY")
        );

        let OTDay = latestDataOT.reduce((total, item) => {
          const dispensingCharges = parseFloat(item["Dispensing Charges"]) || 0;
          const PatientCare = parseFloat(item["Patient Care Charges"]) || 0;
          const totalCharges = parseFloat(item["Total Charges"]) || 0;

          return total + PatientCare + dispensingCharges + totalCharges;
        }, 0);
        let OTMonth = otBills.reduce((total, item) => {
          const dispensingCharges = parseFloat(item["Dispensing Charges"]) || 0;
          const PatientCare = parseFloat(item["Patient Care Charges"]) || 0;
          const totalCharges = parseFloat(item["Total Charges"]) || 0;

          return total + PatientCare + dispensingCharges + totalCharges;
        }, 0);

        JSONDATA = JSONDATA.filter(
          (item1) =>
            !otAdm.some(
              (item2) => item1["Admission No."] === item2["Admission No."]
            )
        );
        const dcPatient = JSONDATA.filter(
          (item) =>
            moment(item["Bill Date"], "DD/MM/YYYY HH:mm:ss").format(
              "DD/MM/YYYY"
            ) === moment().subtract(1, "days").format("DD/MM/YYYY")
        );
        console.log("dcPatient", dcPatient);

        dcPatient.forEach((items) => {
          let data = allAdmissionWise.find(
            (items1) => items["Admission No."] === items1["Admission No."]
          );
          if (data) {
            items["Discharge Condition"] = data["Discharrge Condition"];
          }
        });
        const lamaPatients = dcPatient.filter(
          (items) => items["Discharge Condition"] === "LAMA"
        );
        const expiredPatients = dcPatient.filter(
          (items) => items["Discharge Condition"] === "Expired"
        );

        let latestData = JSONDATA.filter(
          (item) =>
            moment(item["Bill Date"], "DD/MM/YYYY HH:mm:ss").format(
              "DD/MM/YYYY"
            ) === moment().subtract(1, "days").format("DD/MM/YYYY")
        );

        let IPDDay = latestData.reduce((total, item) => {
          const dispensingCharges = parseFloat(item["Dispensing Charges"]) || 0;
          const PatientCare = parseFloat(item["Patient Care Charges"]) || 0;
          const totalCharges = parseFloat(item["Total Charges"]) || 0;

          return total + PatientCare + dispensingCharges + totalCharges;
        }, 0);
        let IPDMonth = JSONDATA.reduce((total, item) => {
          const dispensingCharges = parseFloat(item["Dispensing Charges"]) || 0;
          const PatientCare = parseFloat(item["Patient Care Charges"]) || 0;
          const totalCharges = parseFloat(item["Total Charges"]) || 0;

          return total + PatientCare + dispensingCharges + totalCharges;
        }, 0);
        setReportData((prev) => ({
          ...prev,
          IPDDay,
          IPDMonth,
          OTDay,
          OTMonth,
          discharge: dcPatient?.length,
          lama: lamaPatients?.length,
          death: expiredPatients?.length,
        }));
        setUploadedReports((prev) =>
          prev.map((item) =>
            item.name === "List Of Bills (IPD) (Summary)"
              ? { ...item, upload: 1 }
              : item
          )
        );
        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const handleFileTestTracking = (event) => {
    const file = event.target.files[0];
    if (file === undefined) {
      setUploadedReports((prev) =>
        prev.map((item) =>
          item.name === "Test Tracking Status" ? { ...item, upload: 0 } : item
        )
      );
      return setOpen(false);
    }
    setOpen(true);
    setfileval(file);
    if (file) {
      if (!file.name.includes("Test Tracking Report")) {
        ErrorAlert({ text: "Wrong file selected" });
        return;
      }
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

        let OPDTest = JSONDATA.filter(
          (items) =>
            items["Source IPD/OPD"] === "Cash" &&
            items["Out Source"] !== "Out Source"
        );
        let IPDTest = JSONDATA.filter(
          (items) =>
            items["Source IPD/OPD"] === "IPD" &&
            items["Out Source"] !== "Out Source"
        );
        let ERTest = JSONDATA.filter(
          (items) =>
            items["Source IPD/OPD"] === "ER" &&
            items["Out Source"] !== "Out Source"
        );
        let OUTTest = JSONDATA.filter(
          (items) => items["Out Source"] == "Out Source"
        );

        setReportData((prev) => ({
          ...prev,
          labOPD: OPDTest.length,
          labIPD: IPDTest.length,
          labER: ERTest.length,
          labOut: OUTTest.length,
          labTotal: JSONDATA.length,
        }));
        setUploadedReports((prev) =>
          prev.map((item) =>
            item.name === "Test Tracking Status" ? { ...item, upload: 1 } : item
          )
        );
        setOpen(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const printDReportPDF = async () => {
    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(<DailyReportPDF data={reportData} />).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
    setOpen(false);
  };
  const handleInputChange = (value, key) => {
    setReportData((prev) => ({
      ...prev,
      [key]: +value,
    }));
    if (key === "prevAdmission") {
      if (+value > 0) {
        setUploadedReports((prev) =>
          prev.map((item) =>
            item.name === "Prev Admissions" ? { ...item, upload: 1 } : item
          )
        );
        return;
      } else {
        setUploadedReports((prev) =>
          prev.map((item) =>
            item.name === "Prev Admissions" ? { ...item, upload: 0 } : item
          )
        );
      }
    }
  };
  const getPrevAdmissions = async () => {
    try {
      const response = await axios.get(
        `${url}/daily_report_title?title=${moment()
          .subtract(2, "days")
          .format("DD/MM/YYYY")}`
      );
      let adms = response.data?.data?.data?.data?.prevAdmission;
      setReportData((prev) => ({
        ...prev,
        prevAdmission: adms,
      }));
      setPrevAdm(true);
    } catch (error) {
      console.log("Error =>", error);
      setPrevAdm(false);
    }
  };
  const validationCheck = (title) => {
    const myData = uploadedReports.find((items) => items?.upload === 0);
    if (myData) {
      ErrorAlert({ text: `${myData.name} is missing !!!` });
      return;
    }
    if (title === "Save") {
      saveData();
    } else {
      printDReportPDF();
    }
  };
  const saveData = async () => {
    try {
      const response = await axios.post(`${url}/daily_report`, {
        title: moment().subtract(1, "days").format("DD/MM/YYYY"),
        data: reportData,
      });
      // const data = await response.json();
      // console.log("data", data);
      // if (!response.ok) {
      //   throw new Error(data?.message);
      // }
      SuccessAlert({
        text: "Data Uploaded successfully !!!",
        timer: 2000,
      });
      // response = await response.json();
      // console.log("response", response);
    } catch (error) {
      console.log(error.response.data.message);
      ErrorAlert({
        text: error.response.data.message,
        timer: 10000,
      });
    }
  };
  return (
    <div>
      <div>
        {/* <Header inpShow={false} /> */}
        <Myheader />
      </div>
      <div>
        {/* Admission Wise */}
        <div className="flex justify-center mt-4 items-center space-x-4">
          <label htmlFor="" className="underline font-bold">
            Admission Wise till{" "}
            {moment().subtract(1, "days").format("DD/MM/YYYY")}:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="bg-blue-500"
            //   ref={fileInputRef}
          />
        </div>
        {/* List of service requisition */}
        <div className="flex justify-center mt-4 items-center space-x-4">
          <label htmlFor="" className="underline font-bold">
            List of Service Requisition (IPD) from{" "}
            {moment().format("01/MM/YYYY")} to{" "}
            {moment().subtract(1, "days").format("DD/MM/YYYY")}:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileListOfSR}
            className="bg-blue-500"
            //   ref={fileInputRef}
          />
        </div>
        {/* List Of OPD Month */}
        <div className="flex justify-center mt-4 items-center space-x-4">
          <label htmlFor="" className="underline font-bold">
            List of OPD (Detail) from {moment().format("01/MM/YYYY")} to{" "}
            {moment().subtract(1, "days").format("DD/MM/YYYY")}:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileListOfOPD}
            className="bg-blue-500"
            //   ref={fileInputRef}
          />
        </div>
        {/* List of Patient ER*/}
        <div className="flex justify-center mt-4 items-center space-x-4">
          <label htmlFor="" className="underline font-bold">
            List of Patient (ER) from {moment().format("01/MM/YYYY")} to{" "}
            {moment().subtract(1, "days").format("DD/MM/YYYY")}:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileListOfPatER}
            className="bg-blue-500"
            //   ref={fileInputRef}
          />
        </div>
        {/* List of direct services ER*/}
        <div className="flex justify-center mt-4 items-center space-x-4">
          <label htmlFor="" className="underline font-bold">
            List of Services (ER) from {moment().format("01/MM/YYYY")} to{" "}
            {moment().subtract(1, "days").format("DD/MM/YYYY")}:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileListOfSerER}
            className="bg-blue-500"
            //   ref={fileInputRef}
          />
        </div>
        {/* List of direct services summary */}
        <div className="flex justify-center mt-4 items-center space-x-4">
          <label htmlFor="" className="underline font-bold">
            List of Direct Service (Summary) from{" "}
            {moment().format("01/MM/YYYY")} to{" "}
            {moment().subtract(1, "days").format("DD/MM/YYYY")}:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileListOfDSSummary}
            className="bg-blue-500"
            //   ref={fileInputRef}
          />
        </div>
        {/* List of direct services details*/}
        <div className="flex justify-center mt-4 items-center space-x-4">
          <label htmlFor="" className="underline font-bold">
            List of Direct Services (Detail) from{" "}
            {moment().format("01/MM/YYYY")} to{" "}
            {moment().subtract(1, "days").format("DD/MM/YYYY")}:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileListOfDSDetail}
            className="bg-blue-500"
            //   ref={fileInputRef}
          />
        </div>

        {/* List of Refund Dvago*/}
        <div className="flex justify-center mt-4 items-center space-x-4">
          <label htmlFor="" className="underline font-bold">
            List of Refund (Dvago) (Detail) from {moment().format("01/MM/YYYY")}{" "}
            to {moment().subtract(1, "days").format("DD/MM/YYYY")}:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileListOfRefundDVG}
            className="bg-blue-500"
            //   ref={fileInputRef}
          />
        </div>
        {/* List of Issuance Dvago*/}
        <div className="flex justify-center mt-4 items-center space-x-4">
          <label htmlFor="" className="underline font-bold">
            List of Issunace (Dvago) (Detail) from{" "}
            {moment().format("01/MM/YYYY")} to{" "}
            {moment().subtract(1, "days").format("DD/MM/YYYY")}:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileListOfIssuanceDVG}
            className="bg-blue-500"
            //   ref={fileInputRef}
          />
        </div>
        {/* List of Refund IPD*/}
        <div className="flex justify-center mt-4 items-center space-x-4">
          <label htmlFor="" className="underline font-bold">
            List of Refund (IPD) (Detail) from {moment().format("01/MM/YYYY")}{" "}
            to {moment().subtract(1, "days").format("DD/MM/YYYY")}:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileListOfRefundIPD}
            className="bg-blue-500"
            //   ref={fileInputRef}
          />
        </div>
        {/* List of Issuance IPD*/}
        <div className="flex justify-center mt-4 items-center space-x-4">
          <label htmlFor="" className="underline font-bold">
            List of Issunace (IPD) (Detail) from {moment().format("01/MM/YYYY")}{" "}
            to {moment().subtract(1, "days").format("DD/MM/YYYY")}:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileListOfIssuanceIPD}
            className="bg-blue-500"
            //   ref={fileInputRef}
          />
        </div>
        {/* Daily Patient Examination Sheet*/}
        <div className="flex justify-center mt-4 items-center space-x-4">
          <label htmlFor="" className="underline font-bold">
            Daily Patient Examination Sheet from {moment().format("01/MM/YYYY")}{" "}
            to {moment().subtract(1, "days").format("DD/MM/YYYY")}:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileListOfRadiology}
            className="bg-blue-500"
            //   ref={fileInputRef}
          />
        </div>
        {/* Lab Revenue Statement Day*/}
        <div className="flex justify-center mt-4 items-center space-x-4">
          <label htmlFor="" className="underline font-bold">
            Lab Revenue Statement of{" "}
            {moment().subtract(1, "days").format("DD/MM/YYYY")}:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileListOfLabDay}
            className="bg-blue-500"
            //   ref={fileInputRef}
          />
        </div>
        {/* Lab Revenue Statement Day*/}
        <div className="flex justify-center mt-4 items-center space-x-4">
          <label htmlFor="" className="underline font-bold">
            Lab Revenue Statement from {moment().format("01/MM/YYYY")} to{" "}
            {moment().subtract(1, "days").format("DD/MM/YYYY")}:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileListOfLabMonth}
            className="bg-blue-500"
            //   ref={fileInputRef}
          />
        </div>
        {/* Lab Revenue Statement Day*/}
        <div className="flex justify-center mt-4 items-center space-x-4">
          <label htmlFor="" className="underline font-bold">
            Test Tracking Status{" "}
            {moment().subtract(1, "days").format("DD/MM/YYYY")}:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileTestTracking}
            className="bg-blue-500"
            //   ref={fileInputRef}
          />
        </div>
        {/* List Of Bills IPD*/}
        <div className="flex justify-center mt-4 items-center space-x-4">
          <label htmlFor="" className="underline font-bold">
            List Of Bills (IPD) (Summary) {moment().format("01/MM/YYYY")} to{" "}
            {moment().subtract(1, "days").format("DD/MM/YYYY")}:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileListOfBills}
            className="bg-blue-500"
            //   ref={fileInputRef}
          />
        </div>
      </div>
      {/* Emergency Status */}
      <div className="border-4 rounded-xl border-yellow-800 w-[80%] m-auto mt-5 p-4">
        <CenterHeading title={"Emergency Status"} />
        <div className="grid grid-cols-2 justify-items-center gap-5">
          <LabeledInput
            label={"E/R"}
            placeholder={"E/R Services"}
            onChange={(e) => handleInputChange(e.target.value, "E_R")}
          />
          <LabeledInput
            label={"ECG"}
            placeholder={"ECG"}
            onChange={(e) => handleInputChange(e.target.value, "ECG")}
          />
          <LabeledInput
            label={"Other ER Services"}
            placeholder={"Other ER Services"}
            onChange={(e) =>
              handleInputChange(e.target.value, "otherErService")
            }
          />
          <LabeledInput
            label={"Admission"}
            placeholder={"Admission"}
            onChange={(e) => handleInputChange(e.target.value, "Admission")}
          />
          <LabeledInput
            label={"Previous Admissions One Time"}
            placeholder={"Previous Admissions"}
            onChange={(e) => handleInputChange(e.target.value, "prevAdmission")}
            disabled={prevAdm}
            value={reportData?.prevAdmission}
            type={"Number"}
          />
        </div>
      </div>
      {/* Operation Theatre */}
      <div className="border-4 rounded-xl border-yellow-800 w-[80%] m-auto mt-5 p-4">
        <CenterHeading title={"Operation Theatre Detail"} />
        <div className="grid grid-cols-2 justify-items-center gap-5">
          <LabeledInput
            label={"Dressing"}
            placeholder={"Dressing"}
            onChange={(e) => handleInputChange(e.target.value, "Dressing")}
          />
          <LabeledInput
            label={"GA"}
            placeholder={"GA"}
            onChange={(e) => handleInputChange(e.target.value, "GA")}
          />
          <LabeledInput
            label={"SA"}
            placeholder={"SA"}
            onChange={(e) => handleInputChange(e.target.value, "SA")}
          />
          <LabeledInput
            label={"LA"}
            placeholder={"LA"}
            onChange={(e) => handleInputChange(e.target.value, "LA")}
          />
        </div>
      </div>
      {/* Revenue Breakup */}
      {toggle && (
        <div className="border-4 rounded-xl border-yellow-800 w-[80%] m-auto mt-5 p-4">
          <CenterHeading title={"Revenue Breakup"} />
          <div className="grid grid-cols-2 justify-items-center gap-5">
            <LabeledInput
              disabled
              label={"OPD CONSULTATION CHARGES Day"}
              placeholder={"OPD CONSULTATION CHARGES Day"}
              value={reportData?.opdRevenueDay}
            />
            <LabeledInput
              disabled
              label={"OPD CONSULTATION CHARGES Month "}
              placeholder={"OPD CONSULTATION CHARGES Month"}
              value={reportData?.opdRevenueMonth}
            />
            <LabeledInput
              disabled
              label={"ER Pharmacy Day"}
              placeholder={"ER Pharmacy Day"}
              value={reportData?.ErMedicineDay}
            />
            <LabeledInput
              disabled
              label={"ER Pharmacy Month"}
              placeholder={"ER Pharmacy Month"}
              value={reportData?.ErMedicineMonth}
            />
            <LabeledInput
              disabled
              label={"ER Services Day"}
              placeholder={"ER Services Day"}
              value={reportData?.ErServiceDay}
            />
            <LabeledInput
              disabled
              label={"ER Services Month"}
              placeholder={"ER Services Month"}
              value={reportData?.ErServiceMonth}
            />
            <LabeledInput
              disabled
              label={"Direct Services Day"}
              placeholder={"Direct Services Day"}
              value={reportData?.DsSaleDay}
            />
            <LabeledInput
              disabled
              label={"Direct Services Month"}
              placeholder={"Direct Services Month"}
              value={reportData?.dsSaleMonth}
            />
            <LabeledInput
              disabled
              label={"Panel Sale Dvago Day"}
              placeholder={"Panel Sale Dvago Day"}
              value={reportData?.dvagoSaleDay}
            />
            <LabeledInput
              disabled
              label={"Panel Sale Dvago Month"}
              placeholder={"Panel Sale Dvago Month"}
              value={reportData?.dvagoSaleMonth}
            />
            <LabeledInput
              disabled
              label={"Radiology Day"}
              placeholder={"Radiology Day"}
              value={reportData?.RadioRevenueDay}
            />
            <LabeledInput
              disabled
              label={"Radiology Month"}
              placeholder={"Radiology Month"}
              value={reportData?.RadioRevenueMonth}
            />
            <LabeledInput
              disabled
              label={"Laboratory Day"}
              placeholder={"Laboratory Day"}
              value={reportData?.LabRevDay}
            />
            <LabeledInput
              disabled
              label={"Laboratory Month"}
              placeholder={"Laboratory Month"}
              value={reportData?.LabRevMonth}
            />
            <LabeledInput
              disabled
              label={"OT DAY"}
              placeholder={"OT DAY"}
              value={reportData?.OTDay}
            />
            <LabeledInput
              disabled
              label={"OT Month"}
              placeholder={"OT Month"}
              value={reportData?.OTMonth}
            />
            <LabeledInput
              disabled
              label={"IPD DAY"}
              placeholder={"IPD DAY"}
              value={reportData?.IPDDay}
            />
            <LabeledInput
              disabled
              label={"IPD Month"}
              placeholder={"IPD Month"}
              value={reportData?.IPDMonth}
            />
          </div>
        </div>
      )}

      <div className="flex justify-center mt-3 space-x-4  ">
        <ButtonDis onClick={() => validationCheck("Save")} title={"Save"} />
        <ButtonDis onClick={validationCheck} title={"Preview"} />
        <ButtonDis
          onClick={() => setToggle(!toggle)}
          title={"Revenue Breakup"}
        />
      </div>
    </div>
  );
};

export default DailyRep;
