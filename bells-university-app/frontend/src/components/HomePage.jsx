import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [schoolInfo, setSchoolInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetch('/api/school-info')
      .then(response => response.json())
      .then(data => setSchoolInfo(data))
      .catch(error => console.error('Error fetching school info:', error));
  }, []);

  if (!schoolInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = [
    { label: 'Founded', value: '2004' },
    { label: 'Students', value: '5,000+' },
    { label: 'Programs', value: '50+' },
    { label: 'Location', value: 'Ota, Nigeria' },
    { label: 'Faculties', value: '6' },
    { label: 'Research Centers', value: '10+' }
  ];

  const features = [
    {
      icon: '🎓',
      title: 'Quality Education',
      description: 'World-class education with modern facilities and experienced faculty.'
    },
    {
      icon: '🔬',
      title: 'Research Excellence',
      description: 'Cutting-edge research in technology and innovation.'
    },
    {
      icon: '🌍',
      title: 'Global Perspective',
      description: 'International partnerships and global outlook.'
    },
    {
      icon: '💼',
      title: 'Industry Ready',
      description: 'Practical skills and industry partnerships for career success.'
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 border-b-4 border-gradient-to-r from-blue-500 to-purple-600 fade-in">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="grey-block slide-in-left">
            <div className="heading-widget">
              <h1 className="text-5xl font-serif font-bold mb-6 pulse">
                Welcome to THE UNITY HUB - Bells University of Technology
              </h1>
            </div>
            <p className="text-xl mb-8 max-w-3xl mx-auto font-serif slide-in-right">
              A comprehensive platform for university management, committed to excellence in education,
              research, and innovation.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-8 fade-in">
            <button className="bg-white text-gray-800 px-8 py-3 border-2 border-gray-600 font-serif font-semibold hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
              Explore Programs
            </button>
            <button className="border-2 border-white text-white px-8 py-3 font-serif font-semibold hover:bg-white hover:text-gray-800 transform hover:scale-105 transition-all duration-300">
              Virtual Tour
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="widget text-center p-4 fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="text-2xl font-bold text-blue-600 mb-1 pulse">{stat.value}</div>
                <div className="text-gray-600 font-semibold text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center mb-8">
              {['overview', 'leadership', 'faculties', 'campus'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 mx-2 mb-2 rounded-full font-semibold transition duration-300 ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 widget">
              {activeTab === 'overview' && (
                <div className="animate-fade-in">
                  <div className="grey-block">
                    <div className="heading-widget">
                      <h3 className="text-3xl font-bold mb-6 text-center">About Bells University</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-semibold mb-4">Our Mission</h4>
                      <p className="text-gray-700 mb-4 font-serif">
                        To provide world-class education in technology and related fields, foster research and innovation,
                        and contribute to the technological and socio-economic development of Nigeria and beyond.
                      </p>
                      <h4 className="text-xl font-serif font-semibold mb-4">Our Vision</h4>
                      <p className="text-gray-700 font-serif">
                        To be a leading institution of technology education, recognized globally for excellence in teaching,
                        research, and innovation.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-semibold mb-4">Key Features</h4>
                      <ul className="space-y-2 font-serif">
                        <li className="flex items-center">
                          <span className="text-gray-600 mr-2">•</span>
                          State-of-the-art laboratories and facilities
                        </li>
                        <li className="flex items-center">
                          <span className="text-gray-600 mr-2">•</span>
                          Experienced faculty with industry expertise
                        </li>
                        <li className="flex items-center">
                          <span className="text-gray-600 mr-2">•</span>
                          Strong industry partnerships
                        </li>
                        <li className="flex items-center">
                          <span className="text-gray-600 mr-2">•</span>
                          Research-driven curriculum
                        </li>
                        <li className="flex items-center">
                          <span className="text-gray-600 mr-2">•</span>
                          Entrepreneurship and innovation programs
                        </li>
                        <li className="flex items-center">
                          <span className="text-gray-600 mr-2">•</span>
                          International collaborations and exchange programs
                        </li>
                      </ul>
                    </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'leadership' && (
                <div className="animate-fade-in">
                  <div className="grey-block">
                    <div className="heading-widget">
                      <h3 className="text-3xl font-bold mb-6 text-center">University Leadership</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="leader-card bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 card-3d fade-in">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center pulse">
                        <span className="text-2xl text-white">👨‍🎓</span>
                      </div>
                      <h4 className="text-xl font-bold text-center mb-2">Chancellor</h4>
                      <p className="font-semibold text-center">{schoolInfo.chancellor.name}</p>
                      <p className="text-gray-600 text-center text-sm">{schoolInfo.chancellor.bio}</p>
                    </div>
                    <div className="leader-card bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 card-3d fade-in" style={{animationDelay: '0.1s'}}>
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center pulse">
                        <span className="text-2xl text-white">👩‍🏫</span>
                      </div>
                      <h4 className="text-xl font-bold text-center mb-2">Vice Chancellor</h4>
                      <p className="font-semibold text-center">{schoolInfo.vc.name}</p>
                      <p className="text-gray-600 text-center text-sm">{schoolInfo.vc.bio}</p>
                    </div>
                    {schoolInfo.staff.map((staffMember, index) => (
                      <div key={index} className="leader-card bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 card-3d fade-in" style={{animationDelay: `${(index + 2) * 0.1}s`}}>
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center pulse">
                          <span className="text-2xl text-white">👔</span>
                        </div>
                        <h4 className="text-xl font-bold text-center mb-2">{staffMember.title}</h4>
                        <p className="font-semibold text-center">{staffMember.name}</p>
                        <p className="text-gray-600 text-center text-sm">{staffMember.bio}</p>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'faculties' && (
                <div className="animate-fade-in">
                  <div className="grey-block">
                    <div className="heading-widget">
                      <h3 className="text-3xl font-bold mb-6 text-center">Academic Faculties</h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: 'Engineering', icon: '⚙️', programs: 'Mechanical, Electrical, Civil, Computer Engineering' },
                      { name: 'Information Technology', icon: '💻', programs: 'Computer Science, Software Engineering, Cybersecurity' },
                      { name: 'Management Sciences', icon: '📊', programs: 'Business Administration, Accounting, Finance' },
                      { name: 'Natural Sciences', icon: '🧪', programs: 'Biology, Chemistry, Physics, Mathematics' },
                      { name: 'Environmental Sciences', icon: '🌱', programs: 'Environmental Science, Geography, Geology' },
                      { name: 'Food Technology', icon: '🍽️', programs: 'Food Science, Nutrition, Culinary Arts' }
                    ].map((faculty, index) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition duration-300">
                        <div className="text-4xl mb-4">{faculty.icon}</div>
                        <h4 className="text-xl font-semibold mb-2">{faculty.name}</h4>
                        <p className="text-gray-600 text-sm">{faculty.programs}</p>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'campus' && (
                <div className="animate-fade-in">
                  <div className="grey-block">
                    <div className="heading-widget">
                      <h3 className="text-3xl font-bold mb-6 text-center">Campus Facilities</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold mb-4">Academic Facilities</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="text-blue-500 mr-2">🏛️</span>
                          Modern lecture halls and classrooms
                        </li>
                        <li className="flex items-center">
                          <span className="text-blue-500 mr-2">🔬</span>
                          Well-equipped laboratories
                        </li>
                        <li className="flex items-center">
                          <span className="text-blue-500 mr-2">📚</span>
                          Digital library with online resources
                        </li>
                        <li className="flex items-center">
                          <span className="text-blue-500 mr-2">💻</span>
                          Computer centers and IT facilities
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-4">Student Facilities</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">🏢</span>
                          Comfortable hostel accommodations
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">🍽️</span>
                          Modern cafeteria and dining facilities
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">⚽</span>
                          Sports complex and recreational facilities
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">🏥</span>
                          Health center and medical services
                        </li>
                      </ul>
                    </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grey-block">
            <div className="heading-widget">
              <h3 className="text-3xl font-bold text-center mb-12 slide-in-up">Why Choose Unity Hub?</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 card-3d fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="text-5xl mb-4 pulse">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="grey-block slide-in-up">
            <div className="heading-widget">
              <h3 className="text-3xl font-bold mb-4 pulse">Ready to Start Your Journey?</h3>
            </div>
            <p className="text-xl mb-8 slide-in-up" style={{animationDelay: '0.2s'}}>Join thousands of students who have chosen Bells University for their technological education.</p>
          <div className="flex flex-wrap justify-center gap-4 fade-in" style={{animationDelay: '0.4s'}}>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
              Apply Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
              Download Brochure
            </button>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
