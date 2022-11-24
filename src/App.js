import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Signin from "./pages/sign-in";
import { AuthContextProvider } from "./context/AuthContext";
import SignedInOnly from "./components/SignedInOnly";
import Navbar from "./components/Navbar";
import Chat from "./pages/Chat";
import Lecture from "./pages/lecture";
import Storage from "./pages/storage";

function App() {
	document.title = "3330 Firebase Showcase";
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/lecture" element={<Lecture />} />
					<Route
						path="/account"
						element={
							<SignedInOnly>
								<Account />
							</SignedInOnly>
						}
					/>
					<Route
						path="/chat"
						element={
							<SignedInOnly>
								<Chat />
							</SignedInOnly>
						}
					/>
					<Route path="/storage" element={<Storage />} />
				</Routes>
			</AuthContextProvider>
		</BrowserRouter>
	);
}

export default App;
