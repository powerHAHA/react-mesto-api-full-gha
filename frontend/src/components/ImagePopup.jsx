import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

export const ImagePopup = ({ card, onClose }) => {
	usePopupClose(card?.img, onClose);
	return (
		<div className={card.name ? 'popup popup_opened popup_type_view-img' : 'popup popup_type_view-img'}>
			<div className="popup__container popup__container_type_img">
				<button
					className="popup__button-close button"
					type="button"
					aria-label="Закрыть"
					onClick={onClose} />
				<figure className="popup__container-image">
					<img
						className="popup__img"
						src={card.img}
						alt={card.name} />
					<figcaption className="popup__caption">{card.name}</figcaption>
				</figure>
			</div>
		</div>
	)
}