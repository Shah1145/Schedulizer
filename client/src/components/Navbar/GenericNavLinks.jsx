import { Link, useLocation } from "react-router-dom";

function GenericNavLinks() {
	const location = useLocation();

	const isRouteActive = (path) => {
		return location.pathname === path;
	};

	const links = [
		{ path: "/schedulizer/", name: "home" },
		{ path: "/schedulizer/businesses", name: "businesses" },
		{ path: "/schedulizer/services", name: "services" },
	];

	return (
		<ul className="xl:flex lg:items-center lg:space-x-12 sm:hidden md:hidden lg:hidden xs:hidden lg:mx-auto lg:w-auto font-ptSansCaption">
			{links.map((link) => (
				<li key={link.path}>
					<Link
						className={`text-xs hover:underline hover:duration-300 hover:ease-in-out duration-500 ease-in-out hover:font-medium ${
							isRouteActive(link.path)
								? "text-indigo-500 font-medium underline-offset-4 underline hover:underline-offset-2"
								: "underline-offset-2 hover:underline-offset-4"
						}`}
						to={link.path}
					>
						{link.name}
					</Link>
				</li>
			))}
		</ul>
	);
}

export default GenericNavLinks;
