/* jshint node: true */

var chart = require('./charts'),
	_h = require('./lib');

(function (window) {
	'use strict';
	var curWeekSave,
		dates,
		datesSplit,
		initial = true,
		indexObj = {
			weekIdx: -1,
			dayIdx: -1,
			dayIndexInWeek: -1
		},
		today = new Date(),
		curDay = _h.copyDate(today),
		curMonth = _h.copyDate(today),
		curMonthSave = curMonth,
		monthSlider = document.querySelector('.monthAndYear'),
		prevMonthBtn = document.querySelector('.prevMonth'),
		nextMonthBtn = document.querySelector('.nextMonth'),
		prevWeekBtn = document.querySelector('.prevWeek'),
		nextWeekBtn = document.querySelector('.nextWeek'),
		weekSlider = document.querySelector('.weekMonthYear'),
		calGrid = document.querySelector('.calendar'),
		weekView = document.querySelector('.week-view'),
		todayBtn = document.querySelector('.choose-today'),
		loader = document.querySelector('.loader-cover'),
		searchLink = document.querySelector('.search-link'),
		searchField = document.getElementById('search-field'),
		canvas = document.getElementById('chart');

	/**
	 * Initializes calendar
	 */
	function init() {
		drawMonthView(curMonth);
		drawWeekView(indexObj.weekIdx);
		initEvents();
	}

	/**
	 * Display month and year in a month slider.
	 */
	function drawMonthSlider(date) {
		monthSlider.innerHTML = _h.getMonthName(date) + ' ' + date.getFullYear();
	}

	/**
	 *  Displays 1st and last day of week in a week slider.
	 */
	function drawWeekSlider(first, last) {
		weekSlider.innerHTML = first.getDate() + ' - ' + last.getDate() + '  ' + _h.getMonthName(last).slice(0, 3).toUpperCase() + '  ' + last.getFullYear();
	}

	/**
	 *  Draws calendar grid, accepts month.
	 */
	function drawMonthView(month) {
		var week,
			dayCur,
			day;

		curMonth = month;
		dates = _h.calendarGenerator(month);
		datesSplit = (dates.length === 42) ? _h.splitArr(dates, 6) : (dates.length === 28) ? _h.splitArr(dates, 4) : _h.splitArr(dates, 5);

		if (calGrid.firstChild) {
			calGrid.innerHTML = '';
		}

		dates.forEach(function (itm, idx) {
			// Weeks
			if (idx === 0 || idx % 7 === 0) {
				week = _h.createElem('div', 'week');
				calGrid.appendChild(week);
			}
			// Days
			day = _h.createElem('div', 'day', itm.getDate());

			if (!_h.compareMonths(itm, month)) {
				day.classList.add('day__out');
			}
			if (_h.areDatesEqual(itm, curDay)) {
				day.classList.add('day__current');
			}
			if (_h.isGreaterThan(itm, curDay)) {
				day.classList.add('sm-nodata-day');
			}
			week.appendChild(day);
		});

		dayCur = calGrid.querySelector('.day__current');
		if (dayCur && initial) {
			dayCur.parentElement.classList.add('week__current');
			indexObj.weekIdx = _h.getIndex(calGrid.querySelectorAll('.week'), calGrid.querySelector('.week__current'));
			curWeekSave = indexObj.weekIdx;
			initial = !initial;
		}
		drawMonthSlider(month);
	}

	/**
	 * Draws weekView, accepts index of week to draw.
	 */
	function drawWeekView(idx) {
		var weekDay,
			dateSpan,
			daySpan,
			week = datesSplit[idx];

		if (weekView.firstChild) weekView.innerHTML = '';

		week.forEach(function (itm) {
			weekDay = _h.createElem('li', 'cal-lg-day');
			dateSpan = _h.createElem('span', 'cal-lg-date', itm.getDate());
			daySpan = _h.createElem('span', 'cal-lg-day-wk', _h.getDayOfWeek(itm));

			if (_h.areDatesEqual(itm, curDay)) weekDay.classList.add('lg-current-day');
			if (_h.isGreaterThan(itm, curDay)) weekDay.classList.add('lg-nodata-day');

			weekDay.appendChild(dateSpan);
			weekDay.appendChild(daySpan);
			weekDay.insertAdjacentHTML('beforeEnd', '<i class="fa fa-circle fa-5x icon-data" aria-hidden="true"><span>' + _h.rand(1000, 10000) + '</span></i><ul class="container add-position"><li class="cal-day-data">Sleep<span class="data-line"></span></li><li class="cal-day-data">Burned Cal.<span class="data-line"></li><li class="cal-day-data">Run<span class="data-line"></li></ul>');
			weekDay.insertAdjacentHTML('beforeEnd', '<a class="dummy-overlay"></a>');
			weekView.appendChild(weekDay);
		});

		drawWeekSlider(week[0], week[week.length - 1]);
	}

	/**
	 * Selects week in calendar grid.
	 */
	function selectWeek(idx, cb) {
		var weeks = calGrid.querySelectorAll('.week');

		[].slice.call(weeks).forEach(function (item, index) {
			if (idx === index && !_h.hasClass(item, 'week__current')) {
				item.classList.add('week__current');
			} else {
				item.classList.remove('week__current');
			}
		});
		cb(idx);
	}

	/**
	 * Selects day by index in weekview.
	 */
	function selectDay(idx) {
		var daySelected = weekView.querySelectorAll('.cal-lg-day')[idx];
		setTimeout(function () {
			_h.toggleClass(daySelected, 'selected');
		}, 200);
	}

	/**
	 * Toggles week on click.
	 */
	function toggleWeek(int) {
		indexObj.weekIdx += int;
		selectWeek(indexObj.weekIdx, drawWeekView);
	}

	/**
	 * Toggles month on click.
	 */
	function toggleMonth(int) {
		curMonth = (int === 1) ? _h.getNextMonth(curMonth) : _h.getPrevMonth(curMonth);
		drawMonthView(curMonth);
		indexObj.weekIdx = (int === 1) ? 0 : datesSplit.length - 1;
		selectWeek(indexObj.weekIdx, drawWeekView);
		recalcCanvasWidth();
	}

	/**
	 * Sets 3 indexes, week,day, day index in week
	 */
	function setWeekAndDayIndexes(date) {
		var weekCount = -1,
			idxInWeek = -1;
		dates.forEach(function (item, index) {
			if (index === 0 || index % 7 === 0) {
				weekCount++;
			}
			if (idxInWeek === 6) {
				idxInWeek = -1;
			}
			idxInWeek++;
			if (_h.areDatesEqual(item, date)) {
				indexObj.dayIdx = index;
				indexObj.weekIdx = weekCount;
				indexObj.dayIndexInWeek = idxInWeek;
			}
		});
	}

	/**
	 * Constructs date from ISOString.
	 * keypress ("Enter") displays searched date in the calendar
	 */
	function searchDate(evt) {
		var date,
			key = evt.keyCode ? evt.keyCode : evt.which,
			dateStr = evt.currentTarget.value;

		date = (_h.isISOString(dateStr) && _h.isValidDate(dateStr)) ? _h.constructDate(dateStr) : null;

		if (date && key === 13) {
			drawMonthView(date);
			setWeekAndDayIndexes(date);
			if (!_h.isGreaterThan(date, curDay) || _h.areDatesEqual(date, curDay)) {
				selectWeek(indexObj.weekIdx, drawWeekView);
				selectDay(indexObj.dayIndexInWeek);
			} else {
				selectWeek(indexObj.weekIdx, drawWeekView);
			}
		}
		recalcCanvasWidth();
	}

	/**
	 * Recalculate chart width on window resize. On current week it should end where current day ends,
	 * on other weeks it should be equal to the size of weekview.
	 */
	function recalcCanvasWidth() {
		var clientRight,
			chartWidth,
			curDay = weekView.querySelector('.lg-current-day'),
			viewportWidth = document.documentElement.clientWidth,
			weekViewWidth = weekView.clientWidth;

		if (curDay) {
			clientRight = curDay.getBoundingClientRect().right;
			chartWidth = weekViewWidth - (viewportWidth - clientRight);
			canvas.style.width = chartWidth + 'px';
		} else {
			canvas.style.width = weekViewWidth + 'px';
		}
	}

	/**
	 * Adds event listeners to DOM objects.
	 */
	function initEvents() {
		var afterResize;

		/**
		 * On load removes loader, and clicks on a current day in calendar.
		 */
		window.addEventListener('load', function () {
			setTimeout(function () {
				_h.toggleClass(loader, 'loaded');
				_h.triggerClick(todayBtn);
			}, 1000);
		}, false);

		/**
		 * On resize end recalculate width of chart.
		 */
		window.addEventListener('resize', function () {
			clearTimeout(afterResize);
			afterResize = setTimeout(function () {
				recalcCanvasWidth();
			}, 100);
		}, false);

		/**
		 * Switch to previous week, and to previous month if no more weeks in month.
		 */
		prevWeekBtn.addEventListener('click', function () {
			var curWeek = calGrid.querySelector('.week__current');
			if (!curWeek.previousElementSibling) {
				toggleMonth(-1);
			} else {
				toggleWeek(-1);
			}
			recalcCanvasWidth();
		}, false);

		/**
		 * Switch to next week, and next month if no more weeks in month.
		 */
		nextWeekBtn.addEventListener('click', function () {
			var curWeek = calGrid.querySelector('.week__current');
			if (!curWeek.nextElementSibling) {
				toggleMonth(1);
			} else {
				toggleWeek(1);
			}
			recalcCanvasWidth();
		}, false);

		/**
		 * Switch to previous month.
		 */
		prevMonthBtn.addEventListener('click', function () {
			toggleMonth(-1);
			recalcCanvasWidth();
		}, false);

		/**
		 * Switch to next month.
		 */
		nextMonthBtn.addEventListener('click', function () {
			toggleMonth(1);
			recalcCanvasWidth();
		}, false);

		/**
		 * Clicking on today button displays/switches to current day and week.
		 */
		todayBtn.addEventListener('click', function () {
			drawMonthView(curMonthSave);
			selectWeek(curWeekSave, drawWeekView);
			recalcCanvasWidth();
		}, false);

		/**
		 * Clicking on search icon, focuses on search field
		 * and adds active class to parent container.
		 */
		searchLink.addEventListener('click', function (evt) {
			evt.preventDefault();
			searchField.focus();
			_h.toggleClass(evt.currentTarget.parentElement, 'active-search');
		});

		/**
		 * Clear searchfield on blur and remove active class
		 */
		searchField.addEventListener('blur', function (evt) {
			evt.currentTarget.value = '';
			evt.currentTarget.parentElement.classList.remove('active-search');
		});

		/**
		 * On keypress perform search
		 */
		searchField.addEventListener('keypress', function (evt) {
			searchDate(evt);
		}, false);

		document.addEventListener('click', function (evt) {
			evt.preventDefault();
			var target = evt.target,
				targetParent = target.parentElement,
				dayIdx = _h.getIndex(calGrid.querySelectorAll('.day'), target),
				lgDay = weekView.querySelector('.lg-current-day');

			/**
			 * Clicking on a day in the calendar, makes week
			 * of selected day current and displays selected day in the week view.
			 */
			if (_h.hasClass(target, 'day') && !_h.hasClass(target, 'sm-nodata-day')) {
				setWeekAndDayIndexes(dates[dayIdx]);
				if (!_h.hasClass(targetParent, 'week__current')) {
					selectWeek(indexObj.weekIdx, drawWeekView);
				}
				selectDay(indexObj.dayIndexInWeek);
				recalcCanvasWidth();
			}
			/**
			 * Displays current date and week,
			 * toggles "selected" class on large day in the week view with timeout.
			 */
			if (target.className === 'choose-today') {
				setTimeout(function () {
					_h.toggleClass(lgDay, 'selected');
				}, 200);
			}

			/**
			 * Clicking on a large day in week view toggles "selected" class.
			 */
			if (target.className === 'dummy-overlay') {
				_h.toggleClass(targetParent, 'selected');
			}
		}, false);
	}

	init();

}(window));
