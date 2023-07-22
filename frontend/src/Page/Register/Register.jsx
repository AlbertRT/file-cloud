import React from 'react'
import { LuMail, LuLock, LuUser } from "react-icons/lu";
import './Register.scss';

const Register = () => {
  return (
		<div className="Register">
			<section className="main">
				<div className="auth-card">
					<div className="title">Register</div>
					<div className="form">
						<form action="">
							<div className="input">
								<label htmlFor="username">
									<span>Username</span>
									<LuUser />
								</label>
								<input
									type="text"
									id="username"
									className="username"
									placeholder="John Doe"
								/>
							</div>
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
							<div className="input">
								<label htmlFor="password">
									<span>Password</span>
									<LuLock />
								</label>
								<input
									type="password"
									id="password"
									className="password"
									placeholder="****"
								/>
							</div>
							<div className="input">
								<label htmlFor="confirm_password">
									<span>Confirm Password</span>
									<LuLock />
								</label>
								<input
									type="password"
									id="confirm_password"
									className="email"
									placeholder="****"
								/>
							</div>
							<div className="button">
								<button type="submit" disabled={true}>
									Register!
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>
		</div>
  );
}

export default Register;