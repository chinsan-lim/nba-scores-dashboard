import React, { useState, useEffect } from 'react';
import './GameCard.css';

function GameCard(props) {
	const [game, setGame] = useState(null);
	const [box, setBox] = useState(null);
	const [homeTeam, setHomeTeam] = useState(null);
	const [visitorTeam, setVisitorTeam] = useState(null);
	const [homeTeamPlayers, setHomeTeamPlayers] = useState([]);
	const [visitorTeamPlayers, setVisitorTeamPlayers] = useState([]);

	const getGames = () => {
		const url = 'https://www.balldontlie.io/api/v1/games/1';
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				setGame(res);
				setHomeTeam(res.home_team.abbreviation);
				setVisitorTeam(res.visitor_team.abbreviation);
			})
			.catch(console.error);
	};

	const getBox = () => {
		const url = 'https://www.balldontlie.io/api/v1/stats?game_ids[]=1';
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				setBox(res.data);
				const tempArr1 = res.data.filter(
					(player) => player.team.abbreviation === homeTeam
				);
				setHomeTeamPlayers(tempArr1);
				const tempArr2 = res.data.filter(
					(player) => player.team.abbreviation === visitorTeam
				);
				setVisitorTeamPlayers(tempArr2);
			})
			.catch(console.error);
	};

	useEffect(() => {
		getGames();
	}, []);

	useEffect(() => {
		getBox();
	}, [homeTeam, visitorTeam]);

	if (!game || !box) return <div>loading</div>;
	return (
		<div className='gameCard'>
			<div className='teamsAndScore'>
				<h4>
					{game.visitor_team.abbreviation}@{game.home_team.abbreviation}
				</h4>
				<h5>
					{game.visitor_team_score}-{game.home_team_score}
				</h5>
			</div>
			<div className='homeTeamPlayers'>
				{homeTeamPlayers.map((p) => (
					<div key={p.player.id}>
						<p>
							{p.player.first_name} {p.player.last_name}: ({p.min}) {p.pts}pts,{' '}
							{p.reb}
							rebs, {p.ast}ast
						</p>
					</div>
				))}
			</div>
			<div className='visitorTeamPlayers'>
				{visitorTeamPlayers.map((p) => (
					<div key={p.player.id}>
						<p>
							{p.player.first_name} {p.player.last_name}: ({p.min}) {p.pts}pts,{' '}
							{p.reb}
							rebs, {p.ast}ast
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default GameCard;
