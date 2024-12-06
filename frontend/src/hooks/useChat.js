import { useContext } from "react";
import ChatContext from "../contexts/chat/ChatContext";

export default function useChat(){
    const chat = useContext(ChatContext);

    return chat;
}