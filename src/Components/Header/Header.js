import React, { useContext } from 'react';
import { DateContext } from '../DateContext';
import { TextField, Typography, Container } from '@mui/material';
import Button from '@mui/material/Button';
import './Header.css';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

function Header(props) {
	//use context to pull state vars from parent component (App.js)
	const { gameDate, setGameDate } = useContext(DateContext);
	const { setUserGames } = useContext(DateContext);

	//Initial API call to grab the respective games of the data, based on user input. The date needs to be string concatenated into the URL as a query parameter
	const getDailyGames = () => {
		const url = `https://www.balldontlie.io/api/v1/games?dates[]=${gameDate}`;

		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				setUserGames(res.data);
			})
			.catch(console.error);
	};

	//handleChange function sets the game date the user inputted into the gameDate state variable

	function handleChange(event) {
		setGameDate(event.target.value);
	}

	//handleSumbit fires the API call after the use clicks the submit button
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
