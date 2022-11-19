import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { auth, db } from "../firebase";
import { UserAuth } from "../context/AuthContext";

import { collection, addDoc, query, orderBy, limit } from "firebase/firestore";

import "./Chat.css";

function Msg(props) {
	const { text, uid, photoURL, name } = props.message;

	const messageClass = uid === auth.currentUser.uid ? "sender" : "receiver";

	return (
		<>
			<div className={`message ${messageClass}`}>
				<img
					style={{
						width: "40px",
						height: "40px",
						borderRadius: "50%",
						margin: " 2px 5px",
					}}
					alt=""
					src={photoURL || `https://ui-avatars.com/api/?name=${name}`}
				/>
				<p className={`selfsent`}>{text}</p>
			</div>
		</>
	);
}

function ChatRoom() {
	const ref = useRef();
	const messagesRef = collection(db, "messages");

	const q = query(messagesRef, orderBy("createdAt"), limit(25));

	const [messages] = useCollectionData(q, { idField: "id" });

	const [inputValue, setInputValue] = useState("");

	const sendMessage = async (e) => {
		e.preventDefault();

		const { uid, photoURL } = auth.currentUser;

		await addDoc(messagesRef, {
			text: inputValue,
			createdAt: Date.now(),
			uid,
			photoURL,
			name: auth.currentUser.displayName,
		});

		setInputValue("");
		if (ref.current) {
			ref.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<>
			<div>
				{messages &&
					messages.map((msg) => (
						<Msg key={msg.uid + String(msg.createdAt)} message={msg} />
					))}
				{/* ref to auto scroll */}
				<p ref={ref}></p>
			</div>

			<form onSubmit={sendMessage}>
				<input
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Express Yourself!"
				/>

				<button type="submit" disabled={!inputValue}>
					Send
				</button>
			</form>
		</>
	);
}

function Chat() {
	const { user } = UserAuth();
	return (
		<div>
			<ChatRoom />
		</div>
	);
}

export default Chat;
