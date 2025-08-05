import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import instructorService, { type Instructor } from '../services/instructorService';
import mentorshipService, { type CreateBookingData } from '../services/mentorshipService';

// Icons
const MentorIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
  </svg>
);

const CalendarIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);

const ClockIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

const VideoIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
  </svg>
);

const StarIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Mentorship: React.FC = () => {
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    message: '',
    preferredTopics: [] as string[]
  });
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  // Fetch instructors from backend
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoading(true);
        const data = await instructorService.getAllInstructors();
        setInstructors(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch instructors');
        console.error('Error fetching instructors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const handleBooking = async () => {
    if (!selectedMentor || !selectedDate || !selectedTime || !selectedInstructor) {
      return;
    }

    // Validate form fields
    if (!bookingForm.customerName || !bookingForm.customerEmail || !bookingForm.customerPhone) {
      setBookingError('Please fill in all required fields');
      return;
    }

    try {
      setIsBooking(true);
      setBookingError(null);

      const bookingData: CreateBookingData = {
        instructorId: selectedMentor,
        customerName: bookingForm.customerName,
        customerEmail: bookingForm.customerEmail,
        customerPhone: bookingForm.customerPhone,
        preferredDate: selectedDate,
        preferredTime: selectedTime,
        message: bookingForm.message,
        preferredTopics: bookingForm.preferredTopics
      };

      // Create guest booking and redirect to checkout
      const booking = await mentorshipService.createGuestBooking(bookingData);
      
      // Redirect to checkout page
      window.location.href = `/checkout/${booking.guest_booking_id}`;
      
    } catch (error: any) {
      console.error('Booking error:', error);
      setBookingError(error.message || 'Failed to create booking');
    } finally {
      setIsBooking(false);
    }
  };

  const selectedInstructor = instructors.find(instructor => instructor.instructor_id === selectedMentor);

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
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-orange mx-auto mb-4"></div>
              <p className="text-gray-600">Loading mentors...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-luxury-orange text-white px-6 py-2 rounded-lg hover:bg-orange-600"
              >
                Try Again
              </button>
            </div>
          ) : instructors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No mentors available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {instructors.map((instructor) => (
                <div 
                  key={instructor.instructor_id} 
                  className={`bg-white rounded-xl shadow-lg p-8 border-2 transition-all cursor-pointer ${
                    selectedMentor === instructor.instructor_id 
                      ? 'border-luxury-orange shadow-xl' 
                      : 'border-gray-200 hover:border-luxury-orange'
                  }`}
                  onClick={() => setSelectedMentor(instructor.instructor_id)}
                >
                  <div className="text-center mb-6">
                    <img 
                      src={instructor.profile_image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"} 
                      alt={`${instructor.first_name} ${instructor.last_name}`}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-bold text-luxury-black mb-1">
                      {instructor.first_name} {instructor.last_name}
                    </h3>
                    <p className="text-gray-600 mb-2">{instructor.education || "Expert Instructor"}</p>
                    <div className="flex items-center justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">(5.0 rating)</span>
                    </div>
                    <p className="text-sm text-gray-500">{instructor.experience_years}+ years experience</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-luxury-black mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {instructor.specialties.map((specialty, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-6">
                    {instructor.bio || "Expert instructor with years of experience in automotive detailing."}
                  </p>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-luxury-orange mb-2">
                      ${instructor.hourly_rate}/hour
                    </div>
                    <button 
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                        selectedMentor === instructor.instructor_id
                          ? 'bg-luxury-orange text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {selectedMentor === instructor.instructor_id ? 'Selected' : 'Select Mentor'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Booking Section */}
      {selectedMentor && selectedInstructor && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-luxury-black mb-6">Book Your Session</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Selected Mentor</label>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={selectedInstructor.profile_image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"} 
                      alt="Selected mentor"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold text-luxury-black">
                        {selectedInstructor.first_name} {selectedInstructor.last_name}
                      </div>
                      <div className="text-sm text-gray-600">
                        ${selectedInstructor.hourly_rate}/hour
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-luxury-black mb-4">Your Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={bookingForm.customerName}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, customerName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        value={bookingForm.customerEmail}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, customerEmail: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                      <input
                        type="tel"
                        value={bookingForm.customerPhone}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, customerPhone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        value={bookingForm.message}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                        placeholder="Any specific topics or questions?"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Session Details */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-luxury-black mb-4">Session Details</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-orange focus:border-transparent"
                        required
                      >
                        <option value="">Select a time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Session Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-luxury-black mb-3">What's Included</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2 text-luxury-orange" />
                      60-minute private session
                    </li>
                    <li className="flex items-center">
                      <VideoIcon className="w-4 h-4 mr-2 text-luxury-orange" />
                      Zoom video call
                    </li>
                    <li className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-2 text-luxury-orange" />
                      Flexible scheduling
                    </li>
                  </ul>
                </div>

                {/* Success/Error Messages */}
                {bookingSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                                             <div>
                         <h4 className="text-green-800 font-semibold">Booking Successful!</h4>
                         <p className="text-green-700 text-sm">Your mentorship session has been booked and payment processed. Check your email ({bookingForm.customerEmail}) for meeting details and confirmation.</p>
                       </div>
                    </div>
                  </div>
                )}

                {bookingError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-red-800 font-semibold">Booking Error</h4>
                        <p className="text-red-700 text-sm">{bookingError}</p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTime || !bookingForm.customerName || !bookingForm.customerEmail || !bookingForm.customerPhone || isBooking}
                  className={`w-full py-3 px-6 rounded-lg font-medium text-lg transition-all ${
                    selectedDate && selectedTime && bookingForm.customerName && bookingForm.customerEmail && bookingForm.customerPhone && !isBooking
                      ? 'bg-luxury-orange text-white hover:bg-orange-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isBooking ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    `Book Session - $${selectedInstructor.hourly_rate}`
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Mentorship; 