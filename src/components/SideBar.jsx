import { useEffect, useState } from "react";
import './SideBar.css';

const SideBar = ({socket, setRoom}) => {
    const [roomName, setRoomName] = useState('');
    const [nickName, setNickName] = useState('');
    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        socket.on('roomLists', (rooms) => {
            console.log(rooms);
            setRoomList(rooms);
        });
    }, [roomList]);

    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value);
    };

    const handleNickNameChange = (e) => {
        setNickName(e.target.value);
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

    const handleSaveNickName = () => {
        socket.emit('set_nickname', nickName);
    };
    
    return (
        <>
            <section className="side-bar">
                <div>
                    <input onChange={handleNickNameChange} value={nickName} type="text" placeholder="input nickname" />
                    <button onClick={handleSaveNickName}>Save</button>
                </div>
                <div>
                    <input onChange={handleRoomNameChange} value={roomName} type="text" placeholder="input room name..." />
                    <button onClick={handleCreateRoom}>Join</button>
                </div>
                {
                    roomList.map(room => {
                        return <div key={room.id}>
                                    <button onClick={handleJoinRoom} value={room.name}>{room.name}</button>
                                </div>
                    })
                }
            </section>
        </>
    )
};

export default SideBar;