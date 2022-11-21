import axios from 'axios';
import { useEffect, useState } from 'react';
import updateIcon from '../../../assets/update.png';
import { useData } from '../../../contexts/DataContext';
import Table from '../../common/Table';

const ActivateCategories = () => {
	const user = JSON.parse(localStorage.getItem('user_info'));
	const { setLoadingStatus } = useData();
	const headers = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('Token')),
		},
	};
	const [categories, setCategories] = useState([{}]);

	const fetchCategories = async () => {
		setLoadingStatus(true);
		await axios
			.get(`${process.env.REACT_APP_BACKEND_API}/Category`, headers)
			.then((res) => {
				setCategories(res.data);
				setLoadingStatus(false);
			});
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

	const activateCategory = async (cat_id) => {
		setLoadingStatus(true);
		await axios
			.get(
				`${process.env.REACT_APP_BACKEND_API}/Category/ActivateCategory/${cat_id}`,
				headers
			)
			.then(() => {
				fetchCategories();
				setLoadingStatus(false);
			});
	};

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
										src={updateIcon}
										className="w-[30px] cursor-pointer mx-auto"
										onClick={() => activateCategory(category.id)}
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
