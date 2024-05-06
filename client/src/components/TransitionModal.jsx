import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";

function TransitionModal({ isOpen, onClose, title, description, className }) {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className={className} onClose={onClose}>
				<div className="w-full min-h-screen text-center">
					<Dialog.Overlay className="fixed" />
					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Dialog.Description
						as="div"
						className="inline-block space-y-6 bg-[#FAF8ED] my-8 p-12 rounded-2xl max-w-max text-center transform transition-all overflow-hidden align-middle"
					>
						<Dialog.Title
							as="h1"
							className="py-6 font-bebas font-semibold text-8xl text-indigo-500 leading-2"
						>
							{title}
						</Dialog.Title>
						<div className="mt-2">
							<p className="font-poppins text-black text-md break-words">
								{description}
							</p>
						</div>
					</Dialog.Description>
				</div>
			</Dialog>
		</Transition>
	);
}

TransitionModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	className: PropTypes.string,
};

export default TransitionModal;
