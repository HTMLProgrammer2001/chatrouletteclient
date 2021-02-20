import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {observer} from 'mobx-react';

import styles from './styles.module.scss';
import meStore from '../../store/meStore';
import otherStore from '../../store/otherStore';
import callStore from '../../store/callStore';
import peer from '../../utils/peerServer';
import ws from '../../utils/websocket';

import '../../utils/peerServer';

import Videos from '../../components/Videos';
import Messages from '../../components/Messages';


const ChatPage: React.FC = observer(() => {
	const [isAudio, setAudio] = useState(true),
		[isVideo, setVideo] = useState(true);

	if (!meStore.name)
		return <Redirect to="/"/>;

	if (!callStore.isSearch && !callStore.isLoading && !otherStore.otherStream)
		callStore.search();

	const changeAudio = () => {
			peer.changeAudio(!isAudio);
			setAudio(!isAudio);
		},
		changeVideo = () => {
			peer.changeVideo(!isVideo);
			setVideo(!isVideo);
		},
		stopHandler = () => ws.stop();

	return (
		<div className={styles.chat}>
			<Videos/>

			<div className={styles.btn_wrap}>
				<button type="button" onClick={() => callStore.search()}>Next</button>
				<button type="button" onClick={changeAudio}>Toggle audio</button>
				<button type="button" onClick={changeVideo}>Toggle video</button>
				<button type="button" onClick={stopHandler}>Stop</button>
			</div>

			<Messages/>
		</div>
	);
});

export default ChatPage;
