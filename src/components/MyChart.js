import React, { useEffect, createRef } from 'react';

import Chart from 'chart.js';

export default function MyChart({ chartData, type, options }) {
	const canvasRef = createRef(null);

	useEffect(() => {
		new Chart(
			canvasRef.current, {
				type: type,
				options: options,
				data: {
					labels: chartData.labels,
					datasets: [{
						label: chartData.datasets[0].label,
						data: chartData.datasets[0].data,
						backgroundColor: chartData.color,
						pointRadius: 4,
						borderColor: chartData.color,
						borderWidth: 1,
						lineTension: 0
					}]
				}
			}
		);
	});

	// useEffect(()=>{
	// 	console.log(chartData);
	// }, [chartData]);

	return <canvas height="190" ref={canvasRef} />
}
