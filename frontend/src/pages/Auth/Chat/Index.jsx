import ChatProvider from '@/contexts/chat/ChatProvider';
import Chat from './Chat';
import useFetchData from '@/hooks/useFetchData';
import { useEffect, useState } from 'react';

export default function Index() {

    const { resource } = useFetchData('chat/rooms')
    const [users,setChatUser] = useState([])
    console.log('resource',resource)
    useEffect(()=>{
        if(resource?.users){
            setChatUser([...resource?.users])
        }
    },[resource?.users])

    return (
        <ChatProvider value={{users,setChatUser}}>
            <Chat />
        </ChatProvider>
    )
}