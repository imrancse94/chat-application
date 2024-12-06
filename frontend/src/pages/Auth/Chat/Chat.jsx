import React, { useEffect,useRef, useState } from "react";
import useFetchData from '@/hooks/useFetchData';
import Loader from '@/components/Include/Loader';
import UserList from '@/components/UserList';
import Modal from '@/components/Include/Modal';
import useAuth from '@/hooks/useAuth';
import useChat from '@/hooks/useChat';
import useAxios from '@/hooks/useAxios';
import { removeAllCookie } from '@/helpers/token';
import { setFormatDate } from "@/helpers/date-format";
import socket from "@/helpers/socket";


const ChatList = ({ chats, onSelectChat }) => {
    const { auth } = useAuth();
    const [showModal,setShowModal] = useState(false);

    return (
        <div className="w-1/4 bg-gray-800 text-gray-100 h-full border-r border-gray-700">
            <div className="flex flex-row font-semibold p-4 bg-gray-900 border-b border-gray-700">
                <div className="flex flex-1 justify-center items-center">
                    {auth?.user?.name}
                </div>
                <div className="flex flex-1 justify-end w-full">
                    <button 
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2" 
                        onClick={()=>setShowModal(true)}
                    >
                        Create Room
                    </button>
                </div>
            </div>
             {showModal && 
                <Modal>
                    <UserList onClose={()=>setShowModal(false)}/>
                </Modal> 
            }
            <ul>
                {chats.map((chat) => (
                    chat.participants.map(ch => (
                        ch._id != auth.user._id &&
                        <li
                            key={ch._id}
                            onClick={() => onSelectChat({...ch,roomId:chat._id})}
                            className="flex items-center p-4 cursor-pointer hover:bg-gray-700 transition"
                        >
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                                {ch.name[0].toUpperCase()}
                            </div>
                            <div className="ml-4">
                                <p className="text-lg">{ch.name}</p>
                                {/* <p className="text-sm text-gray-400">Last message...</p> */}
                            </div>
                        </li>))
                )
                )}
            </ul>
        </div>
    );
};

const FileView = ({name}) => {
    const fileLink = `${import.meta.env.VITE_BASE_URL}/chat/file-download/${name}`
    return (
        <div className="flex items-start bg-gray-50 dark:bg-gray-600 rounded-xl p-2 mt-2">
            <div className="me-2 block">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
                    {name.split('/').pop()}
                </span>
            </div>
            <div className="inline-flex self-center items-center">
            <a
                href={fileLink}
                    className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600"
                    type="button"
                >
                    <svg
                        className="w-4 h-4 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                        <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                    </svg>
                </a>
            </div>
        </div>
    )
}

const ChatBubble = ({ message, name, time, sentByMe, file }) => {

    const cls = sentByMe ? 'right-chat' : 'left-chat'
    console.log('time',time)

    return (
        <div className={cls}>
            <div className="flex flex-col gap-1 w-full max-w-[320px]">
                <div className={`flex items-center space-x-2 rtl:space-x-reverse justify-start`}>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {name}
                    </span>
                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                        {setFormatDate(time, 'h:i A')}
                    </span>
                </div>
                <div className={`flex flex-col leading-1.5 p-4 border-gray-200 ${sentByMe ? 'bg-blue-300' : 'bg-gray-100'} rounded-e-xl rounded-es-xl dark:bg-gray-700`}>
                    <p className="text-sm font-normal text-gray-900 dark:text-white">
                        {message}
                    </p>
                    {file && <FileView name={file} />}

                </div>
            </div>
        </div>

    )
}


const Attachment = ({remove,name}) => (
    <div className="flex bg-white absolute bottom-[90px] m-1 rounded-md">
    <div className="grid gap-1 p-3 rounded-md shadow-2xl bg-gray-400">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="grid gap-1">
            <h4 className="text-gray-900 text-sm font-normal leading-snug">
              {name}
            </h4>
          </div>
        </div>
       <div onClick={remove} className="cursor-pointer">
       <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
        >
          <g id="Upload 3">
            <path
              id="icon"
              d="M15 9L12 12M12 12L9 15M12 12L9 9M12 12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="#D1D5DB"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </g>
        </svg>
       </div>
      </div>
    </div>
    </div>
)

const AttachmentIcon = ({ size = 24, color = 'black' }) => (
    <svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z"
    fill="black"
  />
</svg>


  );
  
const ChatDetails = ({ roomId, messages, onSendMessage, onUploadAttachment,children }) => {

    const [message, setMessage] = useState("");

    const { auth } = useAuth();
    const data = useChat();
    const messagesEndRef = useRef(null);

    const users = data?.users || [];

    const findNameBySenderId = (sender_id) => {
        let name = "";
        users.map(user => {
            const userObj = user.participants.find(u => u._id == sender_id);

            if (userObj?.name) {
                name = userObj.name;
            }
        })

        return name;
    }

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage({ message, roomId, sender_id: auth.user._id });
            setMessage("");
        }else{
            alert('Please input text')
        }
    };

    useEffect(()=>{
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    },[messages])

    return (
        <>
            {/* Chat Messages */}
            <div className="flex-grow p-4 bg-white overflow-y-auto" ref={messagesEndRef}>
                {messages.map((msg, idx) => (
                    <ChatBubble
                        key={idx}
                        file={msg.file}
                        time={msg.timestamp}
                        message={msg.text}
                        name={msg.sender_id == auth.user._id ? auth.user.name : findNameBySenderId(msg.sender_id)}
                        sentByMe={msg.sender_id == auth.user._id}
                    />
                ))}
                {/* <div ref={messagesEndRef}></div> */}
                
            </div>

            {/* Input Box */}
            
            <div className="relative">
            {children}
                
            <div className="p-4 bg-gray-300 shadow-md flex items-center border-t border-gray-700 gap-3">
                {/* Attachment Upload */}
                <label
                    htmlFor="attachment"
                    className="cursor-pointer text-gray-400 hover:text-gray-100 transition"
                >
                   <AttachmentIcon/>
                    <input
                        type="file"
                        id="attachment"
                        onChange={onUploadAttachment}
                        className="hidden"
                    />
                </label>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-grow px-4 py-4 rounded-lg text-black bg-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
               
                <button
                    onClick={handleSend}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md"
                >
                    Send
                </button>
            </div>
            </div>
        </>
    );
};

export default function Chat() {

    const [loading, setLoading] = useState(false);

    const { setAuth } = useAuth();
    const { api } = useAxios();
    const data = useChat();

    const [chats, setChat] = useState([]);

    const [attachment, setAttachment] = useState(null);

    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);


    const handleChatSelect = async ({...data}) => {
        
        const {roomId,name} = data;

        try {
            setLoading(true);
            // socket.emit('joinRoom', { roomId });
            const response = await api.get(`/chat/${roomId}`);
            setSelectedChat({roomId,name});
            setMessages(response?.data?.data?.messages || []);

        } catch (err) {
            console.log('err', err)
        } finally {
            setLoading(false)
        }

    };

    useEffect(() => {
       
        socket.on("message", (data) => {
            if(data.roomId == selectedChat?.roomId){
                setMessages((prev) => [...prev, data]);
            }
        });

        return () => {
            socket.off("message");
        };

    }, [selectedChat,messages])

    const handleSendMessage = (messageObj) => {
        const currentTime = Date.now();
        const finalObj = {
            roomId:selectedChat.roomId,
            text: messageObj.message,
            // file: messageObj?.file || "",
            timestamp: currentTime,
            sender_id: messageObj.sender_id
        }

        if(attachment){
            finalObj.fileName = attachment.name
            finalObj.fileData = attachment
        }

        socket.emit("message", finalObj);
        setAttachment(null);
    };


    const handleUploadAttachment = (event) => {
        const file = event.target.files[0];
        const maxSizeInBytes = 1 * 1024 * 1024; // 1MB

        if (file) {
            
            if (file.size > maxSizeInBytes) {
                alert('File size exceeds 1MB. Please select a smaller file.')
                return;
            }

            setAttachment(file)
        }
    };

    const handleAttachmentRemove = () => {
        // setMessages([...messages]);
        setAttachment(null)
    }

    const logout = () => {
        setAuth({});
        removeAllCookie()
    }




    useEffect(() => {

        if (data?.users?.length > 0) {
            setChat([...data.users])
        }

    }, [data?.users?.length])

    return (
        <div className="h-screen flex bg-gray-900 text-white">
            {
                loading && <Loader />
            }
           
            {/* Chat List Sidebar */}
            <ChatList chats={chats} onSelectChat={handleChatSelect} />

            {/* Chat Details */}
            <div className="flex-grow">
                <div className="flex flex-col h-full">
                    <div className="flex flex-row bg-gray-300 p-1.5 shadow-lg">
                        <div className="flex flex-1 justify-start">
                            <h1 className="text-xl text-gray-800 self-center px-2">{selectedChat?.name}</h1>
                        </div>
                        <div className="flex flex-1 justify-end">
                            <button className="default-btn" onClick={logout}>Logout</button>
                        </div>
                    </div>
                    {selectedChat ? (
                        <ChatDetails
                            roomId={selectedChat.roomId}
                            messages={messages}
                            onSendMessage={handleSendMessage}
                            onUploadAttachment={handleUploadAttachment}
                        >
                           {attachment && <Attachment name={attachment.name} remove={handleAttachmentRemove} />} 
                        </ChatDetails>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">
                            Select a chat to start messaging
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}