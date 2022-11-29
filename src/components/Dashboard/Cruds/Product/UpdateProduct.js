import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useData } from '../../../../contexts/DataContext';
import Modal from '../../../common/Modal';

import Button from '../../../common/Button';
import Form from '../../../common/Form';
import Input from '../../../common/Input';

import currencyRecords from '../../../common/currencyTypes.json';

import { convertImageToBase64 } from '../../../../contexts/functions';

const UpdateProduct = ({ update, updateModal, product_id, user_role }) => {
	const user_name = JSON.parse(sessionStorage.getItem('user_info')).username;

	const { setLoadingStatus } = useData();
	const [currentProduct, setCurrentProduct] = useState([]);
	const [newCurrency, setNewCurrency] = useState(null);
	const [newCategory, setNewCategory] = useState(null);
	const [categories, setCategories] = useState([]);
	const [newImage, setNewImage] = useState(null);

	const methods = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
	});

	const headers = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('Token')),
		},
	};

	const getCurrentProduct = async (id) => {
		setLoadingStatus(true);
		await axios
			.get(`${process.env.REACT_APP_BACKEND_API}/Product/${id}`, headers)
			.then((res) => {
				setCurrentProduct(res.data);
				setLoadingStatus(false);
			});
	};

	const getCategories = async () => {
		await axios
			.get(`${process.env.REACT_APP_BACKEND_API}/Category`, headers)
			.then((res) => setCategories(res.data));
	};

	const updateProduct = async (data) => {
		try {
			axios
				.put(
					`${process.env.REACT_APP_BACKEND_API}/Product`,
					{
						id: currentProduct.id,
						productName: data.product_name || currentProduct.productName,
						serialNumber: data.serial_number || currentProduct.serialNumber,
						price: data.product_price || currentProduct.price,
						productInStock:
							data.product_in_stock || currentProduct.productInStock,
						currencyType: newCurrency || currentProduct.currencyType,
						productDescription:
							data.product_description || currentProduct.productDescription,
						image: '' || currentProduct.image,
						productCategoryId: newCategory || currentProduct.productCategoryId,
						createdBy: user_name,
					},
					headers
				)
				.then((_) => {
					Swal.fire({
						icon: 'success',
						title: 'Updated Successfully!',
					});
					update();
					updateModal(false);
				})
				.catch((e) => {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: e.response.data,
					});
				});
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getCurrentProduct(product_id);
		getCategories();
	}, []);

	return (
		<Modal onOutside={() => updateModal(false)}>
			<Form
				methods={methods}
				onSubmit={updateProduct}
				className="w-1/2 pt-5 text-left"
			>
				{user_role === 'Admin' ? (
					<>
						<Input
							type="text"
							name="serial_number"
							id="serial_number"
							label="Serial number"
							required={true}
							value={currentProduct.serialNumber}
							handleChange={(e) => e.target.value}
						/>
						<Input
							type="text"
							name="product_name"
							id="product_name"
							label="Product Name"
							required={true}
							value={currentProduct.productName}
							handleChange={(e) => e.target.value}
						/>
						<p className="text-sm mb-3">Category</p>
						<select
							id="category_id"
							className="bg-gray-50 mb-5 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:none block w-full p-2.5"
							onChange={(e) => setNewCategory(e.target.value)}
							required
						>
							<option selected>{currentProduct.categoryName}</option>
							{categories
								.filter(
									(cat) =>
										cat.isDeleted === false &&
										cat.categoryName !== currentProduct.categoryName
								)
								.map((item, idx) => {
									return (
										<option value={item.id} key={idx}>
											{item.categoryName}
										</option>
									);
								})}
						</select>
						<Input
							type="number"
							name="product_price"
							id="product_price"
							label="Product Price"
							required={true}
							value={currentProduct.price}
							handleChange={(e) => e.target.value}
						/>
						<p className="text-sm mb-3">Currency Type</p>
						<select
							id="currencies"
							className="bg-gray-50 mb-5 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:none block w-full p-2.5"
							onChange={(e) => setNewCurrency(e.target.value)}
							value={currentProduct.currencyType}
							required
						>
							{currencyRecords
								// .filter((c) => c.value !== currentProduct.currencyType)
								.map((item, idx) => {
									return (
										<option value={item.value} key={idx}>
											{item.value}
										</option>
									);
								})}
						</select>
						<Input
							type="number"
							name="product_in_stock"
							id="product_in_stock"
							label="How many products in stock?"
							required={true}
							value={currentProduct.productInStock}
							handleChange={(e) => e.target.value}
						/>

						<p className="text-sm mb-2">New product image ?</p>
						<input
							type="file"
							className="mb-5"
							onChange={(e) => convertImageToBase64(e, setNewImage)}
						/>

						<img src={newImage ? newImage : currentProduct.image} alt="" />
					</>
				) : (
					<Input
						type="number"
						name="product_in_stock"
						id="product_in_stock"
						label="How many products in stock?"
						required={true}
						value={currentProduct.productInStock}
						handleChange={(e) => e.target.value}
					/>
				)}

				<Button title="Update" />
			</Form>
		</Modal>
	);
};

export default UpdateProduct;
