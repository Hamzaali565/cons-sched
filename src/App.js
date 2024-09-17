import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Consultant from "./Screens/Setups/Consultant/Consultant";
import ConsultantSchedule from "./Screens/Setups/Consultant/ConsultantSchedule";
import Header from "./Components/Header/Header";
import ConsDisp from "./Components/ConsultantDisp/ConsDisp";
import Forms from "./Screens/Setups/Forms/Forms";

function App() {
  return (
    <Router>
      {" "}
      {/* Wrap with Router */}
      <div>
        <Routes>
          <Route path="/home" element={<ConsultantSchedule />} />
          <Route path="/consultantSetup" element={<Consultant />} />
          <Route path="/formsIT" element={<Forms />} />
          <Route path="*" element={<Navigate to="/home" replace={true} />} />
        </Routes>
      </div>
    </Router>
    // <>
    //   {/* <ConsDisp /> */}
    // </>
  );
}

export default App;
