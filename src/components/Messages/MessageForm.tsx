import React, {useState} from 'react';
import {observer} from 'mobx-react';


import styles from './styles.module.scss';
import messagesStore from '../../store/messagesStore';
import meStore from '../../store/meStore';


const MessageForm: React.FC = observer(() => {
	const [message, setMessage] = useState('');

	const onInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value),
		submit = () => messagesStore.sendMessage({message, name: meStore.name});

	return (
		<div className={styles.form}>
			<textarea name="message" onInput={onInput}>{message}</textarea>
			<button type="button" onClick={submit}>Send</button>
		</div>
	);
});

export default MessageForm;
