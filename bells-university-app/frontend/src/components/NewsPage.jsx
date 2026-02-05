import React, { useState, useEffect } from 'react';

const NewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('/api/news')
      .then(response => response.json())
      .then(data => setNews(data))
      .catch(error => console.error('Error fetching news:', error));
  }, []);

  return (
    <div className="news-page p-4">
      <h2 className="text-3xl font-bold mb-4">Latest News and Announcements</h2>
      <p className="mb-4">
        Stay updated with the latest happenings, events, and important announcements
        from Bells University of Technology.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((article, index) => (
          <div key={index} className="news-card bg-gray-100 p-4 rounded shadow hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold mb-2">{article.title}</h3>
            <p className="text-gray-700 text-sm mb-2">Date: {new Date(article.date).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-3">{article.content.substring(0, 150)}...</p>
            <a href="#" className="text-blue-600 hover:underline mt-3 inline-block font-semibold">Read More</a>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Stay Connected</h3>
        <p className="mb-4">
          Subscribe to our newsletter to receive the latest updates, events, and announcements directly in your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
