import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Icons
const MentorIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
)

const VideoIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
  </svg>
)

const StarIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const Mentorship: React.FC = () => {
  const [selectedMentor, setSelectedMentor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const mentors = [
    {
      id: 1,
      name: "Jas Singh",
      title: "Master Detailer & Business Owner",
      experience: "10+ years",
      rating: 4.9,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      specialties: ["Paint Correction", "Ceramic Coating", "Business Development"],
      bio: "Jas is the founder of LAS Detailers University and has been in the detailing industry for over a decade. He specializes in advanced paint correction and ceramic coating applications.",
      hourlyRate: 99,
      availability: ["Monday", "Wednesday", "Friday", "Saturday"]
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "Ceramic Coating Specialist",
      experience: "8+ years",
      rating: 4.8,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      specialties: ["Ceramic Coating", "Paint Protection", "Interior Detailing"],
      bio: "Sarah is a certified ceramic coating specialist with extensive experience in luxury vehicle detailing. She has worked with high-end clients and specializes in premium protection services.",
      hourlyRate: 89,
      availability: ["Tuesday", "Thursday", "Saturday"]
    },
    {
      id: 3,
      name: "Mike Chen",
      title: "Advanced Paint Correction Expert",
      experience: "12+ years",
      rating: 5.0,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      specialties: ["Paint Correction", "Swirl Removal", "Show Car Preparation"],
      bio: "Mike is a world-renowned paint correction specialist who has worked on some of the most prestigious vehicles. His attention to detail and technical expertise is unmatched.",
      hourlyRate: 129,
      availability: ["Monday", "Tuesday", "Wednesday", "Thursday"]
    }
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const handleBooking = () => {
    if (selectedMentor && selectedDate && selectedTime) {
      // Handle booking logic
      console.log(`Booking session with mentor ${selectedMentor} on ${selectedDate} at ${selectedTime}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white section-padding">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-luxury-black mb-6">
              One-on-One Mentorship
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Get personalized guidance from industry experts. Schedule private sessions 
              with our master detailers and accelerate your learning journey.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-luxury-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <VideoIcon />
                </div>
                <h3 className="text-lg font-semibold text-luxury-black mb-2">Zoom Sessions</h3>
                <p className="text-gray-600 text-sm">Connect from anywhere in the world</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-luxury-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClockIcon />
                </div>
                <h3 className="text-lg font-semibold text-luxury-black mb-2">60-Minute Sessions</h3>
                <p className="text-gray-600 text-sm">Focused, intensive learning</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-luxury-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <MentorIcon />
                </div>
                <h3 className="text-lg font-semibold text-luxury-black mb-2">Expert Mentors</h3>
                <p className="text-gray-600 text-sm">Learn from the best in the industry</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-luxury-black mb-4">Our Expert Mentors</h2>
            <p className="text-lg text-gray-600">Choose the mentor that best fits your learning goals</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {mentors.map((mentor) => (
              <div 
                key={mentor.id} 
                className={`bg-white rounded-xl shadow-lg p-8 border-2 transition-all cursor-pointer ${
                  selectedMentor === mentor.id 
                    ? 'border-luxury-orange shadow-xl' 
                    : 'border-gray-200 hover:border-luxury-orange'
                }`}
                onClick={() => setSelectedMentor(mentor.id)}
              >
                <div className="text-center mb-6">
                  <img 
                    src={mentor.image} 
                    alt={mentor.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-luxury-black mb-1">{mentor.name}</h3>
                  <p className="text-gray-600 mb-2">{mentor.title}</p>
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(mentor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({mentor.reviews} reviews)</span>
                  </div>
                  <p className="text-sm text-gray-500">{mentor.experience} experience</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-luxury-black mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {mentor.specialties.map((specialty, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-6">{mentor.bio}</p>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-luxury-orange mb-2">${mentor.hourlyRate}/hour</div>
                  <button 
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                      selectedMentor === mentor.id
                        ? 'bg-luxury-orange text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {selectedMentor === mentor.id ? 'Selected' : 'Select Mentor'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      {selectedMentor && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-luxury-black mb-6">Book Your Session</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Selected Mentor</label>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={mentors.find(m => m.id === selectedMentor)?.image} 
                      alt="Selected mentor"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold text-luxury-black">
                        {mentors.find(m => m.id === selectedMentor)?.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        ${mentors.find(m => m.id === selectedMentor)?.hourlyRate}/hour
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                    >
                      <option value="">Choose a time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-luxury-black mb-2">Session Details</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 60-minute private session via Zoom</li>
                    <li>• Personalized guidance and Q&A</li>
                    <li>• Screen sharing for demonstrations</li>
                    <li>• Recording available upon request</li>
                    <li>• Follow-up resources and materials</li>
                  </ul>
                </div>

                <button 
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Book Session - ${mentors.find(m => m.id === selectedMentor)?.hourlyRate}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-luxury-black mb-4">What Students Say</h2>
            <p className="text-lg text-gray-600">Real feedback from our mentorship sessions</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
                  alt="Student"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-luxury-black">Alex Thompson</div>
                  <div className="text-sm text-gray-600">Mentorship with Jas</div>
                </div>
              </div>
              <p className="text-gray-700 italic">"Jas helped me understand the business side of detailing. His mentorship session was incredibly valuable and gave me the confidence to start my own business."</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" 
                  alt="Student"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-luxury-black">Maria Rodriguez</div>
                  <div className="text-sm text-gray-600">Mentorship with Sarah</div>
                </div>
              </div>
              <p className="text-gray-700 italic">"Sarah's expertise in ceramic coating is unmatched. She walked me through every step and answered all my questions. Highly recommend!"</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                  alt="Student"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-luxury-black">David Chen</div>
                  <div className="text-sm text-gray-600">Mentorship with Mike</div>
                </div>
              </div>
              <p className="text-gray-700 italic">"Mike's paint correction techniques are incredible. He showed me methods I never knew existed. Worth every penny!"</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Mentorship; 