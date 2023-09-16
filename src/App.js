import "./App.css";
import { Box, Grid, Stack } from "@mui/material";
import Pusher from "pusher-js";
import Order from "./components/Order";
import Heading from "./components/Heading";
import { useEffect, useState } from "react";
import Notifications from "./components/Notifications";
import Timer from "./components/Timer";
import { request } from "./api/request";
import Loader from "./components/loader/loader";
import { useDispatch } from "react-redux";
import { addNotification } from "./Redux/Slices/NotificationSlice";

function App() {
  const order = {
    table_id: 1,
    order_id: "#2165",
    timer: "12Min",
    status: "new",
    order_time: "12:00 pm",
    subOrders: [
      {
        name: "Burger mac beef",
        amount: "3",
        note: "lorem ipsum ukiwn ont in ioqn ",
        ingre: [
          { name: "tomatto", amount: "3" },
          { name: "bannan", amount: "3" },
          { name: "chess", amount: "5 " },
        ],
        delete_ingre: ["first", "chess", "ssn"],
      },
      {
        name: "Salade",
        amount: "2",
        note: "lorem ipsum ukiwn ont in ioqn ",
        ingre: [
          { name: "tomatto", amount: "3" },
          { name: "bannan", amount: "3" },
          { name: "chess", amount: "5 " },
        ],
        delete_ingre: ["first", "chess", "ssn"],
      },
    ],
  };
  const order1 = {
    table_id: 1,
    order_id: "#2165",
    timer: "12Min",
    status: "change",
    order_time: "12:00 pm",
    subOrders: [
      {
        name: "Burger mac beef",
        amount: "3",
        note: "lorem ipsum ukiwn ont in ioqn ",
        ingre: [
          { name: "tomatto", amount: "3" },
          { name: "bannan", amount: "3" },
          { name: "chess", amount: "5 " },
        ],
        delete_ingre: ["first", "chess", "ssn"],
      },
      {
        name: "Salade",
        amount: "2",
        note: "lorem ipsum ukiwn ont in ioqn ",
        ingre: [
          { name: "tomatto", amount: "3" },
          { name: "bannan", amount: "3" },
          { name: "chess", amount: "5 " },
        ],
        delete_ingre: ["first", "chess", "ssn"],
      },
      {
        name: "Salade",
        amount: "2",
        note: "lorem ipsum ukiwn ont in ioqn ",
        ingre: [
          { name: "tomatto", amount: "3" },
          { name: "bannan", amount: "3" },
          { name: "chess", amount: "5 " },
        ],
        delete_ingre: ["first", "chess", "ssn"],
      },
    ],
  };

  const [state, setState] = useState("new");
  const [info, setInfo] = useState({
    isLoading: false,
    isError: false,
    orders: [],
  });

  const dispatch = useDispatch();

  const getOrders = () => {
    setInfo((prev) => {
      return { ...prev, isLoading: true };
    });
    request({ url: "/orders/kitchen" })
      .then((resp) => {
        setInfo((prev) => {
          return { ...prev, isLoading: false, orders: resp.data.data };
        });
      })
      .catch((err) => {
        setInfo((prev) => {
          return { ...prev, isLoading: false, isError: true };
        });
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  // New Orders realtime
  useEffect(() => {
    const pusher = new Pusher("897190819c4cec71fdc0", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("order");

    channel.bind("newOrder", (data) => {
      console.log(data.order, "TAGBEGVSDGVDFSGADFGD");
      dispatch(addNotification({ order_id: data.order.id, type: "new" }));
      // const order = data.Kitchen;
      // order.table = { table_num: order.table_id };
      // order.isNew = true;
      // setInfo((prev) => {
      //   return { ...prev, orders: [order, ...prev.orders] };
      // });
    });

    return () => {
      channel.unbind();
      pusher.disconnect();
    };
  }, []);

  if (info.isLoading) {
    return <Loader />;
  }

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
            setState("ongoing");
          }}
          style={{
            border: "1px solid",
            outline: "none",
            padding: "0.6rem 1.8rem",
            borderRadius: "20px",
            cursor: "pointer",
            background: state === "ongoing" ? "rgb(223 32 57)" : "#eee",
            color: state === "ongoing" ? "White" : "black",
            borderColor: state === "ongoing" ? "rgb(226 0 29)" : "transparent",
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
      <Grid justifyContent={"start"} container>
        {info?.orders?.map((order1) => {
          const order = {
            table_id: order1.table.table_num,
            order_id: order1.id,
            timer: order1.time,
            status: order1.status,
            order_time: "not returned",
            subOrders: order1.products.map((item) => {
              return {
                name: item.name,
                amount: item.qty,
                note: "lorem ipsum ukiwn ont in ioqn ",
                ingre: item.extra.map((ingredient) => {
                  return { name: ingredient.name };
                }),
              };
            }),
          };
          return (
            <Grid item md={6} sm={12} xs={12}>
              <Order order={order} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default App;
