import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import courseService, { type Course } from '../services/courseService';

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

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-5 h-5"} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const PlayIcon = () => (
  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
  </svg>
)

const Home: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('beginner');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const allCourses = await courseService.getAllCourses();
        setCourses(allCourses);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/1234567890?text=Hi! I\'m interested in your car detailing courses.', '_blank')
  }

  const handleEnrollNow = () => {
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleEnroll = (courseId: string) => {
    navigate('/courses');
  }

  const testimonials = [
    {
      name: "Sim Sidhu",
      role: "Graduate Student",
      content: "The customer service this academy provides is outstanding! And the results are stunning. Unbelievable how they will make you understand car detailing so thoroughly!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Sirjan Randhawa",
      role: "Professional Detailer",
      content: "Outstanding training by the team! They went above and beyond with the course content, and the mentorship program turned out flawless. Highly recommend to anyone looking for high-quality car detailing education!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Gursimran Sandhu",
      role: "Car Enthusiast",
      content: "Best ever education I got. As a car lover, I needed to understand every detail about car care, and the team made it happen. Everything was perfect - both theory and practical sessions.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    }
  ];

  // Get one course from each level (newest first) for Newest Courses section
  const beginnerCourses = courses.filter(course => course.level === 'BEGINNER');
  const intermediateCourses = courses.filter(course => course.level === 'INTERMEDIATE');
  const advancedCourses = courses.filter(course => course.level === 'ADVANCED');

  // Get the newest course from each level
  const beginnerCourse = beginnerCourses.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
  const intermediateCourse = intermediateCourses.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
  const advancedCourse = advancedCourses.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

  // Create array of newest courses (exactly one from each level)
  const newestCourses = [beginnerCourse, intermediateCourse, advancedCourse].filter(Boolean) as Course[];

  // Get 3 courses from each category
  const beginnerCoursesLimited = beginnerCourses.slice(0, 3);
  const intermediateCoursesLimited = intermediateCourses.slice(0, 3);
  const advancedCoursesLimited = advancedCourses.slice(0, 3);

  // Filter courses based on active filter and limit to 3
  const currentCourses = activeFilter === 'beginner' ? beginnerCoursesLimited :
                        activeFilter === 'intermediate' ? intermediateCoursesLimited :
                        advancedCoursesLimited;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container-custom section-padding">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Become a Certified
              <span className="text-luxury-orange block">Car Detailer</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Learn from industry experts. Get certified. Build your detailing career. 
              Join 500+ successful graduates who transformed their passion into profession.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button onClick={handleEnrollNow} className="btn-primary text-lg px-8 py-4 bg-luxury-orange hover:bg-orange-600">
                Enroll Now - Start Today
              </button>
              <button className="btn-secondary text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-luxury-black">
                <PlayIcon />
                Watch Course Preview
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-luxury-orange">500+</div>
                <div className="text-gray-300">Graduates</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-luxury-orange">95%</div>
                <div className="text-gray-300">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-luxury-orange">4.9★</div>
                <div className="text-gray-300">Student Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-luxury-black mb-8">About LAS Detailers University</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              At LAS Detailers University, we don't just teach car detailing — we celebrate it. Our story began when we were just kids, 
              spending weekends meticulously washing and detailing our parents' vehicles. There was something magical about seeing a car 
              sparkle after hours of care, and it's that same magic that drives our training programs today.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-luxury-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <MentorIcon />
                </div>
                <h3 className="text-xl font-semibold text-luxury-black mb-2">One-on-One Mentorship</h3>
                <p className="text-gray-600">Personal guidance from industry experts with 10+ years experience</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-luxury-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <CarIcon />
                </div>
                <h3 className="text-xl font-semibold text-luxury-black mb-2">Hands-On Training</h3>
                <p className="text-gray-600">Real-world experience with actual vehicles and professional tools</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-luxury-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <CertificateIcon />
                </div>
                <h3 className="text-xl font-semibold text-luxury-black mb-2">Industry Certification</h3>
                <p className="text-gray-600">Recognized certification that opens doors to professional opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-luxury-black mb-4">Trusted by 500+ Students</h2>
            <p className="text-lg text-gray-600">See what our graduates say about their experience</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-luxury-black">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

             {/* Courses Section */}
       <section id="courses" className="section-padding bg-white">
         <div className="container-custom">
           
                       {/* All Courses Section */}
            <div>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-luxury-black mb-4">
                  All Courses
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  {activeFilter === 'beginner' ? 'Perfect for those just starting their detailing journey' :
                   activeFilter === 'intermediate' ? 'Take your skills to the next level with advanced techniques' :
                   'Professional-level training for experienced detailers'}
                </p>
               
                               {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {[
                    { value: 'beginner', label: 'Beginner Courses' },
                    { value: 'intermediate', label: 'Intermediate Courses' },
                    { value: 'advanced', label: 'Advanced Courses' }
                  ].map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => {
                        setActiveFilter(filter.value);
                      }}
                      className={`px-6 py-2 rounded-full font-medium transition-all ${
                        activeFilter === filter.value
                          ? 'bg-luxury-orange text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
             </div>
             
             {loading ? (
               <div className="flex items-center justify-center py-12">
                 <div className="text-center">
                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-orange mx-auto mb-4"></div>
                   <p className="text-gray-600">Loading courses...</p>
                 </div>
               </div>
             ) : error ? (
               <div className="flex items-center justify-center py-12">
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
             ) : (
               <>
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {currentCourses.map((course) => (
                     <div key={course.course_id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                       <div className="h-48 bg-gray-200 relative">
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
                       </div>
                       <div className="p-6">
                         <h3 className="text-xl font-bold text-luxury-black mb-2">{course.title}</h3>
                         <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                         <div className="flex items-center justify-between mb-4">
                           <span className="text-2xl font-bold text-luxury-orange">${course.price}</span>
                           <span className="text-gray-500">{course.duration_hours} hours</span>
                         </div>
                         <div className="mb-6">
                           <div className="flex items-center mb-4">
                             <div className="w-8 h-8 bg-luxury-orange rounded-full flex items-center justify-center mr-3">
                               <span className="text-white font-bold text-sm">
                                 {course.instructor ? course.instructor.first_name.charAt(0) : 'I'}
                               </span>
                             </div>
                             <div>
                               <div className="text-sm font-medium text-luxury-black">
                                 {course.instructor ? `${course.instructor.first_name} ${course.instructor.last_name}` : 'Instructor'}
                               </div>
                               <div className="text-xs text-gray-500">Instructor</div>
                             </div>
                           </div>
                           
                           {/* Course Features based on level */}
                           <ul className="space-y-2">
                             {course.level === 'BEGINNER' && (
                               <>
                                 <li className="text-sm text-gray-600 flex items-center">
                                   <div className="w-2 h-2 bg-luxury-orange rounded-full mr-2"></div>
                                   Hands-on training
                                 </li>
                                 <li className="text-sm text-gray-600 flex items-center">
                                   <div className="w-2 h-2 bg-luxury-orange rounded-full mr-2"></div>
                                   Certificate included
                                 </li>
                                 <li className="text-sm text-gray-600 flex items-center">
                                   <div className="w-2 h-2 bg-luxury-orange rounded-full mr-2"></div>
                                   Lifetime access
                                 </li>
                               </>
                             )}
                             {course.level === 'INTERMEDIATE' && (
                               <>
                                 <li className="text-sm text-gray-600 flex items-center">
                                   <div className="w-2 h-2 bg-luxury-orange rounded-full mr-2"></div>
                                   Expert mentorship
                                 </li>
                                 <li className="text-sm text-gray-600 flex items-center">
                                   <div className="w-2 h-2 bg-luxury-orange rounded-full mr-2"></div>
                                   Advanced techniques
                                 </li>
                                 <li className="text-sm text-gray-600 flex items-center">
                                   <div className="w-2 h-2 bg-luxury-orange rounded-full mr-2"></div>
                                   Business guidance
                                 </li>
                               </>
                             )}
                             {course.level === 'ADVANCED' && (
                               <>
                                 <li className="text-sm text-gray-600 flex items-center">
                                   <div className="w-2 h-2 bg-luxury-orange rounded-full mr-2"></div>
                                   Professional tools
                                 </li>
                                 <li className="text-sm text-gray-600 flex items-center">
                                   <div className="w-2 h-2 bg-luxury-orange rounded-full mr-2"></div>
                                   Industry certification
                                 </li>
                                 <li className="text-sm text-gray-600 flex items-center">
                                   <div className="w-2 h-2 bg-luxury-orange rounded-full mr-2"></div>
                                   Mentorship included
                                 </li>
                               </>
                             )}
                           </ul>
                         </div>
                         <button 
                           onClick={() => handleEnroll(course.course_id)}
                           className="btn-primary w-full"
                         >
                           Enroll Now
                         </button>
                       </div>
                     </div>
                   ))}
                 </div>


               </>
             )}
           </div>
         </div>
       </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section-padding bg-gray-50">
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
              <p className="text-gray-600">Register for your chosen course and create your student account</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-luxury-orange rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-semibold text-luxury-black mb-2">Get Access</h3>
              <p className="text-gray-600">Receive your login credentials and access to course materials</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-luxury-orange rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-semibold text-luxury-black mb-2">Learn & Practice</h3>
              <p className="text-gray-600">Access comprehensive training materials and hands-on sessions</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-luxury-orange rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                4
              </div>
              <h3 className="text-xl font-semibold text-luxury-black mb-2">Get Certified</h3>
              <p className="text-gray-600">Complete your training and receive your industry certification</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mentorship Section */}
      <section id="mentorship" className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-luxury-black mb-8">One-on-One Mentorship Program</h2>
            <p className="text-lg text-gray-600 mb-8">
              Get personalized guidance from industry experts through our exclusive mentorship program. 
              Schedule sessions via Zoom and choose from flexible payment options.
            </p>
            <div className="bg-gradient-to-r from-luxury-orange to-orange-600 rounded-xl shadow-lg p-8 max-w-2xl mx-auto text-white">
              <h3 className="text-2xl font-bold mb-4">Book Your Session</h3>
              <p className="mb-6">
                Connect with experienced detailers for personalized training and career guidance.
                Sessions available via Zoom with flexible scheduling.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">$99</div>
                  <div className="text-sm">per session</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">60 min</div>
                  <div className="text-sm">session duration</div>
                </div>
              </div>
              <button className="bg-white text-luxury-orange font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all">
                Book Mentorship Session
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-luxury-black mb-8">Ready to Start Your Journey?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Have questions? Our team is here to help you get started on your detailing career.
              Contact us via WhatsApp for instant support.
            </p>
            <button 
              onClick={handleWhatsAppContact}
              className="btn-primary flex items-center justify-center space-x-2 mx-auto text-lg px-8 py-4"
            >
              <WhatsAppIcon />
              <span>Contact Us on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home;