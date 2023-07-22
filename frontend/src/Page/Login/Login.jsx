import React from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import { LuMail } from 'react-icons/lu';

const Login = () => {
	return (
		<div className="Login">
			<section className="main">
				<div className="auth-card">
					<div className="title">Login</div>
					<div className="form">
						<form action="">
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
								/>
							</div>
							<div className="links">
								<ul>
									<li id="register">
										<Link to={'/register'}>Don't have account?</Link>
									</li>
									<li id="password-reset">
										<Link>Forgot your password?</Link>
									</li>
								</ul>
							</div>
							<div className="button">
								<button type="submit" disabled={true} >Login</button>
							</div>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Login;
