import { useState } from 'react';

const Modal = ({ children, onOutside }) => {
	const [modal, setModal] = useState(true);
	const toggleModal = () => {
		
		setModal(!modal);

		if (onOutside !== undefined) {
			onOutside();
		}
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
					<div className="modal-content">{children}</div>
				</div>
			)}
		</>
	);
};

export default Modal;
