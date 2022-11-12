import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Button from "../common/Button";
import Form from "../common/Form";
import Input from "../common/Input";
import { loginSchema } from "../validation/schema";

const Login = () => {
    const navigate = useNavigate();

    const formData = new FormData();

    const methods = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: yupResolver(loginSchema),
    })

    const { errors } = methods;

    const onSubmit = async (data) => {

        formData.append('email', data.email);
        formData.append('password', data.password);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/Login`,
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
                    <Button
                        title={"Login"}
                    />
                    <p className="pt-5">Don't have an account ? <span
                        className="text-blue-500 cursor-pointer text-center mt-6"
                        onClick={() => navigate('/register')}>
                        Register now
                    </span> </p>
                </Form>
            </div>

        </div>
    );
}

export default Login;