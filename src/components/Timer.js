import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "../Redux/Slices/NotificationSlice";

const Timer = ({ seconds, order_id, setState }) => {
  const [time, setTime] = useState(seconds);

  const dispatch = useDispatch();

  useEffect(() => {
    let intervalId;
    if (time > 0) {
      intervalId = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
      dispatch(addNotification({ order_id, type: "delay" }));
      setState("delay");
    }

    // Clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [time]);

  const minutes = Math.floor(time / 60);
  let newseconds = time;
  if (time > 60) {
    newseconds = time % 60;
  }
  return (
    <div
      style={{
        color: time === 0 ? "red" : "#c4c4c4",
        textDecoration: "underline",
        fontWeight: "bold",
        display: "inline-block",
      }}
    >
      {minutes < 10 ? "0" : ""}
      {minutes}:{newseconds < 10 ? "0" : ""}
      {newseconds}
    </div>
  );
};

export default Timer;
