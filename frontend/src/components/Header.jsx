import React from 'react';
import logo from '../images/logo.svg';
import { Routes, Route, Link } from 'react-router-dom';

export const Header = ({ email, onSignOut }) => {
	return (

		<header className="header">
			<img src={logo} alt="Логотип" className="logo" />
			<div className="header__container-login">
				<Routes>
					<Route path="/sign-up" element={
						<Link to="/sign-in" className="header__link">Войти</Link>
					} />
					<Route path="/sign-in" element={
						<Link to="/sign-up" className="header__link">Регистрация</Link>
					} />
					<Route path="/*" element={
						<>
							<p className="header__email">{email || ""}</p>
							<Link
								to="/sign-in"
								className="header__link"
								onClick={onSignOut}
							>
								Выйти </Link>
						</>
					} />
				</Routes>
			</div>
		</header>
	)
}