import { useSpring, animated, config } from "@react-spring/web";

function CustomerSatisfaction() {
	const { dashOffset } = useSpring({
		dashOffset: 78.54,
		from: { dashOffset: 785.4 },
		config: config.molasses,
	});

	const map = (value, sMin, sMax, dMin, dMax) =>
		dMin + ((value - sMin) / (sMax - sMin)) * (dMax - dMin);
	const pi = Math.PI;
	const tau = 2 * pi;

	const percentage = 97.78;

	return (
		<div className="w-max items-center flex flex-col">
			<div className="flex flex-col items-center justify-center">
				<h3 className="font-poppins text-2xl font-bold text-black">
					Customer Satisfaction
				</h3>
			</div>
			<div className="flex justify-center">
				<svg
					viewBox="0 0 700 380"
					fill="none"
					width="300"
					xmlns="http://www.w3.org/2000/svg"
					id="svg">
					<path
						d="M100 350C100 283.696 126.339 220.107 173.223 173.223C220.107 126.339 283.696 100 350 100C416.304 100 479.893 126.339 526.777 173.223C573.661 220.107 600 283.696 600 350"
						stroke="#E0E7FF"
						strokeWidth="40"
						strokeLinecap="round"
					/>
					<animated.path
						d="M100 350C100 283.696 126.339 220.107 173.223 173.223C220.107 126.339 283.696 100 350 100C416.304 100 479.893 126.339 526.777 173.223C573.661 220.107 600 283.696 600 350"
						stroke="#6366F1"
						strokeWidth="40"
						strokeLinecap="round"
						strokeDasharray="785.4"
						strokeDashoffset={dashOffset}
						id="svgPath"
						className="svgPath"
					/>

					<animated.circle
						cx={dashOffset.to(
							(x) => 350 + 250 * Math.cos(map(x, 785.4, 0, pi, tau))
						)}
						cy={dashOffset.to(
							(x) => 350 + 250 * Math.sin(map(x, 785.4, 0, pi, tau))
						)}
						r="12"
						fill="white"
					/>
					<text
						x={350}
						y={330}
						textAnchor="middle"
						fill="#2f49d1"
						className="text-6xl font-bold">
						{percentage}%
					</text>
					<circle cx="140" cy="350" r="5" fill="#6366F1" />
					<circle
						cx="144.5890038459008"
						cy="306.3385449282706"
						r="5"
						fill="#6366F1"
					/>
					<circle
						cx="158.15545389505382"
						cy="264.58530495408195"
						r="5"
						fill="#6366F1"
					/>
					<circle
						cx="180.10643118126103"
						cy="226.56509701858067"
						r="5"
						fill="#6366F1"
					/>
					<circle
						cx="209.48257266463972"
						cy="193.93958664974724"
						r="5"
						fill="#6366F1"
					/>
					<circle
						cx="244.9999999999999"
						cy="168.1346652052679"
						r="5"
						fill="#6366F1"
					/>
					<circle
						cx="285.10643118126103"
						cy="150.27813157801776"
						r="5"
						fill="#6366F1"
					/>
					<circle
						cx="328.0490227137926"
						cy="141.15040197266262"
						r="5"
						fill="#6366F1"
					/>
					<circle
						cx="371.95097728620715"
						cy="141.1504019726626"
						r="5"
						fill="#6366F1"
					/>
					<circle
						cx="414.8935688187389"
						cy="150.27813157801774"
						r="5"
						fill="#6366F1"
					/>
					<circle
						cx="454.9999999999999"
						cy="168.1346652052678"
						r="5"
						fill="#6366F1"
					/>
					<circle
						cx="490.51742733536014"
						cy="193.93958664974713"
						r="5"
						fill="#6366F1"
					/>
					<circle
						cx="519.8935688187389"
						cy="226.5650970185806"
						r="5"
						fill="#6366F1"
					/>
					<circle
						cx="541.8445461049462"
						cy="264.58530495408183"
						r="5"
						fill="#6366F1"
					/>
					<circle
						cx="555.4109961540992"
						cy="306.33854492827044"
						r="5"
						fill="#6366F1"
					/>
					<circle cx="560" cy="349.99999999999994" r="5" fill="#6366F1" />
				</svg>
			</div>

			<div className="flex justify-center">
				<div
					className="mt-2 flex items-baseline justify-between"
					style={{ width: "300px" }}>
					<div style={{ width: "50px", paddingLeft: "16px" }}>0%</div>
					<div className="font-ptSansCaption font-semibold">
						Based on Ratings
					</div>
					<div style={{ width: "50px" }}>100%</div>
				</div>
			</div>
			<h3 className="font-muktaVaani text-lg font-thin text-center py-4">
				from all appointments
			</h3>
		</div>
	);
}

export default CustomerSatisfaction;
