import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Signin from "./pages/sign-in";
import { AuthContextProvider } from "./context/AuthContext";
import SignedInOnly from "./components/SignedInOnly";
import Navbar from "./components/Navbar";

function App() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signin" element={<Signin />} />
					<Route
						path="/account"
						element={
							<SignedInOnly>
								<Account />
							</SignedInOnly>
						}
					/>
				</Routes>
			</AuthContextProvider>
		</BrowserRouter>
	);
}

export default App;
