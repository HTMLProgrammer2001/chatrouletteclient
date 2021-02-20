import {makeAutoObservable} from 'mobx';

import ws from '../utils/websocket';


class MeStore{
	name = '';
	stream: MediaStream = null;

	constructor(){
		makeAutoObservable(this);
	}

	setName(newName: string){
		this.name = newName;
		ws.changeName(newName);
	}

	setStream(stream: MediaStream){
		stream.getTracks().forEach(track => track.enabled = true);
		this.stream = stream;
	}

	reset(){
		this.name = '';
		this.stream.getTracks().forEach(track => track.enabled = false);
		this.stream = null;
	}
}

export default new MeStore();
