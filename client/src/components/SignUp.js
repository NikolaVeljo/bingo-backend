import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { signup } from "../store/auth/action";
import { Link } from "react-router-dom";

export default function Signin() {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.authenticated);
	const isEmailConfirmed = useSelector((state) => state.auth.confirmed);
	const error = useSelector((state) => state.auth.error);
	const [userUsername, setUserUsername] = useState(null);
	const [userEmail, setUserEmail] = useState(null);
	const [userPassword, setUserPassword] = useState(null);
	const [userPasswordConfirm, setUserPasswordConfirm] = useState(null);

	const handleUsernameChange = (e) => {
		setUserUsername(e.target.value);
	};

	const handleEmailChange = (e) => {
		setUserEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setUserPassword(e.target.value);
	};

	const handleSetUserPasswordConfirm = (e) => {
		setUserPasswordConfirm(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			signup({
				username: userUsername,
				email: userEmail,
				password: userPassword,
				passwordConfirm: userPasswordConfirm,
			})
		);
	};

	return (
		<div className='sign-in'>
			<div className='sign-in-content'>
				<div className='sign-in-logo'>
					<h1>Lucky Six / Sign Up</h1>
				</div>
				{isAuthenticated && <Redirect to={{ pathname: "/" }} />}
				<form className='sign-in-form' onSubmit={handleSubmit}>
					{error && (
						<div className='alert alert-danger' role='alert'>
							{error}
						</div>
					)}
					{isEmailConfirmed === false && (
                        <div className='alert alert-danger' role='alert'>
                            Please confirm you email!
                        </div>
                    )}
					<div className='form-inputs'>
						<label for='inp' class='inp'>
							<input
								type='text'
								id='inp'
								placeholder='&nbsp;'
								onChange={handleUsernameChange}
							/>
							<span class='label'>Username</span>
							<span class='focus-bg'></span>
						</label>

						<label for='inp' class='inp'>
							<input
								type='text'
								id='inp'
								placeholder='&nbsp;'
								onChange={handleEmailChange}
							/>
							<span class='label'>Email</span>
							<span class='focus-bg'></span>
						</label>

						<label for='inp' class='inp'>
							<input
								type='password'
								id='inp'
								placeholder='&nbsp;'
								onChange={handlePasswordChange}
							/>
							<span class='label'>Password</span>
							<span class='focus-bg'></span>
						</label>

						<label for='inp' class='inp'>
							<input
								type='password'
								id='inp'
								placeholder='&nbsp;'
								onChange={handleSetUserPasswordConfirm}
							/>
							<span class='label'>Password Confirm</span>
							<span class='focus-bg'></span>
						</label>
					</div>
					<button type='submit' className='sign-in-form--button'>
						Sign Up
					</button>
					<div style={{ alignItems: "center" }}>
						Already have an account? <Link>Sign In</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
