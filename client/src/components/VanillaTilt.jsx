import { useEffect, useRef } from "react";
import VanillaTiltOi from "vanilla-tilt";

import PropTypes from "prop-types";

function VanillaTilt(props) {
	const { options, children } = props;
	const tiltRef = useRef(null);

	useEffect(() => {
		const currentRef = tiltRef.current;
		VanillaTiltOi.init(currentRef, options);
		return () => currentRef.vanillaTilt.destroy();
	}, [options]);

	return <div ref={tiltRef}>{children}</div>;
}

VanillaTilt.propTypes = {
	options: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};

export default VanillaTilt;
