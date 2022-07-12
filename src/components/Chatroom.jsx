import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

export default function Chatroom({chatLog, socket, chat}) {
  

  return (
    <>
      {chatLog.length > 0 && 
        chatLog.map((log, idx) => {
          return (
            <div key={idx}>
              {log.sendMessage}
            </div>
          )
        })
      }
    </>
  )
}
