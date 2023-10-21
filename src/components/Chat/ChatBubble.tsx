/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material'
import { css } from '@emotion/react'

const bubbleMessage = css`
  max-width: 255px;
  word-wrap: break-word;
  margin-bottom: 12px;
  line-height: 24px;
  position: relative;
  padding: 10px 20px;
  border-radius: 25px;

  &:before, &:after {
    content: "";
    position: absolute;
    bottom: 0;
    height: 20px;
  }
`;

const bubbleTypes = {
  "sent": css`
    color: white; 
    background: #0B93F6;
    align-self: flex-end;
      
    &:before {
      right: -7px;
      width: 20px;
      background-color: #0B93F6;
      border-bottom-left-radius: 16px 14px;
    }

    &:after {
      right: -26px;
      width: 26px;
      background-color: white;
      border-bottom-left-radius: 10px;
    }
  `,
  "received": css`
    background: #E5E5EA;
    color: black;
    align-self: flex-start;
      
    &:before {
      left: -7px;
      width: 20px;
      background-color: #E5E5EA;
      border-bottom-right-radius: 16px 14px;
    }

    &:after {
      left: -26px;
      width: 26px;
      background-color: white;
      border-bottom-right-radius: 10px;
    }
  `
};

const ChatBubble = ({ type, message }) => {
  return (
    <Typography css={[bubbleMessage, bubbleTypes[type]]}>{message}</Typography>
  )
}

export default ChatBubble;