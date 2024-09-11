import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Consultant from "./Screens/Setups/Consultant/Consultant";
import ConsultantSchedule from "./Screens/Setups/Consultant/ConsultantSchedule";

function App() {
  return (
    <div>
      {/* <Consultant /> */}
      <ConsultantSchedule />
    </div>
  );
}

export default App;
