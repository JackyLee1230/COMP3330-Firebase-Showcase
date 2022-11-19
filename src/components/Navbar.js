import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const { user, logOut } = UserAuth();
	const navigate = useNavigate();

	const handleSignOut = async () => {
		try {
			await logOut();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				backgroundColor: "grey",
				borderRadius: 4,
				justifyContent: "space-between",
			}}
		>
			<h1>Firebase ShowCase!!</h1>
			<button onClick={() => navigate("/lecture")}>Lecture</button>
			{user?.displayName ? (
				<button onClick={() => navigate("/account")}>Profile</button>
			) : null}
			{user?.displayName ? (
				<button onClick={() => navigate("/chat")}>Chat Room</button>
			) : null}
			{user?.displayName ? (
				<button onClick={handleSignOut}>Logout</button>
			) : (
				<button onClick={() => navigate("/signin")}>SignIn</button>
			)}
		</div>
	);
};

export default Navbar;
