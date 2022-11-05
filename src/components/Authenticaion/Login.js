import { useNavigate } from "react-router-dom";
const Login = () => {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-[100vh] bg-blue-500 text-black">

            <div className="w-1/3 bg-white grid grid-cols items-center rounded-md p-5">
                <h3 className="text-center uppercase font-medium mt-8">Login</h3>
                <form className="p-5">
                    <div class="relative z-0 mb-8">
                        <input type="email" name="email" id="email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    </div>
                    <div class="relative z-0 mb-8">
                        <input type="password" name="password" id="password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>
                    <button type="submit" class="text-white bg-blue-500 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-3 text-center hover:bg-white hover:text-blue-300 hover:border hover:border-black transition">Login</button>
                    <p
                        className="cursor-pointer text-center mt-6"
                        onClick={() => navigate('/register')}>
                        Register now &#8594;
                    </p>
                </form>
            </div>

        </div>
    );
}

export default Login;