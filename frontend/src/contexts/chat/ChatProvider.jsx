import React, { useState } from 'react';
import ChatContext from './ChatContext';


const ChatProvider = ({children, value}) => {

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}

export default ChatProvider;
