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