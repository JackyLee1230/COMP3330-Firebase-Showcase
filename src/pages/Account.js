import React from "react";
import { UserAuth } from "../context/AuthContext";

const Account = () => {
	const { logOut, user } = UserAuth();

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
			<div>
				<p>Welcome, {user?.displayName}</p>
				<p>Email: {user?.email}</p>
				<p>Photo: {user?.photoURL}</p>
				<p>Sign-In Provider: {user.providerData[0].providerId}</p>
				<p>Provider-specific UID: {user.providerData[0].uid}</p>
			</div>
			<button onClick={handleSignOut} className="border py-2 px-5 mt-10">
				Logout
			</button>
		</div>
	);
};

export default Account;
