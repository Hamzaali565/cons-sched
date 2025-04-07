import React, { useEffect, useState } from "react";
import SimpleInput from "../SimpleInput/SimpleInput";
import CenterHeading from "../Center Heading/CenterHeading";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../Modal/Loader";
import Header from "../Header/Header";
import moment from "moment";

const ConsDisp = ({ All = "", onClickCons, onClickSpec, value }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [toggle, setToggle] = useState(false);
  // const [originalData, setOriginalData] = useState(data);
  const [loaderTog, setLoaderTog] = useState(false);
  const [message, setMessage] = useState("");

  const url = useSelector((state) => state?.url);
  React.useEffect(() => {
    getData();
  }, [toggle]);
  console.log("value", value);
  useEffect(() => {
    // If `value` is an empty string, fetch original data; otherwise, filter data
    if (value === "") {
      getData(); // Fetch all data when value is empty
    } else {
      filterNames(value); // Filter data when value is not empty
    }
  }, [value]);
  const getData = async () => {
    try {
      setLoaderTog(true);

      let response = await axios.get(`${url}/getconsultant?All=${All}`, {
        withCredentials: true,
      });
      response?.data?.data.sort((a, b) => {
        let nameA = a.speciality.toLowerCase();
        let nameB = b.speciality.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      console.log("here", response);
      const currentDay = moment().format("dddd").toUpperCase();
      response = response?.data?.data.map((items) => {
        if (items?.specificDay === currentDay) {
          if (items?.specificType === true) {
            return {
              ...items,
              roomNo:
                !items?.specificRoom || items?.specificRoom !== ""
                  ? items?.specificRoom
                  : items?.roomNo,
              appointmentFee:
                !items?.specificCharges || items?.specificCharges !== 0
                  ? items?.specificCharges
                  : items?.appointmentFee,
            };
          }
        }
        return items;
      });

      // console.log("responses", responses);

      console.log(currentDay);
      setLoaderTog(false);
      setData(response);

      setCopyData(response);
    } catch (error) {
      console.log("error of get data", error);
      setLoaderTog(false);
    }
  };

  const filterNames = (input) => {
    const searchTerm = input.toLowerCase();
    if (input === "") {
      //   setData(originalData);
      setToggle(!toggle);
      return;
    }
    // setData(copyData);
    const filteredData = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(searchTerm)
      )
    );
    if (filteredData.length <= 0) {
      setData(copyData);
      return;
    }
    setData(filteredData);
    console.log("filtered data ", data);
  };

  const sendData = (item, value) => {
    if (value === "consultant") {
      onClickCons(item);
      return;
    } else {
      const myData = copyData.filter((items) => items?.speciality === item);
      onClickSpec(myData);
    }
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg mx-4 rounded-3xl">
      <div className="container mx-auto ">
        <div className="grid grid-cols-8 text-xs font-bold justify-items-center items-center h-10 border border-gray-300">
          <p>Consultant Name</p>
          <p>Speciality</p>
          <p>Days</p>
          <p>Timing</p>
          <p>Room No</p>
          <p>Appointment Fee</p>
          <p>Ext. no</p>
          <p>onleave</p>
        </div>
      </div>
      <div
        style={{ height: "700px" }}
        className="overflow-auto border border-gray-300 hide-scrollbar"
      >
        {data.length > 0 &&
          data?.map((items, index) => (
            <div
              className="container mx-auto hover:font-bold hover:text-blue-800 cursor-pointer transform transition-transform duration-300 hover:scale-105"
              key={index}
            >
              <div className="grid grid-cols-8 p-1 font-bold text-xs text-center items-center  border-b-2 border-gray-300 ">
                <p
                  onClick={() => sendData(items, "consultant")}
                  className="text-left"
                >
                  {items?.name}
                </p>
                <p onClick={() => sendData(items?.speciality, "speciality")}>
                  {items?.speciality}
                </p>
                <div>
                  <p>{items?.days}</p>
                  {items?.days1 && <p>{items?.days1}</p>}
                  {items?.days2 && <p>{items?.days2}</p>}
                </div>
                <div>
                  <p>{items?.timing}</p>
                  {items?.timing1 && <p>{items?.timing1}</p>}
                  {items?.timing2 && <p>{items?.timing2}</p>}
                </div>
                <p>{items?.roomNo}</p>
                <p>{items?.appointmentFee}</p>
                <p>{items?.welfareFee}</p>
                <p>{items?.onLeave === true ? "On-Leave" : "Available"}</p>
              </div>
            </div>
          ))}
      </div>
      <Loader onClick={loaderTog} title={"Please Wait..."} />
    </div>
  );
};

export default ConsDisp;
