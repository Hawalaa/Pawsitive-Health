import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../signup.css";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";

const SignupForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !firstname || !lastname || !email || !password) {
            // Display an error message or prevent form submission
			toast.error("Please enter all the required fields.", {
				position: "bottom-right",
				autoClose: 4000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
            return;
        }

        const data = {};
        data.username = username;
        data.first_name = firstname;
        data.last_name = lastname;
        data.email = email;
        data.password = password;

        const accountUrl = "http://localhost:8000/api/accounts/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            };

        const response = await fetch(accountUrl, fetchConfig);
        if (response.ok) {
            const newAccount = await response.json();
            console.log(newAccount)
            setUsername("");
            setFirstname("");
            setLastname("");
            setEmail("");
            setPassword("");
        }

        navigate("/login");
    };

	const handleLoginClick = () => {
		navigate("/login");
	};

    return (
		<div className="center">
		<form onSubmit={(e) => handleSubmit(e)}>
			<div className="ear ear--left"></div>
			<div className="ear ear--right"></div>
			<div className="face">
			<div className="eyes">
				<div className="eye eye--left">
				<div className="glow"></div>
				</div>
				<div className="eye eye--right">
				<div className="glow"></div>
				</div>
			</div>
			<div className="nose">
				<svg width="38.161" height="22.03">
				<path
					d="M2.017 10.987Q-.563 7.513.157 4.754C.877 1.994 2.976.135 6.164.093 16.4-.04 22.293-.022 32.048.093c3.501.042 5.48 2.081 6.02 4.661q.54 2.579-2.051 6.233-8.612 10.979-16.664 11.043-8.053.063-17.336-11.043z"
					fill="#243946"
				></path>
				</svg>
				<div className="glow"></div>
			</div>
			<div className="mouth">
				<svg className="smile" viewBox="-2 -2 84 23" width="84" height="23">
				<path
					d="M0 0c3.76 9.279 9.69 18.98 26.712 19.238 17.022.258 10.72.258 28 0S75.959 9.182 79.987.161"
					fill="none"
					strokeWidth="3"
					strokeLinecap="square"
					strokeMiterlimit="3"
				></path>
				</svg>
				<div className="mouth-hole"></div>
				<div className="tongue breath">
				<div className="tongue-top"></div>
				<div className="line"></div>
				<div className="median"></div>
				</div>
			</div>
			</div>
			<div className="hands">
			<div className="hand hand--left">
				<div className="finger">
				<div className="bone"></div>
				<div className="nail"></div>
				</div>
				<div className="finger">
				<div className="bone"></div>
				<div className="nail"></div>
				</div>
				<div className="finger">
				<div className="bone"></div>
				<div className="nail"></div>
				</div>
			</div>
			<div className="hand hand--right">
				<div className="finger">
				<div className="bone"></div>
				<div className="nail"></div>
				</div>
				<div className="finger">
				<div className="bone"></div>
				<div className="nail"></div>
				</div>
				<div className="finger">
				<div className="bone"></div>
				<div className="nail"></div>
				</div>
			</div>
			</div>
			<div className="login">
			<label>
				<div className="fa fa-phone"></div>
				<input
				className="username"
				type="text"
				placeholder="username"
				onChange={(e) => setUsername(e.target.value)}
				/>
			</label>
            <label>
				<div className="fa fa-phone"></div>
				<input
				className="username"
				type="text"
				placeholder="first name"
				onChange={(e) => setFirstname(e.target.value)}
				/>
			</label>
            <label>
				<div className="fa fa-phone"></div>
				<input
				className="username"
				type="text"
				placeholder="last name"
				onChange={(e) => setLastname(e.target.value)}
				/>
			</label>
            <label>
				<div className="fa fa-phone"></div>
				<input
				className="username"
				type="text"
				placeholder="email"
				onChange={(e) => setEmail(e.target.value)}
				/>
			</label>
			<label>
				<div className="fa fa-commenting"></div>
				<input
				className="password"
				type={passwordVisible ? "text" : "password"} // Toggle the input type
				placeholder="password"
				onChange={(e) => setPassword(e.target.value)}
				/>
				<IconButton
				className="password-button"
				type="button" // Prevent the form submission
				onClick={togglePasswordVisibility} // Toggle password visibility
				>
				<i className={passwordVisible ? "bx bx-hide" : "bx bx-show"}></i>
				<VisibilityIcon />
				</IconButton>
			</label>
			<button className="login-button" type="submit">
				Sign Up
			</button>
			</div>
			<div className="footer">
                <span>Already have an account? </span>
                <button onClick={handleLoginClick}>Login</button>
            </div>
		</form>
		</div>
	);
};

export default SignupForm;
