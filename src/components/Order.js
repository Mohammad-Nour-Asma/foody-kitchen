import React, { useState } from "react";
import { Box, Button, Paper, Stack } from "@mui/material";
import SubOrder from "./SubOrder";
import Timer from "./Timer";
import { request } from "../api/request";
// import Timer from "./Timer";

const Order = ({ order }) => {
  const [state, setState] = useState(order.status);
  let status = {};
  if (state === 1) {
    status.color = "#61b2e4";
    status.state = "new";
  } else if (state === 2) {
    status.color = "#83bf4f";
    status.state = "change";
  } else {
    status.color = "#dc0d28";
    status.state = "delay";
  }

  const makeOrderStartPreparing = () => {
    request({
      url: `/order/ChangeToPrepare/${order.order_id}`,
      method: "POST",
    })
      .then((resp) => {
        console.log(resp);
      })
      .catch();
  };
  return (
    <Box sx={{ padding: "1rem" }}>
      <Paper sx={{ padding: "1rem", borderRadius: "10px" }}>
        <Stack
          p={1}
          alignItems={"center"}
          justifyContent={"space-between"}
          direction={"row"}
          gap={3}
        >
          <Box sx={{ fontWeight: "bold" }}>Table : {order.table_id}</Box>
          <Box sx={{ fontWeight: "bold" }}>Order id : {order.order_id}</Box>
          <Box sx={{ fontWeight: "bold" }}>
            Timer :{" "}
            <Timer
              setState={setState}
              order_id={order.order_id}
              seconds={150000}
            />
          </Box>
        </Stack>
        <Stack
          flexWrap={"wrap"}
          p={1}
          gap={2}
          alignItems={"center"}
          justifyContent={"space-between"}
          direction={"row"}
        >
          <Box
            sx={{
              background: status.color,
              padding: "0.5rem 4rem",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "0.5rem",
            }}
          >
            {status.state}
          </Box>
          <Box sx={{ fontWeight: "bold" }}>
            Order time :{" "}
            <span style={{ color: "#c4c4c4" }}>{order.order_time}</span>
          </Box>
        </Stack>
        {order.subOrders.map((item, index) => {
          return <SubOrder color={status.color} key={index} subOrder={item} />;
        })}
      </Paper>
      <Stack gap={2} direction={"row"}>
        <Button
          style={{
            color: "#fff",
            fontWeight: "bold",
            backgroundColor: status.color,
            width: "100%",
            outline: "none",
            border: "none",
            padding: "0.7rem ",
            margin: "1rem 0  0",
            borderRadius: "5px",
            transition: "0.2s",
          }}
          onClick={makeOrderStartPreparing}
        >
          Ok
        </Button>
        <Button
          variant="error"
          style={{
            color: "#fff",
            fontWeight: "bold",
            backgroundColor: "rgb(255, 77, 100)",
            width: "100%",
            outline: "none",
            border: "none",
            padding: "0.7rem ",
            margin: "1rem 0  0",
            borderRadius: "5px",
            transition: "0.2s",
          }}
        >
          Delete
        </Button>
      </Stack>
    </Box>
  );
};

export default Order;
