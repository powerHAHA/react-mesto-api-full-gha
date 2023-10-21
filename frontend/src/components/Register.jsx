import React from "react";
import { Link } from "react-router-dom";

export const Register = ({ onRegister }) => {

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	function handleChangeEmail(e) {
		setEmail(e.target.value);
	}

	function handleChangePassword(e) {
		setPassword(e.target.value);
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		onRegister({
			password: password,
			email: email

		})
	}

	return (
		<div className="verification">
			<h1 className="verification__title">Регистрация</h1>
			<form className="verification__form"
				onSubmit={handleSubmit}>
				<input
					type="email"
					className="verification__input"
					placeholder="Email"
					required
					autoComplete="username"
					value={email || ''}
					onChange={handleChangeEmail} />
				<input
					type="password"
					className="verification__input"
					placeholder="Пароль"
					required
					autoComplete="current-password"
					value={password || ''}
					onChange={handleChangePassword} />
				<button
					type="submit"
					className="button verification__button">Зарегистрироваться</button>
			</form>
			<div className="verification__caption">
				<p className="verification__subtitle">Уже зарегистрированы?
					<Link className="verification__link" to="/sign-in">
						Войти
					</Link>
				</p>
			</div>
		</div>
	)
}