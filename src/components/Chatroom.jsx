import React, { useEffect } from 'react';
import { useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const bubbleAnimation = keyframes`
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
`;

const Container = styled.div`
  /* background-color: antiquewhite; */
  height: 90%;
  overflow: auto;
  padding: 0 1rem;

  &::-webkit-scrollbar {
    background-color: #e5e8eb;
    width: 0.4rem;
    border-radius: 2rem;
    &-thumb {
        background-color: #cdcdcd;
        width: 0.1rem;
        border-radius: 1rem;
    }
  }


  .chatroom-wrapper {
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .speech-bubbles {
      display: flex;
      align-items: baseline;
      /* transition: 0.5s ease-in-out; */
    }

    
    .chatroom-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #dcbdff;
    }

    .current {
      justify-content: flex-start;
      flex-direction: row-reverse;

      .chatroom-img {
        margin-left: 20px;
      }

      .chatroom-message {
        animation: ${bubbleAnimation} 0.18s linear;
        position: relative;
        border-radius: 0.5rem 0 0.5rem 0.5rem;
        padding: 10px;
        background-color: #e5e8eb;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

        &::before {
          content: "";
          width: 0px;
          height: 0px;
          position: absolute;
          border-left: 6px solid #e5e8eb;
          border-right: 6px solid transparent;
          border-top: 6px solid #e5e8eb;
          border-bottom: 6px solid transparent;
          right: -10px;
          top: 0px;
        }
      }
    }

    .chat {
      justify-content: flex-start;

      .chatroom-img {
        margin-right: 20px;
      }

      .chatroom-message {
        animation: ${bubbleAnimation} 0.18s linear;
        background-color: #7251f1;
        position: relative;
        border-radius: 0 0.5rem 0.5rem 0.5rem;
        padding: 16px;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

        &::before {
          content: "";
          width: 0px;
          height: 0px;
          position: absolute;
          border-left: 6px solid transparent;
          border-right: 6px solid #7251f1;
          border-top: 6px solid #7251f1;
          border-bottom: 6px solid transparent;
          left: -10px;
          top: 0px;
        }
      }
    }
  }
`;

export default function Chatroom({chatLog, currentUser}) {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviour: "smooth"});
  }, [chatLog]);

  return (
    <Container>
      <div className='chatroom-wrapper'>
        {
          chatLog.length > 0 && 
            chatLog.map((log, idx) => {
              return (
                <div ref={scrollRef} key={idx} className={`speech-bubbles ${log.sender === currentUser._id ? 'current' : 'chat'}`}>
                  <div className='chatroom-img'></div>
                  <div className='chatroom-message'>
                    {log.sendMessage}
                  </div>
                </div>
              )
            })
        }
      </div>
    </Container>
  )
}
