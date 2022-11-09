import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const navigate = useNavigate();

    const LogOut = () => {
        localStorage.removeItem("Token");
        navigate("/login");
    }
    return (
        <>
            <div>Dashboard</div>
            <input className="bg-red-500 text-white cursor-pointer" type="button" value="Log out" onClick={LogOut} />
        </>

    );
}

export default Dashboard;