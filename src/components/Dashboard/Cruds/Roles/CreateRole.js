import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import Button from '../../../common/Button';
import Form from '../../../common/Form';
import Input from '../../../common/Input';
import Modal from '../../../common/Modal';
import { useData } from './../../../../contexts/DataContext';

const CreateRole = ({ updateModal, updateRoles }) => {
	const { setLoadingStatus } = useData();
	const headers = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('Token')),
		},
	};

	const createNewRole = async (data) => {
		setLoadingStatus(true);
		try {
			axios
				.post(
					`${process.env.REACT_APP_BACKEND_API}/Profile`,
					{
						roleName: data.role_name,
					},
					headers
				)
				.then((_) => {
					Swal.fire({
						icon: 'success',
						title: 'Uploaded Successfully!',
					});

					updateRoles();
					updateModal(false);
				})
				.catch((e) => {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Something went wrong please try again!',
					});
				});
			setLoadingStatus(false);
		} catch (e) {
			console.error(e);
		}
	};

	const methods = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
	});

	return (
		<Modal onOutside={() => updateModal(false)}>
			<p className="text-center font-bold mb-5">Create new Role</p>
			<Form
				methods={methods}
				onSubmit={createNewRole}
				className="w-1/2 pt-5 text-left"
			>
				<Input
					type="text"
					name="role_name"
					id="role_name"
					label="Enter Role Name"
					required={true}
				/>
				<Button title={'Create'} />
			</Form>
		</Modal>
	);
};

export default CreateRole;
