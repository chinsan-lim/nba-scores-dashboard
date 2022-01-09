import React, { useContext, useState, useEffect } from 'react';
import { DateContext } from '../DateContext';
import './GameCardContainer.css';
import GameCard from '../GameCard/GameCard';
import { Paper, Grid, Container } from '@mui/material';

function GameCardContainer(props) {
	const { gameDate } = useContext(DateContext);
	const { userGames } = useContext(DateContext);

	// console.log(userGames);

	if (!userGames) return <h4>Select a Date to Begin</h4>;
	return (
		<Container className='gameCardContainer'>
			<Grid container spacing={3}>
				{userGames.map((g) => (
					<Grid item key={g.id} xs={12} sm={10} md={8}>
						<GameCard g={g} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
}

export default GameCardContainer;
