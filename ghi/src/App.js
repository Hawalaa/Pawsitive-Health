import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/Login";
import SignupForm from "./Components/Signup";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import Dashboard from "./Components/Dashboard/Dashboard";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import ListPet from "./Components/Pet/PetProfile";
import UserProfile from "./Components/User/UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Activities from "./Components/Activities/Activities";
import Records from "./Components/Records/Records";

export default function App() {
	const domain = /https:\/\/[^/]+/;
	const basename = process.env.PUBLIC_URL.replace(domain, "");
	return (
		<Provider store={store}>
			<div className="App">
				<AuthProvider>
					<BrowserRouter basename={basename}>
						<Routes>
							<Route path="/" element={<LoginForm />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/login" element={<LoginForm />} />
							<Route path="/signup" element={<SignupForm />} />
							<Route
								path="/user/:id/pet/:pet_id"
								element={<ListPet />}
							/>
							<Route path="/user" element={<UserProfile />} />
							<Route
								path="/activities"
								element={<Activities />}
							/>
							<Route path="/records" element={<Records />} />
						</Routes>
					</BrowserRouter>
				</AuthProvider>
				<ToastContainer
					position="bottom-right"
					autoClose={4000}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
			</div>
		</Provider>
	);
}
