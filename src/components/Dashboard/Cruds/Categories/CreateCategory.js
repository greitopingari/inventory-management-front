import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import Button from '../../../common/Button';
import Form from '../../../common/Form';
import Input from '../../../common/Input';
import Modal from './../../../common/Modal';

const CreateCategory = ({ update, updateModal }) => {
	const user_email = JSON.parse(localStorage.getItem('user_info')).email;

	const headers = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('Token')),
		},
	};

	const createCategory = (data) => {
		try {
			axios
				.post(
					`${process.env.REACT_APP_BACKEND_API}/Category`,
					{
						categoryName: data.category_name,
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
						text: e.response.data.CategoryName,
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

	return (
		<Modal onOutside={() => updateModal(false)}>
			<p className="text-center font-bold mb-5">Create Category</p>
			<Form
				methods={methods}
				onSubmit={createCategory}
				className="w-1/2 pt-5 text-left"
			>
				<Input
					type="text"
					name="category_name"
					id="category_name"
					label="Enter Category Name"
					required={true}
				/>
				<Button title={'Create'} />
			</Form>
		</Modal>
	);
};

export default CreateCategory;
