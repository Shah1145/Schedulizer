import { useState, useEffect, useRef, Fragment } from "react";
import InputField from "./form/InputField";
import Layout from "./Layout";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
// import { useParams } from "react-router-dom";

function ProfilePicBio() {
	// const { businessId } = useParams();
	const [typedCharacters, setTypedCharacters] = useState(0);
	const typedCharactersElementRef = useRef(null);
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleSkip = () => {
		setIsModalOpen(true);
		setTimeout(() => {
			navigate("/schedulizer/dashboard");
		}, 4000);
	};

	useEffect(() => {
		const textAreaElement = document.querySelector("#businessBio");
		typedCharactersElementRef.current =
			document.querySelector("#typed-characters");

		const updateCharacterCount = () => {
			setTypedCharacters(textAreaElement.value.length);
		};

		textAreaElement.addEventListener("input", updateCharacterCount);

		return () => {
			textAreaElement.removeEventListener("input", updateCharacterCount);
		};
	}, []);

	useEffect(() => {
		if (typedCharactersElementRef.current) {
			typedCharactersElementRef.current.textContent = typedCharacters;
		}
	}, [typedCharacters]);

	const closeModalAndNavigate = () => {
		setIsModalOpen(false);
		navigate("/schedulizer/dashboard");
	};

	const [file, setFile] = useState(null);
	const [bio, setBio] = useState("");

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleBioChange = (e) => {
		setBio(e.target.value);
	};
	const businessId = "659e11699c1cf9160a29af58";

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("businessProfile", file);
		formData.append("businessBio", bio);

		// Send formData to the server
		// You'll need to replace this URL with the URL of your server
		try {
			const response = await fetch(
				`http://localhost:8000/business/profile/${businessId}`,
				{
					method: "POST",
					body: formData,
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			// Open the modal
			setIsModalOpen(true);

			// Close the modal and navigate after 4 seconds
			setTimeout(closeModalAndNavigate, 4000);

			// Handle successful submission
			// This could be navigating to another page, showing a success message, etc.
		} catch (error) {
			console.error("Fetch error: ", error);
			// Handle error
		}
	};

	return (
		<Layout>
			<div className="flex min-h-screen flex-col justify-center bg-[#FAF8ED] pattern-texture-indigo-600/10 pattern-texture-scale-[1.5]">
				<div className="flex justify-center py-32">
					<div className="pt-12">
						<h3 className="text-dark-grey-900 pb-6 text-center font-bebas text-9xl font-extrabold">
							Give your business
							<br /> a face and a voice
						</h3>
						<div className="w-full items-center justify-center px-12">
							<form
								onSubmit={handleSubmit}
								action={`http://localhost:8000/business/profile/${businessId}`}
								method="post"
								encType="multipart/form-data">
								<div className="mt-8">
									<div className="relative border border-dashed border-gray-500">
										<input
											type="file"
											className="relative z-50 block h-full w-full cursor-pointer p-20 opacity-0"
											onChange={handleFileChange}
										/>
										<div className="absolute left-0 right-0 top-0 m-auto p-10 text-center">
											<h4>
												Drop files anywhere to upload
												<br />
												or
											</h4>
											<p className="">Select Files</p>
											<label
												htmlFor="dropzone-file"
												className="mt-2 block text-sm text-gray-700">
												{file ? `File Name: ${file.name}` : "Select a File"}
											</label>
										</div>
									</div>

									{/* <InputField
										inputFieldType="file"
										inputFieldId="businessProfilePicture"
										inputFieldHtmlFor="businessProfilePicture"
										inputFieldLabelName="Business Profile Picture"
										isRequired={false}
									/> */}
									<InputField
										inputFieldId="businessBio"
										inputFieldType="text"
										inputFieldPlaceholder="business bio"
										inputFieldHtmlFor="businessBio"
										inputFieldLabelName="Business Bio"
										isRequired={true}
										fieldType="textarea"
										cols={10}
										rows={5}
										maxLength={500}
										value={bio}
										onChange={handleBioChange}
										validateOnBlur={false}
									/>
									<div
										id="character-counter"
										className="text-right text-sm text-indigo-500 opacity-80">
										<span id="typed-characters">0</span>
										<span>/</span>
										<span id="maximum-characters">500</span>
									</div>
								</div>
								<div className="grid grid-cols-2 items-center justify-center gap-x-12 py-4 xs:px-16 md:px-32 xl:px-36">
									<button
										type="button"
										className="flex w-full items-center justify-center rounded-md border-2 border-indigo-500 px-6 font-jaldi text-sm text-indigo-500 transition-colors duration-200 hover:bg-indigo-500 hover:text-[#FAF8ED] xs:py-2 sm:py-2 md:px-4"
										onClick={handleSkip}>
										SKIP
									</button>
									<Button buttonName="SUBMIT" buttonType="submit" />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<Transition appear show={isModalOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto bg-indigo-600 pattern-texture-[#FAF8ED]/60 pattern-texture-scale-[1.5]"
					onClose={closeModalAndNavigate}>
					<div className="min-h-screen text-center">
						<Dialog.Overlay className="fixed" />
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true">
							&#8203;
						</span>
						<Dialog.Description
							as="div"
							className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-[#FAF8ED] p-12 text-center align-middle transition-all">
							<Dialog.Title
								as="h1"
								className="leading-2 font-bebas text-5xl font-semibold text-indigo-500">
								Business Registration Successful!
							</Dialog.Title>
							<div className="mt-2">
								<p className="font-poppins text-sm text-black">
									You will be redirected to your Dashboard shortly.
								</p>
							</div>
						</Dialog.Description>
					</div>
				</Dialog>
			</Transition>
		</Layout>
	);
}

export default ProfilePicBio;
