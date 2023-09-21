import { Box, Grid, Stack } from "@mui/material";
import Pusher from "pusher-js";
import Order from "../components/Order";
import Heading from "../components/Heading";
import { useEffect, useState } from "react";
import Notifications from "../components/Notifications";
import Timer from "../components/Timer";
import { request } from "../api/request";
import Loader from "../components/loader/loader";
import { useDispatch } from "react-redux";
import { addNotification } from "../Redux/Slices/NotificationSlice";
import { useErrorBoundary } from "react-error-boundary";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const Orders = () => {
  const [state, setState] = useState("new");
  const { showBoundary } = useErrorBoundary();
  const [info, setInfo] = useState({
    isLoading: false,
    isError: false,
    orders: [],
  });
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const dispatch = useDispatch();

  const getOrders = () => {
    let api = "";
    if (state === "new") api = "/orders/kitchen/1";
    else if (state === "onGoing") api = "/getToDone/1";
    setInfo((prev) => {
      return { ...prev, isLoading: true };
    });
    request({ url: api })
      .then((resp) => {
        setInfo((prev) => {
          return { ...prev, isLoading: false, orders: resp.data.data };
        });
      })
      .catch((error) => {
        showBoundary(error);
      });
  };

  useEffect(() => {
    getOrders();
  }, [state]);

  // New Orders realtime
  useEffect(() => {
    const pusher = new Pusher("897190819c4cec71fdc0", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("order.1");

    channel.bind("newOrder", (data) => {
      dispatch(addNotification({ order_id: data.order.id, type: "new" }));
      const order = data;
      order.order.isNew = true;

      console.log(order, info.orders, "TAGBEGVSDGVDFSGADFGD");
      setInfo((prev) => {
        return { ...prev, orders: [order.order, ...prev.orders] };
      });
    });

    return () => {
      channel.unbind();
      pusher.disconnect();
    };
  }, []);
  console.log(info.orders);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: "1rem 0.5rem",
      }}
    >
      <Notifications />
      <Heading width={"30%"} size={"1.8rem"}>
        Orders
      </Heading>
      <Typography
        sx={{
          position: "relative",
          textAlign: "right",
          fontSize: "0.8rem",
          fontWeight: "bold",
          textDecoration: "underline",
          cursor: "pointer",
          padding: "0 1rem",
          width: "fit-content",
          margin: "0 0 0 auto ",
        }}
        onClick={logoutHandler}
      >
        Logout{" "}
        <LogoutIcon
          style={{ fontSize: "0.8rem", top: "3px", position: "relative" }}
        />
      </Typography>
      <Stack
        sx={{
          border: "3px solid rgb(226 0 29)",
          width: "fit-content",
          borderRadius: "30px",
          margin: "1.5rem auto 0",
        }}
        justifyContent={"center"}
        direction={"row"}
      >
        <button
          onClick={() => {
            setState("onGoing");
          }}
          style={{
            border: "1px solid",
            outline: "none",
            padding: "0.6rem 1.8rem",
            borderRadius: "20px",
            cursor: "pointer",
            background: state === "onGoing" ? "rgb(223 32 57)" : "#eee",
            color: state === "onGoing" ? "White" : "black",
            borderColor: state === "onGoing" ? "rgb(226 0 29)" : "transparent",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Ongoing
        </button>
        <button
          onClick={() => {
            setState("new");
          }}
          style={{
            border: "1px solid",
            outline: "none",
            padding: "0.6rem 1.8rem",
            borderRadius: "20px",
            cursor: "pointer",
            background: state === "new" ? "rgb(223 32 57)" : "#eee",
            color: state === "new" ? "White" : "black",
            borderColor: state === "new" ? "rgb(226 0 29)" : "transparent",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          New
        </button>
      </Stack>
      {info.isLoading ? (
        <Loader />
      ) : (
        <Grid justifyContent={"start"} container>
          {info?.orders?.map((order1) => {
            console.log(order1, " order");
            const order = {
              table_id: order1.table.table_num,
              isNew: order1.isNew,
              order_id: order1.id,
              timer: order1.estimatedForOrder,
              status: order1.status,
              order_time: order1.created_at,
              time_start: order1.time_start,
              subOrders: order1.products.map((item) => {
                return {
                  name: item.name,
                  amount: item.qty,
                  note: item.note,
                  ingre: item.extra.map((ingredient) => {
                    return { name: ingredient.name };
                  }),
                };
              }),
            };
            return (
              <Grid item md={6} sm={12} xs={12}>
                <Order
                  setInfo={setInfo}
                  setStateFilter={setState}
                  filterState={state}
                  order={order}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default Orders;
