import React, { useEffect, createRef } from 'react';

import Chart from 'chart.js';

export default function NewChart({ chartData, type, options }) {
	const canvasRef = createRef(null);

	// export right image
	function handleAfterRender(chart, options) {
		const ctx = chart.chart.ctx;
		// ctx.save();
		ctx.globalCompositeOperation = 'destination-over';
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, chart.chart.width, chart.chart.height);
		// ctx.restore();
	}

	useEffect(() => {
		new Chart(
			canvasRef.current, {
				plugins: [{
					afterRender: handleAfterRender
				}],
				type: type,
				options: options,
				data: {
					labels: chartData.labels,
					datasets: [{
						label: chartData.datasets[0].label,
						data: chartData.datasets[0].data,
						borderColor: chartData.color || '#000',
						// backgroundColor: chartData.color,
						fill: false,
						pointRadius: 3,
						borderWidth: 1,
						lineTension: 0,
					}]
				}
			}
		);
	});

	// useEffect(()=>{
	// 	console.log(chartData);
	// }, [chartData]);

	return <canvas height="400" width="850" ref={canvasRef} />
}
