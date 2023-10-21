import React from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { PopupWithForm } from './PopupWithForm';
import { ImagePopup } from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import { auth } from '../utils/auth';
import avatar from '../images/Avatar.jpg';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { Login } from './Login';
import { Register } from './Register';
import { InfoTooltip } from './InfoTooltip';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';



function App() {

	const [currentUser, setCurrentUser] = React.useState({
		name: 'Жак-Ив Кусто',
		about: 'Исследователь окена',
		avatar: avatar,
	});

	const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
	const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const [selectedCard, setSelectedCard] = React.useState({
		name: '',
		img: '',
	});
	const [cards, setCards] = React.useState([]);

	const navigate = useNavigate();
	const [isResultRegistration, setIsResultRegistration] = React.useState(true);
	const [email, setEmail] = React.useState('');
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);

	function handleCardClick({ name, img }) {
		setSelectedCard({
			name,
			img,
		});
	}

	function handleCardLike({ likes, id }) {
		const isLiked = likes.some(id => id === currentUser._id);

		api.changeLikeCardStatus(id, isLiked).then((newCard) => {
			setCards((cards) => cards.map((c) => c._id === id ? newCard : c));
		}).catch((err) => console.log(`При постановке/снятия лайка возникла ошибка: ${err}`))
	}

	function handleCardDelete({ id }) {
		api.deleteCard(id).then(() => {
			setCards((cards) => cards.filter((c) => c._id !== id));
		}).catch((err) => console.log(`При удалении карточки возникла ошибка: ${err}`))
	}

	function handleSubmit(request) {
		setIsLoading(true);
		request()
			.then(closeAllPopups)
			.catch(console.error)
			.finally(() => setIsLoading(false));
	}

	function handleProfileFormSubmit(inputValues) {
		function makeRequest() {
			return api.sendUserData(inputValues).then(setCurrentUser)
		}
		handleSubmit(makeRequest);
	}

	function handleAddPlaceFormSubmit(inputValues) {
		function makeRequest() {
			return api.addNewCard(inputValues).then((newCard) => {
				setCards([newCard, ...cards])
			})
		}
		handleSubmit(makeRequest);
	}

	function handleAvatarFormSubmit(inputValues) {
		function makeRequest() {
			return api.sendAvatarData(inputValues).then(setCurrentUser)
		}
		handleSubmit(makeRequest);
	}

	function handleEditProfileClick() { setEditProfilePopupOpen(true); }
	function handleEditAvatarClick() { setEditAvatarPopupOpen(true); }
	function handleAddPlaceClick() { setAddPlacePopupOpen(true); }

	function closeAllPopups() {
		setEditProfilePopupOpen(false);
		setAddPlacePopupOpen(false);
		setEditAvatarPopupOpen(false);
		setIsInfoTooltipPopupOpen(false);
		setSelectedCard({
			name: '',
			img: ''
		})
	}

	const handleOnSignOut = React.useCallback(() => {
		localStorage.removeItem("jwt");
		setIsLoggedIn(false);
		setEmail("");
		navigate('/sign-in');
	}, [navigate]);

	function handleRegister(data) {
		auth.register(data).then(() => {
			setIsResultRegistration(true);
			setIsInfoTooltipPopupOpen(true);
			navigate('/sign-in')
		}).catch((err) => {
			setIsResultRegistration(false);
			setIsInfoTooltipPopupOpen(true);
			console.log(err);
		})
	}

	function handleLogin(password, email) {
		auth.authorize(password, email).then((data) => {
			localStorage.setItem("jwt", data.token);
			setIsLoggedIn(true);
			setEmail(email);
			navigate('/')
		}).catch((err) => {
			console.log(err);
		})
	}

	React.useEffect(() => {
		function handleTokenCheck() {
			const token = localStorage.getItem("jwt");
			if (token) {
				auth.checkToken(token)
					.then((data) => {
						setEmail(data.email);
						setIsLoggedIn(true);
						navigate('/');
					})
					.catch((err) => {
						console.log(err.status);
					});
			}
		}
		handleTokenCheck();
	}, [])

	React.useEffect(() => {
		if (isLoggedIn) {

			api.getUserData().then((user) => {
				setCurrentUser(user);
			}).catch((err) => console.log(`При загрузке данных Пользователя возникла ошибка: ${err}`))

			api.getCards().then((cards) => {
				setCards(cards.reverse());
			}).catch((err) => console.log(`При загрузке карточек с сервера возникла ошибка: ${err}`))

		}
	}, [isLoggedIn])

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<div className="page__container">
					<Header
						isLoggedIn={isLoggedIn}
						email={email}
						onSignOut={handleOnSignOut}
					/>

					<Routes>
						<Route path='/sign-up' element={<Register onRegister={handleRegister} />} />
						<Route path='/sign-in' element={<Login onLogin={handleLogin} />} />
						<Route path="*" element={<Navigate to="/" />} />
						<Route path='/' element={
							<ProtectedRoute
								element={Main}
								cards={cards}
								isLoggedIn={isLoggedIn}
								onEditProfile={handleEditProfileClick}
								onEditAvatar={handleEditAvatarClick}
								onAddPlace={handleAddPlaceClick}
								onCardClick={handleCardClick}
								onCardLike={handleCardLike}
								onCardDelete={handleCardDelete}
							/>} />
					</Routes>

					{/* <Main
						cards={cards}
						onEditProfile={handleEditProfileClick}
						onEditAvatar={handleEditAvatarClick}
						onAddPlace={handleAddPlaceClick}
						onCardClick={handleCardClick}
						onCardLike={handleCardLike}
						onCardDelete={handleCardDelete}
					/> */}
					<InfoTooltip
						isOpen={isInfoTooltipPopupOpen}
						onClose={closeAllPopups}
						result={isResultRegistration}
					/>
					<Footer />

				</div>

				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleProfileFormSubmit}
					isLoading={isLoading}
				/>

				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlaceFormSubmit}
					isLoading={isLoading}
				/>

				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvarar={handleAvatarFormSubmit}
					isLoading={isLoading}
				/>

				<PopupWithForm
					name="deleteCard"
					title="Вы уверены?"
					buttonText="Да" />

				<ImagePopup
					card={selectedCard}
					onClose={closeAllPopups} />

			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;