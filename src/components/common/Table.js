const Table = ({ table_headers, onCreate, children }) => {
	return (
		<div className="flex flex-col justify-between items-center">
			{onCreate !== undefined ? (
				<div className="ml-auto p-5">
					<p
						onClick={() => onCreate()}
						className="p-5 cursor-pointer bg-blue-600 text-white rounded-full hover:opacity-95 hover:transition-all"
					>
						Add new
					</p>
				</div>
			) : null}
			<table className="table-auto w-5/6 mx-auto text-center mt-10">
				<thead>
					<tr className="bg-blue-500 text-white">
						{table_headers.map((th, idx) => {
							return (
								<th className="p-5 font-semibold" key={idx}>
									{th.header_name}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>{children}</tbody>
			</table>
		</div>
	);
};

export default Table;
