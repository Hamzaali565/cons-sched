import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SimpleInput from "../SimpleInput/SimpleInput";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  bgcolor: "background.paper",
  borderRadius: "21px",
  boxShadow: 24,
  p: 4,
  overflowY: "auto", // Enable vertical scrolling
};

export default function VideoModal({ onClick, title, All = "" }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [loaderTog, setLoaderTog] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null); // Reference for the input element

  React.useEffect(() => {
    getData();
  }, [toggle]);
  const handleClose = () => {
    setOpen(false);
    setData([]);
  };

  const url = useSelector((state) => state.url);

  const OpenData = () => {
    setToggle(!toggle);
    setOpen(!open);
  };

  const filterNames = (input) => {
    const searchTerm = input.toLowerCase();
    if (input === "") {
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
  };

  const SendData = (item) => {
    onClick(item);
    handleClose();
  };
  // api
  const getData = async () => {
    try {
      setLoaderTog(true);
      setMessage("");
      const response = await axios.get(`${url}/video`, {
        withCredentials: true,
      });
      console.log(response?.data?.data);
      setLoaderTog(false);
      setData(response?.data?.data);
    } catch (error) {
      console.log("error of get data", error);
      setLoaderTog(false);
    }
  };
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <div>
      <Button
        onClick={OpenData}
        style={{ backgroundColor: "#378FE7", color: "white" }}
      >
        {title}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-center">
            <SimpleInput
              ref={inputRef}
              placeholder={"Search"}
              onChange={(e) => filterNames(e.target.value)}
            />
          </div>
          <div className="container mx-auto mt-3">
            <div className="grid grid-cols-4 text-xs justify-items-center items-center h-16 border border-gray-300">
              <p className="">Serial No.</p>
              <p className="">Video Name</p>
              <p className="">Specific</p>
              <p className="">Status</p>
            </div>
          </div>

          <div className="max-h-96">
            {data.length > 0 ? (
              data.map((item, index) => (
                <div
                  className="container mx-auto mt-3 cursor-pointer"
                  key={index}
                  onClick={() => SendData(item)}
                >
                  <div className="grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
                    <p className="">{index + 1}</p>
                    <p className="">{item?.videoTitle}</p>
                    <p className="">
                      {item?.specific === true ? "Active" : "In-Active"}
                    </p>
                    <p className="">
                      {item?.status === true ? "Active" : "In-Active"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center">
                {" "}
                <div className="flex justify-center">
                  {message !== "" && <p>{message !== "" ? message : ""}</p>}
                  <Loader onClick={loaderTog} title={"Please Wait"} />
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
