import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import services from '../../data.json';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const ReportPage = () => {
  const [type, setType] = useState('');
  const [severity, setSeverity] = useState('');
  const [accidentLocation, setAccidentLocation] = useState('');
  const [accidentTime, setAccidentTime] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [nearbyServices, setNearbyServices] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [alertedService, setAlertedService] = useState(null);
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
  if (alertedService) {
    const timer = setTimeout(() => {
      setAlertedService(null);
    }, 3000);
    return () => clearTimeout(timer);
  }
}, [alertedService]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReport = async () => {
    if (!type || !severity || !accidentLocation || !accidentTime || !description) {
      alert('Please fill in all form fields.');
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(accidentLocation)}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const accidentLatLng = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setLocation(accidentLatLng);
        setSubmitted(true);
        setLocationError('');

        const reportData = {
          type,
          severity,
          accidentLocation,
          accidentTime,
          description,
          image: imageBase64,
          time: new Date().toISOString(),
          location: accidentLocation
        };

        const existingReports = JSON.parse(localStorage.getItem('accidentReports')) || [];
        localStorage.setItem('accidentReports', JSON.stringify([reportData, ...existingReports]));

        const filtered = services.filter((s) => {
          const distance = Math.sqrt(
            Math.pow(s.lat - accidentLatLng.lat, 2) + Math.pow(s.lng - accidentLatLng.lng, 2)
          );
          return distance < 0.3;
        });

        setNearbyServices(filtered);
      } else {
        setLocationError('  Location not found. Please try a more specific location (e.g. GRA Phase 2, Port Harcourt).');
      }
    } catch (err) {
      alert('Failed to fetch location: ' + err.message);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center bg-gray-950 min-h-screen text-white">
      {!submitted ? (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Report an Accident</h1>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Type Of Accident</label>
              <select
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select type</option>
                <option value="Vehicle Collision">Vehicle Collision</option>
                <option value="Fire Outbreak">Fire Outbreak</option>
                <option value="Gas Leak">Gas Leak</option>
                <option value="Flood">Flood</option>
                <option value="Building Collapse">Building Collapse</option>
                <option value="Medical Emergency">Medical Emergency</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm">Severity</label>
              <select
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
              >
                <option value="">Select severity</option>
                <option value="Minor">Minor</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm">Location</label>
              <input
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
                value={accidentLocation}
                onChange={(e) => {
                  setAccidentLocation(e.target.value);
                  setLocationError('');
                }}
                placeholder="e.g GRA Phase 2, Port Harcourt"
              />
              {locationError && (
                <p className="text-sm text-red-400 mt-1">{locationError}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm">Time Of Accident</label>
              <input
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
                value={accidentTime}
                onChange={(e) => setAccidentTime(e.target.value)}
                placeholder="e.g 5 minutes ago"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Description</label>
              <textarea
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what happened"
              ></textarea>
            </div>

            <div>
              <label className="block mb-1 text-sm">Upload Image</label>

              <label
                htmlFor="fileInput"
                className="inline-block cursor-pointer bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-lg shadow transition duration-200"
              >
                📷 Choose Image
              </label>

              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {imageBase64 && (
              <div className="mt-2">
                <p className="text-sm text-gray-400 mb-1">Image Preview:</p>
                <img
                  src={imageBase64}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            <button
              onClick={handleReport}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl w-full"
            >
              Submit Report
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-3xl">
          {location && (
            <MapContainer
              center={[location.lat, location.lng]}
              zoom={13}
              scrollWheelZoom={false}
              className="h-64 rounded-xl"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={[location.lat, location.lng]}>
                <Popup>📍 Accident Location</Popup>
              </Marker>
              {nearbyServices.map((service, i) => (
                <Marker key={i} position={[service.lat, service.lng]}>
                  <Popup>
                    <strong>{service.name}</strong><br />
                    Type: {service.type}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}

          <div className="mt-6 bg-gray-700 p-4 rounded-xl space-y-3">
            <h3 className="text-lg font-semibold text-yellow-400">Nearby Emergency Services</h3>
            <ul className="space-y-2">
              {nearbyServices.length > 0 ? (
                nearbyServices.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => setAlertedService(s.name)}
                    className="cursor-pointer bg-gray-600 p-2 rounded hover:bg-gray-500 transition"
                  >
                    <strong>{s.name}</strong> - {s.type}
                  </li>
                ))
              ) : (
                <p className="text-gray-300">No services found near this location.</p>
              )}
            </ul>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full mt-4">
              <a href="/">🔙 Back to Home</a>
            </button>
          </div>
        </div>
      )}

      {alertedService && (
  <div className="fixed z-[9999] max-w-sm w-[90%] sm:w-auto px-5 py-4 rounded-xl shadow-lg bg-green-600 text-white 
                  animate-fade-in-up flex gap-3 items-start
                  bottom-4 left-1/2 -translate-x-1/2 
                  sm:top-4 sm:bottom-auto sm:left-auto sm:right-4 sm:translate-x-0">
    <div className="flex-1">
      <p className="font-semibold text-base">🚨 Emergency Alert Sent!</p>
      <p className="text-sm leading-tight">
        <span className="font-medium">{alertedService}</span> has been notified and will arrive in 10 mins.
      </p>
    </div>
  </div>
)}



    </div>
  );
};

export default ReportPage;
