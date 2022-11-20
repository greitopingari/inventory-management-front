const Loading = () => {
	return (
		<div className="overlay">
			<div className="modal-content bg-transparent">
				<div className="lds-roller">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default Loading;
