import React, { useState } from 'react';
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

const PlayIcon = () => (
  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9 12a3 3 0 11-6 0 3 3 0 016 0zM17 12a3 3 0 11-6 0 3 3 0 016 0zM12 2a8 8 0 00-8 8v6h16v-6a8 8 0 00-8-8z" />
  </svg>
)

const Courses: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const courses = [
    {
      id: 1,
      name: "Basic Detailing Fundamentals",
      description: "Learn the essential techniques of car detailing including washing, waxing, and basic interior cleaning.",
      longDescription: "Perfect for beginners, this comprehensive course covers all the fundamentals of car detailing. You'll learn proper washing techniques, waxing methods, interior cleaning, and basic paint protection. Includes hands-on practice with real vehicles.",
      price: "$299",
      originalPrice: "$399",
      duration: "4 weeks",
      level: "beginner",
      students: 150,
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop",
      features: [
        "Hands-on training with real vehicles",
        "Professional detailing tools included",
        "Certificate of completion",
        "Lifetime access to course materials",
        "24/7 student support",
        "Mobile app access"
      ],
      curriculum: [
        "Week 1: Introduction to Car Detailing",
        "Week 2: Washing and Drying Techniques",
        "Week 3: Interior Cleaning and Protection",
        "Week 4: Basic Paint Protection and Waxing"
      ],
      instructor: "Jas Singh",
      instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Advanced Paint Correction",
      description: "Master paint correction techniques, swirl removal, and achieving showroom-quality finishes.",
      longDescription: "Take your detailing skills to the next level with advanced paint correction techniques. Learn how to remove scratches, swirl marks, and oxidation to achieve that perfect showroom finish. Includes advanced tools and techniques.",
      price: "$499",
      originalPrice: "$599",
      duration: "6 weeks",
      level: "intermediate",
      students: 89,
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
      features: [
        "Advanced paint correction techniques",
        "Professional-grade tools and equipment",
        "One-on-one mentorship sessions",
        "Industry certification",
        "Business guidance included",
        "Access to exclusive detailing community"
      ],
      curriculum: [
        "Week 1: Paint Analysis and Assessment",
        "Week 2: Machine Polishing Fundamentals",
        "Week 3: Advanced Correction Techniques",
        "Week 4: Paint Protection Application",
        "Week 5: Quality Control and Finishing",
        "Week 6: Business Applications"
      ],
      instructor: "Mike Chen",
      instructorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Ceramic Coating Mastery",
      description: "Learn professional ceramic coating application and advanced protection techniques.",
      longDescription: "Master the art of ceramic coating application. This course covers everything from surface preparation to professional application techniques. Learn how to provide long-lasting protection that customers love.",
      price: "$399",
      originalPrice: "$499",
      duration: "5 weeks",
      level: "intermediate",
      students: 112,
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop",
      features: [
        "Professional ceramic coating application",
        "Surface preparation techniques",
        "Quality control and testing",
        "Industry certification",
        "Mentorship included",
        "Access to premium products"
      ],
      curriculum: [
        "Week 1: Ceramic Coating Fundamentals",
        "Week 2: Surface Preparation",
        "Week 3: Application Techniques",
        "Week 4: Quality Control and Testing",
        "Week 5: Business Applications"
      ],
      instructor: "Sarah Johnson",
      instructorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Business & Marketing",
      description: "Learn how to start and grow your own detailing business with proven marketing strategies.",
      longDescription: "Turn your passion into profit with our comprehensive business course. Learn marketing strategies, client management, pricing, and how to build a successful detailing business from the ground up.",
      price: "$199",
      originalPrice: "$299",
      duration: "3 weeks",
      level: "all",
      students: 203,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      features: [
        "Business plan development",
        "Marketing and branding strategies",
        "Client management systems",
        "Pricing and profitability",
        "Legal and insurance guidance",
        "Networking and partnerships"
      ],
      curriculum: [
        "Week 1: Business Fundamentals",
        "Week 2: Marketing and Branding",
        "Week 3: Operations and Growth"
      ],
      instructor: "David Rodriguez",
      instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const filteredCourses = activeFilter === 'all' 
    ? courses 
    : courses.filter(course => course.level === activeFilter);

  const handleEnroll = (courseId: number) => {
    // Handle enrollment logic
    console.log(`Enrolling in course ${courseId}`);
  };

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

      {/* Courses Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-200 relative">
                  <img 
                    src={course.image} 
                    alt={course.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-luxury-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.level}
                  </div>
                  <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {course.duration}
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-luxury-black">{course.name}</h3>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-luxury-orange">{course.price}</div>
                      <div className="text-sm text-gray-500 line-through">{course.originalPrice}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{course.longDescription}</p>
                  
                  <div className="flex items-center gap-6 mb-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <ClockIcon />
                      <span className="ml-1">{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <UsersIcon />
                      <span className="ml-1">{course.students} students</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-luxury-black mb-3">What you'll learn:</h4>
                    <ul className="space-y-2">
                      {course.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-2 h-2 bg-luxury-orange rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={course.instructorImage} 
                        alt={course.instructor}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-luxury-black">{course.instructor}</div>
                        <div className="text-xs text-gray-500">Instructor</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleEnroll(course.id)}
                      className="btn-primary"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Preview Section */}
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
                  src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=450&fit=crop" 
                  alt="Course Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Basic Detailing Fundamentals - Preview</h3>
                <p className="text-gray-300">Get a sneak peek at our comprehensive car detailing course</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <Footer />
    </div>
  );
};

export default Courses; 