import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Button from '../../../common/Button';
import Form from '../../../common/Form';
import Input from '../../../common/Input';
import Modal from '../../../common/Modal';

const CreateProduct = ({ update, updateModal }) => {
	const user_email = JSON.parse(localStorage.getItem('user_info')).email;
	const [image64, setImage64] = useState(null);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedCurrency, setSelectedCurrency] = useState('');

	const getCategories = async () => {
		await axios
			.get(`${process.env.REACT_APP_BACKEND_API}/Category`, headers)
			.then((res) => setCategories(res.data));
	};
	const headers = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('Token')),
		},
	};

	const convertImageToBase64 = (e) => {
		const file = e.target.files[0];
		const file_reader = new FileReader();

		file_reader.onloadend = () => {
			setImage64(file_reader.result.toString());
		};

		file_reader.readAsDataURL(file);
	};

	useEffect(() => {
		getCategories();
	}, []);

	const create_product = (data) => {
		try {
			axios
				.post(
					`${process.env.REACT_APP_BACKEND_API}/Product`,
					{
						productName: data.product_name,
						serialNumber: data.serial_number,
						price: data.product_price,
						productInStock: data.product_in_stock,
						currencyType: selectedCurrency,
						productDescription: data.product_description,
						image: image64,
						productCategoryId: selectedCategory,
						createdBy: user_email,
					},
					headers
				)
				.then((_) => {
					Swal.fire({
						icon: 'success',
						title: 'Uploaded Successfully!',
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
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: e,
			});
		}
	};

	const methods = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
	});

	const currencies = [
		{
			value: 'Euro',
		},
		{
			value: 'Dollar',
		},
		{
			value: 'ALL',
		},
	];

	return (
		<Modal onOutside={() => updateModal(false)}>
			<p className="text-center font-bold mb-5">Create Product</p>
			<Form
				methods={methods}
				onSubmit={create_product}
				className="w-1/2 pt-5 text-left"
			>
				<Input
					type="text"
					name="product_name"
					id="product_name"
					label="Product Name"
					required={true}
				/>
				<Input
					type="text"
					name="serial_number"
					id="serial_number"
					label="Serial Number"
					required={true}
				/>
				<Input
					type="number"
					name="product_price"
					id="product_price"
					label="Product Price"
					required={true}
				/>
				<select
					id="currencies"
					className="bg-gray-50 mb-5 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:none block w-full p-2.5"
					onChange={(e) => setSelectedCurrency(e.target.value)}
					defaultValue="Currency"
					required
				>
					<option value="Currency" disabled>
						Choose a Currency
					</option>
					{currencies.map((item, idx) => {
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
					label="How many in Stock?"
					required={true}
				/>
				<Input
					type="text"
					name="product_description"
					id="product_description"
					label="Product Description"
					required={true}
				/>
				<select
					id="category_id"
					className="bg-gray-50 mb-5 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:none block w-full p-2.5"
					defaultValue="Category"
					onChange={(e) => setSelectedCategory(e.target.value)}
					required
				>
					<option value="Category" disabled>
						Choose a Category
					</option>
					{categories
						.filter((cat) => cat.isDeleted === false)
						.map((item, idx) => {
							return (
								<option value={item.id} key={idx}>
									{item.categoryName}
								</option>
							);
						})}
				</select>

				<div className="flex flex-col mb-5">
					<input
						type="file"
						className="mb-5"
						onChange={(e) => convertImageToBase64(e)}
						required
					/>
					{image64 ? <img src={image64} /> : null}
				</div>

				<Button title={'Create'} />
			</Form>
		</Modal>
	);
};

export default CreateProduct;
