import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

export const useSocket = (userId?: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const newSocket = io("http://192.168.0.111:3636", { transports: ["websocket"]});

    newSocket.on("connect", () => {
      console.log("✅ Socket connected:", newSocket.id);

      // FE emit đúng event backend lắng nghe
      newSocket.emit("registerUser", userId);
      console.log("👤 UserID sent to server:", userId);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  return socket;
};