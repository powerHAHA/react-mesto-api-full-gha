import React from "react";
import { PopupWithForm } from "./PopupWithForm";

export const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvarar, isLoading }) => {

	const avatarRef = React.useRef();

	React.useEffect(() => {
		avatarRef.current.value = " ";
	}, [isOpen]);

	function handleSubmit(e) {
		e.preventDefault()
		onUpdateAvarar({
			avatar: avatarRef.current.value
		})
	}

	return (
		<PopupWithForm
			name="editAvatar"
			title="Обновить аватар"
			buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}>

			<input
				ref={avatarRef}
				id="input-src"
				name="imageAvatar"
				className="popup__input popup__input_type_avatar"
				type="url"
				placeholder="Ссылка на картинку"
				required />

			<span id="input-src-error"
				className="popup__input-error"></span>
		</PopupWithForm>
	)
}