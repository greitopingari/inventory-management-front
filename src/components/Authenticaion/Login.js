import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    
    return (
        <div className="flex flex-col items-center justify-center h-[100vh] bg-blue-600 text-white">
            Login Screen
            <p>
                Don't have an account yet?
                <span
                    className="text-yellow-300 cursor-pointer"
                    onClick={() => navigate('/register')}>
                    Register now!
                </span>
            </p>
        </div>
    );
}

export default Login;