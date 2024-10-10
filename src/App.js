import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Consultant from "./Screens/Setups/Consultant/Consultant";
import ConsultantSchedule from "./Screens/Setups/Consultant/ConsultantSchedule";
import WelfareCalc from "./Screens/Setups/WelfareCalculator/WelfareCalc";
import SimpleCalc from "./Screens/Setups/SimpleCalculator/SimpleCalc";
import Forms from "./Screens/Setups/Forms/Forms";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { ErrorAlert } from "./Components/Alert/Alert";
import LoaderScreen from "./Screens/LoaderScreen/LoaderScreen";
import { setUser } from "./Store/action";
import MealReport from "./Screens/Setups/MealReport/MealReport";
import ExcelToJson from "./Screens/Setups/ExcelToJson";
import EXToJson from "./Screens/Setups/EXToJson";

function App() {
  const [refreshPage, setRefreshPage] = useState(false);
  useEffect(() => {
    user_type();
  }, [!refreshPage]);

  const dispatch = useDispatch();
  const user_check = useSelector((state) => state?.iAM);
  console.log("user_check ", user_check);

  const user_type = () => {
    Swal.fire({
      title: "Please Enter User Type",
      input: "password",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      preConfirm: (inputValue) => {
        if (!inputValue) {
          Swal.showValidationMessage("Input cannot be empty");
        }
        return inputValue;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const userInput = result.value.toLowerCase();
        if (userInput === "user") {
          dispatch(setUser(userInput));
          return;
        } else if (userInput === "itadm") {
          dispatch(setUser(userInput));
          return;
        } else {
          dispatch(setUser(null));
          return;
        }
      }
    });
  };

  return (
    <Router>
      <div>
        {user_check === null ? (
          <Routes>
            {/* Redirect to /Disp when user_check is null */}
            <Route path="*" element={<Navigate to="/Disp" replace />} />
            <Route
              path="/Disp"
              element={
                <LoaderScreen
                  onClick={() =>
                    setRefreshPage(refreshPage === false ? true : false)
                  }
                />
              }
            />
          </Routes>
        ) : user_check === "user" ? (
          <Routes>
            <Route path="/home" element={<ConsultantSchedule />} />
            <Route path="/welfareCalculator" element={<WelfareCalc />} />
            <Route path="/simpleCalculator" element={<SimpleCalc />} />
            <Route path="/simpleCalculator" element={<SimpleCalc />} />
            <Route path="/mealReport" element={<MealReport />} />
            <Route path="*" element={<Navigate to="/home" replace={true} />} />
          </Routes>
        ) : user_check === "itadm" ? (
          <Routes>
            <Route path="/home" element={<ConsultantSchedule />} />
            <Route path="/consultantSetup" element={<Consultant />} />
            <Route path="/formsIT" element={<Forms />} />
            <Route path="/welfareCalculator" element={<WelfareCalc />} />
            <Route path="/simpleCalculator" element={<SimpleCalc />} />
            <Route path="/mealReport" element={<MealReport />} />
            <Route path="/grnReport" element={<ExcelToJson />} />
            <Route path="*" element={<Navigate to="/home" replace={true} />} />
          </Routes>
        ) : null}
      </div>
    </Router>
  );
}

export default App;
