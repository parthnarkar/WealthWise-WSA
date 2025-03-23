import React from "react";
import { Modal, Box } from "@mui/material";

const CustomModal = ({ open, handleClose, children }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ width: 400, p: 4, backgroundColor: "white", margin: "auto", mt: 10, borderRadius: 2 }}>
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
