import React, { useContext, useState, useEffect } from 'react';
import { DateContext } from '../DateContext';
import './GameCardContainer.css';
import GameCard from '../GameCard/GameCard';
import { Paper, Grid, Container } from '@mui/material';
import background from '../NBA-For-PC-Wallpaper.jpeg';
import { Route, Routes, Link } from 'react-router-dom';

function GameCardContainer(props) {
	//use context to pull state vars from parent component (App.js)
	const { gameDate } = useContext(DateContext);
	const { userGames } = useContext(DateContext);

	//add the leading scorers, rebounders, and assists in a hover or dropdown

	// const [homeTeamScorer, setHomeTeamScorer] = useState(null);
	// const [homeTeamRebounder, setHomeTeamRebounder] = useState(null);
	// const [homeTeamAssists, setHomeTeamAssists] = useState(null);
	// const [visitorTeamScorer, setVisitorTeamScorer] = useState(null);
	// const [visitorTeamRebounder, setVisitorTeamRebounder] = useState(null);
	// const [visitorTeamAssists, setVisitorTeamAssists] = useState(null);
	// const [gameIdsArr, setGameIdsArr] = useState([]);

	// useEffect(() => {
	// 	if (!userGames) return <h4>load</h4>;
	// 	const gameIds = userGames.map((g) => {
	// 		gameIdsArr.push(g.id);
	// 	});

	// 	const url = `https://www.balldontlie.io/api/v1/stats?dates[]=${gameDate}&game_ids[]=${id}`;

	// 	fetch(url)
	// 		.then((res) => res.json())
	// 		.then((res) => {})
	// 		.catch(console.error);

	// }, []);

	if (!userGames) return <h4>Select a Date to Begin</h4>;
	return (
		<Container
			className='gameCardContainer'
			style={{
				backgroundImage: `url(${background})`,
			}}>
			<Grid className='gridContainer' container spacing={3}>
				{userGames.map((g) => (
					<Link to={`/games/${g.id}`}>
						<Grid
							item
							className='gridItem'
							key={g.id}
							xs={12}
							sm={12}
							md={12}
							style={{
								padding: '20px',
								textDecoration: 'none',
							}}>
							<GameCard g={g} />
						</Grid>
					</Link>
				))}
			</Grid>
		</Container>
	);
}

export default GameCardContainer;
