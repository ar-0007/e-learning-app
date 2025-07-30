import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-luxury-black mb-6">
              Our Story: Passion, Dedication, and Excellence
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              From childhood hobby to professional excellence - our journey in car detailing
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12">
                <h2 className="text-3xl font-bold text-luxury-black mb-6">
                  Our Love for Cars Began Early
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Our love for cars began with detailing our parents' cars. What started as a childhood hobby 
                  turned into a lifelong pursuit of excellence. We spent countless hours ensuring every inch was 
                  spotless and every surface gleamed, igniting a passion that has only grown stronger.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Beyond detailing, our connection to cars includes playing Need for Speed and being huge Fast 
                  and Furious fans. This deep-rooted love for automobiles inspired us to build a career dedicated 
                  to preserving their beauty and performance.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 md:p-12 mb-12">
                <h2 className="text-3xl font-bold text-luxury-black mb-6">
                  The Best Detailers in the City
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Today, we are a team of the best detailers this city has ever seen, united by our passion 
                  and commitment to quality. We provide top-notch service because our clients deserve the best.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  For us, our clients are everything. Serving our community is a privilege, and we go the extra 
                  mile in every service we provide. Whether it's a routine clean or a full ceramic coating, 
                  we approach each task with care and dedication.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12">
                <h2 className="text-3xl font-bold text-luxury-black mb-6">
                  Our Commitment to Excellence
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Thank you for being part of our journey. We look forward to continuing to serve you with 
                  excellence, because when you come to the best, you deserve nothing less.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-luxury-orange rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-luxury-black mb-2">Quality Service</h3>
                    <p className="text-gray-600">Every detail matters in our work</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-luxury-orange rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-luxury-black mb-2">Expert Team</h3>
                    <p className="text-gray-600">Skilled professionals dedicated to excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-luxury-black mb-8">Ready to Experience Excellence?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-luxury-black mb-4">Contact Information</h3>
                <div className="space-y-4 text-gray-700">
                  <p className="flex items-center justify-center">
                    <span className="font-semibold mr-2">Email:</span>
                    <a href="mailto:luxuryautospa.van@gmail.com" className="text-luxury-orange hover:underline">
                      luxuryautospa.van@gmail.com
                    </a>
                  </p>
                  <p className="flex items-center justify-center">
                    <span className="font-semibold mr-2">Phone:</span>
                    <a href="tel:+16044414903" className="text-luxury-orange hover:underline">
                      (604) 441-4903
                    </a>
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-luxury-black mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-700">
                  <p className="font-semibold">Open 7 days a week</p>
                  <p>8am – 6pm</p>
                </div>
                <button className="btn-primary mt-6 w-full">Book a Service</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs; 