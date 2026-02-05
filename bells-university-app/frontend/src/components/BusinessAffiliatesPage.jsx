import React, { useState, useEffect } from 'react';

const BusinessAffiliatesPage = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    fetch('/api/businesses')
      .then(response => response.json())
      .then(data => setBusinesses(data))
      .catch(error => console.error('Error fetching businesses:', error));
  }, []);

  return (
    <div className="business-affiliates-page p-4">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-center">Business Affiliates within Bells University</h2>
        <p className="mb-6 text-center max-w-3xl mx-auto text-gray-600">
          This section showcases businesses operating within or affiliated with Bells University of Technology.
          You'll find various services and products offered by our vibrant campus community. Supporting these local businesses
          helps foster entrepreneurship and provides convenient services for students, faculty, and staff.
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="text-4xl mb-4">🏪</div>
            <h3 className="text-xl font-semibold mb-2">Convenient Services</h3>
            <p className="text-gray-600">Access essential services without leaving campus.</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-xl font-semibold mb-2">Student Entrepreneurs</h3>
            <p className="text-gray-600">Support fellow students in their business ventures.</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">Community Building</h3>
            <p className="text-gray-600">Strengthen our university community through local commerce.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Featured Businesses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business, index) => (
            <div key={index} className="business-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-200">
              <img src={`${business.image}`} alt={business.name} className="w-full h-40 object-cover mb-4 rounded" />
              <h3 className="text-xl font-bold mb-2">{business.name}</h3>
              <p className="text-gray-700 mb-4">{business.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Campus Location</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                  Visit Business
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 p-8 rounded-lg">
        <h3 className="text-2xl font-bold mb-4 text-center">Become a Business Affiliate</h3>
        <p className="mb-6 text-center text-gray-600">
          Are you a student or local entrepreneur interested in setting up a business on campus?
          Join our network of business affiliates and reach thousands of potential customers.
        </p>
        <div className="text-center">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 font-semibold">
            Apply to Join
          </button>
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-3">Benefits for Affiliates</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Prime location on campus</li>
              <li>Access to student customer base</li>
              <li>Marketing support through Unity Hub</li>
              <li>Networking opportunities</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Requirements</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Valid business registration</li>
              <li>Commitment to quality service</li>
              <li>Compliance with university policies</li>
              <li>Positive contribution to campus community</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessAffiliatesPage;
