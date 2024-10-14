import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDetails from "../pagas/UserDetails";
import { ProductContext } from "../../Hooks/Context";

const Header = () => {
  const navigate = useNavigate();

  const [showUserDetails, setShowUserDetails] = useState(false);
  const {handleSearch, searchItems} = useContext(ProductContext)

  const handleChange = (event) => {
    handleSearch(event.target.value)
  }



  const toggleUserDetails = () => {
    setShowUserDetails((prev) => !prev);
    console.log("User Details Toggle State:", !showUserDetails);
  };
  return (
    <header className="bg-[#FAF2DD] p-4">
      <nav className="flex flex-wrap justify-between items-center">
        <h1 className="text-2xl font-bold text-[#3C4C3C]">SoftSteps</h1>
        
        {/* Mobile Navigation Toggle */}
        <button
          className="block lg:hidden text-[#3C4C3C] focus:outline-none focus:ring-2 focus:ring-[#9ED1DB]"
          onClick={() => document.getElementById("mobile-menu").classList.toggle("hidden")}
        >
          <box-icon name="menu" size="md"></box-icon>
        </button>
        
        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 text-[#3C4C3C]">
          <li><button onClick={() => navigate('/')} className="hover:text-[#9ED1DB]">Home</button></li>
          <li><button onClick={() => navigate('/Shop')} className="hover:text-[#9ED1DB]">Shop</button></li>
          <li><button onClick={() => navigate('/about')} className="hover:text-[#9ED1DB]">About</button></li>
          <li><button onClick={() => navigate('/contact')} className="hover:text-[#9ED1DB]">Contact</button></li>
        </ul>

        {/* Mobile Menu */}
        <ul id="mobile-menu" className="flex-col hidden lg:hidden w-full mt-4 space-y-2 text-[#3C4C3C]">
          <li><button onClick={() => navigate('/')} className="block hover:text-[#9ED1DB]">Home</button></li>
          <li><button onClick={() => navigate('/Shop')} className="block hover:text-[#9ED1DB]">Shop</button></li>
          <li><button onClick={() => navigate('/about')} className="block hover:text-[#9ED1DB]">About</button></li>
          <li><button onClick={() => navigate('/contact')} className="block hover:text-[#9ED1DB]">Contact</button></li>
        </ul>

        {/* Search and Icons */}
        <div className="flex flex-col lg:flex-row items-center mt-4 lg:mt-0 lg:space-x-4">
          <div className="flex items-center mb-2 lg:mb-0">
            <input
              type="text"
              placeholder="Search Items"
              onChange={handleChange}
              value={searchItems}
              className="p-2 border border-[#C6DABF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9ED1DB] w-full lg:w-auto"
            />
          </div>
          <div className="flex space-x-4">
            <button className="hover:text-[#9ED1DB]" onClick={() => navigate('/cart')}><box-icon type='solid' name='cart-alt'></box-icon></button>
            <button 
              className="hover:text-[#9ED1DB] user-button" 
              onClick={toggleUserDetails}
            >
              <box-icon name='user'></box-icon>
            </button>
            {showUserDetails && <UserDetails show={showUserDetails} toggle={toggleUserDetails} />}              
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
