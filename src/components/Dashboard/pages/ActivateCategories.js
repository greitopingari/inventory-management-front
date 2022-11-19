import axios from 'axios';
import { useEffect, useState } from 'react';
import DeleteIcon from '../../../assets/delete.png';
import Table from '../../common/Table';

const ActivateCategories = () => {
	const headers = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('Token')),
		},
	};
	const [categories, setCategories] = useState([{}]);

	const fetchCategories = async () => {
		await axios
			.get(`${process.env.REACT_APP_BACKEND_API}/Category`, headers)
			.then((res) => setCategories(res.data));
	};
	
	useEffect(() => {
		fetchCategories();
	}, []);

	const table_headers = [
		{
			id: 1,
			header_name: 'Category Name',
		},
		{
			id: 2,
			header_name: 'Action',
		},
	];

	return (
		<>
			<Table table_headers={table_headers}>
				{categories
					.filter((cat) => cat.isDeleted === true)
					.map((category, index) => {
						return (
							<tr className="border-b border-blue-200" key={index}>
								<td className="p-5 font-semibold">{category.categoryName}</td>
								<td className="p-5">
									<img
										src={DeleteIcon}
										className="w-[30px] cursor-pointer mx-auto"
									/>
								</td>
							</tr>
						);
					})}
			</Table>
		</>
	);
};

export default ActivateCategories;
