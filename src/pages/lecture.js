import {
	collection,
	addDoc,
	query,
	where,
	getDocs,
	deleteDoc,
	updateDoc,
	doc,
	setDoc,
	limit,
} from "firebase/firestore";
import { auth, app, db } from "../firebase";
import { useDebounce } from "use-debounce";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { TextField, Button } from "@mui/material";

function Lecture() {
	const [keyword, setKeyword] = useState("");
	const [debouncedSearch] = useDebounce(keyword, 500);
	const [ID, setID] = useState();
	const [debouncedSearch2] = useDebounce(ID, 500);
	const [results, setResults] = useState([]);

	const loadLectures = async () => {
		// query where ID or Title contains keyword , no need to be exact
		const q = query(
			collection(db, "COMP3330"),
			where("Topic", "==", keyword),
			limit(1)
		);
		const querySnapshot = await getDocs(q);
		const lectures = [];
		querySnapshot.forEach((doc) => {
			lectures.push(doc.data());
		});
		setResults(lectures);
	};

	const loadAllLectures = async () => {
		// query where ID or Title contains keyword , no need to be exact
		const q = query(collection(db, "COMP3330"));
		const querySnapshot = await getDocs(q);
		const lectures = [];
		querySnapshot.forEach((doc) => {
			lectures.push(doc.data());
		});
		setResults(lectures);
		setKeyword("");
		setID("");
	};

	const loadLectureWithID = async () => {
		// query where ID or Title contains keyword , no need to be exact
		const q = query(
			collection(db, "COMP3330"),
			where("ID", "==", parseInt(ID)),
			limit(1)
		);
		const querySnapshot = await getDocs(q);
		const lectures = [];
		querySnapshot.forEach((doc) => {
			lectures.push(doc.data());
		});
		setResults(lectures);
	};

	return (
		<div style={{ padding: "5%" }}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					paddingBottom: "5%",
					gap: "2vw",
				}}
			>
				<TextField
					label="Search Keyword"
					onChange={(e) => {
						setKeyword(e.target.value);
					}}
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						gap: "1vw",
					}}
				>
					<Button variant="contained" onClick={loadLectures}>
						Search
					</Button>
					<Button variant="contained" onClick={loadAllLectures}>
						Search All(Without Keyword)
					</Button>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					paddingBottom: "5%",
					gap: "2vw",
				}}
			>
				<TextField
					label="Search With ID"
					onChange={(e) => {
						setID(e.target.value);
					}}
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						gap: "1vw",
					}}
				>
					<Button variant="contained" onClick={loadLectureWithID}>
						Search With ID
					</Button>
				</div>
			</div>
			<div>
				<h2> Results: </h2>
				{(!results || results?.length === 0) && (
					<h4>
						No Result
					</h4>
				)}

				{results.map((lecture) => {
					return (
						<div key={lecture.ID}>
							<h2 style={{ marginBottom: 0 }}>
								{lecture.ID} {lecture.Topic}
							</h2>
							Link: <a href={lecture.link}>{lecture.link}</a>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Lecture;
