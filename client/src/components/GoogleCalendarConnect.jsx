// import { useEffect, useState, Fragment } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setCalendarConnected } from "../redux/slices/userSlice";
// import { Dialog, Transition } from "@headlessui/react";

// function GoogleCalendarConnect() {
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();
// 	const [isModalOpen, setIsModalOpen] = useState(false);

// 	const [isGoogleClientLoaded, setIsGoogleClientLoaded] = useState(false);

// 	useEffect(() => {
// 		const script = document.createElement("script");
// 		script.src = "https://accounts.google.com/gsi/client";
// 		script.onload = () => {
// 			window.google.accounts.id.initialize({
// 				client_id:
// 					"361145171357-jit0q5rkspib1ia8mcsnj2dfh1uqis51.apps.googleusercontent.com",
// 				callback: handleCredentialResponse,
// 			});
// 			setIsGoogleClientLoaded(true); // Set the state variable to true when the script has loaded
// 		};
// 		document.body.appendChild(script);
// 	}, []);

// 	useEffect(() => {
// 		if (isGoogleClientLoaded) {
// 			// Only call handleAuthClick if the Google client has loaded
// 			handleAuthClick();
// 		}
// 	}, [isGoogleClientLoaded]); // Add isGoogleClientLoaded as a dependency

// 	const handleCredentialResponse = (response) => {
// 		// handle the response from Google Identity Services
// 		if (response.error) {
// 			console.log(response.error);
// 			return;
// 		}

// 		// Check if the user is signed in
// 		if (response.credential) {
// 			dispatch(setCalendarConnected(true));
// 			setIsModalOpen(true); // set isModalOpen to true when the calendar is connected
// 		}
// 	};

// 	const handleAuthClick = () => {
// 		window.google.accounts.id.prompt(); // prompt the user to sign in
// 	};

// 	useEffect(() => {
// 		handleAuthClick();
// 	}, []);

// 	const closeModalAndNavigate = () => {
// 		setIsModalOpen(false);
// 		setTimeout(() => {
// 			navigate("/schedulizer/services");
// 		}, 4000);
// 	};

// 	return (
// 		<div>
// 			<Transition appear show={isModalOpen} as={Fragment}>
// 				<Dialog
// 					as="div"
// 					className="pattern-topography-[#FAF8ED]/40 pattern-topography-scale-[0.5] z-10 fixed inset-0 bg-indigo-600 overflow-y-auto"
// 					onClose={closeModalAndNavigate}
// 				>
// 					<div className="min-h-screen text-center">
// 						<Dialog.Overlay className="fixed" />
// 						<span
// 							className="inline-block h-screen align-middle"
// 							aria-hidden="true"
// 						>
// 							&#8203;
// 						</span>
// 						<Dialog.Description
// 							as="div"
// 							className="inline-block bg-[#FAF8ED] my-8 p-12 rounded-2xl w-full max-w-lg text-center transform transition-all overflow-hidden align-middle"
// 						>
// 							<Dialog.Title
// 								as="h1"
// 								className="font-bebas font-semibold text-5xl text-indigo-500 leading-2"
// 							>
// 								Sign In Successful!
// 							</Dialog.Title>
// 							<div className="mt-2">
// 								<p className="font-poppins text-black text-sm">
// 									You will be redirected to the services provided by our
// 									platform shortly. Thank you for signing in!
// 								</p>
// 							</div>
// 						</Dialog.Description>
// 					</div>
// 				</Dialog>
// 			</Transition>
// 		</div>
// 	);
// }

// export default GoogleCalendarConnect;

import {
	GoogleOAuthProvider,
	GoogleLogin,
	useGoogleOneTapLogin,
	useGoogleLogin,
	googleLogout,
} from "@react-oauth/google";

const GoogleAuthComponent = () => {
	// Callback function for successful login
	const handleSuccess = (credentialResponse) => {
		console.log("Login successful:", credentialResponse);
	};

	// Callback function for login failure
	const handleError = () => {
		console.log("Login failed");
	};

	// One-tap login
	useGoogleOneTapLogin({
		onsuccess: handleSuccess,
		onerror: handleError,
	});

	// Custom login using implicit flow
	const loginImplicit = useGoogleLogin({
		onsuccess: (tokenResponse) =>
			console.log("Implicit Flow Token Response:", tokenResponse),
		onerror: handleError,
	});

	// Handle custom login button click
	const handleCustomLogin = () => {
		loginImplicit(); // For implicit flow
		// OR
		// loginAuthCode(); // For authorization code flow
	};

	// Handle logout
	const handleLogout = () => {
		googleLogout();
		console.log("Logged out");
	};

	return (
		<GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
			{" "}
			{/* Replace YOUR_CLIENT_ID with your actual client ID */}
			<div>
				<GoogleLogin
					onsuccess={handleSuccess}
					onerror={handleError}
					useOneTap
					autoSelect
				/>
				<button onClick={handleCustomLogin}>Sign In with Google 🚀</button>
				<button onClick={handleLogout}>Logout</button>
			</div>
		</GoogleOAuthProvider>
	);
};

export default GoogleAuthComponent;
