import React from 'react';
import {observer} from 'mobx-react';

import styles from './styles.module.scss';
import meState from '../../store/meStore';
import otherState from '../../store/otherStore';
import callState from '../../store/callStore';

import VideoItem from './VideoItem';


const Videos: React.FC = observer(() => (
	<div className={styles.wrapper}>
		<div className={styles.items}>
			<VideoItem name={meState.name} stream={meState.stream}/>

			<VideoItem
				name={otherState.otherName}
				stream={otherState.otherStream}
				isLoading={callState.isLoading}
				isSearch={callState.isSearch}
			/>
		</div>
	</div>
));

export default Videos;
