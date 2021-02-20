import React from 'react';

import styles from './styles.module.scss';


const Header: React.FC = () => (
	<header className={styles.header}>
		<img src="/logo.png" className={styles.logo} alt="Logo"/>
		<div className={styles.name}>Chat roulette</div>
	</header>
);

export default Header;
