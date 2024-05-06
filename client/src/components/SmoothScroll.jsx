import { useEffect } from "react";
import Scrollbar from "smooth-scrollbar";
import OverscrollPlugin from "smooth-scrollbar/plugins/overscroll";

function SmoothScroll() {
	useEffect(() => {
		const options = {
			damping: 0.15,
			renderByPixels: true,
			alwaysShowTracks: false,
			continuousScrolling: true,
			plugins: {
				overscroll: {
					enable: true,
					effect: "bounce",
					damping: 0.2,
					maxOverscroll: 30,
				},
			},
		};

		Scrollbar.use(OverscrollPlugin);
		const scrollbar = Scrollbar.init(
			document.querySelector(".scroll-container"),
			options
		);

		return () => {
			if (scrollbar) scrollbar.destroy();
		};
	}, []);

	return null;
}

export default SmoothScroll;
