import {connect, Socket} from 'socket.io-client';

import {IMessage} from '../store/messagesStore';
import peer from './peerServer';
import callStore from '../store/callStore';
import otherStore from '../store/otherStore';
import messagesStore from '../store/messagesStore';
import meStore from '../store/meStore';


class Websocket{
	private socket: typeof Socket;

	constructor(){
		this.socket = connect(process.env.REACT_APP_WS_URL || 'https://chatrouletteserver.herokuapp.com', {
			reconnectionAttempts: Infinity
		});

		this.socket.on('call', (peerID: string) => {
			peer.call(peerID);
			callStore.connected();
		});

		this.socket.on('close', () => {
			callStore.search();
			otherStore.reset();
		});

		this.socket.on('setOtherName', (name: string) => {
			otherStore.setOtherName(name);
		});

		this.socket.on('message', (msg: IMessage) => {
			messagesStore.addMessage(msg);
		});
	}

	addHandler(event: string, fn: (...args: any[]) => void){
		this.socket.on(event, fn);
	}

	changeName(newName: string){
		this.socket.emit('changeName', newName);
	}

	search(){
		this.socket.emit('search');
	}

	talk(){
		this.socket.emit('talk');
	}

	stop(){
		this.socket.emit('close');
		otherStore.reset();
		callStore.reset();
		meStore.reset();
		peer.close();
	}

	sendMessage(msg: IMessage){
		this.socket.emit('sendMessage', msg);
	}

	sendPeerID(id: string){
		this.socket.emit('setPeerID', id);
	}

	disconnect(){
		if(this.socket?.connected)
			this.socket.disconnect();
	}
}

export default new Websocket();
