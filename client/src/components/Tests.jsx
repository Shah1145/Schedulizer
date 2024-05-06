import { animate, stagger } from "motion";
import { useEffect, useRef } from "react";

function Tests() {
	const hi1Ref = useRef(null);
	const hi2Ref = useRef(null);
	const hi3Ref = useRef(null);
	const handleMouseEnter = () => {
		animate(hi1Ref.current, { scale: [1.2] }, { duration: 1.5 });
	};

	const handleMouseLeave = () => {
		animate(hi1Ref.current, { scale: 1 }, { duration: 0.5 });
	};

	useEffect(() => {
		const elements = [hi2Ref.current, hi3Ref.current];
		animate(
			elements,
			{ scale: [0.2, 1.5, 1] },
			{ duration: 2.5, delay: stagger(1.5) }
		);
	}, []);

	return (
		<div className="ok flex min-h-screen flex-col items-center justify-center">
			<div>
				<h1
					ref={hi1Ref}
					className="hi1 text-center font-bebas text-9xl font-extrabold"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}>
					hello mr
				</h1>
				<h1
					ref={hi2Ref}
					className="hi2 text-center font-bebas text-9xl font-extrabold">
					hello hi
				</h1>
				<h1
					ref={hi3Ref}
					className="hi3 text-center font-bebas text-9xl font-extrabold">
					hello no
				</h1>
			</div>
		</div>
	);
}

export default Tests;
