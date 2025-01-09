import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import Swal from 'sweetalert2';

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

      const handleLogOut = () => {
        dispatch(logout());
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Admin is logged out",
          showConfirmButton: false,
          timer: 3000
        });
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('accessToken');
        navigate('/login');
      };

  return (
    <div className="bg-gray-900 text-white flex justify-between items-center p-4">
      <h1 className="text-xl font-bold">Admin Page</h1>
      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        onClick={handleLogOut}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
