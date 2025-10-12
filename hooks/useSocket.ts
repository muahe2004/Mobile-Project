import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

export const useSocket = (userId?: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!userId) return;

        const newSocket = io(`${process.env.EXPO_PUBLIC_UNILEARN_URL}`, { transports: ["websocket"]});

        newSocket.on("connect", () => { newSocket.emit("registerUser", userId);});

        setSocket(newSocket);

        return () => {
        newSocket.disconnect();
        };
    }, [userId]);

    return socket;
};