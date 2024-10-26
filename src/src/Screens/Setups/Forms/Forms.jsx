import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header/Header";
import SimpleDropDown from "../../../Components/SimpleDropdown/SimpleDropDown";
import ButtonDis from "../../../Components/Button/ButtonDis";
import InternetFacultyForm from "../../../Components/PDFDetails/InternetFacultyForm";
import { pdf } from "@react-pdf/renderer";
import { v4 as uuidv4 } from "uuid";
import UserLoginPDF from "../../../Components/PDFDetails/UserLoginPDF";
import { ErrorAlert } from "../../../Components/Alert/Alert";
import Loader from "../../../Components/Modal/Loader";
import WifiAceessPDF from "../../../Components/PDFDetails/WifiAceessPDF";
import LabTestPdf from "../../../Components/PDFDetails/LabTestPdf";
import SMSMarketingPDF from "../../../Components/PDFDetails/SMSMarketingPDF";
import PanelFormPDF from "../../../Components/PDFDetails/PanelFormPDF";
import CCTVFormPDF from "../../../Components/PDFDetails/CCTVFormPDF";
import RehiringPdf from "../../../Components/PDFDetails/RehiringPdf";
const Forms = () => {
  const [selectedValue, setSelectedValue] = React.useState("");
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropData, setDropData] = useState([
    { name: "---" },
    { name: "User Login Form" },
    { name: "Internet Faculty Form" },
    { name: "Wifi Access Form" },
    { name: "Lab Test Forms" },
    { name: "SMS Form" },
    { name: "Panel Form" },
    { name: "CCTV Form" },
    { name: "Re-Hiring Form" },
  ]);
  useEffect(() => {
    setDropData([
      { name: "---" },
      { name: "User Login Form" },
      { name: "Internet Faculty Form" },
      { name: "Wifi Access Form" },
      { name: "Lab Test Forms" },
      { name: "SMS Form" },
      { name: "Panel Form" },
      { name: "CCTV Form" },
      { name: "Re-Hiring Form" },
    ]);
  }, [toggle]);

  const reset = () => {
    setSelectedValue("");
    setDropData([]);
    setToggle(!toggle);
  };

  const printForm = async () => {
    const key = uuidv4();
    setOpen(true);

    // Create a PDF document as a Blob
    let blob;
    let url;
    if (selectedValue === "User Login Form") {
      blob = await pdf(<UserLoginPDF />).toBlob();

      // Create a Blob URL and open it in a new tab
      url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setOpen(false);
      url = "";
      return;
    } else if (selectedValue === "Internet Faculty Form") {
      blob = await pdf(<InternetFacultyForm />).toBlob();

      // Create a Blob URL and open it in a new tab
      url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      url = "";
      setOpen(false);
    } else if (selectedValue === "Wifi Access Form") {
      blob = await pdf(<WifiAceessPDF />).toBlob();

      // Create a Blob URL and open it in a new tab
      url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      url = "";
      setOpen(false);
    } else if (selectedValue === "Lab Test Forms") {
      blob = await pdf(<LabTestPdf />).toBlob();

      // Create a Blob URL and open it in a new tab
      url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      url = "";
      setOpen(false);
    } else if (selectedValue === "SMS Form") {
      blob = await pdf(<SMSMarketingPDF />).toBlob();

      // Create a Blob URL and open it in a new tab
      url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      url = "";
      setOpen(false);
    } else if (selectedValue === "Panel Form") {
      blob = await pdf(<PanelFormPDF />).toBlob();

      // Create a Blob URL and open it in a new tab
      url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      url = "";
      setOpen(false);
    } else if (selectedValue === "CCTV Form") {
      blob = await pdf(<CCTVFormPDF />).toBlob();

      // Create a Blob URL and open it in a new tab
      url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      url = "";
      setOpen(false);
    } else if (selectedValue === "Re-Hiring Form") {
      blob = await pdf(<RehiringPdf />).toBlob();

      // Create a Blob URL and open it in a new tab
      url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      url = "";
      setOpen(false);
    } else {
      ErrorAlert({ text: "Please Select Form Type", timer: 2000 });
      setOpen(false);
    }
  };

  return (
    <div>
      <Header inpShow={false} />

      <div className="mt-4">
        <SimpleDropDown
          DropDownLabel={"Select Form Type"}
          data={dropData}
          onChange={(name) => setSelectedValue(name)}
        />
      </div>
      <div className="flex justify-center space-x-3 mt-7">
        <ButtonDis title={"Print"} onClick={printForm} />
        <ButtonDis title={" Refresh"} onClick={reset} />
      </div>
      <Loader onClick={open} title={"Wait..."} />
    </div>
  );
};

export default Forms;
