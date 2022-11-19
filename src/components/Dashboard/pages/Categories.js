import axios from 'axios';
import { useEffect, useState } from 'react';

import fixDateFormat from '../../../contexts/functions';
import Modal from '../../common/Modal';

import Swal from 'sweetalert2';
import DeleteIcon from '../../../assets/delete.png';
import Table from '../../common/Table';

// Cruds

import CreateCategory from '../Cruds/Categories/CreateCategory';

const Categories = () => {
	const [categories, setCategories] = useState([{}]);
	const [showModal, setShowModal] = useState(false);

	const headers = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('Token')),
		},
	};

	const fetchCategories = async () => {
		let response = await axios.get(
			`${process.env.REACT_APP_BACKEND_API}/Category`,
			headers
		);
		setCategories(response.data);
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	const createCategory = () => {
		setShowModal(true);
	};

	const deleteCategory = async (id) => {
		await axios.delete(
			`${process.env.REACT_APP_BACKEND_API}/Category/${id}`,
			headers
		);
		fetchCategories();
	};

	const table_headers = [
		{
			id: 1,
			header_name: 'Category Name',
		},
		{
			id: 2,
			header_name: 'Created on',
		},
		{
			id: 3,
			header_name: 'Created By',
		},
		{
			id: 4,
			header_name: 'Actions',
		},
	];

	return (
		<>
			<Table table_headers={table_headers} onCreate={createCategory}>
				{categories
					?.filter((cat) => cat.isDeleted === false)
					.map((category, index) => {
						return (
							<tr className="border-b border-blue-200" key={index}>
								<td className="p-5 font-semibold">{category.categoryName}</td>
								<td className="p-5 font-semibold">
									{fixDateFormat(category.createdOn)}
								</td>
								<td className="p-5 font-semibold">{category.createdBy}</td>
								<td className="p-5">
									<img
										src={DeleteIcon}
										className="w-[30px] cursor-pointer mx-auto"
										onClick={() => deleteCategory(category.id)}
									/>
								</td>
							</tr>
						);
					})}
			</Table>
			{showModal ? (
				<CreateCategory update={fetchCategories} updateModal={setShowModal} />
			) : null}
		</>
	);
};

export default Categories;
