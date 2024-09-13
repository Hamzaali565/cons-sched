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

function App() {
  return (
    <Router>
      {" "}
      {/* Wrap with Router */}
      <div>
        <Header /> {/* Now Header has access to the Router context */}
        <Routes>
          <Route path="/home" element={<ConsultantSchedule />} />
          <Route path="/consultantSetup" element={<Consultant />} />
          <Route path="*" element={<Navigate to="/home" replace={true} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
