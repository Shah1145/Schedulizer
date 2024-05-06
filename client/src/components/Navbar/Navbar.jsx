import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "../Button";
import GenericNavLinks from "./GenericNavLinks";
import BusinessDashboardNavLinks from "./BusinessDashboardNavLinks";
import Searchbar from "./Searchbar";
import { signOut } from "../../redux/slices/authSlice";
import { clearUser, setCalendarConnected } from "../../redux/slices/userSlice";
import { useCallback } from "react";
import { createSelector } from "reselect";
import { clearBusiness } from "../../redux/slices/businessSlice";
import logo from "/images/logo.png";
import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

function Navbar() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation(); // Add this line

	const isBusinessDashboard = location.pathname.includes(
		"/schedulizer/businessDashboard"
	);

	const selectAuth = (state) => state.auth;
	const selectBusiness = (state) => state.business;
	const selectUser = (state) => state.user; // Add this line

	const selector = createSelector(
		[selectAuth, selectUser, selectBusiness],
		(auth, user, business) => ({
			firstName: user.firstName,
			isBusinessRegistered: business.isBusinessRegistered,
			isLoading: auth.loading,
			businessId: business.businessData?._id,
			isUserSignedIn: user.isUserSignedIn,
			businessName: business.businessData?.name,
			isCalendarConnected: user.calendarConnected, // Add this line
		})
	);

	const {
		firstName,
		isBusinessRegistered,
		isLoading,
		businessName,
		isUserSignedIn,
		isCalendarConnected,
	} = useSelector(selector);

	const handleLogout = useCallback(() => {
		dispatch(signOut()); // dispatch logout action
		dispatch(clearUser()); // clear user data
		dispatch(clearBusiness()); // clear business data
		navigate("/schedulizer/"); // navigate to login page or wherever you want the user to go after logout
	}, [dispatch, navigate]);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [isGoogleClientLoaded, setIsGoogleClientLoaded] = useState(false);

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://accounts.google.com/gsi/client";
		script.onload = () => {
			window.google.accounts.id.initialize({
				client_id:
					"361145171357-jit0q5rkspib1ia8mcsnj2dfh1uqis51.apps.googleusercontent.com",
				callback: handleCredentialResponse,
			});
			setIsGoogleClientLoaded(true); // Set the state variable to true when the script has loaded
		};
		document.body.appendChild(script);
	}, []);

	useEffect(() => {
		if (isGoogleClientLoaded) {
			// Only call handleAuthClick if the Google client has loaded
			handleAuthClick();
		}
	}, [isGoogleClientLoaded]); // Add isGoogleClientLoaded as a dependency

	const handleCredentialResponse = (response) => {
		// handle the response from Google Identity Services
		if (response.error) {
			console.log(response.error);
			return;
		}

		// Check if the user is signed in
		if (response.credential) {
			dispatch(setCalendarConnected(true));
			setIsModalOpen(true); // set isModalOpen to true when the calendar is connected
		}
	};

	const handleAuthClick = () => {
		window.google.accounts.id.prompt(); // prompt the user to sign in
	};

	const closeModalAndNavigate = () => {
		setIsModalOpen(false);
		setTimeout(() => {
			navigate("/schedulizer/services");
		}, 4000);
	};

	return (
		<div
			className={`top-0 z-10 fixed bg-[#FAF8ED] drop-shadow-md px-4 w-full ${
				isBusinessDashboard ? "py-[6px]" : ""
			}`}
		>
			<nav className="flex justify-between items-center space-x-2 lg:space-x-4">
				<div className="flex flex-shrink-0 items-end">
					<img src={logo} alt="logo" className="mr-4 w-10 h-10" />
					<Link to="/schedulizer/">
						<span className="font-bebas font-medium text-3xl text-indigo-500 tracking-wide">
							Schedulizer
						</span>
					</Link>
				</div>

				{isBusinessDashboard ? (
					<BusinessDashboardNavLinks />
				) : (
					<GenericNavLinks />
				)}

				{!isLoading && (
					<div className="xl:lg:md:inline sm:hidden xs:hidden">
						{(() => {
							let buttonName, buttonLink;

							if (isBusinessDashboard) {
								buttonName = "SWITCH TO USER";
								buttonLink = `/schedulizer/services`;
							} else if (isBusinessRegistered) {
								buttonName = "SWITCH TO BUSINESS";
								buttonLink = `/schedulizer/businessDashboard/${businessName}`;
							} else if (isUserSignedIn) {
								buttonName = "ADD YOUR BUSINESS";
								buttonLink = "/schedulizer/businessregistration";
							}

							return buttonName ? (
								<Button buttonName={buttonName} buttonLink={buttonLink} />
							) : null;
						})()}
					</div>
				)}

				{!isLoading && (
					<div className="xl:lg:md:inline sm:hidden xs:hidden">
						{(() => {
							let buttonName;

							if (
								!isCalendarConnected &&
								isUserSignedIn &&
								!isBusinessRegistered
							) {
								// Add the condition here
								buttonName = "CONNECT GOOGLE CALENDAR";
								// buttonLink = "/schedulizer/googlecalendarconnect";
							}

							return buttonName ? (
								<Button buttonName={buttonName} onClick={handleAuthClick} />
							) : null;
						})()}
					</div>
				)}

				{!isBusinessDashboard && <Searchbar />}
				<div className="flex justify-between items-baseline space-x-8">
					<div className="flex items-center space-x-8">
						<a className="flex items-center" href="#">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="1.2rem"
								viewBox="0 0 448 512"
								fill="#6366F1"
								className="animate-infinite animate-wiggle animate-duration-[600ms] hover:animate-duration-[200ms]"
							>
								<path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
							</svg>
							<span className="absolute flex -mt-5 ml-4">
								<span className="inline-flex absolute bg-indigo-600 opacity-75 rounded-full w-3 h-3 animate-ping"></span>
								<span className="inline-flex relative bg-indigo-500 rounded-full w-3 h-3"></span>
							</span>
						</a>
					</div>

					<div className="md:flex lg:flex xl:flex items-center space-x-6 sm:hidden xs:hidden group">
						<div className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="1.2rem"
								fill="#6366F1"
								viewBox="0 0 512 512"
							>
								<path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" />
							</svg>

							<Link
								to={isUserSignedIn ? "/schedulizer/" : "/schedulizer/signin"}
							>
								<p
									className={`flex items-center justify-center px-2 font-ptSansCaption text-xs text-[#6366F1] ${
										isUserSignedIn
											? ""
											: "underline underline-offset-8 hover:underline-offset-4 duration-500 ease-in-out"
									}`}
								>
									{isUserSignedIn ? (
										// Display user's first name if available
										<>{firstName}</>
									) : (
										// If not logged in, display SignUp / SignIn
										"SignUp / SignIn"
									)}
								</p>
							</Link>
						</div>

						{firstName && (
							<span
								className="cursor-pointer logout hover:scale-105"
								onClick={handleLogout}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 576 512"
									height="1.2rem"
									fill="#6366F1"
								>
									<path d="M320 32c0-9.9-4.5-19.2-12.3-25.2S289.8-1.4 280.2 1l-179.9 45C79 51.3 64 70.5 64 92.5V448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H96 288h32V480 32zM256 256c0 17.7-10.7 32-24 32s-24-14.3-24-32s10.7-32 24-32s24 14.3 24 32zm96-128h96V480v32h32 64c17.7 0 32-14.3 32-32s-14.3-32-32-32H512V128c0-35.3-28.7-64-64-64H352v64z" />
								</svg>
							</span>
						)}
					</div>
				</div>
			</nav>

			<Transition appear show={isModalOpen} as={Fragment}>
				<Dialog
					as="div"
					className="pattern-topography-[#FAF8ED]/40 pattern-topography-scale-[0.5] z-10 fixed inset-0 bg-indigo-600 overflow-y-auto"
					onClose={closeModalAndNavigate}
				>
					<div className="min-h-screen text-center">
						<Dialog.Overlay className="fixed" />
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Dialog.Description
							as="div"
							className="inline-block bg-[#FAF8ED] my-8 p-12 rounded-2xl w-full max-w-lg text-center transform transition-all overflow-hidden align-middle"
						>
							<Dialog.Title
								as="h1"
								className="font-bebas font-semibold text-5xl text-indigo-500 leading-2"
							>
								Sign In Successful!
							</Dialog.Title>
							<div className="mt-2">
								<p className="font-poppins text-black text-sm">
									You will be redirected to the services provided by our
									platform shortly. Thank you for signing in!
								</p>
							</div>
						</Dialog.Description>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
}

export default Navbar;
