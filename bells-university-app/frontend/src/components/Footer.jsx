import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-8 mt-8 shadow-inner">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-sm">
              Bells University of Technology is committed to excellence in education, research, and innovation in Ota, Nigeria.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><a href="/" className="hover:text-yellow-300 transition duration-300">Home</a></li>
              <li><a href="/locations" className="hover:text-yellow-300 transition duration-300">Locations</a></li>
              <li><a href="/businesses" className="hover:text-yellow-300 transition duration-300">Business Affiliates</a></li>
              <li><a href="/news" className="hover:text-yellow-300 transition duration-300">News</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <div className="text-sm space-y-2">
              <p>KM 8, Idiroko Road, Ota, Nigeria</p>
              <p>Phone: +2349030623150</p>
              <p>Email: info@bellsuniversity.edu.ng</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-yellow-300 transition duration-300">Facebook</a>
              <a href="#" className="hover:text-yellow-300 transition duration-300">Twitter</a>
              <a href="#" className="hover:text-yellow-300 transition duration-300">Instagram</a>
              <a href="#" className="hover:text-yellow-300 transition duration-300">LinkedIn</a>
              <a href="https://chat.whatsapp.com/J4OcjL1N9CDJREa55KVwG1" className="hover:text-yellow-300 transition duration-300">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white mt-8 pt-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Bells University of Technology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
