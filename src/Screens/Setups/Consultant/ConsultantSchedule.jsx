import React, { useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import SpecialityModal from "../../../Components/Modal/SpecialityModal";
import ConsultantModal from "../../../Components/Modal/ConsultantModal";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Modal/Loader";
import { pdf } from "@react-pdf/renderer";
import { v4 as uuidv4 } from "uuid";
import ButtonDis from "../../../Components/Button/ButtonDis";
import ConSchedulePDF from "../../../Components/PDFDetails/ConsSchedulePdf";
import ConsScheduleDetailPdf from "../../../Components/PDFDetails/ConsScheduleDetailPdf";

const ConsultantSchedule = () => {
  const [consData, setConsData] = useState([]);
  const [selectType, setSelectedType] = useState("");
  const [specialityData, setSpecialityData] = useState(null);
  const [open, setOpen] = useState(false);

  const url = useSelector((state) => state?.url);

  const updateCons = (data, value) => {
    setConsData([]);
    if (value === "Cons") {
      setConsData([data]);
      setSelectedType("Cons");
      console.log(consData);
      return;
    }
  };

  const resetData = () => {
    setConsData([]);
    setSelectedType("");
    setSpecialityData(null);
  };

  const getDataFromSpeciality = async (data) => {
    try {
      setOpen(true);
      setSpecialityData(data);
      setSelectedType("");
      const response = await axios.get(
        `${url}/opd/consultantSchedule?speciality=${data?.speciality}&specialityId=${data?._id}`,
        { withCredentials: true }
      );
      console.log("Response of getDataFromSpeciality", response);
      setConsData(response?.data?.data?.data);
      setOpen(false);
    } catch (error) {
      console.log("Error of getDataFromSpeciality", error);
      setOpen(false);
      setConsData([]);
    }
  };

  const ConScheduleThermPrint = async (data) => {
    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(
      <ConSchedulePDF key={key} consDetails={consData} />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };

  const printResultToPdf = async (data) => {
    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(
      <ConsScheduleDetailPdf key={key} resultData={data} />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };

  const getData = async () => {
    setOpen(true);
    try {
      const response = await axios.get(`${url}/getconsultant?All=""`, {
        withCredentials: true,
      });
      let data = response.data.data;
      const grouped = data.reduce((acc, curr) => {
        // Find if the group already exists for the speciality
        let group = acc.find(
          (group) => group[0]?.speciality === curr.speciality
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

      // Sort by speciality alphabetically
      const sortedGrouped = grouped.sort((a, b) =>
        a[0].speciality.localeCompare(b[0].speciality)
      );

      console.log("sortedGrouped", sortedGrouped);
      let mydata = grouped.map((items) => {
        if (items.length > 0) {
          let Data = items?.map((itemed) => {
            console.log("itemed ", itemed);
          });
        }
      });
      // console.log("Data", sortedGrouped);
      console.log(response.data.data);
      setOpen(false);
      printResultToPdf(grouped);
    } catch (error) {
      setOpen(false);
      console.log("error of get data", error);
    }
  };
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Consultant Schedule"} />
        <div className="flex items-center flex-col space-y-2 mt-3">
          <SpecialityModal
            title={"Search With Speciality"}
            onClick={getDataFromSpeciality}
          />
          <ConsultantModal
            title={"Search With Consultant"}
            onClick={(data) => updateCons(data, "Cons")}
          />
          {consData.length > 0 && (
            <LabeledInput
              label={
                selectType === "Cons"
                  ? "Selected Consultant"
                  : "Selected Speciality"
              }
              disabled={true}
              value={
                selectType === "Cons"
                  ? consData[0]?.name
                  : specialityData?.speciality
              }
              placeholder={
                selectType === "Cons"
                  ? "Selected Consultant"
                  : "Selected Speciality"
              }
            />
          )}
        </div>
        <div className="container mx-auto mt-3">
          <div className="mt-3 grid grid-cols-7 text-xs font-bold justify-items-center items-center h-16 border border-gray-300">
            <p>Consultant Name</p>
            <p>Speciality</p>
            <p>Timing</p>
            <p>Days</p>
            <p>Appointment Fee</p>
            <p>Welfare Fee</p>
            <p>onleave</p>
          </div>
          {consData &&
            consData.map((items, index) => (
              <div className="mt-3 grid grid-cols-7 text-xs justify-items-center items-center h-10 border border-gray-300">
                <p>{items?.name}</p>
                <p>{items?.speciality}</p>
                <p>{items?.timing}</p>
                <p>{items?.days}</p>
                <p>{items?.appointmentFee}</p>
                <p>{items?.welfareFee}</p>
                <p>{items?.onLeave === true ? "On-Leave" : "Available"}</p>
              </div>
            ))}
        </div>
        <div className="flex justify-center mt-5 space-x-3">
          <ButtonDis
            title={"Print Selected Data"}
            onClick={ConScheduleThermPrint}
          />
          <ButtonDis title={"Print Detail"} onClick={getData} />
          <ButtonDis title={"Refereh"} onClick={resetData} />
        </div>
        <table
          style={{ border: "1px solid black", borderCollapse: "collapse" }}
        >
          <tr>
            <td rowSpan="2" style={{ border: "1px solid black" }}>
              Rowspan 2
            </td>
            <td style={{ border: "1px solid black" }}>Column 1</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Column 2 Row 2</td>
          </tr>
        </table>
      </div>
      <Loader onClick={open} />
    </div>
  );
};

export default ConsultantSchedule;
