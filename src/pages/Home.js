import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Home = () => {
	const { user } = UserAuth();
	if (user) {
		return <Navigate to="/account" />;
	}
	return (
		<div>
			<h1>Home Page</h1>
			Please Login to test the Authentication feature And Access the Cloud
			Database, Storage, Profile and a Chatroom Built only using Firestore
		</div>
	);
};

export default Home;
