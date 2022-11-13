import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import fixDateFormat from '../../../contexts/functions';

import Swal from 'sweetalert2';
import DeleteIcon from '../../../assets/delete.png';

const Categories = () => {
	const [categories, setCategories] = useState([{}]);

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

	const createCategory = () => {
		try {
			axios
				.post(
					`${process.env.REACT_APP_BACKEND_API}/Category`,
					{
						categoryName: 'Iphone',
						createdBy: 'admin@MagazineManagment.com',
					},
					headers
				)
				.then((_) =>
					Swal.fire({
						icon: 'success',
						title: 'Uploaded Successfully!',
					})
				)
				.then((_) => fetchCategories())
				.catch((e) =>
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: e,
					})
				);
		} catch (e) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: e,
			});
		}
	};

	const deleteCategory = async (id) => {
		await axios
			.delete(`${process.env.REACT_APP_BACKEND_API}/Category/${id}`, headers)
			.then((_) => fetchCategories());
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<div className="flex flex-col justify-between items-center">
			<div className="ml-auto p-5">
				<p
					onClick={() => createCategory()}
					className="p-5 cursor-pointer bg-blue-600 text-white rounded-full hover:opacity-95 hover:transition-all"
				>
					Add new
				</p>
			</div>
			<table className="table-auto w-5/6 mx-auto text-center mt-10">
				<thead>
					<tr className="bg-blue-500 text-white ">
						<th className="p-5 font-semibold">Category Name</th>
						<th className="p-5 font-semibold">Created on</th>
						<th className="p-5 font-semibold">Created by</th>
						<th className="p-5 font-semibold">Is Deleted</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{categories
						.filter((cat) => cat.isDeleted === false)
						.map((category, index) => {
							return (
								<tr className="border-b border-blue-200" key={index}>
									<td className="p-5 font-semibold">{category.categoryName}</td>
									<td className="p-5 font-semibold">
										{fixDateFormat(category.createdOn)}
									</td>
									<td className="p-5 font-semibold">{category.createdBy}</td>
									<td className="p-5 font-semibold">
										{category.isDeleted === false ? 'No' : 'Yes'}
									</td>
									<td className="p-5">
										<img
											src={DeleteIcon}
											className="w-[30px] cursor-pointer"
											onClick={() => deleteCategory(category.id)}
										/>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};

export default Categories;
