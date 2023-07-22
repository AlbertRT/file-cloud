import React, { useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import { LuMail } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");

    const navigate = useNavigate();

	const submit = async () => {
        if (email === "") {
            return toast.error("Email can't be empty!");
        }

        try {
            await axios.post('http://localhost:5050/user/login', {
                email
            });

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

	return (
		<div className="Login">
			<ToastContainer
				position="top-right"
				autoClose={2000}
				closeOnClick
				closeButton
				pauseOnHover
			/>
			<section className="main">
				<div className="auth-card">
					<div className="title">Login</div>
					<div className="form">
						<div className="input">
							<label htmlFor="email">
								<span>Email</span>
								<LuMail />
							</label>
							<input
								type="email"
								id="email"
								className="email"
								placeholder="exmaple@gmail.com"
								value={email}
								onInput={(e) => setEmail(e.target.value)}
								autoComplete="off"
							/>
						</div>
						<div className="links">
							<ul>
								<li id="register">
									<Link to={"/register"}>
										Don't have account?
									</Link>
								</li>
								<li id="password-reset">
									<Link>Forgot your password?</Link>
								</li>
							</ul>
						</div>
						<div className="button">
							<button onClick={submit}>Login</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Login;
