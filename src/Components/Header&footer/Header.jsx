import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
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
              className="p-2 border border-[#C6DABF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9ED1DB] w-full lg:w-auto"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#C6DABF] text-[#3C4C3C] rounded-md hover:bg-[#9ED1DB] transition ml-2">
              Search
            </button>
          </div>
          <div className="flex space-x-4">
            <button className="hover:text-[#9ED1DB]" onClick={() => navigate('/cart')}><box-icon type='solid' name='cart-alt'></box-icon></button>
            <button className="hover:text-[#9ED1DB]" onClick={() => navigate('/login')}><box-icon name='user'></box-icon></button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
