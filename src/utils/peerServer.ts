import Peer, {MediaConnection} from 'peerjs';

import ws from './websocket';
import otherStore from '../store/otherStore';
import callStore from '../store/callStore';


class PeerService{
	private peer: Peer = null;
	private stream: MediaStream = null;
	private streamHandler = (stream: MediaStream) => otherStore.setOtherStream(stream);
	private callConnection: MediaConnection = null;

	constructor(){
		this.open();
	}

	async open(){
		if(this.peer && !this.peer.disconnected)
			return;

		this.peer = new Peer(undefined, {
			host: 'rtcapp1.herokuapp.com',
			port: 443,
			secure: true
		});

		this.peer.on('call', (call: MediaConnection) => {
			callStore.connected();

			this.getStream().then(stream => {
				call.answer(stream);

				call.on('stream', (userStream) => {
					callStore.streamStart();

					if(this.streamHandler)
						this.streamHandler(userStream);
				});
			});
		});

		this.peer.on('open', () => ws.sendPeerID(this.getID()));
	}

	addHandler(event: string, fn: (...args: any[]) => void){
		this.peer.on(event, fn);
	}

	getID(): string{
		return this.peer.id;
	}

	setHandler(fn: any){
		this.streamHandler = fn;
	}

	async getStream(){
		if(!this.stream) {
			this.stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true
			});
		}

		return this.stream;
	}

	changeVideo(isShow: boolean){
		if(!this.stream)
			return;

		this.stream.getVideoTracks().forEach(track => track.enabled = isShow);
	}

	changeAudio(isShow: boolean){
		if(!this.stream)
			return;

		this.stream.getAudioTracks().forEach(track => track.enabled = isShow);
	}

	disconnect(){
		//stop stream
		this.stream?.getTracks().forEach(track => track.stop());

		//disconnect
		this.peer?.disconnect();

		//reset data
		this.stream = null;
		this.peer = null;
	}

	close(){
		this.callConnection?.close();
	}

	async call(to: string){
		try {
			const stream = await this.getStream();
			this.callConnection = this.peer?.call(to, stream);

			this.callConnection.on('stream', (userStream) => {
				callStore.streamStart();

				if(this.streamHandler)
					this.streamHandler(userStream);
			});
		}
		catch (e) {
			console.log(e);
		}
	}
}

export default new PeerService();
