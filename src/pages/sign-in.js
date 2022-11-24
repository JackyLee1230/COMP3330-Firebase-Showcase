import React, { useEffect, useState } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
	TextField,
	Button,
	InputAdornment,
	FormControl,
	IconButton,
} from "@mui/material";
import { Eye, EyeOff } from "mdi-material-ui";

const Signin = () => {
	const {
		googleRedirectSignIn,
		googlePopupSignIn,
		emailPasswordSignIn,
		emailPasswordRegister,
		facebookRedirectSignIn,
		facebookPopupSignIn,
		user,
	} = UserAuth();
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

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

	const handleFacebookRedirectSignIn = async () => {
		try {
			await facebookRedirectSignIn();
		} catch (error) {
			console.log(error);
		}
	};

	const handleFacebookPopupSignIn = async () => {
		try {
			await facebookPopupSignIn();
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
		<div
			style={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				gap: "10vh",
				padding: "1.5% 3%",
			}}
		>
			<h1>Sign In Methods Demonstrations</h1>
			<div
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "row",
					gap: "20%",
					padding: "1.5% 3%",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						borderRadius: 16,
						border: "3px solid blue",
						padding: "1.5% 3%",
						gap: "20px",
					}}
				>
					<div>
						<h1>Register</h1>
						<FormControl>
							<TextField
								variant="filled"
								label="Name"
								onChange={(e) => setName(e.target.value)}
							/>
							<TextField
								variant="filled"
								label="Email"
								type="email"
								onChange={(e) => setEmail(e.target.value)}
							/>
							<TextField
								variant="filled"
								label="Password"
								type="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</FormControl>
					</div>
					<Button
						variant="contained"
						onClick={async () => {
							await emailPasswordRegister(email, password, name);
						}}
					>
						Register Account
					</Button>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						borderRadius: 16,
						border: "3px solid blue",
						padding: "1.5% 3%",
						gap: "20px",
					}}
				>
					<div>
						<h1>Sign in</h1>
						<FormControl>
							<TextField
								variant="filled"
								label="Email"
								type="email"
								onChange={(e) => setEmail(e.target.value)}
							/>
							<TextField
								variant="filled"
								label="Password"
								type="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</FormControl>
					</div>
					<Button
						variant="contained"
						onClick={() => {
							emailPasswordSignIn(email, password);
						}}
					>
						Sign In
					</Button>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					gap: "100px",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						paddingHorizontal: "30%",
						alignItems: "center",
						gap: "10%",
						borderRadius: 16,
						border: "3px solid blue",
						padding: "1.5% 3%",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							gap: "1%",
						}}
					>
						<h4 style={{ whiteSpace: "nowrap" }}>Redirect signin:</h4>{" "}
						<GoogleButton onClick={handleGoogleRedirectSignIn} />
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							gap: "1%",
						}}
					>
						<h4 style={{ whiteSpace: "nowrap" }}>Popup Signin:</h4>{" "}
						<GoogleButton onClick={handleGooglePopupSignIn} />
					</div>
				</div>

				<div className="facebook">
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							padding: "3%",
							alignItems: "center",
							gap: "3%",
							borderRadius: 16,
							border: "3px solid blue",
							padding: "1.5% 3%",
						}}
					>
						<div style={{ display: "flex", flexDirection: "row" }}>
							FB Redirect Signin
							<Button
								variant="contained"
								onClick={handleFacebookRedirectSignIn}
							>
								FaceBook Redirect Signin
							</Button>
						</div>
						<div style={{ display: "flex", flexDirection: "row" }}>
							FB Popup Signin
							<Button variant="contained" onClick={handleFacebookPopupSignIn}>
								FaceBook Popup Signin
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signin;
