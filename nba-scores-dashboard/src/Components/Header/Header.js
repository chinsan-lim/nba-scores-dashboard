import React, { useState } from 'react';
import { DateContext } from '../DateContext';
import GameCardContainer from '../GameCardContainer/GameCardContainer';

function Header(props) {
	const [gameDate, setGameDate] = useState('');
	const [userGames, setUserGames] = useState(null);

	// const current = new Date();
	// const yesterDate = `${current.getFullYear()}-${current.getMonth() + 1}-${
	// 	current.getDate() - 1
	// }`;

	const getDailyGames = () => {
		const url = `https://www.balldontlie.io/api/v1/games?dates[]=${gameDate}`;

		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				setUserGames(res);
			})
			.catch(console.error);
	};

	function handleChange(event) {
		setGameDate(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		getDailyGames();
		console.log(gameDate);
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h1>NBA Game Tracker</h1>
				<input type='date' onChange={handleChange} />
				<input type='submit' />
			</form>

			<DateContext.Provider
				value={({ gameDate, setGameDate }, { userGames, setUserGames })}>
				<GameCardContainer />
			</DateContext.Provider>
		</div>
	);
}

export default Header;
