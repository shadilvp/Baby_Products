const Footer = () => {
    return (
      <footer className="bg-[#FAF2DD] p-6 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0">

          <div className="text-[#3C4C3C]">
            <h3 className="font-bold mb-2">Contact Us</h3>
            <p className="hover:text-[#93d8b3]">123 Fifth Ave, New York, NY 12004</p>
            <p className="hover:text-[#93d8b3]">+1 123 456 78 90</p>
            <p className="hover:text-[#93d8b3]">mail@example.com</p>
          </div>
  
          <div className="text-[#3C4C3C]">
            <h3 className="font-bold mb-2">Customer Service</h3>
            <ul className="space-y-1">
              <li><p  className="hover:text-[#9ED1DB]">Contact Us</p></li>
              <li><p  className="hover:text-[#9ED1DB]">Help & FAQs</p></li>
              <li><p  className="hover:text-[#9ED1DB]">Payment Method</p></li>
              <li><p  className="hover:text-[#9ED1DB]">Delivery Information</p></li>
              <li><p  className="hover:text-[#9ED1DB]">Track Your Order</p></li>
              <li><p  className="hover:text-[#9ED1DB]">Returns & Exchanges</p></li>
            </ul>
          </div>
  
          <div className="text-[#3C4C3C]">
            <h3 className="font-bold mb-2">Categories</h3>
            <ul className="space-y-1">
              <li><p className="hover:text-[#9ED1DB]">Clothing & Fashion</p></li>
              <li><p className="hover:text-[#9ED1DB]">Toys</p></li>
              <li><p className="hover:text-[#9ED1DB]">School Supplies</p></li>
              <li><p className="hover:text-[#9ED1DB]">Birthday Party Supplies</p></li>
              <li><p className="hover:text-[#9ED1DB]">Baby Diapering</p></li>
            </ul>
          </div>
  
          <div className="text-[#3C4C3C]">
            <h3 className="font-bold mb-2">Our Company</h3>
            <ul className="space-y-1">
              <li><p className="hover:text-[#9ED1DB]">Corporate Information</p></li>
              <li><p className="hover:text-[#9ED1DB]">Privacy & Cookies Policy</p></li>
              <li><p className="hover:text-[#9ED1DB]">Terms & Conditions</p></li>
              <li><p className="hover:text-[#9ED1DB]">Promo & Terms</p></li>
            </ul>
          </div>
        </div>
  
        <div className="text-center text-[#3C4C3C] mt-6">
          <p>&copy; 2024 Baby Store | Powered by Baby Store</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  