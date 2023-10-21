import React from "react";
import verificationOn from '../images/verification_on.svg';
import verificationOff from '../images/verification_off.svg';

export const InfoTooltip = ({ isOpen, onClose, result }) => {

	const handleCLose = () => {
		onClose(true)
	}

	return (
		<>
			<div className={isOpen ? `popup popup_opened` : 'popup'}>
				<div className="popup__container">
					<button
						className="popup__button-close button"
						type="button"
						aria-label="Закрыть"
						onClick={handleCLose}
					/>
					<img className="popup__icon"
						src={result ? verificationOn : verificationOff}
						alt={result ? 'Успех' : 'Провал...'}
					/>
					<p className="popup__info">
						{result ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Пропробуйте ещё раз.'}
					</p>
				</div>
			</div>

			{/* <div className="popup">
				<div className="popup__container">
					<button
						className="popup__button-close button"
						type="button"
						aria-label="Закрыть"
						onClick={onclose}
					/>
					<img className="popup__img" src={verificationOff} alt="test" />
					<p className="popup__info">Что-то пошло не так! Попробуйте ещё раз.</p>
				</div>
			</div> */}

		</>
	)
}