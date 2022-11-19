import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Button from "../../../common/Button";
import Form from "../../../common/Form";
import Input from "../../../common/Input";

const CreateProduct = ({updateModal}) => {
    
    const user_email = JSON.parse(localStorage.getItem('user_info')).email;

	const headers = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('Token')),
		},
	};

    const createProduct = (data) => {
		try {
			axios
				.post(
					`${process.env.REACT_APP_BACKEND_API}/Product`,
					{
						productName: data.product_name,
						serialNumber: data.serial_number,
						price: data.price,
						productInStock: data.product_in_stock,
						productDescription: data.product_description,
                        image: data.product_image,
                        productCategoryId: data.product_category_id,
                        createdBy: user_email
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
			<p className="text-center font-bold mb-5">Create Product</p>
			<Form
				methods={methods}
				onSubmit={createProduct}
				className="w-1/2 pt-5 text-left"
			>
				{/* To be added Input fields to process form */}
				<Button title={'Create'} />
			</Form>
		</Modal>
	);
}
 
