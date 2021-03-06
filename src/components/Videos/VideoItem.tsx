import React, {useEffect, useRef} from 'react';

import styles from './styles.module.scss';


type IVideoItemProps = {
	name: string,
	stream: MediaStream,
	isLoading?: boolean,
	isSearch?: boolean,
	muted?: boolean
}

const VideoItem: React.FC<IVideoItemProps> = ({name, stream, isLoading = false, isSearch = false, muted = false}) => {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if(!videoRef.current || !stream) return;
		videoRef.current.srcObject = !stream ? null : stream;
	}, [stream, isLoading]);

	return (
		<div className={styles.item}>
			<video 
				ref={videoRef} 
				className={styles.item_video} 
				hidden={isLoading || isSearch} 
				muted={muted}
				autoPlay
			/>

			<div className={styles.item_name}>{name}</div>
			{isLoading && <div className={styles.item_loading}>Loading...</div>}
			{isSearch && <div className={styles.item_loading}>Search...</div>}
		</div>
	);
};

export default VideoItem;
