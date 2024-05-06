import { useMemo, useRef } from "react";
import { Group } from "@visx/group";
import { Circle } from "@visx/shape";
import { scaleLinear } from "@visx/scale";
import genRandomNormalPoints from "@visx/mock-data/lib/generators/genRandomNormalPoints";
import PropTypes from "prop-types";

function DotsChart({ width, height, bgColour, pathsColour }) {
	const margin = {
		top: height * 0.08,
		right: width * 0.04,
		bottom: height * 0.08,
		left: width * 0.04,
	};
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const points = genRandomNormalPoints(300, /* seed= */ 0.5).filter(
		(_, i) => i < 300
	);

	const x = (d) => d[0];
	const y = (d) => d[1];

	const svgRef = useRef(null);

	let xScale;
	if (innerWidth >= 10) {
		xScale = scaleLinear({
			domain: [Math.min(...points.map(x)), Math.max(...points.map(x))],
			range: [0, innerWidth],
			clamp: true,
		});
	}

	const yScale = useMemo(
		() =>
			scaleLinear({
				domain: [Math.min(...points.map(y)), Math.max(...points.map(y))],
				range: [innerHeight, 0],
				clamp: true,
			}),
		[innerHeight, points]
	);

	return (
		<svg width={width} height={height} ref={svgRef}>
			{/** capture all mouse events with a rect */}
			<rect width={width} height={height} rx={14} fill={bgColour} />
			<Group top={margin.top} left={margin.left} pointerEvents="none">
				{points.map((point, i) => (
					<Circle
						key={`point-${point[0]}-${i}`}
						className="dot"
						cx={xScale(x(point))}
						cy={yScale(y(point))}
						r={i % 3 === 0 ? 2 : 3}
						fill={pathsColour}
					/>
				))}
			</Group>
		</svg>
	);
}

DotsChart.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	showControls: PropTypes.bool,
	hideTooltip: PropTypes.func.isRequired,
	showTooltip: PropTypes.func.isRequired,
	tooltipOpen: PropTypes.bool.isRequired,
	tooltipData: PropTypes.any,
	tooltipLeft: PropTypes.number,
	tooltipTop: PropTypes.number,
	bgColour: PropTypes.string,
	pathsColour: PropTypes.string,
};

export default DotsChart;
