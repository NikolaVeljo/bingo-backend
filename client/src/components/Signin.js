import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { signin } from "../store/auth/action";

export default function Signin() {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.authenticated);
	const isEmailConfirmed = useSelector((state) => state.auth.confirmed);
	const error = useSelector((state) => state.auth.error);
	const [userEmail, setUserEmail] = useState(null);
	const [userPassword, setUserPassword] = useState(null);

	const handleEmailChange = (event) => {
		setUserEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setUserPassword(event.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			signin({
				email: userEmail,
				password: userPassword,
			})
		);
	};

	return (
		<div className='sign-in'>
			<div className='sign-in-content'>
				<div className='sign-in-logo'>
					<h1>Lucky Six / Sign In</h1>
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
					</div>

					<button type='submit' className='sign-in-form--button'>
						Sign In
					</button>
				</form>
			</div>
		</div>
	);
}
