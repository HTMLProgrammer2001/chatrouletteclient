import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import HomePage from './pages/HomePage/';
import ChatPage from './pages/ChatPage/';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';


const App: React.FC = () => (
	<BrowserRouter>
		<MainLayout>
			<Switch>
				<Route path="/" exact component={HomePage}/>
				<Route path="/chat" exact component={ChatPage}/>
				<Route path="/" component={NotFoundPage}/>
			</Switch>
		</MainLayout>
	</BrowserRouter>
);

export default App;
