import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Icons
const WhatsAppIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
)

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
)

const EmailIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
)

const LocationIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
)

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/1234567890?text=Hi! I\'m interested in your car detailing courses.', '_blank')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white section-padding">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-luxury-black mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions about our courses? Ready to start your detailing journey? 
              We're here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-luxury-black mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="course-inquiry">Course Inquiry</option>
                      <option value="mentorship">Mentorship Booking</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="general">General Question</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                    placeholder="Tell us about your inquiry..."
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-primary w-full py-4 text-lg">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-luxury-black mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-luxury-orange rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <PhoneIcon />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-luxury-black mb-1">Phone</h3>
                    <p className="text-gray-600">+1 (604) 441-4903</p>
                    <p className="text-sm text-gray-500">Mon-Sat: 8:00 AM - 6:00 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-luxury-orange rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <EmailIcon />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-luxury-black mb-1">Email</h3>
                    <p className="text-gray-600">luxuryautospa.van@gmail.com</p>
                    <p className="text-sm text-gray-500">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-luxury-orange rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <LocationIcon />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-luxury-black mb-1">Location</h3>
                    <p className="text-gray-600">17957 55 Ave Unit #204</p>
                    <p className="text-gray-600">Surrey, BC V3S 6C4, Canada</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-8 bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Quick Support via WhatsApp</h3>
                <p className="mb-4 opacity-90">Get instant answers to your questions</p>
                <button 
                  onClick={handleWhatsAppContact}
                  className="bg-white text-green-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center space-x-2"
                >
                  <WhatsAppIcon />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-luxury-black mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Find answers to common questions about our courses</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-luxury-black mb-2">How long does it take to complete a course?</h3>
              <p className="text-gray-600">Course duration varies from 3-6 weeks depending on the program. Each course is self-paced, so you can complete it at your own speed.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-luxury-black mb-2">Do I need any prior experience?</h3>
              <p className="text-gray-600">No prior experience is required for our beginner courses. We start from the basics and build up to advanced techniques.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-luxury-black mb-2">What equipment do I need?</h3>
              <p className="text-gray-600">We provide a list of recommended tools and equipment. For hands-on courses, we can help you source professional-grade equipment.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-luxury-black mb-2">Is there a money-back guarantee?</h3>
              <p className="text-gray-600">Yes, we offer a 30-day money-back guarantee if you're not satisfied with your course experience.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-luxury-black mb-2">Can I access course materials after completion?</h3>
              <p className="text-gray-600">Yes, you get lifetime access to all course materials, including updates and new content.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact; 