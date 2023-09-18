import React, { useEffect, useState } from "react";
import { addNotification } from "../Redux/Slices/NotificationSlice";
import { useDispatch } from "react-redux";

const Timer = ({ estimatedTime, create_at, setState, order_id }) => {
  const [timeLeft, setTimeLeft] = useState(estimatedTime);
  const dispatch = useDispatch();
  console.log(create_at);
  // set the timer to its previous state
  useEffect(() => {
    const create = new Date(create_at);
    const now = new Date();
    const createHour = create.getHours();
    const createMinut = create.getMinutes();
    const createSecond = create.getSeconds();

    const nowDay = now.getDay();

    now.setHours(now.getHours() - createHour);
    now.setMinutes(now.getMinutes() - createMinut);
    now.setSeconds(now.getSeconds() - createSecond);

    const diffHours = now.getHours();
    const diffMinuts = now.getMinutes();
    const diffSecond = now.getSeconds();

    // Estimated Time
    const estimatedArr = estimatedTime.split(":");
    const estimated = new Date();
    estimated.setHours(estimatedArr[0], estimatedArr[1], estimatedArr[2]);
    const day = estimated.getDay();

    if (nowDay === now.getDay()) {
      estimated.setSeconds(estimated.getSeconds() - diffSecond);
      estimated.setMinutes(estimated.getMinutes() - diffMinuts);
      estimated.setHours(estimated.getHours() - diffHours);
    }

    if (estimated.getDay() === day) {
      const startFrom = `${estimated.getHours()}:${estimated.getMinutes()}:${estimated.getSeconds()}`;

      setTimeLeft(startFrom);
    } else {
      setTimeLeft("00:00:00");
      setState(3);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const [hours, minutes, seconds] = timeLeft.split(":");
      let secondsLeft =
        Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
      if (secondsLeft > 0) {
        if (secondsLeft === 1) {
          setState(3);
          dispatch(addNotification({ order_id, type: "delay" }));
        }
        secondsLeft--;
        const formattedTimeLeft = [
          Math.floor(secondsLeft / 3600),
          Math.floor((secondsLeft % 3600) / 60),
          secondsLeft % 60,
        ]
          .map((v) => String(v).padStart(2, "0"))
          .join(":");

        setTimeLeft(formattedTimeLeft);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);
  return (
    <span
      style={{
        textDecoration: "underline",
        color: timeLeft == "00:00:00" ? "rgb(43, 191, 102)" : "",
      }}
    >
      {timeLeft}
    </span>
  );
};

export default Timer;
