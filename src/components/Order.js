import React, { useState } from "react";
import { Box, Button, Paper, Stack } from "@mui/material";
import SubOrder from "./SubOrder";
import { request } from "../api/request";
import Timer from "./Timer";
import { green } from "@mui/material/colors";

const Order = ({ order, setStateFilter, setInfo, filterState }) => {
  const [orderState, setOrderState] = useState(order.status);

  let status = {};

  if (order.table_id == "1111") {
    status.color = "rgb(123 79 191)";
    status.state = "OUT DOOR";
  } else if (orderState === 1) {
    status.color = "#61b2e4";
    status.state = "new";
  } else if (orderState === 2) {
    status.color = "#83bf4f";
    status.state = "preparing";
  } else {
    status.color = "#dc0d28";
    status.state = "delay";
  }
  console.log(order);
  const makeOrderDone = () => {
    setInfo((prev) => {
      return { ...prev, isLoading: true };
    });
    request({
      url: `/order/ChangeToDone/${order.order_id}`,
      method: "POST",
    })
      .then((resp) => {
        console.log(resp);
        setStateFilter("new");
        setInfo((prev) => {
          return { ...prev, isLoading: false };
        });
      })
      .catch();
  };
  const makeOrderStartPreparing = () => {
    setInfo((prev) => {
      return { ...prev, isLoading: true };
    });
    request({
      url: `/order/ChangeToPrepare/${order.order_id}`,
      method: "POST",
    })
      .then((resp) => {
        console.log(resp);
        setStateFilter("onGoing");
      })
      .catch();
  };

  const deleteOrder = () => {
    setInfo((prev) => {
      return { ...prev, isLoading: true };
    });
    request({
      url: `/order/${order.order_id}`,
      method: "DELETE",
    })
      .then((resp) => {
        console.log(resp);
        setInfo((prev) => {
          return { ...prev, isLoading: false };
        });
      })
      .catch();
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <Paper
        sx={{
          padding: "1rem",
          borderRadius: "10px",
          border: `${order.isNew ? "3px solid" : "none"}`,
          borderColor: green["200"],
          boxShadow: order.isNew ? `0 2px 18px 3px ${green["300"]}` : "none",
        }}
      >
        <Stack
          p={1}
          alignItems={"center"}
          justifyContent={"space-between"}
          direction={"row"}
          gap={3}
        >
          <Box sx={{ fontWeight: "bold" }}>Table : {order.table_id}</Box>
          <Box sx={{ fontWeight: "bold" }}>Order id : {order.order_id}</Box>
          {filterState === "onGoing" && (
            <Box sx={{ fontWeight: "bold" }}>
              Timer :{" "}
              <Timer
                setState={setOrderState}
                order_id={order.order_id}
                estimatedTime={order.timer}
                create_at={order.time_start}
              />
            </Box>
          )}
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
          onClick={
            filterState === "new" ? makeOrderStartPreparing : makeOrderDone
          }
        >
          {filterState === "new" ? "start preparing" : "done"}
        </Button>
        {filterState === "new" && (
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
            onClick={deleteOrder}
          >
            Delete
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default Order;
