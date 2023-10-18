import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/Login";
import SignupForm from "./Components/Signup";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import Dashboard from "./Components/Dashboard/Dashboard";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import ListPet from "./Components/Pet/PetProfile";

export default function App() {
	const domain = /https:\/\/[^/]+/;
	const basename = process.env.PUBLIC_URL.replace(domain, "");
	return (
		<Provider store={store}>
			<div className="App">
				<AuthProvider>
					<BrowserRouter basename={basename}>
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/login" element={<LoginForm />} />
							<Route path="/signup" element={<SignupForm />} />
							<Route path="/pet" element={<ListPet />} />
						</Routes>
					</BrowserRouter>
				</AuthProvider>
			</div>
		</Provider>
	);
}
