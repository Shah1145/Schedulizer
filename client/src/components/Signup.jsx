import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import InputField from "./Form/InputField";
import Layout from "./Layout";
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function SignUp() {
	const [userFirstName, setUserFirstName] = useState("");
	const [userLastName, setUserLastName] = useState("");
	const [userContactNumber, setUserContactNumber] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [userConfirmPassword, setUserConfirmPassword] = useState("");
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [emailError, setEmailError] = useState("");

	const navigate = useNavigate();

	const formatPassword = (value) => value.trim();

	useEffect(() => {
		if (userConfirmPassword) {
			validateField(
				userConfirmPassword,
				(value) => value === userPassword,
				"Passwords do not match",
				"userConfirmPassword"
			);
		}
	}, [userPassword, userConfirmPassword]);

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
		const isUsernameValid = username.trim() !== "" && !/\d/.test(username);
		const isDomainValid = domain.endsWith(".com");

		if (!isUsernameValid) {
			setEmailError(error.numberInDomainError);
			return false; // Username cannot be empty and should not contain numbers
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
		if (!value.trim()) {
			setError((prevErrors) => ({
				...prevErrors,
				userPassword: "Password cannot be empty. Please fill this out.",
			}));
			return false;
		}

		const error = {
			lengthError: "Password should be 8 to 16 characters.",
			uppercaseError: "Password should include at least one capital letter.",
			numberError: "Password should include at least one number.",
		};

		const isValidLength = value.length >= 8 && value.length <= 16;
		const hasUppercase = /[A-Z]/.test(value);
		const hasNumber = /\d/.test(value);

		const isValidPassword = isValidLength && hasUppercase && hasNumber;

		if (!isValidPassword) {
			let errorMessage = "Invalid password. ";

			if (!isValidLength) errorMessage += error.lengthError;
			if (!hasUppercase) errorMessage += " " + error.uppercaseError;
			if (!hasNumber) errorMessage += " " + error.numberError;

			setError((prevErrors) => ({
				...prevErrors,
				userPassword: errorMessage,
			}));
		} else {
			setError((prevErrors) => {
				//eslint-disable-next-line no-unused-vars
				const { userPassword: _, ...rest } = prevErrors;
				return rest;
			});
		}

		return isValidPassword;
	};

	const isAlphabetic = (value) => /^[A-Za-z\s&]+$/.test(value);
	const isContactNumber = (value) => /^\d{11}$/.test(value);

	const validateField = (
		value,
		validateFunc,
		errorMessage,
		fieldName,
		labelName
	) => {
		if (!value.trim()) {
			setError((prevErrors) => ({
				...prevErrors,
				[fieldName]: `${labelName} cannot be empty. Please fill this out.`,
			}));
		} else if (!validateFunc(value)) {
			setError((prevErrors) => ({
				...prevErrors,
				[fieldName]: errorMessage,
			}));
		} else {
			setError((prevErrors) => {
				//eslint-disable-next-line no-unused-vars
				const { [fieldName]: _, ...rest } = prevErrors;
				return rest;
			});
		}
	};

	const handleSubmit = async (event) => {
		setIsLoading(true);
		event.preventDefault();

		// Validate password confirmation
		const passwordMatch = userConfirmPassword === userPassword;
		if (!passwordMatch) {
			setError((prevErrors) => ({
				...prevErrors,
				userConfirmPassword: "Passwords do not match",
			}));

			setIsLoading(false);
			return;
		}

		// Clear the error if passwords match
		setError((prevErrors) => {
			//eslint-disable-next-line no-unused-vars
			const { userConfirmPassword: _, ...rest } = prevErrors;
			return rest;
		});

		const userData = {
			userFirstName,
			userLastName,
			userContactNumber,
			userEmail,
			userPassword,
		};

		try {
			const response = await axios.post("/users/signup", userData);
			console.log(response.data);

			// Check if the form submission was successful
			if (response.data.success) {
				setIsLoading(false);
				setIsModalOpen(true);
				// Delay navigation by 4 seconds
				setTimeout(() => {
					navigate("/schedulizer/signin");
				}, 4000);
			} else {
				setIsLoading(false);
			}
		} catch (error) {
			if (
				error.response &&
				error.response.data.error ===
					"User already exists. Please choose a different Email."
			) {
				setEmailError(
					"Email already exists for an existing user. Sign in or choose a different email."
				);
			} else {
				console.log("error data", error.response?.data);
				console.log("Form data", userData);
			}
			setIsLoading(false);
		}
	};

	const closeModalAndNavigate = () => {
		setIsModalOpen(false);
		navigate("/schedulizer/signin");
	};

	const displayError = (emailError, error) =>
		emailError ? emailError : error.userEmail;

	return (
		<Layout>
			<div className="flex flex-col justify-center py-12 min-h-screen">
				<div className="flex justify-center">
					<div className="pt-12">
						<h3 className="font-bebas font-extrabold text-9xl text-center text-dark-grey-900 text-indigo-600">
							Sign Up.
						</h3>

						<form onSubmit={handleSubmit}>
							<div className="gap-x-8 gap-y-4 grid grid-cols-1 md:grid-cols-2 mt-12 md:w-full lg:w-[600px] xl:w-[700px]">
								<div>
									<InputField
										inputFieldId="userFirstName"
										inputFieldType="text"
										inputFieldPlaceholder="John"
										inputFieldHtmlFor="userFirstName"
										inputFieldLabelName="First Name"
										isRequired={true}
										fieldType="input"
										value={userFirstName}
										onChange={(e) => setUserFirstName(e.target.value)}
										validateOnBlur={true}
										validate={(value) =>
											validateField(
												value,
												isAlphabetic,
												"First name should only contain alphabets",
												"userFirstName",
												"First Name" // pass the label name here
											)
										}
										inputFieldError={error.userFirstName}
									/>
								</div>

								<div>
									<InputField
										inputFieldId="userLastName"
										inputFieldType="text"
										inputFieldPlaceholder="Snow"
										inputFieldHtmlFor="userLastName"
										inputFieldLabelName="Last Name"
										isRequired={true}
										fieldType="input"
										value={userLastName}
										onChange={(e) => setUserLastName(e.target.value)}
										validateOnBlur={true}
										validate={(value) =>
											validateField(
												value,
												isAlphabetic,
												"Last name should only contain alphabets",
												"userLastName",
												"Last Name" // pass the label name here
											)
										}
										inputFieldError={error.userLastName}
									/>
								</div>

								<div>
									<InputField
										inputFieldId="userContactNumber"
										inputFieldType="text"
										inputFieldPlaceholder="XXXX-XXXXXXX"
										inputFieldHtmlFor="userContactNumber"
										inputFieldLabelName="Contact Number (mobile only)"
										isRequired={true}
										fieldType="input"
										value={userContactNumber}
										onChange={(e) => setUserContactNumber(e.target.value)}
										validateOnBlur={true}
										validate={(value) =>
											validateField(
												value,
												isContactNumber,
												"Contact number should only contain numbers and be 11 digits.",
												"userContactNumber",
												"Contact Number" // pass the label name here
											)
										}
										inputFieldName="userContactNumber"
										inputFieldAutoComplete={false}
										inputFieldError={error.userContactNumber}
									/>
								</div>

								<div>
									<InputField
										inputFieldId="userEmail"
										inputFieldType="email"
										inputFieldPlaceholder="johnsnow@example.com"
										inputFieldHtmlFor="userEmail"
										inputFieldLabelName="Email address"
										isRequired={true}
										fieldType="input"
										value={userEmail}
										onChange={(e) => {
											setUserEmail(e.target.value);
											setEmailError(""); // clear the error
										}}
										validateOnBlur={true}
										validate={(value) => validateEmail(value)}
										inputFieldError={displayError(emailError, error)}
									/>
								</div>

								<div>
									<InputField
										inputFieldId="userPassword"
										inputFieldType="password"
										inputFieldPlaceholder="Enter your password"
										inputFieldHtmlFor="userPassword"
										inputFieldLabelName="Password"
										isRequired={true}
										fieldType="input"
										value={userPassword}
										onChange={(e) =>
											setUserPassword(formatPassword(e.target.value))
										}
										validateOnBlur={true}
										validate={(value) => validatePassword(value)}
										inputFieldError={error.userPassword}
									/>
								</div>

								<div>
									<InputField
										inputFieldId="userConfirmPassword"
										inputFieldType="password"
										inputFieldPlaceholder="Confirm your password"
										inputFieldHtmlFor="userConfirmPassword"
										inputFieldLabelName="Confirm Password"
										isRequired={true}
										fieldType="input"
										value={userConfirmPassword}
										onChange={(e) => setUserConfirmPassword(e.target.value)}
										inputFieldError={error.userConfirmPassword}
									/>
								</div>
							</div>
							{/* {error && (
								<p className="mt-1 text-center text-red-500 text-sm">{error}</p>
							)} */}
							<div className="md:px-32 xl:px-48 xs:px-16 py-8">
								<Button
									buttonName="SIGN UP"
									buttonType="submit"
									disabled={isLoading || Object.keys(error).length > 0}
								/>
							</div>
						</form>

						<p className="font-light font-muktaVaani text-center text-middieBlue text-sm leading-relaxed">
							Already have an account?{" "}
							<Link
								to="/schedulizer/signin"
								className="font-muktaVaani font-semibold text-indigo-500 text-sm hover:text-indigo-600"
							>
								Sign In
							</Link>
						</p>

						<div className="flex items-center mb-3 pt-6">
							<hr className="border-grey-500 border-b border-solid h-0 grow" />
							<p className="mx-4 text-grey-600">or</p>
							<hr className="border-grey-500 border-b border-solid h-0 grow" />
						</div>

						<div className="md:px-32 xl:px-48 xs:px-16">
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
							/>
						</div>
					</div>
				</div>
			</div>

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
								Sign Up Successful!
							</Dialog.Title>
							<div className="mt-2">
								<p className="font-poppins text-black text-sm">
									You will be redirected to the Sign In page shortly.
								</p>
							</div>
						</Dialog.Description>
					</div>
				</Dialog>
			</Transition>
		</Layout>
	);
}

export default SignUp;
