import Header from "../Header&footer/Header"
import Footer from "../Header&footer/Footer"
const About = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <div className="bg-yellow-100 text-center py-12">
                <h1 className="text-5xl font-bold text-gray-800">About Us</h1>
            </div>

            {/* Content Section */}
            <div className="flex flex-col items-center bg-white py-8 px-6">
                {/* Image */}
                <div className="max-w-4xl">
                    <img
                        src="src\datas\images\Screenshot 2024-11-26 163210.png"
                        alt="Team"
                        className="rounded-md shadow-lg"
                    />
                </div>

                {/* Text Content */}
                <div className="mt-8 max-w-4xl text-center">
                    <p className="text-lg text-gray-600 leading-relaxed mb-4">
                        We’re a fully distributed team working across the globe. Our mission is to provide the best
                        products to help our customers build their brands and grow their businesses.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Since the early days, we’ve been focused on creating a unique and fulfilling workplace while rethinking traditional practices.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};



export default About