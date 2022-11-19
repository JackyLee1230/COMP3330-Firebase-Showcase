import { useContext, createContext, useEffect, useState } from "react";
import {
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
	signOut,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
	FacebookAuthProvider,
} from "firebase/auth";
import { auth, app } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({});

	const googleRedirectSignIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithRedirect(auth, provider);
	};

	const googlePopupSignIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
	};

	const facebookRedirectSignIn = () => {
		const provider = new FacebookAuthProvider();
		signInWithRedirect(auth, provider);
	};

	const facebookPopupSignIn = () => {
		const provider = new FacebookAuthProvider();
		signInWithPopup(auth, provider);
	};

	const emailPasswordSignIn = (email, password) => {
		signInWithEmailAndPassword(auth, email, password);
	};

	const emailPasswordRegister = async (email, password, name) => {
		await createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredentials) => {
				const user = userCredentials.user;
				await updateProfile(user, {
					displayName: name,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const logOut = () => {
		signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider
			value={{
				googleRedirectSignIn,
				googlePopupSignIn,
				emailPasswordSignIn,
				emailPasswordRegister,
				facebookRedirectSignIn,
				facebookPopupSignIn,
				logOut,
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
