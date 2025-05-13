import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JailorDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    crimeType: '',
    jailName: '',
    cellNo: '',
    sentence: '',
  });

  const url = 'http://localhost:3000';


  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [criminals, setCriminals] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/criminals/register`, formData);
      setMessage(response.data.message);
      setError('');
      fetchCriminals(); 
      setFormData({
        name: '',
        age: '',
        crimeType: '',
        jailName: '',
        cellNo: '',
        sentence: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register criminal');
      setMessage('');
    }
  };

  const fetchCriminals = async () => {
    try {
      const response = await axios.get(`${url}/api/criminals`); 
      setCriminals(response.data);
    } catch (err) {
      setError('Failed to fetch criminals');
    }
  };

  useEffect(() => {
    fetchCriminals(); 
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-lg mb-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Register a Criminal</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Criminal Name"
            required
            className="w-full p-2 border rounded bg-gray-700 text-white"
          />
          
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            required
            className="w-full p-2 border rounded bg-gray-700 text-white"
          />
          
          <select
            name="crimeType"
            value={formData.crimeType}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded bg-gray-700 text-white"
          >
            <option value="" disabled>Select Crime Type</option>
            <option value="Murder">Murder</option>
            <option value="Theft">Theft</option>
            <option value="Rape">Rape</option>
            <option value="Cyber">Cyber Crime</option>
          </select>
          
          <input
            type="text"
            name="jailName"
            value={formData.jailName}
            onChange={handleChange}
            placeholder="Jail Name"
            required
            className="w-full p-2 border rounded bg-gray-700 text-white"
          />
          
          <input
            type="text"
            name="cellNo"
            value={formData.cellNo}
            onChange={handleChange}
            placeholder="Cell Number"
            required
            className="w-full p-2 border rounded bg-gray-700 text-white"
          />
          
          <input
            type='number'
            name="sentence"
            value={formData.sentence}
            onChange={handleChange}
            placeholder="No of years"
            required
            className="w-full p-2 border rounded bg-gray-700 text-white"
          />
          
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-200">Register Criminal</button>
        </form>

        {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>

      {/* Criminals List Section */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center text-white mb-6">List of Criminals</h2>
        
        {criminals.length > 0 ? (
          <table className="w-full text-white">
            <thead>
              <tr className="border-b">
                <th className="py-2">Name</th>
                <th className="py-2">Age</th>
                <th className="py-2">Crime Type</th>
                <th className="py-2">Jail Name</th>
                <th className="py-2">Cell No</th>
                <th className="py-2">Sentence</th>
              </tr>
            </thead>
            <tbody>
              {criminals.map((criminal) => (
                <tr key={criminal._id} className="border-b border-gray-700">
                  <td className="py-2 text-center">{criminal.name}</td>
                  <td className="py-2 text-center">{criminal.age}</td>
                  <td className="py-2 text-center">{criminal.crimeType}</td>
                  <td className="py-2 text-center">{criminal.jailName}</td>
                  <td className="py-2 text-center">{criminal.cellNo}</td>
                  <td className="py-2 text-center">{criminal.sentence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-400">No criminals registered.</p>
        )}
      </div>
    </div>
  );
};

export default JailorDashboard;
