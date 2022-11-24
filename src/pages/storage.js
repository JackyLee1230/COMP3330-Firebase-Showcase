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
		<div>
			<input type="file" onChange={handleChange} />
			<button onClick={handleUpload}>Upload to Firebase</button>
			{progress !== 0 || !isNaN(progress) ? (
				<div style={{ display: "flex", flexDirection: "row", gap: "5%" }}>
					<CircularProgress variant="determinate" value={progress} />
					<p>{progress} "% done"</p>
				</div>
			) : null}
			{link && (
				<a href={link} style={{ whiteSpace: "pre-wrap" }}>
					Link To The File You Uploaded{"\n"}
				</a>
			)}

			{allLinks &&
				!isLoading &&
				allLinks.map((link) => (
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							borderRadius: 16,
							border: "3px solid blue",
							padding: "1% 1%",
							marginBottom: "1%",
							justifyContent: "space-between",
							width: "70%",
						}}
					>
						{console.log(link)}
						<div style={{ display: "flex", flexDirection: "column" }}>
							{link.name.replace("web/", "")} [Uploaded By {link.displayName}]:
							<a href={link}>{link.url}</a>
						</div>

						<button
							style={{ width: "10%" }}
							onClick={() => {
								handleDelete(link.name);
							}}
						>
							Delete
						</button>
					</div>
				))}
		</div>
	);
}

export default Storage;
