import { useNavigate } from "react-router-dom";


const Header = () => {

    const navigate = useNavigate()
    return (
      <header className="bg-[#FAF2DD] p-4">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#3C4C3C]">SoftSteps</h1>
          <ul className="flex space-x-6 text-[#3C4C3C]">
            <li><button onClick={()=> navigate('/')} className="hover:text-[#9ED1DB]">Home</button></li>
            <li><button onClick={()=> navigate('/about')} className="hover:text-[#9ED1DB]">About</button></li>
            <li><button onClick={()=> navigate('/contact')} className="hover:text-[#9ED1DB]">Contact</button></li>
          </ul>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search Items"
              className="p-2 border border-[#C6DABF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9ED1DB]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#C6DABF] text-[#3C4C3C] rounded-md hover:bg-[#9ED1DB] transition">
              Search
            </button>
          </div>
          <div className="flex space-x-4">
            <button className="hover:text-[#9ED1DB]" onClick={()=> navigate('/cart')}><box-icon type='solid' name='cart-alt'></box-icon> </button>
            <button className="hover:text-[#9ED1DB]" onClick={()=> navigate('/login')}>  <box-icon name='user' color='#090909'></box-icon>  </button>
          </div>
        </nav>
      </header>
    );
  };
  
  export default Header;
  