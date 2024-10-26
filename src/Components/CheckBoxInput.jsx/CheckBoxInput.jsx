import React from "react";
import SimpleInput from "../SimpleInput/SimpleInput";

const CheckBoxInput = ({onClick, value}) => {
  return (
    <div className="flex space-x-3 justify-center mt-4">
      <input type="checkbox" name="" id="" onClick={onClick}/>
      <SimpleInput placeholder={""} disabled={true} value={value}/>
    </div>
  );
};

export default CheckBoxInput;
