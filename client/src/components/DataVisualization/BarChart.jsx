import { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import letterFrequency from "@visx/mock-data/lib/mocks/letterFrequency";
import { scaleBand, scaleLinear } from "@visx/scale";
import PropTypes from "prop-types";
import { rgba, lighten } from "polished";

function BarChart({ width, height, bgColour, pathsColour, events = false }) {
	const data = letterFrequency.slice(8);
	const verticalMargin = height * 0.2; // 20% of the height
	const horizontalMargin = width * 0.1; // 20% of the width

	// accessors
	const getLetter = (d) => d.letter;
	const getLetterFrequency = (d) => Number(d.frequency) * 100;

	// bounds
	const xMax = width - horizontalMargin;
	const yMax = height - verticalMargin;

	// scales, memoize for performance
	const xScale = useMemo(
		() =>
			scaleBand({
				range: [0, xMax],
				round: true,
				domain: data.map(getLetter),
				padding: 0.4,
			}),
		[xMax, data]
	);
	const yScale = useMemo(
		() =>
			scaleLinear({
				range: [yMax, 0],
				round: true,
				domain: [0, Math.max(...data.map(getLetterFrequency))],
			}),
		[yMax, data]
	);

	return (
		<svg width={width} height={height}>
			<rect width={width} height={height} fill={bgColour} rx={14} />
			<Group top={verticalMargin / 2} left={horizontalMargin / 2}>
				{data.map((d) => {
					const letter = getLetter(d);
					const barWidth = xScale.bandwidth();
					const barHeight = yMax - (yScale(getLetterFrequency(d)) ?? 0);
					const barX = xScale(letter);
					const barY = yMax - barHeight;
					const fill =
						d.frequency > 0.5
							? rgba(pathsColour, 0.8)
							: rgba(lighten(0.3, pathsColour), 0.8); // use pathsColour and a lighter shade with 80% opacity
					return (
						<Bar
							key={`bar-${letter}`}
							x={barX}
							y={barY}
							width={barWidth}
							height={barHeight}
							fill={fill}
							onClick={() => {
								if (events)
									alert(`clicked: ${JSON.stringify(Object.values(d))}`);
							}}
						/>
					);
				})}
			</Group>
		</svg>
	);
}

BarChart.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	events: PropTypes.bool,
	bgColour: PropTypes.string,
	pathsColour: PropTypes.string,
};

export default BarChart;
