import React, { useEffect, useState } from "react";
// import { IoIosArrowDown } from "react-icons/io";
// import { Button } from "./ui/button";
// import { useRouter } from "next/navigation";
import logo from "../../Images/ZMCLogo-.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "../Alert/Alert";
import Swal from "sweetalert2";

const Myheader = () => {
  //   const router = useRouter();
  const [dispHeader, setDispHeader] = useState(null);
  const user_check = useSelector((state) => state.iAM).toLowerCase();
  useEffect(() => {
    headerToDisplay();
  }, []);
  const headerToDisplay = () => {
    if (user_check === "itadm") {
      setDispHeader(adminData);
      return;
    } else {
      setDispHeader(userData);
    }
  };
  const adminData = [
    {
      module_name: "Consultant",
      list: [{ name: "Consultant Schedule" }, { name: "Setup" }],
    },
    {
      module_name: "Calculator",
      list: [{ name: "Welfare Calculator" }, { name: "Normal Calculator" }],
    },
    {
      module_name: "Reports",
      list: [{ name: "Meal / Bed Statement" }, { name: "Dvago Report" }],
    },
    {
      module_name: "IT Reports",
      list: [
        { name: "GRN Reports" },
        { name: "Forms" },
        { name: "Daily Report" },
        { name: "Daily Report All" },
      ],
    },
  ];
  const userData = [
    {
      module_name: "Consultant",
      list: [{ name: "Consultant Schedule" }],
    },
    {
      module_name: "Calculator",
      list: [{ name: "Welfare Calculator" }, { name: "Normal Calculator" }],
    },
    {
      module_name: "Reports",
      list: [{ name: "Meal / Bed Statement" }, { name: "Dvago Report" }],
    },
  ];

  const navigate = useNavigate(); // using 'const' here
  let pass = "1234554321";
  const navigateTo = (name) => {
    if (name === "Consultant Schedule") {
      navigate("/home"); // Directly passing the path
      return;
    } else if (name === "GRN Reports") {
      navigate("/grnReport"); // Directly passing the path
      return;
    } else if (name === "Welfare Calculator") {
      navigate("/welfareCalculator"); // Directly passing the path
      return;
    } else if (name === "Meal / Bed Statement") {
      navigate("/mealReport"); // Directly passing the path
      return;
    } else if (name === "Normal Calculator") {
      navigate("/simpleCalculator"); // Directly passing the path
      return;
    } else if (name === "Dvago Report") {
      navigate("/dvago-rep"); // Directly passing the path
      return;
    } else if (name === "Daily Report") {
      navigate("/daily-rep"); // Directly passing the path
      return;
    } else if (name === "Forms") {
      navigate("/formsIT"); // Directly passing the path
      return;
    } else if (name === "Setup") {
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
          if (userInput === pass) {
            // Now you can use `userInput` in your logic
            navigate("/consultantSetup"); // Directly passing the path
            return;
          } else {
            ErrorAlert({ text: "INCORRECT PASSWORD!!!", timer: 2000 });
          }
        }
      });
      return;
    } else if (name === "Daily Report All") {
      navigate("/daily-rep-all"); // Directly passing the path
      return;
    }
  };

  return (
    <div className="border-b-2 p-2 px-3 flex space-x-4 items-center justify-between bg-white  z-50 relative">
      <div className="flex">
        {dispHeader &&
          dispHeader.map((module) => (
            <div
              key={module.module_name}
              className="relative group cursor-pointer"
            >
              {/* Module Name */}
              <span className="font-medium inline-flex items-center px-4 py-2 hover:bg-gray-400 rounded-md">
                {module.module_name}
                {/* <IoIosArrowDown className="ml-2" /> */}
              </span>

              {/* Dropdown Menu */}
              <ul className="absolute left-0 border rounded-md shadow-md min-w-[180px] hidden group-hover:block bg-white text-black z-50">
                {module.list.map((item, index) => (
                  <li
                    key={index}
                    className="border-b last:border-none px-4 py-2 hover:bg-gray-300"
                    onClick={() => navigateTo(item?.name)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>

      <div className="cursor-pointer">
        <img
          src={logo}
          alt=""
          height={"10"}
          width={300}
          onClick={() => navigateTo("Consultant Schedule")}
        />
        {/* <p className="font-bold">{time}</p> */}
      </div>
    </div>
  );
};

export default Myheader;
