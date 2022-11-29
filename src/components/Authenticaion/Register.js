import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { registerSchema } from '../validation/schema';

import Swal from 'sweetalert2';
import { useData } from '../../contexts/DataContext';
import Button from '../common/Button';
import Form from '../common/Form';
import Input from '../common/Input';
import Loading from '../common/Loading';

const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 1500,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer);
		toast.addEventListener('mouseleave', Swal.resumeTimer);
	},
});

const Register = () => {
	const navigate = useNavigate();
	const { loadingStatus, setLoadingStatus } = useData();
	const methods = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
	});

	const { errors } = methods;

	const onSubmit = async (data) => {
		setLoadingStatus(true);
		try {
			await axios
				.post(
					`${process.env.REACT_APP_BACKEND_API}/Register`,
					{
						email: data.email,
						password: data.password,
						ConfirmPassword: data.confirm_password,
					},
					{
						headers: { 'Content-Type': 'multipart/form-data' },
					}
				)
				.then((response) => {
					sessionStorage.setItem('Token', JSON.stringify(response.data.item1));
					sessionStorage.setItem(
						'user_info',
						JSON.stringify(response.data.item2)
					);
					navigate('/');
					setLoadingStatus(false);
					Toast.fire({
						icon: 'success',
						iconColor: '#3B82F6',
						title: 'Registered successfully!',
					});
				})
				.catch((e) => {
					setLoadingStatus(false)
					Swal.fire({
						icon: 'error',
						title: 'Something Went Wrong, please check all the fields!',
					});
				});
		} catch (e) {
			Swal.fire({
				icon: 'error',
				title: 'Something Went Wrong!',
			});
		}
	};
	return (
		<div className="flex flex-col items-center justify-center h-[100vh] bg-blue-500 text-black">
			<div className="w-1/4 overflow-hidden bg-white grid grid-cols items-center rounded-md p-5">
				<h3 className="text-center uppercase font-bold mt-8">Register</h3>
				<Form methods={methods} onSubmit={onSubmit} className="p-5">
					<Input
						type="email"
						name="email"
						id="email"
						label="Email"
						error={errors?.email?.message}
						required={true}
					/>
					<Input
						type="password"
						name="password"
						id="password"
						label="Password"
						error={errors?.password?.message}
						required={true}
					/>
					<Input
						type="password"
						name="confirm_password"
						id="confirm_password"
						label="Confirm Password"
						error={errors?.confirm_password?.message}
						required={true}
					/>
					<Button title={'Register'} />
					<p className="pt-5">
						Already have an account ?{' '}
						<span
							className="text-blue-500 cursor-pointer text-center mt-6"
							onClick={() => navigate('/login')}
						>
							Login now
						</span>{' '}
					</p>
				</Form>
				{loadingStatus ? <Loading /> : null}
			</div>
		</div>
	);
};

export default Register;
