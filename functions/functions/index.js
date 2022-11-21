const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// This will listen to Authentication (User Register) / Use a new Social Sign-in
// the callback function take the user object as a parameter, we can use it to get the user's data
exports.authRegister = functions.auth.user().onCreate((user) => {
	// This will create a document with user.UID as identifier in the "users" Collection with the user's email as a field
	return db.collection("users").doc(user.uid).set({
		email: user.email,
	});
});

// This will listen to Authentication (User Account Deletion
// the callback function take the user object as a parameter, we can use it to get the user's data
exports.authDelete = functions.auth.user().onDelete((user) => {
	// This will delete the document with user.UID as identifier in the "users" Collection
	return db.collection("users").doc(user.uid).delete();
});

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

// Since Firebase Cloud Funtions also provide a REST API, we need to protect it to prevent abuse of the endpoint
exports.HTTPRequest = functions.https.onCall((data, context) => {
	if (!context.auth) {
		// https://firebase.google.com/docs/reference/node/firebase.functions#functionserrorcode
		// see this documentation for list of error codes
		throw new functions.https.HttpsError(
			"unauthenticated",
			"Only Callable By Authenticated User"
		);
	}
	if (!data.text) {
		throw new functions.https.HttpsError(
			"invalid-argument",
			"Missing Argument"
		);
	}
});
