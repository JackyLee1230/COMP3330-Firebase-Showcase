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
		</div>
	);
};

export default Home;
