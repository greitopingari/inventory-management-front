import { useState } from 'react';

const Modal = () => {
	const [modal, setModal] = useState(true);
	const toggleModal = () => {
		setModal(!modal);
	};

	if (modal) {
		document.body.classList.add('active-modal');
	} else {
		document.body.classList.remove('active-modal');
	}

	return (
		<>
			{modal && (
				<div className="modal">
					<div className="overlay" onClick={() => toggleModal()}></div>
					<div className="modal-content">
						<h2 className="text-center font-md mt-5 text-red">Info</h2>
						<p className="text-center">Info Text</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
