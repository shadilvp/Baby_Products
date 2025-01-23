import Header from "../Header&footer/Header"
import Footer from "../Header&footer/Footer"
const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <div className="flex-grow flex flex-col items-center justify-center px-4">
                <div className="border border-black p-8 max-w-4xl w-full bg-white shadow-lg relative">
                    {/* Top Text */}
                    <div className="absolute top-4 left-4 text-sm font-bold uppercase text-gray-400">
                        Dieu Neo
                    </div>
                    <div className="absolute top-4 right-4 text-sm font-bold uppercase text-gray-400">
                        Contact
                    </div>

                    {/* Title */}
                    <h1 className="text-6xl md:text-8xl font-bold text-center leading-tight tracking-tight">
                        Contact <span className="italic">Us</span>
                    </h1>

                    {/* Contact Details */}
                    <div className="flex flex-col md:flex-row justify-between items-center mt-10">
                        {/* Left Section */}
                        <div className="text-center md:text-left">
                            <p className="text-lg font-medium">9983</p>
                            <p className="text-lg">Branch Street Flushing</p>
                            <p className="text-lg">New York, NY 11364</p>
                            <p className="mt-4 text-lg">+1 (212) 923-4219</p>
                            <p className="text-lg">info@dieuneo.com</p>
                        </div>

                        {/* Right Section */}
                        <div className="text-center md:text-right mt-8 md:mt-0">
                            <p className="text-lg font-medium">9280</p>
                            <p className="text-lg">York Road</p>
                            <p className="text-lg">London, LND N69 1SU</p>
                            <p className="mt-4 text-lg">+020 (0) 7348 0121</p>
                            <p className="text-lg">hello@dieuneo.com</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};


export default Contact