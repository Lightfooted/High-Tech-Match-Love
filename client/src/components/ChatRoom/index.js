import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import firebase from '../Firebase';

function ChatRoom() {

	const [chats, setChats] = useState([]);
	const [users, setUsers] = useState([]);
	const [moniker, setMoniker] = useState('');
	const [chatname, setChatname] = useState('');
	const [newchat, setNewchat] = useState({ chatname: '', moniker: '', message: '', date: '', type: '' });
	const history = useHistory();
	const { room } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			setMoniker(localStorage.getItem('moniker'));
			setChatname(room);
			firebase.database().ref('chats/').orderByChild('chatname').equalTo(chatname).on('value', response => {
			  setChats([]);
			  setChats(snapshotToArray(response));
			});
		};

		fetchData();
	}, [room, chatname]);

	useEffect(() => {
		const fetchData = async () => {
			setMoniker(localStorage.getItem('moniker'));
			setChatname(room);
			firebase.database().ref('roomusers/').orderByChild('chatname').equalTo(chatname).on('value', (otherresponse) => {
			  setUsers([]);
			  const roomusers = snapshotToArray(otherresponse);
			  setUsers(roomusers.filter(x => x.status === 'online'));
			});
		};

		fetchData();
	}, [room, chatname]);

	const snapshotToArray = (snapshot) => {
		const returnArr = [];

		snapshot.forEach((childSnapshot) => {
			const item = childSnapshot.val();
			item.key = childSnapshot.key;
			returnArr.push(item);
		});

		return returnArr;
	}

	const submitMessage = (event) => {
		event.preventDefault();
		const chat = newchat;
		chat.chatname = chatname;
		chat.moniker = moniker;
		chat.date = dayjs(new Date()).format('MMM D, YYYY h:mm A');
		chat.type = 'message';
		const newMessage = firebase.database().ref('chats/').push();
		newMessage.set(chat);
		setNewchat({ chatname: '', moniker: '', message: '', date: '', type: '' });
	};

	const onChange = (event) => {
		event.persist();
		setNewchat({...newchat, [event.target.name]: event.target.value});
	}

	const exitChat = (event) => {
		const chat = { chatname: '', moniker: '', message: '', date: '', type: '' };
		chat.chatname = chatname;
		chat.moniker = moniker;
		chat.date = dayjs(new Date()).format('MMM D, YYYY h:mm A');
		chat.message = `${moniker} has left the chat`;
		chat.type = 'exit';
		const newMessage = firebase.database().ref('chats/').push();
		newMessage.set(chat);

		firebase.database().ref('roomusers/').orderByChild('chatname').equalTo(chatname).once('value', (response) => {
		  let roomuser = [];
		  roomuser = snapshotToArray(response);
		  const user = roomuser.find(x => x.moniker === moniker);
		  if (user !== undefined) {
			const userRef = firebase.database().ref('roomusers/' + user.key);
			userRef.update({status: 'offline'});
		  }
		});

		history.goBack();
	}

	return (
			<div>
				<div>
						<div>
							<button type='button' onClick={() => { exitChat() }}>
											Leave Chat
										</button>
							{users.map((item, idx) => (
								<div key={idx}>
									<div>
										<div>{item.moniker}</div>
									</div>
							 </div>
							))}
						</div>
						<div>
							{chats.map((item, idx) => (
								<div key={idx} className='chat-box'>
									{item.type ==='join'||item.type === 'exit'?
										<div className='chat-status'>
											<span className='chat-date'>{item.date}</span>
											<span className='joined-chat-status'>{item.message}</span>
										</div>:
										<div className='sent-chat-message'>
											<div className={`${item.moniker === moniker? 'right-chat-box':'join-status'}`}>
											{item.moniker === moniker ?
												<span className='focused-user-name'>Me</span>:<span className='focused-user-name'>{item.moniker}</span>
											}
											<span className='chat-date'> at {item.date}</span>
											<p>{item.message}</p>
											</div>
										</div>
									}
								</div>
							))}
						</div>
						<footer>
							<form className='chat-form' onSubmit={submitMessage}>
								<div>
								<input type='text' name='message' id='message' placeholder='Enter chat text' value={newchat.message} onChange={onChange} />
										<button type='submit'>Send</button>
								</div>
							</form>
						</footer>
				</div>
			</div>
	);
}

export default ChatRoom;