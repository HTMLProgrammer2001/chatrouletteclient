import React from 'react';

import styles from './styles.module.scss';
import MessageForm from './MessageForm';
import MessagesList from './MessagesList';


const Messages: React.FC = () => (
	<div className={styles.wrapper}>
		<MessageForm/>
		<MessagesList/>
	</div>
);

export default Messages;
