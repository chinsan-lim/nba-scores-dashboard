import './App.css';
import Header from './Components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import GameCardContainer from './Components/GameCardContainer/GameCardContainer';
import { useState } from 'react';
import { DateContext } from './Components/DateContext';
import BoxScore from './Components/BoxScore/BoxScore';

function App() {
	const [gameDate, setGameDate] = useState('');
	const [userGames, setUserGames] = useState(null);

	return (
		<div className='App'>
			<DateContext.Provider
				value={{ gameDate, setGameDate, userGames, setUserGames }}>
				<Header />
				<Routes>
					<Route path='/' element={<GameCardContainer />} />
					<Route path='/games/:id' element={<BoxScore />} />
				</Routes>
			</DateContext.Provider>
		</div>
	);
}

export default App;
