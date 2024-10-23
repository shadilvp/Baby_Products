import Header from "../Header&footer/Header";
import Footer from "../Header&footer/Footer";
import { Link } from "react-router-dom";
import Dashboard from "../../Admin/Pages/Dashboard";

const Home = () => {
    const babyImageUrl = "https://smp-is.stylemepretty.com/wp-content/submissions/uploads/cheryl.m.photography@gmail.com/47097/dankenbring_23$!1125x.jpg";
    const loginemail = String(localStorage.getItem('loginemail'));

    // console.log(typeof(loginemail));

    return (
        <>
            {loginemail == 'admin@1234' ? <><Dashboard /></> : <><div className="bg-[#FAF2DD]" >
                <Header />
                <div className="flex items-center justify-between min-h-screen p-6 bg-[#FAE0C5] rounded-lg shadow-lg mt-4">
                    <div className="flex-1 text-left p-6">
                        <h1 className="text-4xl font-bold text-[#3C4C3C] mb-4">Welcome to SoftSteps</h1>
                        <p className="text-lg text-[#3C4C3C] mb-6">
                            At SoftSteps, we offer a range of baby products designed with love and care. Our goal is to provide the best for your little ones, ensuring safety, comfort, and style. Shop now and give your baby the best start in life!
                        </p>
                        <Link
                            to="/shop"
                            className="bg-[#3C4C3C] text-white py-2 px-4 rounded-md hover:bg-[#9ED1DB] transition duration-200"
                        >
                            Shop Now
                        </Link>
                    </div>
                    <div className="flex-1 h-[700px] w-full">
                        <img
                            src={babyImageUrl}
                            alt="A happy baby"
                            className="w-full h-3/4 rounded-[300px] shadow-lg object-cover"
                        />
                    </div>
                </div>

                <Footer />
            </div></>}


        </>
    );
};

export default Home;
