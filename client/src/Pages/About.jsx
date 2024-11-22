import React from 'react';
import { Scissors, Crown, Flame } from 'lucide-react';

const About = () => {
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3178.329942434618!2d-93.29448882357384!3d37.20900597198344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87cf63102b921da3%3A0x19c44a019ad48b05!2s223%20E%20Commercial%20St%2C%20Springfield%2C%20MO%2065803!5e0!3m2!1sen!2sus!4v1698456287118!5m2!1sen!2sus";

    return (
        <div className="relative">
            {/* Content */}
            <div className="relative z-10 pt-32 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900">
                {/* Hero Section */}
                <div className="container mx-auto mb-20">
                    <h4 className='p-4 pb-6 text-center text-white text-5xl sm:text-6xl lg:text-7xl tracking-wide'
                        style={{
                            fontFamily: "Splash",
                            textShadow: '0 6px 4px rgba(63, 105, 183, 0.8)'
                        }}>
                        The Blu Styles Story
                    </h4>

                    {/* Mission Statement Card */}
                    <div className="max-w-4xl mx-auto bg-black bg-opacity-70 p-8 rounded-lg border border-gray-800 backdrop-blur-sm mb-20">
                        <h2 className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent" style={{ fontFamily: "Teko" }}>
                            Our Mission
                        </h2>
                        <p className="text-2xl text-center text-gray-300" style={{ fontFamily: "Abel" }}>
                            "WE WANT YOU TO LEAVE BETTER THAN YOU CAME!"
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                        {[
                            {
                                title: "Expert Barbers",
                                description: "Our team brings years of experience and continuous training to deliver exceptional cuts.",
                                icon: <Scissors className="w-8 h-8 text-blue-400 mx-auto" />
                            },
                            {
                                title: "Premium Service",
                                description: "Every client receives personalized attention and premium grooming services.",
                                icon: <Crown className="w-8 h-8 text-blue-400 mx-auto" />
                            },
                            {
                                title: "Modern Techniques",
                                description: "We combine traditional craftsmanship with contemporary styling methods.",
                                icon: <Flame className="w-8 h-8 text-blue-400 mx-auto" />
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-black bg-opacity-70 p-6 rounded-lg border border-gray-800 backdrop-blur-sm text-center group hover:bg-opacity-90 transition-all duration-300 hover:transform hover:scale-105">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                                <p className="text-gray-300">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* History Section */}
                    <div className="max-w-4xl mx-auto bg-black bg-opacity-70 p-8 rounded-lg border border-gray-800 backdrop-blur-sm mb-20">
                        <h2 className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent" style={{ fontFamily: "Teko" }}>
                            Our Journey
                        </h2>
                        <div className="space-y-6 text-gray-300">
                            <p className="text-xl " style={{ fontFamily: "Abel" }}>
                                Since our establishment, Blu Styles has been more than just a barbershop – we're a cornerstone of the community where style meets excellence.
                            </p>
                            <p className="text-xl" style={{ fontFamily: "Abel" }}>
                                Our commitment to craft and customer service has made us Springfield's premier destination for those seeking more than just a haircut.
                            </p>
                        </div>
                    </div>

                    {/* Location Section */}
                    <div className="max-w-6xl mx-auto mb-20">
                        <h2 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent" style={{ fontFamily: "Teko" }}>
                            Find Us
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Map */}
                            <div className="bg-black bg-opacity-70 p-4 rounded-lg border border-gray-800 backdrop-blur-sm h-[400px]">
                                <iframe
                                    src={mapUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="rounded-lg"
                                ></iframe>
                            </div>
                            {/* Contact Info */}
                            <div className="bg-black bg-opacity-70 p-8 rounded-lg border border-gray-800 backdrop-blur-sm">
                                <h3 className="text-2xl font-bold mb-4 text-white">Visit Us</h3>
                                <div className="space-y-4 text-gray-300">
                                    <p>223 E COMMERCIAL ST</p>
                                    <p>SPRINGFIELD, MO</p>
                                    <p>UNITED STATES</p>
                                    <div className="pt-4">
                                        <h4 className="font-bold mb-2">Hours</h4>
                                        <p>Monday - Saturday: 9 AM - 5 PM</p>
                                        <p>Sunday: Closed</p>
                                    </div>
                                    <div className="pt-4">
                                        <h4 className="font-bold mb-2">Contact</h4>
                                        <p className="text-xl">417-227-0001</p>
                                    </div>
                                    <div className="pt-4">
                                        <a
                                            href="https://maps.google.com/?q=223+E+Commercial+St,+Springfield,+MO+65803"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
                                        >
                                            Get Directions
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;