import './style.css';
import { MakeCard } from './makeCard.js'; // 他のクラスをインポート

class Main {
	constructor() {
		this.makeCardInstance = new MakeCard(); // インスタンス化
	}

	method() {
		// this.makeCardInstance.createCard();
		this.makeCardInstance.inputSearch();
		// this.makeCardInstance.createTable();
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const main = new Main();
	main.method();
});
