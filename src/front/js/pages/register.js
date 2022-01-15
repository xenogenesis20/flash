import React, { useEffect } from "react";
import { useHistory } from "react-router";
import create from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create(
	persist(
		set => ({
			error: false,
			success: false,
			token: null,

			register: async (email, password) => {
				const response = await fetch(process.env.BACKEND_URL + "/api/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email, password })
				});

				if (response.status === 204) {
					set({ success: true });
				} else {
					set({ error: true });
				}
			},

			login: async (email, password) => {
				const response = await fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email, password })
				});

				if (response.status === 200) {
					const payload = await response.json();
					set({ token: payload.token });
				} else {
					set({ error: true });
				}
			},

			logout: () => set({ token: null })
		}),
		{
			name: "auth-app",
			getStorage: () => sessionStorage
		}
	)
);

export const Register = () => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const history = useHistory();
	const register = useAuth();

	useEffect(
		() => {
			if (register.success) {
				history.push("/login");
			}
		},
		[register.success]
	);
	return (
		<form>
			{register.error && <div className="alert alert-danger">Error at register</div>}
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

			<button type="button" className="btn btn-primary" onClick={() => register.register(email, password)}>
				Register
			</button>
		</form>
	);
};
