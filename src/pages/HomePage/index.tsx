import React from 'react';

import styles from './styles.module.scss';
import StartForm from '../../components/StartForm';


const HomePage: React.FC = () => (
	<div className={styles.wrapper}>
		<StartForm/>
	</div>
);

export default HomePage;
