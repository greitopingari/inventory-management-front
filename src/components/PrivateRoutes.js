import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    return (
        sessionStorage.Token ? <Outlet /> : <Navigate to='login'/>
    );
}

export default PrivateRoutes;
