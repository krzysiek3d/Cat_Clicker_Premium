(function () {
	'use strict';

	/* ======= Model ======= */
	var model = {
		currentCat: null,
		cats: [{
				id: 0,
				name: 'John',
				clicks: 0,
				imgSrc: 'img/1.jpg'
			},
			{
				id: 1,
				name: 'Merry',
				clicks: 0,
				imgSrc: 'img/2.jpg'
			},
			{
				id: 2,
				name: 'Jimmy',
				clicks: 0,
				imgSrc: 'img/3.jpg'
			},
			{
				id: 3,
				name: 'Goliat',
				clicks: 0,
				imgSrc: 'img/4.jpg'
			},
			{
				id: 4,
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
			adminView.init();
		},
		incrementClicks: function () {
			model.currentCat.clicks = ++model.currentCat.clicks;
		},
		setCurrentCat: function (id) {
			model.currentCat = model.cats[id];
		},
		getCurrentCat: function () {
			return model.currentCat;
		},
		getCats: function () {
			return model.cats;
		},
		updateCat: function (id, obj) {
			model.cats.splice(id, 1, obj);
			this.setCurrentCat(id, obj);
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
					adminView.render();
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

			function incrementCatClicks() {
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

	var adminView = {
		init: function () {
			this.isActive = false;

			this.adminButton = document.getElementsByClassName('cat-clicker__admin-button')[0];
			this.container = document.getElementsByClassName('admin-view')[0];
			this.catName = document.getElementsByClassName('admin-view__cat-name')[0];
			this.catImg = document.getElementsByClassName('admin-view__cat-imgUrl')[0];
			this.catClicks = document.getElementsByClassName('admin-view__cat-clicks')[0];
			this.save = document.getElementsByClassName('admin-view__save')[0];
			this.cancel = document.getElementsByClassName('admin-view__cancel')[0];

			this.adminButton.addEventListener('click', adminClickHandler);
			this.save.addEventListener('click', saveClickHandler);
			this.cancel.addEventListener('click', cancelClickHandler);

			function adminClickHandler() {
				adminView.isActive = true;
				adminView.render();
			}

			function saveClickHandler() {
				save();
			}

			function cancelClickHandler() {
				cancel(adminView.container);
			}

			function save() {
				var id = octopus.getCurrentCat().id,
					cat = {
						id: id,
						name: adminView.catName.value,
						clicks: adminView.catClicks.value,
						imgSrc: adminView.catImg.value
					};
				octopus.updateCat(id, cat);
				catListView.render();
				catDisplayView.render();
				adminView.isActive = false;
				adminView.render();
			}

			function cancel(container) {
				adminView.isActive = false;
				adminView.render();
			}

			this.render();
		},
		render: function () {
			if (this.isActive) {
				this.container.classList.value = 'admin-view';
			} else {
				this.container.classList.value += ' admin-view--is-hidden';
			}
			var currentCat = octopus.getCurrentCat();
			this.catName.value = currentCat.name;
			this.catImg.value = currentCat.imgSrc;
			this.catClicks.value = currentCat.clicks;
		}
	};

	octopus.init();

	console.log('Cat-clicker version: 1.2');
}());