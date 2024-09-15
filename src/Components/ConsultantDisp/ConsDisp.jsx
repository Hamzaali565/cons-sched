import React, { useState } from "react";
import SimpleInput from "../SimpleInput/SimpleInput";
import CenterHeading from "../Center Heading/CenterHeading";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../Modal/Loader";

const ConsDisp = ({ All = "", onClick }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [originalData, setOriginalData] = useState(data);
  const [loaderTog, setLoaderTog] = useState(false);
  const [message, setMessage] = useState("");

  const url = useSelector((state) => state?.url);
  React.useEffect(() => {
    getData();
  }, [toggle]);

  const getData = async () => {
    try {
      setLoaderTog(true);

      const response = await axios.get(`${url}/getconsultant?All=${All}`, {
        withCredentials: true,
      });
      console.log(response.data.data);
      setLoaderTog(false);
      setData(response.data.data);
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

    const filteredData = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(searchTerm)
      )
    );
    setData(filteredData);
    console.log("filtered data ", filteredData);
  };

  const sendData = (item) => {
    onClick(item);
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"FIND CONSULTANT"} />
      <div className="flex justify-center my-3">
        <SimpleInput
          placeholder={"Enter Consultant Name"}
          onChange={(e) => filterNames(e.target.value)}
        />
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
      </div>
      <div className="h-60 overflow-auto">
        {data.length > 0 &&
          data?.map((items, index) => (
            <div
              className="container mx-auto mt-3 "
              key={index}
              onClick={() => sendData(items)}
            >
              <div className="mt-3 grid grid-cols-7 text-xs justify-items-center items-center h-10 border border-gray-300 hover:font-bold hover:text-blue-800 cursor-pointer">
                <p>{items?.name}</p>
                <p>{items?.speciality}</p>
                <p>{items?.timing}</p>
                <p>{items?.days}</p>
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
