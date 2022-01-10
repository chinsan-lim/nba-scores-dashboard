import React, { useContext } from 'react';
import { DateContext } from '../DateContext';
import { TextField, Typography, Container } from '@mui/material';
import Button from '@mui/material/Button';
import './Header.css';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

function Header(props) {
	const { gameDate, setGameDate } = useContext(DateContext);
	const { setUserGames } = useContext(DateContext);

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
					<br />
					<br />
					<Button variant='contained' type='submit'>
						<SportsBasketballIcon />
					</Button>
				</form>
			</Container>
		</div>
	);
}

export default Header;
