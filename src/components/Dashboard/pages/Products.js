import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
//Icons

import DeleteIcon from '../../../assets/delete.png';
import updateIcon from '../../../assets/update.png';
import { useData } from '../../../contexts/DataContext';
import fixDateFormat from '../../../contexts/functions';
import Table from '../../common/Table';

import CreateProduct from '../Cruds/Product/CreateProduct';
import UpdateProduct from '../Cruds/Product/UpdateProduct';

const Products = () => {
	const [products, setProducts] = useState([{}]);

	const user_role = JSON.parse(sessionStorage.getItem('user_info')).role[0];

	const { setLoadingStatus } = useData();
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);

	const [selectedProductId, setSelectedProductId] = useState(null);

	const headers = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('Token')),
		},
	};

	const fetchProducts = async () => {
		setLoadingStatus(true);
		await axios
			.get(`${process.env.REACT_APP_BACKEND_API}/Product`, headers)
			.then((res) => {
				setProducts(res.data);
				setLoadingStatus(false);
			});
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const updateProduct = (id) => {
		setSelectedProductId(id);
		setShowUpdateModal(true);
	};

	const createProduct = () => {
		setShowCreateModal(true);
	};
	const deleteProdcut = async (id) => {
		setLoadingStatus(true);
		try {
			await axios.delete(
				`${process.env.REACT_APP_BACKEND_API}/Product/${id}`,
				headers
			);
			fetchProducts();
			setLoadingStatus(false);
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
			<Table table_headers={table_headers} onCreate={createProduct}>
				{products?.map((product, idx) => {
					return (
						<tr className="border-b border-blue-200" key={idx}>
							<td className="p-3 font-semibold">{product.serialNumber}</td>
							<td className="p-3 font-semibold">{product.productName}</td>
							<td className="p-3 font-semibold">{product.categoryName}</td>
							<td className="p-3 font-semibold">
								{product.price} {product.currencyType}
							</td>
							<td className="p-3 font-semibold">{product.productInStock}</td>
							<td className="p-3 font-semibold">
								{fixDateFormat(product.createdOn)}
							</td>
							<td className="font-semibold p-3 w-[15%]">
								<img src={product.image} alt="loading..." />
							</td>
							{user_role === 'Admin' ? (
								<td className="p-5">
									<div className="flex flex-row justify-between">
										<img
											src={updateIcon}
											alt=""
											className="w-[30px] cursor-pointer"
											onClick={() => updateProduct(product.id)}
										/>

										<img
											src={DeleteIcon}
											alt=""
											className="w-[30px] cursor-pointer"
											onClick={() => deleteProdcut(product.id)}
										/>
									</div>
								</td>
							) : (
								<td className="p-5 font-bold">
									<div className="flex flex-row justify-between">
										<img
											src={updateIcon}
											alt=""
											className="w-[30px] cursor-pointer"
											onClick={() => updateProduct(product.id)}
										/>
									</div>
								</td>
							)}
						</tr>
					);
				})}
			</Table>
			{showCreateModal ? (
				<CreateProduct
					update={fetchProducts}
					updateModal={setShowCreateModal}
				/>
			) : null}
			{showUpdateModal ? (
				<UpdateProduct
					update={fetchProducts}
					updateModal={setShowUpdateModal}
					product_id={selectedProductId}
					user_role={user_role}
				/>
			) : null}
		</>
	);
};

export default Products;
