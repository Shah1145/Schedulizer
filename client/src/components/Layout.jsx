import PropTypes from "prop-types";
import Navbar from "./navbar/Navbar";
import BackToTopButton from "./BackToTopButton";
import SmoothScroll from "./SmoothScroll";

function Layout({ children }) {
	return (
		<div className="flex flex-col min-h-screen">
			<SmoothScroll />
			<Navbar />
			<div
				className="pattern-topography-darkieGreen/10 pattern-topography-scale-[0.5] flex-grow bg-[#FAF8ED] bg-center bg-fixed scroll-container"
				// style={{ backgroundImage: "url('./images/parallax5.webp')" }}
			>
				{children}
			</div>
			<BackToTopButton />
		</div>
	);
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
