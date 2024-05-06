import { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";

function BackToTopButton() {
	const [isVisible, setIsVisible] = useState(true); // Set initial state to true
	const timeoutRef = useRef(null);

	const toggleVisibility = () => {
		const scrolledBeyondViewport = window.scrollY > window.innerHeight;
		setIsVisible(scrolledBeyondViewport);

		// Clear the existing timeout if there is one
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		// Set a new timeout to hide the button after 4 seconds
		if (scrolledBeyondViewport) {
			timeoutRef.current = setTimeout(() => {
				setIsVisible(false);
			}, 4000);
		}
	};

	useEffect(() => {
		toggleVisibility(); // Call once to check initial scroll position
		window.addEventListener("scroll", toggleVisibility);
		return () => {
			window.removeEventListener("scroll", toggleVisibility);
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => {
			window.removeEventListener("scroll", toggleVisibility);
		};
	}, []);

	const springs = useSpring({
		from: {
			opacity: 1,
			transform: "translate3d(0, 0, 0)",
			pointerEvents: "auto",
		},
		to: {
			opacity: isVisible ? 1 : 0,
			transform: `translate3d(0, ${isVisible ? 0 : 30}px, 0)`,
			pointerEvents: isVisible ? "auto" : "none",
		},
	});

	return (
		<animated.div style={springs} className="right-4 bottom-4 z-auto fixed">
			<button
				onClick={scrollToTop}
				className="flex justify-between items-center gap-4 bg-indigo-500 hover:bg-indigo-600 opacity-90 px-4 py-2 rounded-full font-light font-ptSansCaption text-[#FAF8ED] text-xs transition-colors duration-200"
			>
				{/* <svg
					xmlns="http://www.w3.org/2000/svg"
					fill="white"
					height="1.25em"
					viewBox="0 0 448 512">
					<path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
				</svg> */}
				BACK TO TOP
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 384 512"
					fill="#FAF8ED"
					height="1rem"
				>
					<path d="M32 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c53 0 96-43 96-96l0-306.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 416c0 17.7-14.3 32-32 32l-96 0z" />
				</svg>
			</button>
		</animated.div>
	);
}

export default BackToTopButton;
