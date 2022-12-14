import axios from 'axios';
import { useEffect, useState } from 'react';

import DeleteIcon from '../../../assets/delete.png';
import Table from '../../common/Table';

import Modal from '../../common/Modal';

import { useData } from '../../../contexts/DataContext';

import CreateRole from './../Cruds/Roles/CreateRole';

const Roles = () => {
	const { setLoadingStatus } = useData();
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
			header_name: 'Actions',
		},
	];

	const [roles, setRoles] = useState([{}]);
	const [showModal, setShowModal] = useState(false);

	const headers = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('Token')),
		},
	};

	const fetchRoles = async () => {
		setLoadingStatus(true);
		await axios
			.get(`${process.env.REACT_APP_BACKEND_API}/Profile`, headers)
			.then((res) => {
				setRoles(res.data);
				setLoadingStatus(false);
			});
	};
	const deleteRole = async (id, name) => {
		await axios
			.delete(
				`${process.env.REACT_APP_BACKEND_API}/Profile/${id}`,
				{
					roleId: id,
					roleName: name,
				},
				headers
			)
			.then((_) => {
				setRoles([...roles]);
			});
	};

	useEffect(() => {
		fetchRoles();
	}, []);

	return (
		<>
			<Table table_headers={table_headers} onCreate={() => setShowModal(true)}>
				{roles?.map((role, index) => {
					return (
						<tr
							className="border-b border-blue-200 justify-between"
							key={index}
						>
							<td className="p-5 font-semibold">{role.roleName}</td>
							<td className="p-5 font-semibold">{role.roleNameNormalized}</td>
							<td className="p-5">
								<img
									src={DeleteIcon}
									alt=""
									className="cursor-pointer w-[30px] mx-auto"
									onClick={() => deleteRole(role.roleId, role.roleName)}
								/>
							</td>
						</tr>
					);
				})}
			</Table>
			{showModal ? (
				<CreateRole updateModal={setShowModal} updateRoles={fetchRoles} />
			) : null}
		</>
	);
};

export default Roles;
