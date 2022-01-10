import { useState } from 'react';
import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './GameCard.css';

function GameCard({ g }) {
	const [gameGoat, setGameGoat] = useState(false);

	function createData(team, score) {
		return { team, score };
	}

	const rows = [
		createData(g.visitor_team.full_name, g.visitor_team_score),
		createData(g.home_team.full_name, g.home_team_score),
	];

	if (!rows) return <div>load</div>;
	return (
		<Card
			elevation={3}
			// onMouseEnter={() => setGameGoat(true)}
			// onMouseLeave={() => setGameGoat(false)}
		>
			<CardContent>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
						<TableBody>
							{rows.map((row) => (
								<TableRow
									key={row.team}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
									}}
									style={{
										textDecoration: 'none',
									}}>
									<TableCell component='th' scope='row'>
										{row.team}
									</TableCell>
									<TableCell align='right'>{row.score}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</CardContent>
			{gameGoat && <div>I'll appear when you hover over the button.</div>}
		</Card>
	);
}

export default GameCard;
