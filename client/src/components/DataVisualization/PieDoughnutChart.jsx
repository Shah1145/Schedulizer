import Pie from "@visx/shape/lib/shapes/Pie";
import { scaleOrdinal } from "@visx/scale";
import { Group } from "@visx/group";
import {
	animated,
	useTransition,
	useSpring,
	interpolate,
} from "@react-spring/web";
import PropTypes from "prop-types";
import { lighten, rgba } from "polished";

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

function PieDoughnutChart({
	width,
	height,
	bgColour,
	margin = defaultMargin,
	animate = true,
	satisfactionPercentage = 0, // new prop
	pathsColour, // new prop
}) {
	// create two arcs: one for satisfied customers and one for unsatisfied customers
	const data = [
		{ label: "Satisfied", usage: satisfactionPercentage },
		{ label: "Unsatisfied", usage: 100 - satisfactionPercentage },
	];

	// accessor functions
	const usage = (d) => d.usage;

	// color scales
	const getColor = scaleOrdinal({
		domain: ["Satisfied", "Unsatisfied"],
		range: [rgba(pathsColour, 0.8), rgba(lighten(0.2, pathsColour), 0.4)], // use pathsColour and a lighter shade with 80% opacity
	});

	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	const radius = Math.min(innerWidth, innerHeight) / 2;
	const centerY = innerHeight / 2;
	const centerX = innerWidth / 2;
	const donutThickness = 50;

	// animate font size from 0 to calculated size
	const { fontSize } = useSpring({
		from: { fontSize: 0 },
		to: { fontSize: Math.min(width, height) * 0.09 },
		config: { tension: 80, friction: 20 }, // adjust animation parameters as needed
	});

	const shouldRender = width >= 10;

	if (!shouldRender) return null;

	return (
		<svg width={width} height={height}>
			<rect rx={14} width={width} height={height} fill={bgColour} />
			<Group top={centerY + margin.top} left={centerX + margin.left}>
				<Pie
					data={data}
					pieValue={usage}
					outerRadius={radius}
					innerRadius={radius - donutThickness}
					cornerRadius={3}
					padAngle={0.05}
				>
					{(pie) => (
						<AnimatedPie
							{...pie}
							animate={animate}
							getKey={(arc) => arc.data.label}
							getColor={(arc) => getColor(arc.data.label)}
						/>
					)}
				</Pie>

				{animate && (
					<animated.text
						x={0} // center relative to the Group
						y={0} // center relative to the Group
						textAnchor="middle" // center the text
						fill={pathsColour} // or any color you want for the text
						style={{ fontSize }} // use animated font size
						dy=".33em" // vertically center text
					>
						{`${satisfactionPercentage}%`}
					</animated.text>
				)}
			</Group>
		</svg>
	);
}

const fromLeaveTransition = ({ endAngle }) => ({
	// enter from 360° if end angle is > 180°
	startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
	endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
	opacity: 0,
});

const enterUpdateTransition = ({ startAngle, endAngle }) => ({
	startAngle,
	endAngle,
	opacity: 1,
});

function AnimatedPie({ animate, arcs, path, getKey, getColor, onClickDatum }) {
	const transitions = useTransition(arcs, {
		from: animate ? fromLeaveTransition : enterUpdateTransition,
		enter: enterUpdateTransition,
		update: enterUpdateTransition,
		leave: animate ? fromLeaveTransition : enterUpdateTransition,
		keys: getKey,
	});
	return transitions((props, arc, { key }) => {
		return (
			<g key={key}>
				<animated.path
					// compute interpolated path d attribute from intermediate angle values
					d={interpolate(
						[props.startAngle, props.endAngle],
						(startAngle, endAngle) =>
							path({
								...arc,
								startAngle,
								endAngle,
							})
					)}
					fill={getColor(arc)}
					onClick={() => onClickDatum(arc)}
					onTouchStart={() => onClickDatum(arc)}
				/>
			</g>
		);
	});
}

PieDoughnutChart.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	margin: PropTypes.shape({
		top: PropTypes.number,
		right: PropTypes.number,
		bottom: PropTypes.number,
		left: PropTypes.number,
	}),
	animate: PropTypes.bool,
	bgColour: PropTypes.string,
	pathsColour: PropTypes.string,
	satisfactionPercentage: PropTypes.number,
};

export default PieDoughnutChart;
