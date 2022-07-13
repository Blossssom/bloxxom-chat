import styled from 'styled-components';

const Container = styled.article`
    width: 30%;
    height: 100vh;
    padding: 40px 50px;
    box-sizing: border-box;

    div {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        button {
            border: none;
            cursor: pointer;
        }
    }
`;

const SideBar = ({socket, contacts, allUsers, currentUser, setRoom}) => {

    const makeRoomName = (from, to) => {
        const idList = [from._id, to._id].sort((a, b) => {if (a > b) return -1;
                                                                else if (b > a) return 1;
                                                                else return 0;
                                                            });
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
        <Container className="side-bar">
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
        </Container>
    )
};

export default SideBar;