import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation/schema";

import Form from "../common/Form";
import Button from "../common/Button";
import Input from "../common/Input";


const Register = () => {
    const navigate = useNavigate();

    const methods = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: yupResolver(registerSchema),
    })

    const { errors } = methods;
    
    const formData = new FormData();


    const onSubmit = async (data) => {

        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('ConfirmPassword', data.confirm_password);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/Register`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            localStorage.setItem("Token", JSON.stringify(response.data));
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center h-[100vh] bg-blue-500 text-black">

            <div className="w-1/4 overflow-hidden bg-white grid grid-cols items-center rounded-md p-5">
                <h3 className="text-center uppercase font-medium mt-8">Register</h3>
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
                    <Button
                        title={"Register"}
                    />
                    <p className="pt-5">Already have an account ? <span
                        className="text-blue-500 cursor-pointer text-center mt-6"
                        onClick={() => navigate('/login')}>
                        Login now
                    </span> </p>
                </Form>
            </div>

        </div>
    );
}

export default Register;