import React, { useEffect, useState } from "react";
import { addNotification } from "../Redux/Slices/NotificationSlice";
import { useDispatch } from "react-redux";

const Timer = ({ estimatedTime, create_at, setState, order_id }) => {
  const [timeLeft, setTimeLeft] = useState(estimatedTime);
  const dispatch = useDispatch();

  // set the timer to its previous state
  useEffect(() => {
    const create = new Date(create_at);
    const now = new Date();

    const createHour = create.getHours();
    const createMinut = create.getMinutes();
    const createSecond = create.getSeconds();

    const nowDay = now.getDay();

    const hourNow = now.getHours();
    const minutNow = now.getMinutes();
    const secondsNow = now.getSeconds();

    const diffHours = hourNow - createHour;
    const diffMinuts = createMinut - minutNow;
    const diffSecond = createSecond - secondsNow;

    console.log(diffHours, diffMinuts, diffSecond);

    // Estimated Time
    const estimatedArr = estimatedTime.split(":");
    const estimated = new Date();
    estimated.setHours(estimatedArr[0], estimatedArr[1], estimatedArr[2]);

    const day = estimated.getDay();

    let estimatedHour = +estimatedArr[0];
    let estimatedMinuts = +estimatedArr[1];
    let estimatedSecond = +estimatedArr[2];

    const estimatedTimeInSeconds =
      +estimatedHour * 3600 + estimatedMinuts * 60 + estimatedSecond;

    const differentInSeconds =
      Math.abs(diffHours) * 3600 +
      Math.abs(diffMinuts) * 60 +
      Math.abs(diffSecond);

    console.log(estimatedTimeInSeconds - differentInSeconds);

    estimatedHour = +estimatedHour - Math.abs(diffHours);
    estimatedMinuts = +estimatedMinuts - Math.abs(diffMinuts);
    estimatedSecond = +estimatedSecond - Math.abs(diffSecond);

    console.log(estimatedHour, estimatedMinuts, estimatedSecond);

    if (estimatedTimeInSeconds - differentInSeconds < 0) {
      setTimeLeft("00:00:00");
      setState(3);
    } else {
      const startFrom = convertSecondsToTime(
        estimatedTimeInSeconds - differentInSeconds
      );

      setTimeLeft(startFrom);
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

function convertSecondsToTime(given_seconds) {
  const hours = Math.floor(given_seconds / 3600);
  const minutes = Math.floor((given_seconds - hours * 3600) / 60);
  const seconds = given_seconds - hours * 3600 - minutes * 60;

  const hoursString = hours.toString().padStart(2, "0");
  const minutesString = minutes.toString().padStart(2, "0");
  const secondsString = seconds.toString().padStart(2, "0");

  return `${hoursString}:${minutesString}:${secondsString}`;
}
