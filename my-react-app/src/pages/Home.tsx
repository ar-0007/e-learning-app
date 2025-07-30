import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Icons
const CarIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1l1.5-4h8l1.5 4h1a1 1 0 001-1V5a1 1 0 00-1-1H3zM6 12a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
)

const CertificateIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
)

const MentorIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
)

const Home: React.FC = () => {
  const handleWhatsAppContact = () => {
    window.open('https://wa.me/1234567890?text=Hi! I\'m interested in your car detailing courses.', '_blank')
  }

  const handleEnrollNow = () => {
    // Scroll to courses section
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white section-padding">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-luxury-black mb-6 leading-tight">
              Become a Certified
              <span className="text-luxury-orange block">Car Detailer</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Learn from experts. Get certified. Build your detailing career.
            </p>
            <button onClick={handleEnrollNow} className="btn-primary text-lg px-8 py-4">
              Enroll Now
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-luxury-black mb-8">About Our Training Academy</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              At Luxury Auto Spa – Detailers University, we believe in hands-on learning with expert guidance. 
              Our comprehensive training program combines one-on-one mentorship with practical, real-world experience. 
              Every student receives personalized attention from industry professionals, ensuring you master the art 
              of car detailing from basic techniques to advanced methods.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-luxury-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <MentorIcon />
                </div>
                <h3 className="text-xl font-semibold text-luxury-black mb-2">One-on-One Mentorship</h3>
                <p className="text-gray-600">Personal guidance from industry experts</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-luxury-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <CarIcon />
                </div>
                <h3 className="text-xl font-semibold text-luxury-black mb-2">Hands-On Training</h3>
                <p className="text-gray-600">Real-world experience with actual vehicles</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-luxury-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <CertificateIcon />
                </div>
                <h3 className="text-xl font-semibold text-luxury-black mb-2">Certificate of Completion</h3>
                <p className="text-gray-600">Industry-recognized certification</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-luxury-black mb-4">Our Courses</h2>
            <p className="text-lg text-gray-600">Master the art of car detailing with our comprehensive courses</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-luxury-orange rounded-lg flex items-center justify-center mb-6">
                <CarIcon />
              </div>
              <h3 className="text-2xl font-bold text-luxury-black mb-4">Basic Detailing Fundamentals</h3>
              <p className="text-gray-600 mb-6">
                Learn the essential techniques of car detailing including washing, waxing, and basic interior cleaning.
              </p>
              <button className="btn-secondary w-full">Learn More</button>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-luxury-orange rounded-lg flex items-center justify-center mb-6">
                <CertificateIcon />
              </div>
              <h3 className="text-2xl font-bold text-luxury-black mb-4">Advanced Paint Correction</h3>
              <p className="text-gray-600 mb-6">
                Master paint correction techniques, swirl removal, and achieving showroom-quality finishes.
              </p>
              <button className="btn-secondary w-full">Learn More</button>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-luxury-orange rounded-lg flex items-center justify-center mb-6">
                <MentorIcon />
              </div>
              <h3 className="text-2xl font-bold text-luxury-black mb-4">Business & Marketing</h3>
              <p className="text-gray-600 mb-6">
                Learn how to start and grow your own detailing business with proven marketing strategies.
              </p>
              <button className="btn-secondary w-full">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-luxury-black mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Your journey to becoming a certified detailer in 4 simple steps</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-luxury-orange rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-semibold text-luxury-black mb-2">Sign Up</h3>
              <p className="text-gray-600">Register for your chosen course and create your account</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-luxury-orange rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-semibold text-luxury-black mb-2">Get Approved</h3>
              <p className="text-gray-600">Our team reviews your application and confirms enrollment</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-luxury-orange rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-semibold text-luxury-black mb-2">Learn</h3>
              <p className="text-gray-600">Access comprehensive training materials and hands-on sessions</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-luxury-orange rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                4
              </div>
              <h3 className="text-xl font-semibold text-luxury-black mb-2">Get Certified</h3>
              <p className="text-gray-600">Complete your training and receive your certification</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mentorship Section */}
      <section id="mentorship" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-luxury-black mb-8">One-on-One Mentorship</h2>
            <p className="text-lg text-gray-600 mb-8">
              Get personalized guidance from industry experts through our exclusive mentorship program. 
              Schedule sessions via Zoom and choose from flexible payment options.
            </p>
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-luxury-black mb-4">Book Your Session</h3>
              <p className="text-gray-600 mb-6">
                Connect with experienced detailers for personalized training and career guidance.
              </p>
              <button className="btn-primary">Book Mentorship Session</button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-luxury-black mb-8">Contact Our Marketing Team</h2>
            <p className="text-lg text-gray-600 mb-8">
              Have questions? Our marketing team is here to help you get started on your detailing journey.
            </p>
            <button 
              onClick={handleWhatsAppContact}
              className="btn-primary flex items-center justify-center space-x-2 mx-auto"
            >
              <WhatsAppIcon />
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home; 