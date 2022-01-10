import React, { useState, useEffect } from 'react';
import './BoxScore.css';
import { Link, useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

function BoxScore(props) {
	const [game, setGame] = useState(null);
	const [box, setBox] = useState(null);
	const [homeTeam, setHomeTeam] = useState(null);
	const [visitorTeam, setVisitorTeam] = useState(null);
	const [homeTeamPlayers, setHomeTeamPlayers] = useState([]);
	const [visitorTeamPlayers, setVisitorTeamPlayers] = useState([]);
	const [homeTeamName, setHomeTeamName] = useState(null);
	const [visitorTeamName, setVisitorTeamName] = useState(null);

	const { id } = useParams();

	const getGames = () => {
		const url = `https://www.balldontlie.io/api/v1/games/${id}`;
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				setGame(res);
				setHomeTeam(res.home_team.abbreviation);
				setVisitorTeam(res.visitor_team.abbreviation);
				setHomeTeamName(res.home_team.full_name);
				setVisitorTeamName(res.visitor_team.full_name);
			})
			.catch(console.error);
	};

	const getBox = () => {
		const url = `https://www.balldontlie.io/api/v1/stats?game_ids[]=${id}`;
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



	function createData(
		id,
		first_name,
		last_name,
		min,
		fgm,
		fga,
		fg_pct,
		ftm,
		fta,
		ft_pct,
		fg3m,
		fg3a,
		fg3_pct,
		dreb,
		oreb,
		reb,
		ast,
		stl,
		blk,
		pf,
		turnover,
		pts
	) {
		return {
			id,
			first_name,
			last_name,
			min,
			fgm,
			fga,
			fg_pct,
			ftm,
			fta,
			ft_pct,
			fg3m,
			fg3a,
			fg3_pct,
			dreb,
			oreb,
			reb,
			ast,
			stl,
			blk,
			pf,
			turnover,
			pts,
		};
	}

	const homeTeamRows = homeTeamPlayers.map((p) =>
		createData(
			p.player.id,
			p.player.first_name,
			p.player.last_name,
			p.min,
			p.fgm,
			p.fga,
			p.fg_pct,
			p.ftm,
			p.fta,
			p.ft_pct,
			p.fg3m,
			p.fg3a,
			p.fg3_pct,
			p.dreb,
			p.oreb,
			p.reb,
			p.ast,
			p.stl,
			p.blk,
			p.pf,
			p.turnover,
			p.pts
		)
	);

	const visitorTeamRows = visitorTeamPlayers.map((p) =>
		createData(
			p.player.id,
			p.player.first_name,
			p.player.last_name,
			p.min,
			p.fgm,
			p.fga,
			p.fg_pct,
			p.ftm,
			p.fta,
			p.ft_pct,
			p.fg3m,
			p.fg3a,
			p.fg3_pct,
			p.dreb,
			p.oreb,
			p.reb,
			p.ast,
			p.stl,
			p.blk,
			p.pf,
			p.turnover,
			p.pts
		)
	);

	const VisitorColumns = [
		{
			field: 'first_name',
			headerName: 'Name',
			description: 'First Name',
			width: 100,
		},
		{
			field: 'last_name',
			headerName: '',
			description: 'Last Name',
			width: 100,
		},
		{ field: 'min', headerName: 'Mins', description: 'Minutes' },
		{
			field: 'fgm',
			headerName: 'FGM',
			description: 'Field Goals Made',
			width: 70,
		},
		{
			field: 'fga',
			headerName: 'FGA',
			description: 'Field Goals Attempted',
			width: 70,
		},
		{
			field: 'fg_pct',
			headerName: 'FG %',
			description: 'Field Goal Percentage',
			width: 70,
		},
		{
			field: 'ftm',
			headerName: 'FTM',
			description: 'Free Throws Made',
			width: 70,
		},
		{
			field: 'fta',
			headerName: 'FTA',
			description: 'Free Throws Attempted',
			width: 70,
		},
		{
			field: 'ft_pct',
			headerName: 'FT %',
			description: 'Free Throw Percentage',
			width: 70,
		},
		{
			field: 'fg3m',
			headerName: '3PM',
			description: '3 Pointers Made',
			width: 70,
		},
		{
			field: 'fg3a',
			headerName: '3PA',
			description: '3 Pointers Attempted',
			width: 70,
		},
		{
			field: 'fg3_pct',
			headerName: '3P %',
			description: '3 Pointer Percentage',
			width: 70,
		},
		{
			field: 'dreb',
			headerName: 'DREB',
			description: 'Defensive Rebounds',
			width: 70,
		},
		{
			field: 'oreb',
			headerName: 'OREB',
			description: 'Offensive Rebounds',
			width: 70,
		},
		{ field: 'reb', headerName: 'REB', description: 'Rebounds', width: 70 },
		{ field: 'ast', headerName: 'AST', description: 'Assists', width: 70 },
		{ field: 'stl', headerName: 'STL', description: 'Steals', width: 70 },
		{ field: 'blk', headerName: 'BLK', description: 'Blocks', width: 70 },
		{
			field: 'pf',
			headerName: 'PF',
			description: 'Personal Fouls',
			width: 70,
		},
		{
			field: 'turnover',
			headerName: 'TO',
			description: 'Turnovers',
			width: 70,
		},
		{ field: 'pts', headerName: 'PTS', description: 'Points', width: 90 },
	];

	const HomeColumns = [
		{
			field: 'first_name',
			headerName: 'Name',
			description: 'First Name',
			width: 100,
		},
		{
			field: 'last_name',
			headerName: '',
			description: 'Last Name',
			width: 100,
		},
		{ field: 'min', headerName: 'Mins', description: 'Minutes' },
		{
			field: 'fgm',
			headerName: 'FGM',
			description: 'Field Goals Made',
			width: 70,
		},
		{
			field: 'fga',
			headerName: 'FGA',
			description: 'Field Goals Attempted',
			width: 70,
		},
		{
			field: 'fg_pct',
			headerName: 'FG %',
			description: 'Field Goal Percentage',
			width: 70,
		},
		{
			field: 'ftm',
			headerName: 'FTM',
			description: 'Free Throws Made',
			width: 70,
		},
		{
			field: 'fta',
			headerName: 'FTA',
			description: 'Free Throws Attempted',
			width: 70,
		},
		{
			field: 'ft_pct',
			headerName: 'FT %',
			description: 'Free Throw Percentage',
			width: 70,
		},
		{
			field: 'fg3m',
			headerName: '3PM',
			description: '3 Pointers Made',
			width: 70,
		},
		{
			field: 'fg3a',
			headerName: '3PA',
			description: '3 Pointers Attempted',
			width: 70,
		},
		{
			field: 'fg3_pct',
			headerName: '3P %',
			description: '3 Pointer Percentage',
			width: 70,
		},
		{
			field: 'dreb',
			headerName: 'DREB',
			description: 'Defensive Rebounds',
			width: 70,
		},
		{
			field: 'oreb',
			headerName: 'OREB',
			description: 'Offensive Rebounds',
			width: 70,
		},
		{ field: 'reb', headerName: 'REB', description: 'Rebounds', width: 70 },
		{ field: 'ast', headerName: 'AST', description: 'Assists', width: 70 },
		{ field: 'stl', headerName: 'STL', description: 'Steals', width: 70 },
		{ field: 'blk', headerName: 'BLK', description: 'Blocks', width: 70 },
		{
			field: 'pf',
			headerName: 'PF',
			description: 'Personal Fouls',
			width: 70,
		},
		{
			field: 'turnover',
			headerName: 'TO',
			description: 'Turnovers',
			width: 70,
		},
		{ field: 'pts', headerName: 'PTS', description: 'Points', width: 90 },
	];

	if (!game || !box) return <div>loading</div>;
	return (
		<div className='boxScore'>
			<div>
				<Link to='/'>
					<Button variant='contained'>Back to All Games</Button>
				</Link>
			</div>
			<div className='teamsAndScore' style={{ height: 800, minWidth: '100%' }}>
				<h3>Visitor Team: {visitorTeamName}</h3>
				<DataGrid
					className='visitorGrid'
					rows={visitorTeamRows}
					columns={VisitorColumns}
				/>
				<h3>Home Team: {homeTeamName}</h3>
				<DataGrid
					className='homeGrid'
					rows={homeTeamRows}
					columns={HomeColumns}
				/>
			</div>
		</div>
	);
}

export default BoxScore;
