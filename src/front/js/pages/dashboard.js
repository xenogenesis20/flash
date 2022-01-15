import React from "react";
import { useHistory } from "react-router";
import { useAuth } from "./register";

export function Dashboard() {
	const auth = useAuth();
	const history = useHistory();

	React.useEffect(
		() => {
			if (!auth.token) {
				history.push("/login");
			}
		},
		[auth.token]
	);

	return (
		<div>
			<h1>Dashboard Page</h1>

			<button onClick={() => auth.logout()}>Logout</button>
		</div>
	);
}
