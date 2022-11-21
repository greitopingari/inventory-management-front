import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useData } from '../../../../contexts/DataContext';
import Modal from '../../../common/Modal';

//Form

import Button from '../../../common/Button';
import Form from '../../../common/Form';
import Input from '../../../common/Input';

import convertImageToBase64 from '../../../../contexts/functions';

const UpdateProduct = ({ update, updateModal, product_id }) => {

	const user_name = JSON.parse(localStorage.getItem('user_info')).username;

	const { setLoadingStatus } = useData();
	const [currentProduct, setCurrentProduct] = useState([]);

	const methods = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
	});

	const headers = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('Token')),
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

	const updateProduct = async (data) => {

		try {
			axios
				.put(
					`${process.env.REACT_APP_BACKEND_API}/Product`,
					{
						productName: data.product_name || currentProduct.productName,
						serialNumber: data.serial_number || currentProduct.serialNumber,
						price: data.product_price || currentProduct.productPrice,
						productInStock: data.product_in_stock || currentProduct.productName,
						currencyType: data.currencyType || currentProduct.productName,
						productDescription: data.product_description || currentProduct.productName,
						image: data.image || currentProduct.productName,
						productCategoryId: data.category || currentProduct.productCategoryId,
						createdBy: user_name,
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
			console.log(e);
		}
	};
	useEffect(() => {
		getCurrentProduct(product_id);
	}, []);

	return (
		<Modal onOutside={() => updateModal(false)}>
			<Form
				methods={methods}
				onSubmit={updateProduct}
				className="w-1/2 pt-5 text-left"
			>
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

				<img src={currentProduct.image} />

				<Button title="Update" />
			</Form>
		</Modal>
	);
};

export default UpdateProduct;
