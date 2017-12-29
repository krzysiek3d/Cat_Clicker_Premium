(function () {
	'use strict';

	/* ======= Model ======= */
	var model = {
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
	var octopus = {
		init: function () {
			model.currentCat = model.cats[0];

			catListView.init();
			catDisplayView.init();
		},
		incrementClicks: function () {
			model.currentCat.clicks += 1;
		},
		setCurrentCat: function (id) {
			model.currentCat = model.cats[id];
		},
		getCurrentCat: function () {
			return model.currentCat;
		},
		getCats: function () {
			return model.cats;
		}
	};

	/* ======= Views ======= */
	var catListView = {
		init: function () {
			this.catList = document.getElementsByClassName('cat-list')[0];
			this.catList.addEventListener('click', clickHandler);

			function clickHandler(event) {
				var target = event.target,
					id = target.value;
				renderCurrenCat(target, id);
			}

			function renderCurrenCat(target, id) {
				if (target.className === 'cat-list__item') {
					octopus.setCurrentCat(id);
					catDisplayView.render();
				}
			}
			this.render();
		},
		render: function () {
			var cats = octopus.getCats(),
				cat,
				li;
			this.catList.innerHTML = '';

			for (var i = 0, max = cats.length; i < max; i++) {
				cat = cats[i];
				li = document.createElement('li');
				li.value = i;
				li.textContent = cat.name;
				li.classList.value = 'cat-list__item';
				this.catList.appendChild(li);
			}
		}
	};

	var catDisplayView = {
		init: function () {
			this.catName = document.getElementsByClassName('display-cat__name')[0];
			this.catImg = document.getElementsByClassName('display-cat__image')[0];
			this.catClicks = document.getElementsByClassName('display-cat__click-counter')[0];

			this.catImg.addEventListener('click', clickHandler);

			function clickHandler(event) {
				event.preventDefault();
				incrementCatClicks();
			}

			function incrementCatClicks(target) {
				octopus.incrementClicks();
				catDisplayView.render();
			}

			this.render();
		},
		render: function () {
			var currentCat = octopus.getCurrentCat();
			this.catName.innerHTML = currentCat.name;
			this.catImg.src = currentCat.imgSrc;
			this.catClicks.innerHTML = currentCat.clicks;
		}
	};

	octopus.init();

	console.log('Cat-clicker version: 1.2');
}());