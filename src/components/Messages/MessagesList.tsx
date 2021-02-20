import React from 'react';
import {observer} from 'mobx-react';

import messagesStore from '../../store/messagesStore';
import MessageItem from './MessageItem';


const MessagesList: React.FC = observer(() => (
	<div style={{display: 'flex', flexDirection: 'column-reverse', width: '100%'}}>
		{messagesStore.chatMessages.map((item, index) => <MessageItem item={item} key={index}/>)}
	</div>
));

export default MessagesList;
