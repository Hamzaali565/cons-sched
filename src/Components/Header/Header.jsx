import React from "react";
import ButtonDis from "../Button/ButtonDis";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ErrorAlert } from "../Alert/Alert";
import SimpleInput from "../SimpleInput/SimpleInput";
import CenterHeading from "../Center Heading/CenterHeading";

const Header = ({ onChange, inpShow = true }) => {
  const navigate = useNavigate(); // using 'const' here

  const navigateToHome = () => {
    navigate("/home"); // Directly passing the path
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
        if (userInput === "1234554321") {
          // Now you can use `userInput` in your logic
          navigate("/consultantSetup"); // Directly passing the path
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
      <div>Consultant Schedule</div>
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
      <div className="flex justify-center space-x-5">
        <ButtonDis title={"Setup"} onClick={navigateToConsultant} />
        <ButtonDis title={"Schedule"} onClick={navigateToHome} />
      </div>
    </div>
  );
};

export default Header;
