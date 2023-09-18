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
import { Route, Routes } from "react-router-dom";
import Orders from "./Pages/Orders";
import Login from "./Pages/Login";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Box>
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Box>
    </ErrorBoundary>
  );
}

export default App;
