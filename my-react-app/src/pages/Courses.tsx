import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import courseService, { type Course } from '../services/courseService';
import guestCoursePurchaseService from '../services/guestCoursePurchaseService';
import CoursePurchaseForm from '../components/CoursePurchaseForm';
import SubscriptionModal from '../components/SubscriptionModal';

// Icons
const ClockIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
)

const PlayIcon = () => (
  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
  </svg>
)

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [courses, setCourses] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const ungroupedCourses = await courseService.getAllCourses();
        const groupedCourses = await courseService.getAllCoursesGrouped();
        setAllCourses(ungroupedCourses);
        setCourses(groupedCourses);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Group courses by level
  const beginnerCourses = courses.filter(course => course.level === 'BEGINNER');
  const intermediateCourses = courses.filter(course => course.level === 'INTERMEDIATE');
  const advancedCourses = courses.filter(course => course.level === 'ADVANCED');

  const filteredCourses = activeFilter === 'all' 
    ? courses 
    : courses.filter(course => course.level.toLowerCase() === activeFilter);

  const handleEnroll = (course: Course) => {
    setSelectedCourse(course);
    setShowMembershipModal(true);
  };

  const handleProceedWithMembership = () => {
    if (!selectedCourse) return;
    
    setShowMembershipModal(false);
    // Show subscription modal to collect customer information and create subscription
    setShowSubscriptionModal(true);
  };

  const handleProceedWithoutMembership = () => {
    // Clear any membership flag
    sessionStorage.removeItem('membershipSelected');
    
    setShowMembershipModal(false);
    setShowPurchaseModal(true);
  };

  const handlePurchaseSuccess = (purchaseId: string) => {
    setShowPurchaseModal(false);
    setSelectedCourse(null);
    // Check if this was triggered from membership selection
    const urlParams = new URLSearchParams(window.location.search);
    const fromMembership = sessionStorage.getItem('membershipSelected') === 'true';
    
    if (fromMembership) {
      // Clear the flag and navigate to checkout with membership
      sessionStorage.removeItem('membershipSelected');
      navigate(`/course-checkout/${purchaseId}?membership=true&type=3_MONTH`);
    } else {
      // Navigate to regular checkout page
      navigate(`/course-checkout/${purchaseId}`);
    }
  };

  const handleCloseModal = () => {
    setShowPurchaseModal(false);
    setSelectedCourse(null);
  };

  const handleCloseMembershipModal = () => {
    setShowMembershipModal(false);
    setSelectedCourse(null);
  };

  const handleCloseSubscriptionModal = () => {
    setShowSubscriptionModal(false);
    setSelectedCourse(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-orange mx-auto mb-4"></div>
            <p className="text-gray-600">Loading courses...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white section-padding">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-luxury-black mb-6">
              Our Courses
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Master the art of car detailing with our comprehensive training programs. 
              Choose the course that fits your goals and start your journey today.
            </p>
          </div>
        </div>
      </section>



      {/* Filter Section */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {['all', 'beginner', 'intermediate', 'advanced'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-luxury-orange text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)} Courses
              </button>
            ))}
          </div>
        </div>
      </section>

       {/* Filtered Courses Section */}
       {activeFilter !== 'all' && (
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
             <div className="text-center mb-12">
               <h2 className="text-4xl font-bold text-luxury-black mb-4">
                 {activeFilter === 'beginner' ? 'Beginner Courses' :
                  activeFilter === 'intermediate' ? 'Intermediate Courses' :
                  'Advanced Courses'}
               </h2>
               <p className="text-lg text-gray-600">
                 {activeFilter === 'beginner' ? 'Perfect for those just starting their detailing journey' :
                  activeFilter === 'intermediate' ? 'Take your skills to the next level' :
                  'Master the most complex detailing techniques'}
               </p>
             </div>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
                 <div key={course.course_id} className="bg-white rounded-lg shadow-md overflow-hidden">
                   <div className="h-40 bg-gray-200 relative">
                  <img 
                       src={course.thumbnail_url || "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop"} 
                       alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-luxury-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.level}
                  </div>
                  <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                       {course.duration_hours}h
                  </div>
                  {courseService.isMultiPartSeries(course, allCourses) && (
                    <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                      SERIES
                    </div>
                  )}
                </div>
                
                   <div className="p-4">
                     <div className="flex items-center justify-between mb-2">
                       <h3 className="text-lg font-bold text-luxury-black line-clamp-1">{course.title}</h3>
                    <div className="text-right">
                         <div className="text-xl font-bold text-luxury-orange">${course.price}</div>
                    </div>
                  </div>
                  
                     <p className="text-gray-600 mb-3 text-sm line-clamp-2">{course.description}</p>
                  
                     <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                    <div className="flex items-center">
                      <ClockIcon />
                         <span className="ml-1">{course.duration_hours}h</span>
                       </div>
                     </div>

                     <div className="flex items-center justify-between">
                       <div className="flex items-center">
                         <div className="w-8 h-8 bg-luxury-orange rounded-full flex items-center justify-center mr-2">
                           <span className="text-white font-bold text-xs">
                             {course.instructor ? course.instructor.first_name.charAt(0) : 'I'}
                           </span>
                         </div>
                         <div>
                           <div className="text-xs font-medium text-luxury-black">
                             {course.instructor ? `${course.instructor.first_name} ${course.instructor.last_name}` : 'Instructor'}
                           </div>
                           <div className="text-xs text-gray-500">
                             {course.instructor?.experience_years ? `${course.instructor.experience_years} years exp.` : 'Instructor'}
                           </div>
                         </div>
                       </div>
                       <button 
                         onClick={() => handleEnroll(course)}
                         className="btn-primary text-sm py-1 px-3"
                       >
                         Enroll
                       </button>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </section>
       )}

               {/* All Courses Section (only show when filter is 'all') */}
        {activeFilter === 'all' && (
         <section className="section-padding bg-gray-50">
           <div className="container-custom">
             <div className="text-center mb-12">
               <h2 className="text-4xl font-bold text-luxury-black mb-4">All Courses</h2>
               <p className="text-lg text-gray-600">Browse all our comprehensive car detailing courses</p>
             </div>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {filteredCourses.map((course) => (
                <div key={course.course_id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-40 bg-gray-200 relative">
                    <img 
                      src={course.thumbnail_url || "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop"} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-luxury-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                      {course.level}
                    </div>
                    <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      {course.duration_hours}h
                    </div>
                    {courseService.isMultiPartSeries(course, allCourses) && (
                      <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                        SERIES
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-luxury-black line-clamp-1">{course.title}</h3>
                      <div className="text-right">
                        <div className="text-xl font-bold text-luxury-orange">${course.price}</div>
                      </div>
                  </div>

                    <p className="text-gray-600 mb-3 text-sm line-clamp-2">{course.description}</p>
                    
                    <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                    <div className="flex items-center">
                        <ClockIcon />
                        <span className="ml-1">{course.duration_hours}h</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-luxury-orange rounded-full flex items-center justify-center mr-2">
                          <span className="text-white font-bold text-xs">
                            {course.instructor ? course.instructor.first_name.charAt(0) : 'I'}
                          </span>
                        </div>
                      <div>
                          <div className="text-xs font-medium text-luxury-black">
                            {course.instructor ? `${course.instructor.first_name} ${course.instructor.last_name}` : 'Instructor'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {course.instructor?.experience_years ? `${course.instructor.experience_years} years exp.` : 'Instructor'}
                          </div>
                      </div>
                    </div>
                    <button 
                        onClick={() => handleEnroll(course)}
                        className="btn-primary text-sm py-1 px-3"
                    >
                        Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        )}

      {/* Course Preview Section */}
      {courses.length > 0 && (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-luxury-black mb-4">Course Preview</h2>
            <p className="text-lg text-gray-600">See what you'll learn in our courses</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              <div className="aspect-video relative">
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <button className="bg-luxury-orange text-white p-4 rounded-full hover:bg-orange-600 transition-all">
                    <PlayIcon />
                  </button>
                </div>
                <img 
                    src={courses[0]?.thumbnail_url || "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=450&fit=crop"} 
                  alt="Course Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {courses[0]?.title || 'Course Preview'} - Preview
                  </h3>
                  <p className="text-gray-300">
                    {courses[0]?.description || 'Get a sneak peek at our comprehensive car detailing course'}
                  </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Enrollment CTA */}
      <section className="section-padding bg-gradient-to-r from-luxury-orange to-orange-600">
        <div className="container-custom">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of successful graduates who transformed their passion into profession
            </p>
            <button className="bg-white text-luxury-orange font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all text-lg">
              Enroll in a Course Today
            </button>
          </div>
        </div>
      </section>

      {/* Membership Modal */}
      {showMembershipModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Choose Your Learning Path</h2>
                <button
                  onClick={handleCloseMembershipModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              {/* Course Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{selectedCourse.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{selectedCourse.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{selectedCourse.duration_hours} hours</span>
                  <span className="text-xl font-bold text-luxury-orange">${selectedCourse.price}</span>
                </div>
              </div>

              {/* Membership Offer */}
              <div className="mb-6">
                <div className="border-2 border-luxury-orange rounded-lg p-6 mb-4 bg-gradient-to-r from-orange-50 to-yellow-50">
                   <div className="flex items-center justify-between mb-4">
                     <h3 className="text-xl font-bold text-gray-800">🎯 Recommended: 3-Month All-Access Pass</h3>
                     <div className="bg-luxury-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                       ALL COURSES
                     </div>
                   </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">3-Month All-Access Pass:</span>
                      <span className="text-gray-800 font-semibold">$1200</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      Includes this course + all other courses (no additional fees)
                    </div>
                    <hr className="my-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-800">Total:</span>
                      <span className="text-2xl font-bold text-luxury-orange">$1200.00</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">With All-Access Pass, you get:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Instant access to ALL courses (worth $500+)</li>
                      <li>• No additional course fees for 3 months</li>
                      <li>• Exclusive member-only content and tutorials</li>
                      <li>• Priority support and community access</li>
                      <li>• Monthly live Q&A sessions with experts</li>
                      <li>• Downloadable resources and templates</li>
                      <li>• Early access to new courses</li>
                    </ul>
                  </div>

                  <button
                    onClick={handleProceedWithMembership}
                    className="w-full bg-luxury-orange text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all mb-2"
                  >
                    Get All-Access Pass - $1200.00
                  </button>
                </div>

                {/* Course Only Option */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">Just This Course</h3>
                    <span className="text-xl font-bold text-gray-800">${selectedCourse.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Get access to this course only (other courses require separate purchase)</p>
                  <button
                    onClick={handleProceedWithoutMembership}
                    className="w-full bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-all"
                  >
                    Just This Course - ${selectedCourse.price}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Purchase Course</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <CoursePurchaseForm
                course={selectedCourse}
                onSuccess={handlePurchaseSuccess}
              />
            </div>
          </div>
        </div>
      )}

      {/* Subscription Modal */}
      <SubscriptionModal
        visible={showSubscriptionModal}
        onClose={handleCloseSubscriptionModal}
        course={selectedCourse}
      />

      <Footer />
    </div>
  );
};

export default Courses;