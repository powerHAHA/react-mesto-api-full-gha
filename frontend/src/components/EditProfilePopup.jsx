import React from "react";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {

	const currentUser = React.useContext(CurrentUserContext);
	const [name, setName] = React.useState(currentUser.name);
	const [description, setDescription] = React.useState(currentUser.about);

	React.useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, isOpen])

	function handleChangeName(e) {
		setName(e.target.value);
	}

	function handleChangeDescription(e) {
		setDescription(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();

		onUpdateUser({
			name,
			about: description,
		});
	}


	return (
		<PopupWithForm
			name="editProfile"
			title="Редактировать профиль"
			buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}>

			<input
				value={name}
				onChange={handleChangeName}
				id="input-name"
				name="profileName"
				className="popup__input popup__input_type_name"
				type="text"
				placeholder="Имя"
				required
				minLength="2"
				maxLength="40" />

			<span id="input-name-error"
				className="popup__input-error"></span>

			<input
				value={description}
				onChange={handleChangeDescription}
				id="input-job"
				name="profileJob"
				className="popup__input popup__input_type_job"
				type="text"
				placeholder="О себе"
				required
				minLength="2"
				maxLength="200" />

			<span id="input-job-error"
				className="popup__input-error"></span>
		</PopupWithForm>
	)
}