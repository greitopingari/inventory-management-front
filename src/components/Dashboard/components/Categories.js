import axios from 'axios';
import { useEffect, useState } from 'react';

import fixDateFormat from '../../../contexts/functions';

const Categories = () => {
	const [categories, setCategories] = useState([{}]);

	const fetchCategories = async () => {
		let response = await axios.get(
			`${process.env.REACT_APP_BACKEND_API}/Category`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('Token')),
				},
			}
		);
		setCategories(response.data);
	};

	useEffect(() => {
		fetchCategories();
	}, []);


	return (
		<div className="flex flex-col justify-between items-center">
			<div className="ml-auto p-5">
				<p className="p-5 cursor-pointer bg-blue-600 text-white rounded-full hover:opacity-95 hover:transition-all">
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
					</tr>
				</thead>
				<tbody>
					{categories.map((item) => {
						return (
							<tr className="border-b border-blue-200">
								<td className="p-5 font-semibold">{item.categoryName}</td>
								<td className="p-5 font-semibold">
									{fixDateFormat(item.createdOn)}
								</td>
								<td className="p-5 font-semibold">{item.createdBy}</td>
								<td className="p-5 font-semibold">
									{item.isDeleted === false ? 'No' : 'Yes'}
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
