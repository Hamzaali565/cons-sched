import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Modal/Loader";
import { pdf } from "@react-pdf/renderer";
import { v4 as uuidv4 } from "uuid";
import ButtonDis from "../../../Components/Button/ButtonDis";
import ConSchedulePDF from "../../../Components/PDFDetails/ConsSchedulePdf";
import ConsScheduleDetailPdf from "../../../Components/PDFDetails/ConsScheduleDetailPdf";
import ConsDisp from "../../../Components/ConsultantDisp/ConsDisp";
import Header from "../../../Components/Header/Header";
import PracticePageBreakintotwo from "../../../Components/PDFDetails/PracticePageBreakintotwo";
import PageBreak2PDF from "../../../Components/PDFDetails/PageBreak2PDF";

const ConsultantSchedule = () => {
  const [consData, setConsData] = useState([]);
  const [selectType, setSelectedType] = useState("");
  const [specialityData, setSpecialityData] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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

  const ConScheduleThermPrint = async (data) => {
    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(
      <ConSchedulePDF
        key={key}
        consDetails={consData.length > 0 ? consData : data}
      />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };

  const printCons = (item) => {
    console.log(item);
    ConScheduleThermPrint([item]);
  };

  const printResultToPdfPrac = async (data) => {
    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(<PageBreak2PDF data={data} />).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
    setOpen(false);
  };

  const getData = async () => {
    setOpen(true);
    try {
      const response = await axios.get(`${url}/getconsultant`);
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
      printResultToPdfPrac(grouped);
    } catch (error) {
      setOpen(false);
      console.log("error of get data", error);
    }
  };

  return (
    <div>
      <Header onChange={(e) => setSearchValue(e)} />
      <div className=" mx-4 p-3">
        {/* <div className="flex items-center flex-col space-y-2 mt-3">
          <SpecialityModal
            title={"Search With Speciality"}
            onClick={getDataFromSpeciality}
          />
          {consData.length > 0 && (
            <LabeledInput
              label={"Selected Speciality"}
              disabled={true}
              value={specialityData?.speciality}
              placeholder={"Selected Speciality"}
            />
          )}
        </div> */}
        {consData.length > 0 && (
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
                <div
                  key={index}
                  className="mt-3 grid grid-cols-7 text-xs justify-items-center items-center h-10 border border-gray-300 transform transition-transform hover:scale-105"
                >
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
        )}
        {consData.length <= 0 && (
          <ConsDisp
            onClickCons={printCons}
            onClickSpec={ConScheduleThermPrint}
            value={searchValue}
          />
        )}

        <div className="flex justify-center mt-5 space-x-3">
          <ButtonDis title={"Print Detail"} onClick={getData} />
          <ButtonDis title={"Refereh"} onClick={resetData} />
        </div>
      </div>
      <Loader onClick={open} title={"Please Wait ..."} />
    </div>
  );
};

export default ConsultantSchedule;
