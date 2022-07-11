import { useEffect, useState } from "react";
import './SideBar.css';

const SideBar = ({socket, setRoom, contacts, allUsers}) => {
    const [roomName, setRoomName] = useState('');
    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        socket.on('roomLists', (rooms) => {
            setRoomList(rooms);
        });
    }, [roomList]);

    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value);
    };


    const handleCreateRoom = () => {
        socket.emit('join_room', roomName, (msg) => {
            setRoom(roomName);
            console.log(`inner ${msg}`);
        });
    };

    const handleJoinRoom = (e) => {
        socket.on('disconnecting', () => {
            console.log('Client : disconnect!!!');
        });

        socket.emit('join_room', e.target.value, (msg) => {
            setRoom(e.target.value);
            console.log(`inner ${msg}`);
        });
        
        // socket.emit('join_room', )
    };

    const handleSelectChatUser = (user) => {
        contacts(user);
    };

    
    return (
        <>
            <section className="side-bar">
                <div>
                    <input onChange={handleRoomNameChange} value={roomName} type="text" placeholder="input room name..." />
                    <button onClick={handleCreateRoom}>Join</button>
                </div>
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