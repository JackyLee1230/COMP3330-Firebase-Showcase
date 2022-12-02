import { useState, useEffect } from "react";
import { auth, storage } from "../firebase";
import {
	ref,
	uploadBytesResumable,
	getDownloadURL,
	listAll,
	list,
	deleteObject,
	updateMetadata,
	getMetadata,
} from "firebase/storage";
import { CircularProgress } from "@mui/material";

function Storage() {
	const [file, setFile] = useState("");
	const [link, setLink] = useState("");
	const [allLinks, setAllLinks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [progress, setProgress] = useState(0);

	const allLinksRef = ref(storage, `web/`);

	function handleChange(event) {
		setFile(event.target.files[0]);
	}

	const load = () => {
		setAllLinks([]);
		listAll(allLinksRef).then((response) => {
			response.items.forEach((item) => {
				getDownloadURL(item).then((url) => {
					let name = item._location.path;
					let displayName;
					getMetadata(ref(storage, `web/${item.name}`)).then((metadata) => {
						console.log(item);
						displayName = metadata.customMetadata.displayName ?? null;
						setAllLinks((prev) => [...prev, { name, url, displayName }]);
					});
				});
			});
		});
		setIsLoading(false);
	};

	useEffect(() => {
		load();
	}, []);

	const handleUpload = async () => {
		if (!file) {
			alert("Please Choose an Image to Upload!, It is Public!");
			return;
		}

		const storageRef = ref(storage, `/web/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const percent = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);

				setProgress(percent);
			},
			(err) => console.log(err),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					setLink(url);
				});
				updateMetadata(storageRef, {
					customMetadata: {
						displayName: auth?.currentUser?.displayName ?? null,
					},
				})
					.then((metadata) => {
						console.log("metadata uploaded");
					})
					.catch((error) => {
						console.log(error);
					});
				load();
			}
		);
	};

	const handleDelete = (name) => {
		const storageRef = ref(storage, `${name}`);
		deleteObject(storageRef)
			.then(() => {
				alert("Deleted");
			})
			.catch((err) => {
				console.log(err);
			});
		load();
	};

	return (
		<>
			{auth?.currentUser?.displayName ? (
				<div>
					<div
						style={{
							margin: "32px 0px 0px 0px",
							display: "flex",
							flexDirection: "row",
						}}
					>
						<input
							id="fileUpload"
							type="file"
							onChange={handleChange}
							style={{ width: "98.5%" }}
						/>
						<button
							onClick={() => {
								setFile();
								document.getElementById("fileUpload").value = null;
							}}
						>
							Remove File
						</button>
						<button onClick={handleUpload}>Upload to Firebase</button>
					</div>
					{progress !== 0 && !isNaN(progress) ? (
						<div
							style={{
								padding: "1% 3%",
							}}
						>
							<h2> Uploading Progress: </h2>
							<div style={{ display: "flex", flexDirection: "row", gap: "5%" }}>
								<CircularProgress
									variant="determinate"
									size="4rem"
									value={progress}
								/>
								<h4>{progress} "% done"</h4>
							</div>
						</div>
					) : null}
					{link && (
						<div
							style={{
								padding: "1% 3%",
							}}
						>
							<a href={link} style={{ whiteSpace: "pre-wrap" }}>
								Link To The File You Uploaded{"\n"}
							</a>
						</div>
					)}

					{allLinks && !isLoading && (
						<h2
							style={{
								padding: "0% 3%",
							}}
						>
							List of Uploaded Items:
						</h2>
					)}

					{allLinks &&
						!isLoading &&
						allLinks.map((link) => (
							<div
								key={link}
								style={{
									marginLeft: "2%",
									display: "flex",
									flexDirection: "row",
									borderRadius: 16,
									border: "3px solid blue",
									padding: "1% 1%",
									marginBottom: "2%",
									justifyContent: "space-between",
									width: "70%",
								}}
							>
								<div style={{ display: "flex", flexDirection: "column" }}>
									<b>
										{link.name.replace("web/", "")} [Uploaded By{" "}
										{link.displayName}]:
									</b>
									<a href={link.url}>{link.url}</a>
								</div>

								<button
									style={{
										display: "flex",
										width: "10%",
										alignSelf: "center",
										justifyContent: "center",
									}}
									onClick={() => {
										handleDelete(link.name);
									}}
								>
									Delete
								</button>
							</div>
						))}

					{(!allLinks || allLinks.length === 0) && (
						<h4
							style={{
								padding: "1% 3%",
							}}
						>
							No item uploaded yet.
						</h4>
					)}
				</div>
			) : (
				<a>Storage Access is only allowed for Authenticated User</a>
			)}
		</>
	);
}

export default Storage;
