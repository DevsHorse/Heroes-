'use strict';

document.addEventListener('DOMContentLoaded', () => {
	/*
    @@
      AJAX
    @@
  */
	const getData = fn => {

		const request = new XMLHttpRequest();
		request.open('GET', '../dbHeroes.json');
		request.addEventListener('readystatechange', () => {
			if (request.readyState !== 4) return;
			if (request.status === 200) {
				fn(JSON.parse(request.responseText));
			} else {
				new Error(request.statusText);
			}
		});

		request.send();
	};

	getData(data => {
		console.log(data);
	});
});
