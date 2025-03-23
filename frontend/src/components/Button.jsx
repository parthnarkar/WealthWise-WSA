import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = ({ text, onClick, variant = "contained", color = "primary" }) => {
  return (
    <MuiButton variant={variant} color={color} onClick={onClick}>
      {text}
    </MuiButton>
  );
};

export default Button;
