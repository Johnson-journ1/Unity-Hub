import React, { useState } from 'react';

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('school-info');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });
      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        setIsLoggedIn(true);
        setError('');
      } else {
        setError('Invalid passcode');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-page p-4">
        <h2 className="text-3xl font-bold mb-4">Admin Login</h2>
        <div className="bg-gray-100 p-6 rounded shadow max-w-md">
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="passcode" className="block text-gray-700 text-sm font-bold mb-2">
                Passcode:
              </label>
              <input
                type="password"
                id="passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter passcode"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page p-4">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      <button onClick={() => setIsLoggedIn(false)} className="mb-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>

      <div className="tabs mb-6">
        <button onClick={() => setActiveTab('school-info')} className={`px-4 py-2 mr-2 ${activeTab === 'school-info' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>School Info</button>
        <button onClick={() => setActiveTab('locations')} className={`px-4 py-2 mr-2 ${activeTab === 'locations' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Locations</button>
        <button onClick={() => setActiveTab('businesses')} className={`px-4 py-2 mr-2 ${activeTab === 'businesses' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Businesses</button>
        <button onClick={() => setActiveTab('news')} className={`px-4 py-2 ${activeTab === 'news' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>News</button>
      </div>

      {activeTab === 'school-info' && <SchoolInfoManager token={token} />}
      {activeTab === 'locations' && <LocationsManager token={token} />}
      {activeTab === 'businesses' && <BusinessesManager token={token} />}
      {activeTab === 'news' && <NewsManager token={token} />}
    </div>
  );
};

const SchoolInfoManager = ({ token }) => {
  const [schoolInfo, setSchoolInfo] = useState({ chancellor: { name: '', bio: '' }, vc: { name: '', bio: '' }, staff: [] });

  React.useEffect(() => {
    fetch('http://localhost:3000/api/school-info')
      .then(res => res.json())
      .then(data => setSchoolInfo(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/school-info', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(schoolInfo)
    });
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Manage School Information</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Chancellor Name:</label>
          <input type="text" value={schoolInfo.chancellor.name} onChange={(e) => setSchoolInfo({...schoolInfo, chancellor: {...schoolInfo.chancellor, name: e.target.value}})} className="border p-2 w-full" />
        </div>
        <div>
          <label>Chancellor Bio:</label>
          <textarea value={schoolInfo.chancellor.bio} onChange={(e) => setSchoolInfo({...schoolInfo, chancellor: {...schoolInfo.chancellor, bio: e.target.value}})} className="border p-2 w-full" />
        </div>
        <div>
          <label>Vice Chancellor Name:</label>
          <input type="text" value={schoolInfo.vc.name} onChange={(e) => setSchoolInfo({...schoolInfo, vc: {...schoolInfo.vc, name: e.target.value}})} className="border p-2 w-full" />
        </div>
        <div>
          <label>Vice Chancellor Bio:</label>
          <textarea value={schoolInfo.vc.bio} onChange={(e) => setSchoolInfo({...schoolInfo, vc: {...schoolInfo.vc, bio: e.target.value}})} className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
};

const LocationsManager = ({ token }) => {
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', category: '', lat: '', lng: '' });

  React.useEffect(() => {
    fetch('http://localhost:3000/api/locations')
      .then(res => res.json())
      .then(data => setLocations(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/locations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });
    setForm({ name: '', description: '', category: '', lat: '', lng: '' });
    // Refresh list
    const res = await fetch('http://localhost:3000/api/locations');
    setLocations(await res.json());
  };

  const handleDelete = async (id) => {
    await fetch(`/api/locations/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setLocations(locations.filter(loc => loc.id !== id));
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Manage Locations</h3>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="border p-2 w-full" required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="border p-2 w-full" required />
        <input type="text" placeholder="Category" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="border p-2 w-full" required />
        <input type="number" step="any" placeholder="Latitude" value={form.lat} onChange={(e) => setForm({...form, lat: e.target.value})} className="border p-2 w-full" required />
        <input type="number" step="any" placeholder="Longitude" value={form.lng} onChange={(e) => setForm({...form, lng: e.target.value})} className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Location</button>
      </form>
      <ul className="space-y-2">
        {locations.map(loc => (
          <li key={loc.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span>{loc.name} - {loc.category}</span>
            <button onClick={() => handleDelete(loc.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const BusinessesManager = ({ token }) => {
  const [businesses, setBusinesses] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [image, setImage] = useState(null);

  React.useEffect(() => {
    fetch('http://localhost:3000/api/businesses')
      .then(res => res.json())
      .then(data => setBusinesses(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    if (image) formData.append('image', image);

    await fetch('/api/businesses', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    setForm({ name: '', description: '' });
    setImage(null);
    // Refresh list
    const res = await fetch('http://localhost:3000/api/businesses');
    setBusinesses(await res.json());
  };

  const handleDelete = async (id) => {
    await fetch(`/api/businesses/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setBusinesses(businesses.filter(biz => biz.id !== id));
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Manage Businesses</h3>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="border p-2 w-full" required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="border p-2 w-full" required />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="border p-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Business</button>
      </form>
      <ul className="space-y-2">
        {businesses.map(biz => (
          <li key={biz.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span>{biz.name}</span>
            <button onClick={() => handleDelete(biz.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const NewsManager = ({ token }) => {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', date: '' });

  React.useEffect(() => {
    fetch('http://localhost:3000/api/news')
      .then(res => res.json())
      .then(data => setNews(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });
    setForm({ title: '', content: '', date: '' });
    // Refresh list
    const res = await fetch('http://localhost:3000/api/news');
    setNews(await res.json());
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/news/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setNews(news.filter(item => item.id !== id));
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Manage News</h3>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="border p-2 w-full" required />
        <textarea placeholder="Content" value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} className="border p-2 w-full" required />
        <input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add News</button>
      </form>
      <ul className="space-y-2">
        {news.map(item => (
          <li key={item.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span>{item.title}</span>
            <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
