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
import {
	ref,
	uploadBytesResumable,
	getDownloadURL,
	listAll,
	list,
	deleteObject,
	updateMetadata,
	getMetadata,
	uploadBytes,
} from "firebase/storage";
import { auth, storage } from "../firebase";
import { updateProfile } from "firebase/auth";

const Account = () => {
	const { logOut, user } = UserAuth();
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
	const [openProfilePic, setOpenProfilePic] = React.useState("");
	const [img, setImg] = React.useState("");
	const [url, setUrl] = React.useState("");
	const [newUsername, setNewUsername] = React.useState("");
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleOpenProfilePic = () => setOpenProfilePic(true);
	const handleCloseProfilePic = () => setOpenProfilePic(false);

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

	const handleImageChange = (e) => {
		if (e.target.files[0]) {
			setImg(e.target.files[0]);
		}
	};

	const handleSubmit = () => {
		const imageRef = ref(
			storage,
			`profile/${auth.currentUser.uid}/${new Date().toISOString()}.${
				img.name.split(".")[1]
			}`
		);
		uploadBytes(imageRef, img)
			.then(() => {
				getDownloadURL(imageRef)
					.then((url) => {
						setUrl(url);
						handleCloseProfilePic();
						// set user profile pic as the url
						updateProfile(auth.currentUser, {
							photoURL: url,
						});
						window.location.reload(false);
					})
					.catch((error) => {
						console.log(error.message, "error getting the image url");
					});
				setImg(null);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	return (
		<div style={{ width: "100vw", display: "flex", flexDirection: "column" }}>
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
						<Typography id="transition-modal-title" variant="h6" component="h2" style={{textAlign: "center", marginBottom: 12}}>
							<b>Enter Your New Display/User Name</b>
						</Typography>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<TextField
								placeholder="New Name"
								onChange={(e) => {
									setNewUsername(e.target.value);
								}}
							></TextField>
							<button onClick={updateUserName} className="border py-2 px-5 mt-10">
								Confirm
							</button>
						</div>
					</Box>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={openProfilePic}
				onClose={handleCloseProfilePic}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={openProfilePic}>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: 600,
							bgcolor: "background.paper",
							border: "2px solid #000",
							boxShadow: 24,
							p: 4,
						}}
					>
						<Typography id="transition-modal-title" variant="h6" component="h2" style={{textAlign: "center", marginBottom: 12}}>
							<b>Upload Your New Profile Picture</b>
						</Typography>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
							}}
						>
							<input type="file" onChange={handleImageChange} accept="image/*" />
							<button onClick={handleSubmit} className="border py-2 px-5 mt-10">
								Confirm
							</button>
						</div>
					</Box>
				</Fade>
			</Modal>
			<h1>Account</h1>
			<div style={{ color: "black", fontSize: 20, marginBottom: 48 }}>
				<div
					style={{
						margin: "auto",
						width: "fit-content",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<img
						src={
							user.photoURL
								? user.photoURL
								: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
						}
						alt="profile"
						style={{
							width: 100,
							height: 100,
							borderRadius: "50%",
							objectFit: "cover",
							marginBottom: 12,
						}}
					/>
					<button onClick={handleOpenProfilePic}>Change Profile Picture</button>
				</div>

				<p>
					Welcome, <b>{user?.displayName}</b>
				</p>
				<p>
					Email: <b>{user?.email}</b>
				</p>
				<p>
					Photo: <b>{user?.photoURL ?? "No Photo Uploaded"}</b>
				</p>
				<p>
					Sign-In Provider:{" "}
					<b>
						{(user &&
							user?.providerData &&
							user?.providerData[0] &&
							user?.providerData[0]?.providerId) ??
							0}
					</b>
				</p>
				<p>
					Provider-specific UID:{" "}
					<b>
						{(user &&
							user?.providerData &&
							user?.providerData[0] &&
							user?.providerData[0]?.uid) ??
							0}
					</b>
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
