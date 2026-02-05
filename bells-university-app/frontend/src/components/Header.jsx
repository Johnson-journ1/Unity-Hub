import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg">
      <nav className="bg-gradient-to-r from-gray-800 to-gray-900 py-4">
        <div className="container mx-auto px-4">
          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600 block">
            <ul className="flex justify-center space-x-8">
              <li><a href="/" className="hover:text-yellow-300 transition-colors duration-300 cursor-pointer font-semibold text-sm">Home</a></li>
              <li><a href="/locations" className="hover:text-yellow-300 transition-colors duration-300 cursor-pointer font-semibold text-sm">Campus Map</a></li>
              <li><a href="/businesses" className="hover:text-yellow-300 transition-colors duration-300 cursor-pointer font-semibold text-sm">Business Affiliates</a></li>
              <li><a href="/news" className="hover:text-yellow-300 transition-colors duration-300 cursor-pointer font-semibold text-sm">News & Updates</a></li>
              <li><a href="/admin" className="hover:text-yellow-300 transition-colors duration-300 cursor-pointer font-semibold text-sm">Admin Portal</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold animate-pulse">THE UNITY HUB</h1>
            <p className="text-sm opacity-90">Bells University of Technology, Ota, Nigeria</p>
          </div>
          <div className="text-right text-sm">
            <p>📞 +2349030623150</p>
            <p>📧 info@bellsuniversity.edu.ng</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
