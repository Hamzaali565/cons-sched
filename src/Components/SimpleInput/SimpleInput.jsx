import React from "react";

const SimpleInput = ({
  max,
  placeholder,
  type,
  onChange,
  value,
  disabled,
  checked,
  accept,
}) => {
  return (
    <div>
      <input
        type={type}
        className="text-sm w-44 rounded-xl p-1 border-2 border-gray-500 text-black"
        style={{ fontSize: "12px" }}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name=""
        maxLength={max}
        disabled={disabled}
        id=""
        checked={checked}
        accept={accept}
      />
    </div>
  );
};

export default SimpleInput;
