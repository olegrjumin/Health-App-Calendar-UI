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