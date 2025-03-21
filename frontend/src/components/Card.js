import React from "react";
import { Card as MuiCard, CardContent, Typography } from "@mui/material";

const Card = ({ title, content }) => {
  return (
    <MuiCard sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography>{content}</Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
