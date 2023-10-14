import { useState } from "react";
import { useCreateTokenMutation } from "../Store/Token";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [createToken, result] = useCreateTokenMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			username: username,
			password: password,
		};

		const result = await createToken({ data: data });
		if (!result.hasOwnProperty("error")) {
		}

		navigate("/dashboard");
	};

	return (
		<div className="card text-bg-light mb-3">
			<h5 className="card-header">Login</h5>
			<div className="card-body">
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className="mb-3">
						<label className="form-label">Username:</label>
						<input
							name="username"
							type="text"
							className="form-control"
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label">Password:</label>
						<input
							name="password"
							type="password"
							className="form-control"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<input
							className="btn btn-primary"
							type="submit"
							value="Login"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
