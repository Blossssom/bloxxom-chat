import { useEffect, useState } from "react";
import './SideBar.css';

const SideBar = ({socket, contacts, allUsers, currentUser, setRoom}) => {

    const makeRoomName = (from, to) => {
        const idList = [from._id, to._id].sort((a, b) => a - b);
        const roomName = idList.join('');
        return roomName;
    };
   

    const handleJoinRoom = (user) => {
        const joinRoom = makeRoomName(currentUser, user);
        setRoom(joinRoom);
        socket.on('disconnecting', () => {
            console.log('Client : disconnect!!!');
        });

        socket.emit('join_room', joinRoom);
    };

    const handleSelectChatUser = (user) => {
        contacts(user);
        handleJoinRoom(user);
    };

    
    return (
        <>
            <section className="side-bar">
                <div className="side-bar__userlist">
                {
                    allUsers.map((users, idx) => {
                        return (
                                <button key={idx} onClick={() => handleSelectChatUser(users)}>
                                    <h3>{users.username}</h3>
                                    <span>{users.nickname}</span>
                                </button>
                        )
                    })
                }
                </div>
            </section>
        </>
    )
};

export default SideBar;