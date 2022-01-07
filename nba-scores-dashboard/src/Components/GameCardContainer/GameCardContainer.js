import React, { useContext, useState, useEffect } from 'react';
import { DateContext } from '../DateContext';
import GameCard from '../GameCard/GameCard';

function GameCardContainer(props) {
	const { gameDate } = useContext(DateContext);
	const { userGames } = useContext(DateContext);

	console.log(userGames);

	return (
		<div>
			<h3>{gameDate}</h3>
			{/* <GameCard /> */}
		</div>
	);
}

export default GameCardContainer;
