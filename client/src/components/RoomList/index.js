import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import firebase from '../Firebase';

function RoomList() {

    const [room, setRoom] = useState([]);
    const [moniker, setMoniker] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            setMoniker(localStorage.getItem('moniker'));
            firebase.database().ref('rooms/').on('value', response => {
                setRoom([]);
                setRoom(snapshotToArray(response));
            });
        };
      
        fetchData();
    }, []);

    const snapshotToArray = (snapshot) => {
        const returnArr = [];

        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });

        return returnArr;
    }

    const enterChatRoom = (chatname) => {
        const chat = { chatname: '', moniker: '', message: '', date: '', type: '' };
        chat.chatname = chatname;
        chat.moniker = moniker;
        chat.date = dayjs(new Date()).format('MMM D, YYYY h:mm A');
        chat.message = `${moniker} has joined the chat`;
        chat.type = 'join';
        const newMessage = firebase.database().ref('chats/').push();
        newMessage.set(chat);

        firebase.database().ref('roomusers/').orderByChild('chatname').equalTo(chatname).on('value', (response) => {
            let roomuser = [];
            roomuser = snapshotToArray(response);
            const user = roomuser.find(x => x.moniker === moniker);
            if (user !== undefined) {
              const userRef = firebase.database().ref('roomusers/' + user.key);
              userRef.update({status: 'online'});
            } else {
              const newchatroomuser = { chatname: '', moniker: '', status: '' };
              newchatroomuser.chatname = chatname;
              newchatroomuser.moniker = moniker;
              newchatroomuser.status = 'online';
              const newChatRoomUser = firebase.database().ref('roomusers/').push();
              newChatRoomUser.set(newchatroomuser);
            }
        });
    
        history.push('/chatroom/' + chatname);
    }

    const logout = () => {
        localStorage.removeItem('moniker');
        history.push('/chat'); // This was originally redirecting to the main sites login/signup page when the user removes themselves from roomlist. We didn't want that. It now redirects to chat login.
    }

    return (
        <div>
            <main>
                <h3>{moniker} <button onClick={() => { logout() }}>Logout</button></h3>
                <h2>Available Chat Rooms</h2>
                <div>
                    <Link to='/createroom'>Create Chat Room</Link>
                </div>
                <div>
                    {room.map((item, idx) => (
                        <div key={idx} action onClick={() => { enterChatRoom(item.chatname) }}>{item.chatname}</div>
                    ))}
                </div>
            </main>
        </div>
    );

}

export default RoomList;