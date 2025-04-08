import React, { useState } from "react";
import Myheader from "../../../Components/New Header/newHeader";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";
import ButtonDis from "../../../Components/Button/ButtonDis";
import DailyReportPDF from "../../../Components/PDFDetails/DailyReportPDF";
import { pdf } from "@react-pdf/renderer";
import { v4 as uuidv4 } from "uuid";
import { ErrorAlert, SuccessAlert } from "../../../Components/Alert/Alert";
import Swal from "sweetalert2";

const DailyReportAll = () => {
  const [date, setDate] = useState({
    fromDate: "",
    toDate: "",
  });
  const [data, setData] = useState([]);

  const url = useSelector((item) => item.url);

  const handleDate = (value, key) => {
    setDate((prev) => ({ ...prev, [key]: value }));
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `${url}/daily_report?fromDate=${date?.fromDate}&toDate=${date?.toDate}`
      );
      setData(response?.data?.data?.data);
    } catch (error) {
      console.log("Error =>", error);
      ErrorAlert({ text: error?.response?.statusText });
      setData([]);
    }
  };

  const printDReportPDF = async (reportData) => {
    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(<DailyReportPDF data={reportData} />).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };

  const passwordCheck = (_id) => {
    Swal.fire({
      title: "Please Enter Password",
      input: "password",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: false, // Disable the loader since no async action is needed
      preConfirm: (inputValue) => {
        // You can do basic validation if needed
        if (!inputValue) {
          Swal.showValidationMessage("Input cannot be empty");
        }
        return inputValue;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const userInput = result.value;
        if (userInput === "admin009") {
          // Now you can use `userInput` in your logic
          deleteReport(_id);
          return;
        } else {
          ErrorAlert({ text: "INCORRECT PASSWORD!!!", timer: 2000 });
        }
      }
    });
  };

  const deleteReport = async (_id) => {
    try {
      const response = await axios.put(`${url}/daily_report`, { _id });
      console.log(response?.data?.message);
      SuccessAlert({ text: response?.data?.message, timer: 2000 });
      getData();
    } catch (error) {
      console.log("Error => ", error);
    }
  };
  return (
    <div>
      <Myheader />
      <div className="flex justify-center items-center my-8 gap-10">
        <LabeledInput
          label={"From Date"}
          type={"date"}
          onChange={(e) => handleDate(e.target.value, "fromDate")}
        />
        <LabeledInput
          label={"To Date"}
          type={"date"}
          onChange={(e) => handleDate(e.target.value, "toDate")}
        />
      </div>
      <div className="flex justify-center ">
        <ButtonDis title={"Load data"} onClick={getData} />
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-black border-opacity-30 shadow-lg m-4 rounded-3xl overflow-hidden">
        {/* header */}
        <div className="w-full">
          <div className="grid grid-cols-5 text-xs font-bold underline text-center place-items-center h-10 border-b border-gray-300 bg-white bg-opacity-30 backdrop-blur-sm">
            <p>S No.</p>
            <p>Report Date</p>
            <p>Uploaded On</p>
            <p>Print</p>
            <p>Delete</p>
          </div>
        </div>
        {data &&
          data.map((item, index) => (
            <div className="w-full">
              <div className="grid grid-cols-5 text-xs font-bold text-center place-items-center h-10 border-b border-gray-300 bg-white bg-opacity-30 backdrop-blur-sm">
                <p>{index + 1}</p>
                <p>{item?.title}</p>
                <p>{moment(item?.createdAt).format("DD/MM/YYYY HH:mm:ss")}</p>
                <p
                  className="text-green-600 cursor-pointer hover:underline"
                  onClick={() => printDReportPDF(item?.data)}
                >
                  Print
                </p>
                <p
                  className="text-red-600 cursor-pointer"
                  onClick={() => passwordCheck(item?._id)}
                >
                  Delete
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DailyReportAll;
