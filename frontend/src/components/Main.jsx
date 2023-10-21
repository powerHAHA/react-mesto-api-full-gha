import React from 'react';
import { Card } from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const Main = ({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) => {

	const currentUser = React.useContext(CurrentUserContext);
	return (

		<main className="content">
			<section className="profile page__profile">
				<div className="profile__info">
					<div className="profile__avatar-container">
						<img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
						<button
							className="profile__button-avatar button"
							type="button"
							aria-label="Редактировать аватар"
							onClick={onEditAvatar} />
					</div>
					<div className="profile__description">
						<div className="profile__container">
							<h1 className="profile__name">{currentUser.name}</h1>
							<button
								className="profile__button-edit button"
								type="button"
								aria-label="Редактировать профиль"
								onClick={onEditProfile} />
						</div>
						<p className="profile__job">{currentUser.about}</p>
					</div>
				</div>
				<button
					className="profile__button-add button"
					type="button"
					aria-label="Добавить карточку"
					onClick={onAddPlace} />
			</section>

			<section className="elements page__elements">
				<ul className="elements__items">

					{cards.map((card) => {
						return (
							<Card
								key={card._id}
								name={card.name}
								img={card.link}
								likes={card.likes}
								id={card._id}
								ownerId={card.owner}
								onCardClick={onCardClick}
								onCardLike={onCardLike}
								onCardDelete={onCardDelete}
							/>
						)
					})}
				</ul>
			</section>
		</main>

	)
}