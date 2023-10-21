import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const Card = ({ name, img, likes, id, ownerId, onCardClick, onCardLike, onCardDelete }) => {

	const currentUser = React.useContext(CurrentUserContext);
	const isOwn = ownerId === currentUser._id;
	const isLiked = likes.some((id) => id === currentUser._id);

	function handleClick() {
		onCardClick({ name, img });
	}

	function handleLike() {
		onCardLike({ likes, id })
	}

	function handleDelete() {
		onCardDelete({ id })
	}

	return (
		<li className="element">
			<img
				className="element__image"
				src={img}
				alt={name}
				onClick={handleClick} />
			<button
				className={isOwn ? 'element__button-delete element__button-delete_active button' : 'element__button-delete button'}
				onClick={handleDelete}
				type="button"
				aria-label="Удалить карточку" />
			<div className="element__description">
				<h2 className="element__title">{name}</h2>
				<div className="element__container-likes">
					<button
						className={isLiked ? 'element__button-like button element__button-like_active' : 'element__button-like button'}
						onClick={handleLike}
						type="button"
						aria-label="Лайкнуть карточку" />
					<p className="element__like-counter">{likes.length}</p>
				</div>
			</div>
		</li>
	)
}