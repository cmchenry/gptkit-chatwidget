/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect} from 'react'
import { css } from '@emotion/react'
import { Box } from '@mui/material'
import ChatBubble from './ChatBubble'
import ChatMessage from './ChatMessage'


const messageBox = css`
    background-color: #fff;
    border-bottom: 1px solid #e5e5ea;
    display: flex;
    flex-direction: column;
    font-family: "SanFrancisco";
    font-size: 1.25rem;
    padding: 15px 15px;
    max-width: 275px;
    max-height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative
`;

const entryBox = css`
    background-color: #fff;
    border-top: 1px solid #e5e5ea;
    font-family: "SanFrancisco";
    font-size: 1.25rem;
    padding: 5px 15px 15px 15px;
    
`;

const ChatCanvas = () => {
    const [messages, setMessages] = useState([{ message: 'Hello, how can I help you today?', type: 'received' }]);

    const messagesEndRef = useRef();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }
    
      useEffect(() => {
        scrollToBottom()
      }, [messages]);

    return (
        <Box>
            
                <Box css={messageBox}>
                    {messages.map((m, i) => <ChatBubble message={m.message} type={m.type} key={i}/>)}
                    <div ref={messagesEndRef} />
                </Box>
                <Box css={entryBox}>
                    <ChatMessage messages={messages} setMessages={setMessages} />
                </Box>
        </Box>
    )
}

export default ChatCanvas