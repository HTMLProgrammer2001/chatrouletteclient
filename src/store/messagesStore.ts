import {makeAutoObservable} from 'mobx';

import ws from '../utils/websocket';


export type IMessage = {
	name: string,
	message: string
}

class MessagesStore{
	private messages: IMessage[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	addMessage(msg: IMessage){
		this.messages.push(msg);
	}

	sendMessage(msg: IMessage){
		ws.sendMessage(msg);
		this.messages.push(msg);
	}

	get chatMessages(){
		return this.messages;
	}
}

export default new MessagesStore();
