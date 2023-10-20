import React from "react";
import { PopupWithForm } from "./PopupWithForm";

export const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoading }) => {

	const [place, setPlace] = React.useState('');
	const [link, setLink] = React.useState('');

	function handleChangePlace(e) {
		setPlace(e.target.value);
	}

	function handleChangeLink(e) {
		setLink(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();

		onAddPlace({
			name: place,
			link
		});
	}

	React.useEffect(() => {
		setPlace('');
		setLink('');
	}, [isOpen]);

	return (
		<PopupWithForm
			name="addCard"
			title="Новое место"
			buttonText={isLoading ? 'Сохранение...' : 'Создать'}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}>

			<input
				value={place}
				onChange={handleChangePlace}
				id="input-title"
				name="imageName"
				className="popup__input popup__input_type_title"
				type="text"
				placeholder="Название"
				required
				minLength="2"
				maxLength="30" />

			<span id="input-title-error"
				className="popup__input-error"></span>

			<input
				value={link}
				onChange={handleChangeLink}
				id="input-img"
				name="imageLink"
				className="popup__input popup__input_type_src"
				type="url"
				placeholder="Ссылка на картинку"
				required />

			<span id="input-img-error"
				className="popup__input-error"></span>
		</PopupWithForm>
	)
}