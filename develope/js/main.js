(function (param) {
	'use strict';

	/* ======= Model ======= */
	var cats = {
		currentCat: null,
		cats: [{
				name: 'John',
				clicks: 0,
				imgSrc: 'img/1.jpg'
			},
			{
				name: 'Merry',
				clicks: 0,
				imgSrc: 'img/2.jpg'
			},
			{
				name: 'Jimmy',
				clicks: 0,
				imgSrc: 'img/3.jpg'
			},
			{
				name: 'Goliat',
				clicks: 0,
				imgSrc: 'img/4.jpg'
			},
			{
				name: 'Sleepyhead',
				clicks: 0,
				imgSrc: 'img/5.jpg'
			}
		]
	};

	/* ======= Octopus ======= */
	var octopus = {};

	/* ======= Views ======= */
	var catListView = {};
	var catDisplayView = {};

	console.log('id: ', param.appId);
	console.log('Cat-clicker version: 1.2');
}({
	appId: '.cat-clicker'
}));