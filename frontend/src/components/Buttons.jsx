import React from "react";
import "./button.css";

const CustomButton = ({ children, name, addStyles, onClicked, ...rest }) => {
  return (
    <button
      id={name}
      className={"main_button " + addStyles}
      onClick={onClicked}
      {...rest}
    >
      {name}
    </button>
  );
};

export default CustomButton;
