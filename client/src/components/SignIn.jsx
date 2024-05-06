import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import InputField from "./form/InputField.jsx";
import Layout from "./Layout";
import axios from "axios";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { signInRequest, signInSuccess } from "../redux/actions/authActions";
import PropTypes from "prop-types";
import { setUser } from "../redux/slices/userSlice.js";
import { jwtDecode } from "jwt-decode";
import TransitionModal from "./TransitionModal";
import { fetchUserBusinesses } from "../redux/slices/businessSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function SignIn({ signInRequest, signInSuccess }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [emailError, setEmailError] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const validateEmail = (value) => {
		if (!value.trim()) {
			setEmailError("Email cannot be empty. Please fill this out.");
			return false;
		}

		const error = {
			atSymbolError: "Email should have exactly one '@' symbol.",
			domainError: "Email domain should end with '.com'.",
		};

		const emailParts = value.split("@");
		if (emailParts.length !== 2) {
			setEmailError(error.atSymbolError);
			return false; // Email should have only one '@'
		}

		const [username, domain] = emailParts;
		const isUsernameValid = username.trim() !== "";
		const isDomainValid = domain.endsWith(".com");

		if (!isUsernameValid) {
			setEmailError("Username cannot be empty.");
			return false; // Username cannot be empty
		}

		if (!isDomainValid) {
			setEmailError(error.domainError);
			return false; // Domain should end with '.com'
		}

		// Clear the error if email is valid
		setEmailError("");

		return true;
	};

	const validatePassword = (value) => {
		let error = "";
		if (!value.trim()) {
			error = "Password cannot be empty. Please fill this out.";
		} else if (value.length < 8 || value.length > 16) {
			error = "Invalid password. It should be between 8 and 16 characters.";
		}
		setPasswordError(error);
		return error;
	};

	const closeModalAndNavigate = () => {
		setIsModalOpen(false);
		navigate("/schedulizer/services");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		setEmailError("");

		setIsLoading(true);

		signInRequest();

		try {
			const response = await axios.post("/users/signin", {
				userEmail,
				userPassword,
			});

			if (response.data.success) {
				const decodedToken = jwtDecode(response.data.token);
				console.log("Decoded Token:", decodedToken);

				// Set user information in localStorage
				localStorage.setItem("firstName", decodedToken.firstName);
				localStorage.setItem("email", decodedToken.userEmail);
				localStorage.setItem("id", decodedToken.id);
				localStorage.setItem("token", response.data.token);

				// Dispatch setUserEmail, setUserFirstName, setUserId, signInSuccess
				dispatch(
					setUser({
						email: decodedToken.userEmail,
						firstName: decodedToken.firstName,
						id: decodedToken.id,
					})
				);
				signInSuccess({
					// use the signInSuccess prop here
					firstName: decodedToken.firstName,
					email: decodedToken.userEmail,
					id: decodedToken.id,
				});

				// Open the modal
				setIsModalOpen(true);

				// Close the modal and navigate after 4 seconds
				setTimeout(() => {
					setIsModalOpen(false);
					navigate("/schedulizer/services");
				}, 4000);
			}
		} catch (error) {
			console.error("Failed to sign in:", error);
			if (error.response) {
				console.error("Response data:", error.response.data);
				console.error("Response status:", error.response.status);
				console.error("Response headers:", error.response.headers);
				setErrorMessage(error.response.data.error);
			}
		} finally {
			setIsLoading(false);
		}
	};

	console.log(signInSuccess);
	const loginwithgoogle = () => {
		window.open("http://localhost:8000/user/auth/google/callback", "_self");
	};

	return (
		<Layout>
			<div className="flex flex-col justify-center py-8 min-h-screen">
				<div className="flex justify-center">
					<div className="pt-8">
						<h3 className="font-bebas font-extrabold text-9xl text-center text-dark-grey-900 text-indigo-600">
							Sign In.
						</h3>
						<form onSubmit={handleSubmit}>
							<div className="grid grid-cols-1 mt-12 w-[400px]">
								<InputField
									inputFieldId="userEmail"
									inputFieldType="email"
									inputFieldPlaceholder="example@example.com"
									inputFieldHtmlFor="userEmail"
									inputFieldLabelName="Email"
									isRequired={true}
									fieldType="input"
									value={userEmail}
									onChange={(e) => {
										setUserEmail(e.target.value);
										setEmailError("");
									}}
									validateOnBlur={true}
									validate={(value) => validateEmail(value)}
									inputFieldError={emailError}
								/>

								<InputField
									inputFieldId="userPassword"
									inputFieldType="password"
									inputFieldPlaceholder="enter your password"
									inputFieldHtmlFor="userPassword"
									inputFieldLabelName="Password"
									isRequired={true}
									fieldType="input"
									value={userPassword}
									onChange={(e) => {
										setUserPassword(e.target.value);
										setPasswordError(""); // Clear the password error when the user types
									}}
									validateOnBlur={true}
									validate={(value) => validatePassword(value)}
									inputFieldError={passwordError}
								/>

								<div className="px-20 xl:px-16 py-8">
									{errorMessage && (
										<p className="mb-2 font-poppins text-center text-red-500 text-xs">
											{errorMessage}
										</p>
									)}
									<Button
										buttonName="SIGN IN"
										buttonType="submit"
										disabled={isLoading}
									/>
								</div>
								<div className="flex flex-col justify-center items-center">
									<p className="font-light font-muktaVaani text-grey-900 text-sm leading-relaxed">
										Not registered yet?{" "}
										<Link
											to="/schedulizer/signup"
											className="font-medium font-muktaVaani text-indigo-500 text-sm hover:text-indigo-600"
										>
											Create an Account
										</Link>
									</p>
									<p className="font-light font-muktaVaani text-grey-900 text-sm leading-relaxed">
										Forget Password?{" "}
										<a
											href=""
											className="font-medium font-muktaVaani text-indigo-500 text-sm hover:text-indigo-600"
										>
											Reset now
										</a>
									</p>
								</div>
							</div>
						</form>

						<div className="flex items-center mb-3 pt-6">
							<hr className="border-grey-500 border-b border-solid h-0 grow" />
							<p className="mx-4 text-grey-600">or</p>
							<hr className="border-grey-500 border-b border-solid h-0 grow" />
						</div>

						<div className="px-20 xl:px-16">
							<Button
								buttonName={
									<div className="flex justify-center items-center space-x-6">
										<FontAwesomeIcon
											icon={faGoogle}
											size="lg"
											className="text-darkieGreen"
										/>
										<p>Continue with Google</p>
									</div>
								}
								buttonStyle="secondary"
								onClick={loginwithgoogle}
							/>
						</div>
					</div>
				</div>
			</div>

			<TransitionModal
				isOpen={isModalOpen}
				onClose={closeModalAndNavigate}
				title="Sign In Successful!"
				description="You will be redirected to the services provided by our platform shortly. Thank you for signing in!"
				className="pattern-topography-[#FAF8ED]/40 pattern-topography-scale-[0.5] z-10 fixed inset-0 bg-indigo-600 overflow-y-auto"
			/>
		</Layout>
	);
}

SignIn.propTypes = {
	signInRequest: PropTypes.func.isRequired,
	signInSuccess: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
	signInRequest: () => {
		console.log("Inside mapDispatchToProps, dispatching signInRequest");
		dispatch(signInRequest());
	},
	signInSuccess: (user) => {
		console.log(
			"Inside mapDispatchToProps, dispatching signInSuccess with:",
			user
		);
		dispatch(signInSuccess(user));
		dispatch(fetchUserBusinesses()); // Dispatch fetchUserBusinesses here
	},
});

const ConnectedSignIn = connect(mapStateToProps, mapDispatchToProps)(SignIn);
export default ConnectedSignIn;
