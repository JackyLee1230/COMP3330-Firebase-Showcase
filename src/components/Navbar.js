import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
	const { user, logOut } = UserAuth();

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
			{user?.displayName ? (
				<button onClick={handleSignOut}>Logout</button>
			) : (
				<Link to="/signin">Sign in</Link>
			)}
		</div>
	);
};

export default Navbar;
