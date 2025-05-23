import React, { useEffect, useState } from "react";
import ButtonDis from "../Button/ButtonDis";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ErrorAlert } from "../Alert/Alert";
import SimpleInput from "../SimpleInput/SimpleInput";
import CenterHeading from "../Center Heading/CenterHeading";
import logo from "../../Images/ZMCLogo-.png";
import { useSelector } from "react-redux";
import moment from "moment";

const Header = ({ onChange, inpShow = true, value = "" }) => {
  const [time, setTime] = useState(moment().format("MMMM Do YYYY, h:mm:ss a"));

  const user_check = useSelector((state) => state.iAM);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    }, 1000); // Update every 1000 milliseconds (1 second)

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const navigate = useNavigate(); // using 'const' here
  let pass = "1234554321";
  const navigateToHome = () => {
    navigate("/home"); // Directly passing the path
  };
  const navigateToGRN = () => {
    navigate("/grnReport"); // Directly passing the path
  };
  const navigateToCalc = () => {
    navigate("/welfareCalculator"); // Directly passing the path
  };
  const navigateToReport = () => {
    navigate("/mealReport"); // Directly passing the path
  };
  const navigateToSimpCalc = () => {
    navigate("/simpleCalculator"); // Directly passing the path
  };
  const navigateToDVG = () => {
    navigate("/dvago-rep"); // Directly passing the path
  };
  const navigateToDLY = () => {
    navigate("/daily-rep"); // Directly passing the path
  };

  const navigateToConsultant = () => {
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
        console.log("User input:", userInput);
        if (userInput === pass) {
          // Now you can use `userInput` in your logic
          navigate("/consultantSetup"); // Directly passing the path
          return;
        } else {
          ErrorAlert({ text: "INCORRECT PASSWORD!!!", timer: 2000 });
        }
      }
    });
  };
  const navigateToForms = () => {
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
        console.log("User input:", userInput);
        if (userInput === pass) {
          // Now you can use `userInput` in your logic
          navigate("/formsIT"); // Directly passing the path
          return;
        } else {
          ErrorAlert({ text: "INCORRECT PASSWORD!!!", timer: 2000 });
        }
      }
    });
  };

  const myData = (value) => {
    onChange(value);
  };
  return (
    <div className="flex justify-between items-center space-x-4 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg py-3 px-5">
      <div>
        <img src={logo} alt="" height={"10"} width={300} />
        <p className="font-bold">{time}</p>
      </div>
      {inpShow && (
        <div className="flex space-x-4 justify-center ">
          <CenterHeading title={"FIND CONSULTANT"} />
          <div className="flex justify-center my-3">
            <SimpleInput
              placeholder={"Consultant / Speciality"}
              onChange={(e) => myData(e.target.value)}
            />
          </div>
        </div>
      )}
      {value !== "" && <p>{value}</p>}
      {user_check === "itadm" ? (
        <div className="flex justify-center space-x-5">
          <ButtonDis title={"Home"} onClick={navigateToHome} />
          <ButtonDis title={"Calculator"} onClick={navigateToSimpCalc} />
          <ButtonDis title={"Welfare"} onClick={navigateToCalc} />
          <ButtonDis title={"Forms"} onClick={navigateToForms} />
          <ButtonDis title={"Setup"} onClick={navigateToConsultant} />
          <ButtonDis title={"Report"} onClick={navigateToReport} />
          <ButtonDis title={"GRN REP"} onClick={navigateToGRN} />
          <ButtonDis title={"Dvago REP"} onClick={navigateToDVG} />
          <ButtonDis title={"Daily Report"} onClick={navigateToDLY} />
        </div>
      ) : (
        <div className="flex justify-center space-x-5">
          <ButtonDis title={"Home"} onClick={navigateToHome} />
          <ButtonDis title={"Calculator"} onClick={navigateToSimpCalc} />
          <ButtonDis title={"Welfare"} onClick={navigateToCalc} />
          <ButtonDis title={"Report"} onClick={navigateToReport} />
          <ButtonDis title={"Dvago REP"} onClick={navigateToDVG} />
        </div>
      )}
    </div>
  );
};

export default Header;
