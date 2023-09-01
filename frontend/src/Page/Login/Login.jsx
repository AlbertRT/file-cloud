import React, { useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";

const Login = () => {
	document.title = "Login to your Account";
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const submit = async () => {
		if (email === "") {
			return toast.error("Email can't be empty!");
		}
		setLoading(true);

		try {
			await axios.post("http://localhost:5050/user/login", {
				email,
			});

			setLoading(false);
			setTimeout(() => navigate("/"), 500);
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
							<Input
								type="email"
								label="Email"
								placeholder="you@example.com"
								value={email}
								onInput={(e) => setEmail(e.target.value)}
                                labelPlacement="outside"
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
									<Link>Forgot your Email?</Link>
								</li>
							</ul>
						</div>
						<div className="button">
							<Button
								color="primary"
								variant="solid"
								onClick={submit}
								className="w-full"
								isLoading={loading}
								isDisabled={email === ""}
							>
								Login
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Login;
