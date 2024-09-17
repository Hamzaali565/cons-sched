import React from "react";
import Header from "../../../Components/Header/Header";
import SimpleDropDown from "../../../Components/SimpleDropdown/SimpleDropDown";
import ButtonDis from "../../../Components/Button/ButtonDis";
import InternetFacultyForm from "../../../Components/PDFDetails/InternetFacultyForm";
import { pdf } from "@react-pdf/renderer";
import { v4 as uuidv4 } from "uuid";
import UserLoginPDF from "../../../Components/PDFDetails/UserLoginPDF";
const Forms = () => {
  const printForm = async (data) => {
    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(<UserLoginPDF />).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };

  return (
    <div>
      <Header inpShow={false} />

      <div className="mt-4">
        <SimpleDropDown
          DropDownLabel={"Select Form Type"}
          data={[
            { name: "---" },
            { name: "User Login Form" },
            { name: "Internet Faculty Form" },
          ]}
          onChange={(name) => console.log(name)}
        />
      </div>
      <div className="flex justify-center space-x-3 mt-7">
        <ButtonDis title={"Print"} onClick={printForm} />
        <ButtonDis title={" Refresh"} />
      </div>
    </div>
  );
};

export default Forms;
