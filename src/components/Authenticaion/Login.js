import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import { useData } from '../../contexts/DataContext';
import Button from '../common/Button';
import Form from '../common/Form';
import Input from '../common/Input';
import Loading from '../common/Loading';
import { loginSchema } from '../validation/schema';

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

const Login = () => {
	const navigate = useNavigate();

	const { loadingStatus, setLoadingStatus } = useData();

	const methods = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		resolver: yupResolver(loginSchema),
	});

	const { errors } = methods;

	const onSubmit = async (data) => {
		setLoadingStatus(true);
		try {
			await axios
				.post(
					`${process.env.REACT_APP_BACKEND_API}/Login`,
					{
						email: data.email,
						password: data.password,
					},
					{
						headers: { 'Content-Type': 'multipart/form-data' },
					}
				)
				.then((response) => {
					localStorage.setItem('Token', JSON.stringify(response.data.item1));
					localStorage.setItem(
						'user_info',
						JSON.stringify(response.data.item2)
					);
					navigate('/');
					setLoadingStatus(false);
					Toast.fire({
						icon: 'success',
						iconColor: '#3B82F6',
						title: 'Logged in successfully!',
					});
				})
				.catch((e) => {
					Toast.fire({
						icon: 'error',
						title: e.response.data,
					});
				});
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<div className="flex flex-col items-center justify-center h-[100vh] bg-blue-500 text-black">
			<div className="w-1/4 overflow-hidden bg-white grid grid-cols items-center rounded-md p-5">
				<h3 className="text-center uppercase font-bold mt-8">Login</h3>
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
					<Button title={'Login'} />
					<p className="pt-5">
						Don't have an account ?{' '}
						<span
							className="text-blue-500 cursor-pointer text-center mt-6"
							onClick={() => navigate('/register')}
						>
							Register now
						</span>{' '}
					</p>
				</Form>
			</div>
			{loadingStatus ? <Loading /> : null}
		</div>
	);
};

export default Login;
