import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    return (
        localStorage.Token ? <Outlet /> : <Navigate to='login'/>
    );
}

export default PrivateRoutes;
