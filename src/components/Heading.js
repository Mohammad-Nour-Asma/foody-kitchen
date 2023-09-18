import React from "react";
import { Typography } from "@mui/material";
const Heading = (props) => {
  return (
    <>
      <Typography
        sx={{
          fontSize: props.size,
          fontWeight: "600",
          width: "fit-content",

          position: "relative",
          padding: "0 0.5rem",
          "&:before": {
            content: "''",
            position: "absolute",
            width: props.width,
            background: "linear-gradient(to right  ,#61b2e4 ,#83bf4f)",

            height: "6px",
            top: "50%",
            transform: "translate(-100%,-50%)",
            left: "0",

            borderRadius: "10px",
          },
          "&:after": {
            content: "''",
            position: "absolute",
            width: props.width,
            background: "linear-gradient(to left ,#61b2e4 ,#83bf4f)",
            height: "6px",
            top: "50%",
            transform: "translate(100%,-50%)",
            right: "0",

            borderRadius: "10px",
          },
        }}
        m={"0  auto 1rem"}
        textAlign={"center"}
      >
        {props.children}
      </Typography>
    </>
  );
};

export default Heading;
