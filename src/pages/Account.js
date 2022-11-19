import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
	Backdrop,
	Box,
	Modal,
	Fade,
	Button,
	Typography,
	TextField,
} from "@mui/material";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";

const Account = () => {
	const { logOut, user } = UserAuth();
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
	const [newUsername, setNewUsername] = React.useState("");
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleSignOut = async () => {
		try {
			await logOut();
		} catch (error) {
			console.log(error);
		}
	};

	const updateUserName = async () => {
		if (newUsername.length > 0) {
			await updateProfile(auth.currentUser, {
				displayName: newUsername,
			})
				.then(() => {
					handleClose();
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	return (
		<div style={{ width: "100%" }}>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: 400,
							bgcolor: "background.paper",
							border: "2px solid #000",
							boxShadow: 24,
							p: 4,
						}}
					>
						<Typography id="transition-modal-title" variant="h6" component="h2">
							Enter Your New Display/User Name
						</Typography>
						<TextField
							onChange={(e) => {
								setNewUsername(e.target.value);
							}}
						></TextField>
						<button onClick={updateUserName} className="border py-2 px-5 mt-10">
							Confirm
						</button>
					</Box>
				</Fade>
			</Modal>
			<h1>Account</h1>
			<div style={{ color: "black" }}>
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
			<button onClick={handleOpen} className="border py-2 px-5 mt-10">
				Change Display Name
			</button>
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
