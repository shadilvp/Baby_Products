import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAdmin }) => {

    const currentUser = JSON.parse(localStorage.getItem('roll'));

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (isAdmin && currentUser !== 'admin') {
        return <Navigate to="/" />;
    }

    return element;
};

export default ProtectedRoute;
