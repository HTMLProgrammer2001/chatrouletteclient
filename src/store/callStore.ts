import {makeAutoObservable} from 'mobx';

import ws from '../utils/websocket';


class CallStore {
	isLoading = false;
	isSearch = false;

	constructor(){
		makeAutoObservable(this);
	}

	search(){
		this.isSearch = true;
		ws.search();
	}

	connected(){
		this.isSearch = false;
		this.isLoading = true;
	}

	streamStart(){
		this.isLoading = false;
		this.isSearch = false;
	}

	reset(){
		this.isLoading = false;
		this.isSearch = false;
	}
}

export default new CallStore();
