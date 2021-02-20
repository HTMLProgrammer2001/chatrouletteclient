import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';


const MainLayout: React.FC = ({children}) => (
	<>
		<Header/>
		<main>{children}</main>
		<Footer/>
	</>
);

export default MainLayout;
