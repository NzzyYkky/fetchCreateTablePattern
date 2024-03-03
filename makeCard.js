export class MakeCard {
	constructor() {
		this.params;
		this.button = document.getElementById('button');
		this.input = document.getElementById('inputBar');
	}

	async fetchJson() {
		const response = await this.request({
			path: 'https://jsonplaceholder.typicode.com/todos/',
			method: 'GET',
			headers: {},
			query: {},
		});
		return response.json();
	}

	async request({ path, method = 'GET', headers = {}, query = {} }) {
		const url = new URL(path);
		Object.keys(query).forEach((key) =>
			url.searchParams.append(key, query[key])
		);
		const response = await fetch(url, {
			method,
			headers,
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response;
	}

	#createTag(tagName, options = {}, ...children) {
		const element = document.createElement(tagName);
		element.append(...children);
		return Object.assign(element, options);
	}

	inputSearch() {
		const app = document.querySelector('#app');
		const table = this.#createTag('table', { className: 'table' });
		const tbody = document.createElement('tbody');

		// Store a reference to the previously created table
		let prevTable = null;

		this.button.addEventListener('click', () => {
			let inputValue = parseInt(this.input.value);

			// 値が数値じゃないときの処理
			if (!Number.isFinite(inputValue)) {
				app.innerText = 'input value is not a number';
				return;
			} else {
				app.innerText = '';
			}

			if (prevTable && prevTable.parentNode) {
				prevTable.parentNode.removeChild(prevTable);
			}

			this.fetchJson().then((data) => {
				let prevUserId = null; // 前回の userId を保持する変数
				let rowspanCount = data.filter(
					(item) => item.userId === inputValue
				).length;
				// tbody内のタグをリセット
				tbody.innerHTML = '';

				data.forEach((item) => {
					if (item.userId === inputValue) {
						let thId = this.#createTag(
							'th',
							{ className: 'commonId' },
							item.id
						);
						let thTitle = this.#createTag(
							'th',
							{ className: 'commonId' },
							item.title
						);
						let tr = this.#createTag('tr', { className: 'row' }, thId, thTitle);
						let tduserId;

						if (prevUserId === null) {
							// 前回と異なる userId の場合
							prevUserId = item.userId;
							tduserId = document.createElement('td');
							tduserId.className = 'userId';
							tduserId.innerText = item.userId;
							tduserId.rowSpan = rowspanCount; // rowspan を設定
							tr.appendChild(tduserId);

							// rowspan をリセット
							rowspanCount = 1;
						} else if (item.userId === prevUserId) {
							// 前回と同じ userId の場合
							rowspanCount++; // rowspan を増やす
						} else {
							// 前回と異なる userId の場合
							tduserId = document.createElement('td');
							tduserId.className = 'userId';
							tduserId.innerText = item.userId;
							tduserId.rowSpan = rowspanCount; // rowspan を設定
							tr.appendChild(tduserId);

							// rowspan をリセット
							rowspanCount = 1;
							prevUserId = item.userId; // 前回の userId を更新
						}

						tbody.appendChild(tr);
						table.appendChild(tbody);
						app.appendChild(table);
						prevTable = table;
					}
				});
			});
		});
	}

	createCard() {
		const app = document.querySelector('#app');
		this.fetchJson().then((data) => {
			data.forEach((item) => {
				const id = this.#createTag('h2', { className: 'num-id' }, item.id);
				const userId = this.#createTag(
					'h3',
					{ className: 'user-id' },
					item.userId
				);
				const title = this.#createTag('p', { className: 'title' }, item.title);
				const completed = this.#createTag(
					'p',
					{ className: 'completed' },
					item.completed ? 'completed' : 'not completed'
				);
				console.log(item);
				const tags = this.#createTag(
					'div',
					{ className: 'item' },
					id,
					userId,
					title,
					completed
				);
				app.appendChild(tags);
			});
		});
	}

	// 初期表示用のテーブル
	createTable() {
		const app = document.querySelector('#app');
		const table = this.#createTag('table', { className: 'table' });
		const tbody = document.createElement('tbody');

		this.fetchJson().then((data) => {
			let prevUserId = null; // 前回の userId を保持する変数
			const firstUserId = data[0].userId; // 一番最初のオブジェクトのuserIdを取得
			let rowspanCount = data.filter(
				(item) => item.userId === firstUserId
			).length;

			data.forEach((item) => {
				let thId = this.#createTag('th', { className: 'commonId' }, item.id);
				let thTitle = this.#createTag(
					'th',
					{ className: 'commonId' },
					item.title
				);
				let tr = this.#createTag('tr', { className: 'row' }, thId, thTitle);
				let tduserId;

				if (prevUserId === null) {
					// 前回と異なる userId の場合
					prevUserId = item.userId;
					tduserId = document.createElement('td');
					tduserId.className = 'userId';
					tduserId.innerText = item.userId;
					tduserId.rowSpan = rowspanCount; // rowspan を設定
					tr.appendChild(tduserId);

					// rowspan をリセット
					rowspanCount = 1;
				} else if (item.userId === prevUserId) {
					// 前回と同じ userId の場合
					rowspanCount++; // rowspan を増やす
				} else {
					// 前回と異なる userId の場合
					tduserId = document.createElement('td');
					tduserId.className = 'userId';
					tduserId.innerText = item.userId;
					tduserId.rowSpan = rowspanCount; // rowspan を設定
					tr.appendChild(tduserId);

					// rowspan をリセット
					rowspanCount = 1;
					prevUserId = item.userId; // 前回の userId を更新
				}

				tbody.appendChild(tr);
				table.appendChild(tbody);
				app.appendChild(table);
			});
		});
	}
}
