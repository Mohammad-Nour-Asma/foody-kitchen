import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Heading from "./Heading";
import { IoNotifications } from "react-icons/io5";
import NotificationMessage from "./NotificationMessage";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../Redux/Slices/NotificationSlice";
const Notifications = () => {
  const [open, setOpen] = useState(false);
  const notifications = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        height: "87vh",
        position: "fixed",
        top: "0",
        // left: open ? "8px" : "-100%",
        left: 0,
        transform: `translateX(${open ? "8px" : "-100%"})`,
        background: "transparent",
        backdropFilter: "blur(10px)",
        width: "200PX",
        zIndex: "100",
        padding: "1rem",
        boxShadow: "2px 0 21px 1px #df20398a",
        borderRadius: "35px",
        margin: "1rem 0",
        transition: "0.5s",
      }}
      className={"notification"}
    >
      <button
        style={{
          borderRadius: "0px 10px 10px 0",
          border: "2px solid",
          borderColor: "rgb(255 57 82)",
          position: "absolute",
          color: "rgb(255 57 82)",
          right: "0",
          transform: "translateX(100%)",
          bottom: "50px",
          cursor: "pointer",
          padding: "0.2rem",
          background: "transparent",
          backdropFilter: "blur(10px)",
          transition: "0.3s",
        }}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <IoNotifications
          style={{
            fontSize: "1.5rem",
            animation:
              notifications.noti.length > 0
                ? " notification 0.3s infinite"
                : "",
          }}
        />
      </button>

      <Heading width={"20%"} size={"1rem"}>
        Notifications
      </Heading>
      <Box
        sx={{
          overflowY: "auto",
          height: "80vh",
          padding: "0.5rem",
        }}
      >
        {notifications.noti.map((item) => {
          return (
            <NotificationMessage
              order_id={item.order_id}
              type={item.type}
            ></NotificationMessage>
          );
        })}
        {notifications.noti.length > 0 ? (
          <button
            style={{
              marginTop: "2rem",
              border: "none",
              border: "1px solid rgb(226, 0, 29)",
              background: "rgb(255 77 100)",
              color: "white",
              padding: " 0.5rem 0.8rem",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "0.4s",
              fontSize: "0.8rem",
            }}
            onClick={() => {
              dispatch(clear());
              setOpen(false);
            }}
          >
            Clear Notification
          </button>
        ) : (
          <Typography>There Is No Notification</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Notifications;
