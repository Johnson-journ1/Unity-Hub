import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LocationsPage = () => {
  console.log('LocationsPage component mounted');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/locations')
      .then(response => response.json())
      .then(data => setLocations(data))
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  return (
    <div className="locations-page p-4">
      <h2 className="text-3xl font-bold mb-4">Campus Map</h2>
      <p className="mb-4">
        Explore the various locations and landmarks on the Bells University campus.
      </p>

      <div className="map-container h-96 mb-8 rounded shadow">
        <Map center={[6.698, 3.259]} zoom={16} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map((location, index) => (
            <Marker key={index} position={[location.lat, location.lng]}>
              <Popup>
                <strong>{location.name}</strong><br />
                {location.description}<br />
                Category: {location.category}
              </Popup>
            </Marker>
          ))}
        </Map>
      </div>

      <section>
        <h3 className="text-2xl font-semibold mb-3">Campus Landmarks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-200">
              <h4 className="text-xl font-bold mb-2 text-gray-800">{location.name}</h4>
              <p className="text-gray-600 mb-3">{location.description}</p>
              <p className="text-sm text-blue-600 font-semibold">Category: {location.category}</p>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                View on Map
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h3 className="text-2xl font-semibold mb-6">Campus Navigation Tips</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-3">Getting Around</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Use the interactive map above to locate buildings</li>
              <li>Shuttle buses run regularly between major campus areas</li>
              <li>Bicycle racks are available near all main entrances</li>
              <li>Walking paths connect all campus facilities</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-3">Emergency Contacts</h4>
            <div className="space-y-2 text-gray-600">
              <p><strong>Security:</strong> +234-1-234-5678</p>
              <p><strong>Medical Center:</strong> +234-1-234-5679</p>
              <p><strong>IT Support:</strong> +234-1-234-5680</p>
              <p><strong>Emergency:</strong> 112</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationsPage;
