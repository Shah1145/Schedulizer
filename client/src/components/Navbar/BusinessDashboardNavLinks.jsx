import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function BusinessDashboardNavLinks() {
	const selectedBusiness = useSelector((state) => state.business.businessData);

	const businessName = selectedBusiness?.name;
	const location = useLocation();

	const isRouteActive = (path) => {
		return location.pathname === path;
	};

	const links = [
		{
			path: `/schedulizer/businessDashboard/${businessName}`,
			name: "dashboard",
		},
		{
			path: `/schedulizer/businessDashboard/${businessName}/services`,
			name: "your services",
		},
		{
			path: `/schedulizer/businessDashboard/${businessName}/appointments`,
			name: "appointments",
		},
		{
			path: `/schedulizer/businessDashboard/${businessName}/analytics`,
			name: "analytics",
		},
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

export default BusinessDashboardNavLinks;
