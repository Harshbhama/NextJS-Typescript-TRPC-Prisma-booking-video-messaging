import { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";

const useOnlineUser = (id: string) => {

  const [socket, setSocket] = useState<any>(undefined)
  const [onlineUsers, setOnlineUsers] = useState<any>([]);
  const [flagForTrigger, setFlag] = useState(0);
  useEffect(() => {
    const socket: any = io("http://localhost:8001")
    setSocket(socket)
  },[])
  useEffect(() => {
    if(socket){
      socket.emit("connected_user", id)
    }
  },[socket])
  useEffect(() => {
    if(typeof window !== undefined){
      window.addEventListener("beforeunload", (e) => {
        socket.emit("disconnected_user", id)
      })
      return () => {
        window.removeEventListener("beforeunload", () => {});
      }
    }
  },[socket])
  useEffect(() => {
    if(socket){
      socket.on("online_users", (userId: string) => {
        setFlag(key => key<100 ? key+1: 0)
      })
      socket.on("disconnected_user_id", (userId: string) => {
        setFlag(key => key<100 ? key+1: 0)
      })
    }
  },[socket, onlineUsers])

  return {flagForTrigger}; 
}
export default useOnlineUser;