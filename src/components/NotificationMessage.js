import { Box, Typography } from "@mui/material";
import React from "react";

const NotificationMessage = ({ type, order_id }) => {
  return (
    <Box
      sx={{
        background:
          type == "delay"
            ? "rgb(223, 32, 57)"
            : type == "new"
            ? "#61b2e4"
            : type == "change"
            ? "#83bf4f"
            : "#eee",
        padding: "0.5rem ",
        borderRadius: "10px",
        marginTop: "1rem",
        color: "white",
      }}
    >
      <Typography>
        Order{" "}
        <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
          {order_id ? order_id : "#6561"}
        </span>{" "}
        {type === "delay"
          ? "Has Been Delayed"
          : type === "new"
          ? "Is New"
          : type === "change"
          ? "Have Been Changed"
          : ""}
      </Typography>
    </Box>
  );
};

export default NotificationMessage;
