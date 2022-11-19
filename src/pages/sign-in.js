import React, { useEffect } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signin = () => {
	const { googleRedirectSignIn, googlePopupSignIn, user } = UserAuth();
	const navigate = useNavigate();

	const handleGoogleRedirectSignIn = async () => {
		try {
			await googleRedirectSignIn();
		} catch (error) {
			console.log(error);
		}
	};

	const handleGooglePopupSignIn = async () => {
		try {
			await googlePopupSignIn();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (user != null) {
			navigate("/account");
		}
	}, [user]);

	return (
		<div>
			<h1>Sign in</h1>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					paddingHorizontal: "30%",
					alignItems: "center",
				}}
			>
				Redirect signin: <GoogleButton onClick={handleGoogleRedirectSignIn} />
				Popu Signin: <GoogleButton onClick={handleGooglePopupSignIn} />
			</div>
		</div>
	);
};

export default Signin;
