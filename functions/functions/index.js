const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// This will listen to creation of Document in the "messages" Collection and create a new document in the Test Collection
exports.onMessageCreate = functions.firestore
	.document("message/{messageID}")
	.onCreate(async (snap, context) => {
		const values = snap.data();
		await db.collection("Test").add({
			description: `A new Message sent by Userwith ID ${values.uid} and Name: ${values.name} is :${values.text}`,
		});
	});

// This will listen to deletion of Document in the "COMP3330" Collection and also delete the file from the Firebase Storage
// Given that the Firebase link attribute is the directory of the Storage files
// e.g Link: "lecture/lecture1.pdf", this will delete lecture1.pdf in the lecture directory of the storage
exports.onLectureDelete = functions.firestore
	.document("COMP3330/{lectureID}")
	.onDelete(async (snap, context) => {
		const deletedLecture = snap.data();

		let delPromises = [];
		const bucket = admin.storage().bucket();

		deletedLecture.link.forEach((l) => {
			delPromises.push(bucket.file(l).delete());
		});

		await Promise.all(deletePromises);
	});
