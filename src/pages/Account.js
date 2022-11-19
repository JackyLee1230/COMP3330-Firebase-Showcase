import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Account = () => {
	const { logOut, user } = UserAuth();
	const navigate = useNavigate();

	const handleSignOut = async () => {
		try {
			await logOut();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h1>Account</h1>
			<div style={{ color: "#333333" }}>
				<p>Welcome, {user?.displayName}</p>
				<p>Email: {user?.email}</p>
				<p>Photo: {user?.photoURL}</p>
				<p>
					Sign-In Provider:{" "}
					{(user &&
						user?.providerData &&
						user?.providerData[0] &&
						user?.providerData[0]?.providerId) ??
						0}
				</p>
				<p>
					Provider-specific UID:{" "}
					{(user &&
						user?.providerData &&
						user?.providerData[0] &&
						user?.providerData[0]?.uid) ??
						0}
				</p>
			</div>
			<button onClick={handleSignOut} className="border py-2 px-5 mt-10">
				Logout
			</button>

			<button
				onClick={() => {
					navigate("/chat");
				}}
			>
				Go To Chat Room
			</button>
		</div>
	);
};

export default Account;
