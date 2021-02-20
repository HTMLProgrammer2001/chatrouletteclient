import React from 'react';
import {observer} from 'mobx-react';

import styles from './styles.module.scss';
import {IMessage} from '../../store/messagesStore';


type IMessageItemProps = {
	item: IMessage
}

const MessageItem: React.FC<IMessageItemProps> = observer(({item}) => (
	<div className={styles.item}>
		<span className={styles.item_name}>{item.name}:</span>
		<span>{item.message}</span>
	</div>
));

export default MessageItem;
