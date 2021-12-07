export default class Speech {
	constructor() {
		this.synth = window.speechSynthesis;
		this.voices = [];
		this.voice = 4;
		this.pitch = 1;
		this.rate = 1;
		this.populateVoiceList = this.populateVoiceList.bind(this);
		this.speak = this.speak.bind(this)
		this.cancel = this.cancel.bind(this);
		this.getVoices = this.getVoices.bind(this);
		this.setVoice = this.setVoice.bind(this);
		if (speechSynthesis.onvoiceschanged !== undefined) {
			speechSynthesis.onvoiceschanged = this.populateVoiceList;
		}
		this.populateVoiceList()
	}

	populateVoiceList() {
		this.voices = window.speechSynthesis.getVoices();
	}

	getVoices() {
		return this.voices.map((v) => v.name);
	}

	cancel() {
		window.speechSynthesis.cancel();
	}

	setVoice(voice) {
		this.voice = this.voices.map((v) => v.name).indexOf(voice);
	}

	async speak(text) {
		let utterThis = new SpeechSynthesisUtterance(text);
		utterThis.voice = this.voices[this.voice];
		utterThis.pitch = this.pitch;
		utterThis.rate = this.rate;
		return new Promise((resolve, reject) => {
			window.speechSynthesis.speak(utterThis);
			utterThis.onend = (a) => resolve(a);
		});
	}
}
