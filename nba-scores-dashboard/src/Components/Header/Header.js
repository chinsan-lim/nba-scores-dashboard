import React, { useState } from 'react';
import { DateContext } from '../DateContext';
import { TextField, Typography, Container, Paper, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import GameCardContainer from '../GameCardContainer/GameCardContainer';
import './Header.css';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

function Header(props) {
	const [gameDate, setGameDate] = useState('');
	const [userGames, setUserGames] = useState(null);

	const getDailyGames = () => {
		const url = `https://www.balldontlie.io/api/v1/games?dates[]=${gameDate}`;

		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				setUserGames(res.data);
			})
			.catch(console.error);
	};

	function handleChange(event) {
		setGameDate(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		getDailyGames();
	}

	return (
		<div className='calendarForm'>
			<Container max-width='md'>
				<form onSubmit={handleSubmit}>
					<Typography variant='h2'>NBA Game Tracker</Typography>
					<TextField type='date' onChange={handleChange} />
					<Button variant='contained' type='submit'>
						<SportsBasketballIcon />
					</Button>
				</form>

				<DateContext.Provider
					value={({ gameDate, setGameDate }, { userGames, setUserGames })}>
					<GameCardContainer />
				</DateContext.Provider>
			</Container>
		</div>
	);
}

export default Header;
