import { useEffect, useState } from "react";
import io from "socket.io-client";
const useSockets = () => {
  const url = process.env.REACT_APP_BASE_URL;
  const [socket, setSocket] = useState();
  const user = window.localStorage.getItem("user");
  useEffect(() => {
    if (user) {
      user !== "null" &&
        setSocket(io(`${url}?token=${JSON.parse(user).tokens.token}`));
    }
  }, []);

  const initSocketFromLogin = (token) => {
    setSocket(io(`${url}?token=${token}`));
  };
  socket?.on("subscribed", (msg) => console.log(msg));
  return {
    socket, //with this socket exported you will have access to it anywhere u want to make use of UNICONTEXT, please do not try to import this hook anywhere else
    initSocketFromLogin,
  };
};

export default useSockets;
