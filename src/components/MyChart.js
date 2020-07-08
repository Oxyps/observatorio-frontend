import React, { useEffect, createRef } from 'react';

import Chart from 'chart.js';

export default function MyChart(props) {
	const canvasRef = createRef(null);

	useEffect(() => {
		new Chart(
			canvasRef.current, {
				type: props.type,
				options: props.options,
				data: {
					labels: props.data.labels,
					datasets: [{
						label: props.data.datasets[0].label,
						data: props.data.datasets[0].data,
						backgroundColor: props.color,
						pointRadius: 4,
						borderColor: props.color,
						borderWidth: 1,
						lineTension: 0
					}]
				}
			}
		);
	}, [props, canvasRef]);

	return <canvas height="190" ref={canvasRef} />
}
