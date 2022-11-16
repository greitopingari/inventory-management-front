import axios from 'axios';
import { useEffect, useState } from 'react';

import DeleteIcon from '../../../assets/delete.png';
import Table from '../../common/Table';


const Roles = () => {
	const table_headers = [
		{
			id: 1,
			header_name: 'Role Name',
		},
		{
			id: 2,
			header_name: 'Normailized Name',
		},
		{
			id: 3,
			header_name: '',
		},
		{
			id: 4,
			header_name: '',
		},
	];
	
	const [roles, setRoles] = useState([{}]);

	const headers = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('Token')),
		},
	};

	const fetchRoles = async () => {
		await axios
			.get(`${process.env.REACT_APP_BACKEND_API}/Profile`, headers)
			.then((res) => setRoles(res.data));
	};

	useEffect(() => {
		fetchRoles();
	}, []);
	
	return (
		<Table table_headers={table_headers} onCreate={() => console.log('Roles Create') }> {/* Function to be created */}
			{roles.map((role, index) => {
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
		</Table>
	);
};

export default Roles;
