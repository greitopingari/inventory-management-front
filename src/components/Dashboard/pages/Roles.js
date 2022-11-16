import axios from "axios";
import { useEffect, useState } from "react";

import DeleteIcon from "../../../assets/delete.png";
const Roles = () => {
	const [roles, setRoles] = useState([{}]);

	const headers = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('Token')),
		},
	};

	const fetchRoles = async () => {
		await axios.get(`${process.env.REACT_APP_BACKEND_API}/Profile`, headers)
			.then(res => setRoles(res.data));
	}

	useEffect(() => {
		fetchRoles();
	}, [])
	console.log(roles)
	return (
		<div className="flex flex-col justify-between items-center">
			<div className="ml-auto p-5">
				<p
					// onClick={() => createCategory()}
					className="p-5 cursor-pointer bg-blue-600 text-white rounded-full hover:opacity-95 hover:transition-all"
				>
					Add new
				</p>
			</div>
			<table className="table-auto w-5/6 mx-auto text-center mt-10">
				<thead>
					<tr className="bg-blue-500 text-white ">
						<th className="p-5 font-semibold">Role Name</th>
						<th className="p-5 font-semibold">Normailzed Name</th>
						<th className="p-5 font-semibold"></th>
						<th className="p-5 font-semibold"></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{roles
						.map((role, index) => {
							return (
								<tr className="border-b border-blue-200" key={index}>
									<td className="p-5 font-semibold">{role.roleName}</td>
									<td className="p-5 font-semibold">{role.roleNameNormalized}</td>
									<td className="p-5">
										<img
											src={DeleteIcon}
											className="w-[30px] cursor-pointer"
										// onClick={() => deleteCategory(category.id)}
										/>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	)
};

export default Roles;
