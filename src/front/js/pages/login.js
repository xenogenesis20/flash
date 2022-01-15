import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useAuth } from "./register";

export const Login = () => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const history = useHistory();
	const login = useAuth();

	useEffect(
		() => {
			if (login.token) {
				history.push("/dashboard");
			}
		},
		[login.token]
	);

	return (
		<form>
			{login.error && <div className="alert alert-danger">Error at login</div>}
			<div className="mb-3">
				<label htmlFor="exampleInputEmail1" className="form-label">
					Email address
				</label>
				<input
					type="email"
					className="form-control"
					id="exampleInputEmail1"
					aria-describedby="emailHelp"
					value={email}
					onChange={ev => setEmail(ev.target.value)}
				/>
				<div id="emailHelp" className="form-text">
					We never share your email with anyone else.
				</div>
			</div>
			<div className="mb-3">
				<label htmlFor="exampleInputPassword1" className="form-label">
					Password
				</label>
				<input
					type="password"
					className="form-control"
					id="exampleInputPassword1"
					value={password}
					onChange={ev => setPassword(ev.target.value)}
				/>
			</div>

			<button type="button" className="btn btn-primary" onClick={() => login.login(email, password)}>
				Login
			</button>
		</form>
	);
};
