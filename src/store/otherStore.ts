import {makeAutoObservable} from 'mobx';


class OtherStore{
	otherName: string = '';
	otherStream: MediaStream = null;

	constructor(){
		makeAutoObservable(this);
	}

	reset(){
		this.otherName = '';
		this.otherStream = null;
	}

	setOtherName(otherName: string){
		this.otherName = otherName;
	}

	setOtherStream(otherStream: MediaStream){
		this.otherStream = otherStream;
	}
}

export default new OtherStore();
