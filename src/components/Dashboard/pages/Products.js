import axios from 'axios';
import { useEffect, useState } from 'react';
import DeleteIcon from '../../../assets/delete.png';
import fixDateFormat from '../../../contexts/functions';
import Table from '../../common/Table';

const Products = () => {
	const [products, setProducts] = useState([{}]);

	const user_role = JSON.parse(localStorage.getItem('user_info')).role[0];

	// const [showCreateModal, setShowCreateModal] = useState(false); To be updated

	const headers = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('Token')),
		},
	};

	const fetchProducts = async () => {
		await axios
			.get(`${process.env.REACT_APP_BACKEND_API}/Product`, headers)
			.then((res) => setProducts(res.data));
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const deleteProdcut = async (id) => {
		try {
			await axios.delete(
				`${process.env.REACT_APP_BACKEND_API}/Product/${id}`,
				headers
			);
			fetchProducts();
		} catch (e) {
			console.log(e);
		}
	};

	const table_headers = [
		{
			id: 1,
			header_name: 'Serial Number',
		},
		{
			id: 2,
			header_name: 'Proudct Name',
		},
		{
			id: 3,
			header_name: 'Category',
		},
		{
			id: 4,
			header_name: 'Price',
		},
		{
			id: 5,
			header_name: 'In Stock',
		},
		{
			id: 6,
			header_name: 'Posted on',
		},
		{
			id: 7,
			header_name: 'Image',
		},
		{
			id: 8,
			header_name: 'Actions',
		},
	];

	return (
		<>
			<Table table_headers={table_headers}>
				{products?.map((product, idx) => {
					return (
						<tr className="border-b border-blue-200" key={idx}>
							<td className="p-3 font-semibold">{product.serialNumber}</td>
							<td className="p-3 font-semibold">{product.productName}</td>
							<td className="p-3 font-semibold">{product.categoryName}</td>
							<td className="p-3 font-semibold">{product.price}</td>
							<td className="p-3 font-semibold">{product.productInStock}</td>
							<td className="p-3 font-semibold">
								{fixDateFormat(product.createdOn)}
							</td>
							<td className="font-semibold p-3 w-[15%]">
								<img
									src={`data:image/jpeg;base64,${product.image}`}
									alt="loading..."
								/>
							</td>
							{user_role === 'Admin' ? (
								<td className="p-5">
									<img
										src={DeleteIcon}
										className="w-[30px] cursor-pointer mx-auto"
										onClick={() => deleteProdcut(product.id)}
									/>
								</td>
							) : (
								<td className="p-5 font-bold">None</td>
							)}
						</tr>
					);
				})}
			</Table>
		</>
	);
};

export default Products;
