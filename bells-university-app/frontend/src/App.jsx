import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import LocationsPage from './components/LocationsPage';
import BusinessAffiliatesPage from './components/BusinessAffiliatesPage';
import NewsPage from './components/NewsPage';
import AdminPage from './components/AdminPage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getLocations = async () => {
  const res = await fetch(`${API_BASE_URL}/api/locations`);
  return res.json();
};


function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/businesses" element={<BusinessAffiliatesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
