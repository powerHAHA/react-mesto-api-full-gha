import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

export const PopupWithForm = ({ name, title, buttonText, isOpen, onClose, children, onSubmit }) => {
	usePopupClose(isOpen, onClose);
	return (
		<div className={isOpen ? `popup popup_opened popup_type_${name}` : `popup popup_type_${name}`}>
			<div className="popup__container">
				<button
					className="popup__button-close button"
					type="button"
					aria-label="Закрыть"
					onClick={onClose}
				/>

				<form name={name} className="popup__form" onSubmit={onSubmit}>
					<h3 className="popup__title">{title}</h3>
					{children}
					<button
						className="popup__button-submit button"
						type="submit"
						aria-label="Подтвердить">
						{buttonText}
					</button>
				</form>
			</div>
		</div >
	)
}