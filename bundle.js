(function e(t, n, r) {
	function s(o, u) {
		if (!n[o]) {
			if (!t[o]) {
				var a = typeof require == "function" && require;
				if (!u && a) return a(o, !0);
				if (i) return i(o, !0);
				var f = new Error("Cannot find module '" + o + "'");
				throw f.code = "MODULE_NOT_FOUND", f
			}
			var l = n[o] = {
				exports: {}
			};
			t[o][0].call(l.exports, function (e) {
				var n = t[o][1][e];
				return s(n ? n : e)
			}, l, l.exports, e, t, n, r)
		}
		return n[o].exports
	}
	var i = typeof require == "function" && require;
	for (var o = 0; o < r.length; o++) s(r[o]);
	return s
})({
	1: [
		function (require, module, exports) {
			var _h = require('./lib.js');

			(function () {
				'use strict';
				var canvas = document.getElementById('chart');
				var lChart,
					ctx,
					line1,
					line2,
					line3,
					line4,
					data,
					options,
					arr = [],
					arr2 = [],
					arr3 = [];

				function randomize() {
					for (var i = 0; i < 7; i++) {
						arr.push(_h.rand(1, 5));
						arr2.push(_h.rand(8, 15));
						arr3.push(_h.rand(10, 17));
					}
				}

				line1 = {
					label: 'yellow',
					backgroundColor: 'rgba(238, 215, 83, 1)',
					borderColor: 'rgba(0,0,0,0)',
					pointBorderColor: 'rgba(0,0,0,0)',
					pointRadius: 0,
					data: arr,
				};

				line2 = {
					label: 'viovar',
					backgroundColor: 'rgba(136, 153, 246, 0.9)',
					borderColor: 'rgba(0,0,0,0)',
					pointBorderColor: 'rgba(0,0,0,0)',
					pointRadius: 0,
					data: arr2,
				};

				line3 = {
					label: 'green',
					backgroundColor: 'rgba(67, 208, 227, 1)',
					borderColor: 'rgba(0,0,0,0)',
					pointBorderColor: 'rgba(0,0,0,0)',
					pointRadius: 0,
					data: arr3,
				};

				line4 = {
					label: 'heart rate',
					fill: false,
					lineTension: 0.3,
					backgroundColor: 'rgba(75,192,192,0.4)',
					borderColor: 'rgba(233, 141, 227, 1)',
					pointBorderColor: 'rgba(0,0,0,0)',
					pointRadius: 0,
					data: [20, 22, 20, 20, 22, 20, 12],
				};

				data = {
					labels: ['a', 'b', 'c'],
					datasets: [line4],
				};

				options = {
					responsive: false,
					maintainAspectRatio: true,
					title: {
						display: false,
					},
					legend: {
						display: false,
					},
					tooltips: {
						enabled: false,
					},
					animation: {
						duration: 1300,
						easing: 'easeOutQuart',
					},
					scales: {
						xAxes: [{
							display: false,
						}],
						yAxes: [{
							display: false,
						}],
					},
				};

				randomize();

				ctx = canvas.getContext('2d');

				lChart = new Chart(ctx, {
					type: 'line',
					data: data,
					options: options
				});

				setTimeout(function () {
					lChart.chart.config.data.datasets.unshift(line3);
					lChart.update();
					setTimeout(function () {
						lChart.chart.config.data.datasets.unshift(line2);
						lChart.update();
						setTimeout(function () {
							lChart.chart.config.data.datasets.unshift(line1);
							lChart.update();
						}, 500);
					}, 400);
				}, 300);

			}());
		}, {
			"./lib.js": 2
		}
	],
	2: [
		function (require, module, exports) {
			'use strict';
			module.exports = {
				constructDate: function (dateString) {
					var dat;
					if (this.isISOString(dateString)) {
						dat = dateString.slice(0, 10).split('-');
						dat[1]--;
					}
					return new(Function.prototype.bind.apply(Date, [null].concat(dat)));
				},
				copyDate: function (date) {
					return new Date(date.valueOf());
				},
				getNextMonth: function (date) {
					return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
				},
				getPrevMonth: function (date) {
					return new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
				},
				getCurrentMondayOfWeek: function (date) {
					var d = this.copyDate(date);
					return new Date(d.setDate((d.getDate() - (d.getDay() + 6) % 7)));
				},
				getNextMondayOfWeek: function (date) {
					var d = this.copyDate(date);
					return new Date(d.setDate((d.getDate() - (d.getDay() + 6) % 7) + 7));
				},
				getLastDayOfWeek: function (date) {
					var d = this.copyDate(date);
					return new Date(d.setDate((d.getDate() - (d.getDay() + 6) % 7) + 6));
				},
				getPreviousMondayOfWeek: function (date) {
					var d = this.copyDate(date);
					return new Date(d.setDate((d.getDate() - (d.getDay() + 6) % 7) - 7));
				},
				getFirstDayOfYear: function (date) {
					return new Date(date.getFullYear(), 0, 1);
				},
				getLastDayOfMonth: function (date) {
					return new Date(date.getFullYear(), date.getMonth() + 1, 0);
				},
				getFirstDayOfMonth: function (date) {
					return new Date(date.getFullYear(), date.getMonth(), 1);
				},
				getMonthName: function (date) {
					var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
						'July', 'August', 'September', 'October', 'November', 'December'
					];
					return monthNames[new Date(date).getMonth()];
				},
				getDayOfWeek: function (date) {
					var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
					return weekDays[date.getDay()].toUpperCase();
				},
				addDays: function (date, days) {
					return new Date(date.setDate(date.getDate() + days));
				},
				isValidDate: function (dateString) {
					if (!isNaN(new Date(dateString).valueOf())) {
						return true;
					} else {
						throw new Error("Date is not valid");
					}
				},
				isValidRange: function (startDate, endDate) {
					if (new Date(startDate) >= new Date(endDate)) {
						throw new Error("Date range is not valid");
					} else {
						return true;
					}
				},
				isISOString: function (dateString) {
					return !!dateString.match(
						/((((\d{4})(-((0[1-9])|(1[012])))(-((0[1-9])|([12]\d)|(3[01]))))(T((([01]\d)|(2[0123]))((:([012345]\d))((:([012345]\d))(\.(\d+))?)?)?)(Z|([\+\-](([01]\d)|(2[0123]))(:([012345]\d))?)))?)|(((\d{4})((0[1-9])|(1[012]))((0[1-9])|([12]\d)|(3[01])))(T((([01]\d)|(2[0123]))(([012345]\d)(([012345]\d)(\d+)?)?)?)(Z|([\+\-](([01]\d)|(2[0123]))([012345]\d)?)))?))/);
				},
				compareMonths: function (date1, date2) {
					return date1.getMonth() === date2.getMonth();
				},
				isGreaterThan: function (item, curDay) {
					return new Date(item.setHours(0, 0, 0, 0)).getTime() > new Date(curDay.setHours(0, 0, 0, 0)).getTime();
				},
				areDatesEqual: function (item, curDay) {
					return new Date(item.setHours(0, 0, 0, 0)).getTime() === new Date(curDay.setHours(0, 0, 0, 0)).getTime();
				},
				calendarGenerator: function (month) {
					var datesArray = [];

					var start = this.getCurrentMondayOfWeek(this.getFirstDayOfMonth(month));
					var end = this.getLastDayOfWeek(this.getLastDayOfMonth(month));

					for (var date = start; date <= end; date.setDate(date.getDate() + 1)) {
						datesArray.push(new Date(date));
					}
					return datesArray;
				},
				createElem: function (tagName, elemClass, text) {
					var el;
					if (tagName) el = document.createElement(tagName);
					if (elemClass) el.classList.add(elemClass);
					if (text) el.textContent = text;
					return el;
				},
				getIndex: function (elemList, elem) {
					return [].slice.call(elemList).indexOf(elem);
				},
				hasClass: function (elem, c) {
					return elem.classList.contains(c);
				},
				toggleClass: function (elem, c) {
					return this.hasClass(elem, c) ? elem.classList.remove(c) : elem.classList.add(c);
				},
				triggerClick: function (elem) {
					var event = new MouseEvent('click', {
						view: window,
						bubbles: true,
						cancelable: true
					});
					return !elem.dispatchEvent(event);
				},
				rand: function (min, max) {
					return Math.round(min - 0.5 + Math.random() * (max - min + 1));
				},
				splitArr: function (arr, n) {
					return arr.reduce(function (a, i) {
						if (a[a.length - 1].length >= arr.length / n) {
							a.push([]);
						}
						a[a.length - 1].push(i);
						return a;
					}, [
						[]
					]);
				}
			};
		}, {}
	],
	3: [
		function (require, module, exports) {
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
				 * Initializes calendar.
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
						// console.log('dayIndex: ' + index + ' weekIndex: ' + weekCount + ' indexInWeek: ' + idxInWeek + ' date: ' + item);
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
		}, {
			"./charts": 1,
			"./lib": 2
		}
	]
}, {}, [3]);