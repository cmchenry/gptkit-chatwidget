import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import KeyboardReturnOutlined from '@mui/icons-material/KeyboardReturnOutlined';
import axios from 'axios';


const ChatMessage = ({ messages = [], setMessages, ...rest }) => {

    async function fetchMessage(question) {
        var bodyFormData = new FormData();
        bodyFormData.append('chat_log', mapMessagesToChatLog(question));
        
        await axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/bot',
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
        })
        .then((response) => {
            console.log(response);
            let respText = response.data;
            let respMessage = {message: respText, type: 'received'};
            setMessages((curMessages) => [...curMessages, respMessage]);
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
        
    }

    const mapMessagesToChatLog = (question) => {
        let chat_log = [];
        for (let i = 1; i < messages.length; i++) {
            if (messages[i].type === 'received'){
                chat_log.push({"role": "system", "content" : messages[i].message});
            }
            else{
                chat_log.push({"role": "user", "content": messages[i].message});
            }
        }
        chat_log.push({"role": "user", "content": question});
        //convert chat_log to string
        //if(chat_log.length > 2048){
        //    chat_log = chat_log.slice(-2049);
        //    chat_log = chat_log.slice(chat_log.indexOf("Human:"));
        //}
        return JSON.stringify(chat_log);;
    }
       
    const handleSendMessage = () => {
        const newMessage = { message: input, type: 'sent' };
        setMessages((curMessages) => [...curMessages, newMessage]);
        fetchMessage(newMessage.message);
        setInput('');
    }

    const [input, setInput] = useState('');

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          handleSendMessage();
        }
      }

    return (
        <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="input-message">Message</InputLabel>
            <Input
                id="input-message"
                type='text'
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="Send"
                            onClick={handleSendMessage}
                        >
                            <KeyboardReturnOutlined />
                        </IconButton>
                    </InputAdornment>
                }
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                value={input}
            />
        </FormControl>
    )
}

export default ChatMessage;