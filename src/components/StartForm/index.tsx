import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {observer} from 'mobx-react';

import styles from './styles.module.scss';
import meStore from '../../store/meStore';
import peer from '../../utils/peerServer';


const StartForm: React.FC = observer(() => {
	//hooks
	const [val, setVal] = useState(''),
		[error, setError] = useState(''),
		history = useHistory();

	//handlers
	const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
			setVal(e.target.value);
			setError('');
		},
		onSubmit = (e: React.FormEvent) => {
			if (!val)
				return setError('Name is required');

			peer.getStream()
				.then(stream => {
					meStore.setName(val);
					meStore.setStream(stream);

					history.push('/chat');
				})
				.catch(() => alert('You must allow'));

			e.preventDefault();
		};

	return (
		<form className={styles.form} onSubmit={onSubmit} noValidate>
			<b className={styles.title}>Enter name</b>

			<div className="red">{error}</div>

			<input
				className={styles.input}
				placeholder="Enter your name"
				value={val}
				onInput={onInput}
			/>

			<button className={styles.but}>Start</button>
		</form>
	);
});

export default StartForm;
