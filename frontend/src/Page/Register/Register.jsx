import React, { useState } from "react";
import "./Register.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";

const Register = () => {
	document.title = "Register your Account";
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm_password, setConfirmPassword] = useState("");

	const navigate = useNavigate();

	const submit = async () => {
		const data = {
			name,
			email,
			password,
			confirm_password,
		};

		if (
			data.name === "" ||
			data.email === "" ||
			data.password === "" ||
			data.confirm_password === ""
		) {
			return toast.error("Please fill the required field!");
		}

		if (data.confirm_password !== data.password) {
			const passwordLabel = document.querySelector("label.password");
			const confirmPasswordLabel = document.querySelector(
				"label.confirm_password"
			);

			passwordLabel.classList.add("error");
			confirmPasswordLabel.classList.add("error");

			setTimeout(() => {
				passwordLabel.classList.remove("error");
				confirmPasswordLabel.classList.remove("error");
			}, 2500);

			return toast.error("Password not Match!");
		}

		try {
			await axios.post("http://localhost:5050/user/register", data);
			navigate("/login");
		} catch (error) {
			toast.error(error.message);
			console.log(error);
		}
	};

	return (
		<div className="Register">
			<ToastContainer
				position="top-right"
				autoClose={2000}
				closeOnClick
				closeButton
				pauseOnHover
			/>
			<section className="main">
				<div className="auth-card">
					<div className="title">Register</div>
					<div className="form">
						<div className="input">
							<Input
								type="text"
								label="Name"
								placeholder="John Doe"
								value={name}
								onInput={(e) => setName(e.target.value)}
								labelPlacement="outside"
							/>
						</div>
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
						<div className="input">
							<Input
								label="Password"
								labelPlacement="outside"
								placeholder="Your Password"
								value={password}
								onInput={(e) => setPassword(e.target.value)}
								color="default"
								type="password"
							/>
						</div>
						<div className="input">
							<Input
								label="Confirm Password"
								labelPlacement="outside"
								placeholder="Confirm Your Password"
								value={confirm_password}
								onInput={(e) =>
									setConfirmPassword(e.target.value)
								}
								color="default"
								type="password"
							/>
						</div>
						<div className="links">
							<ul>
								<li>
									<Link to={"/login"}>
										Already have account?
									</Link>
								</li>
							</ul>
						</div>
						<div className="button">
							<Button
								className="w-full"
								variant="solid"
								color="primary"
                                onClick={submit}
							>
								Register
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Register;
