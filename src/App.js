import './App.css';
import Header from './Components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import GameCardContainer from './Components/GameCardContainer/GameCardContainer';
import { useState } from 'react';
import { DateContext } from './Components/DateContext';
import BoxScore from './Components/BoxScore/BoxScore';

function App() {
	//state variables for user inputted dates and the respective games from that date (pulled from API)
	const [gameDate, setGameDate] = useState('');
	const [userGames, setUserGames] = useState(null);

	return (
		<div className='App'>
			<DateContext.Provider
				value={{ gameDate, setGameDate, userGames, setUserGames }}>
				{/* header always remains on page load */}
				<Header />
				{/* routes for displaying all the games in one component and displaying the box score component on click of the respective game*/}
				<Routes>
					<Route path='/' element={<GameCardContainer />} />
					<Route path='/games/:id' element={<BoxScore />} />
				</Routes>
			</DateContext.Provider>
		</div>
	);
}

export default App;
