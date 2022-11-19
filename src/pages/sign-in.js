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
		<div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					gap: "20%",
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
							// endAdornment={
							// 	<InputAdornment position="end">
							// 		<IconButton
							// 			aria-label="toggle password visibility"
							// 			onClick={() => setShowPassword((prev) => !prev)}
							// 			onMouseDown={(e) => e.preventDefault()}
							// 			edge="end"
							// 		>
							// 			{showPassword ? <EyeOff /> : <Eye />}
							// 		</IconButton>
							// 	</InputAdornment>
							// }
						/>
					</FormControl>
					<Button
						variant="contained"
						onClick={async () => {
							await emailPasswordRegister(email, password, name);
						}}
					>
						Register Account
					</Button>
				</div>
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
							// endAdornment={
							// 	<InputAdornment position="end">
							// 		<IconButton
							// 			aria-label="toggle password visibility"
							// 			onClick={() => setShowPassword((prev) => !prev)}
							// 			onMouseDown={(e) => e.preventDefault()}
							// 			edge="end"
							// 		>
							// 			{showPassword ? <EyeOff /> : <Eye />}
							// 		</IconButton>
							// 	</InputAdornment>
							// }
						/>
					</FormControl>
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
					paddingHorizontal: "30%",
					alignItems: "center",
				}}
			>
				Redirect signin: <GoogleButton onClick={handleGoogleRedirectSignIn} />
				Popup Signin: <GoogleButton onClick={handleGooglePopupSignIn} />
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					paddingHorizontal: "30%",
					alignItems: "center",
				}}
			>
				<Button variant="contained" onClick={handleFacebookRedirectSignIn}>
					FB Redirect signin
				</Button>

				<Button variant="contained" onClick={handleFacebookPopupSignIn}>
					FB Popup Signin:
				</Button>
			</div>
		</div>
	);
};

export default Signin;
