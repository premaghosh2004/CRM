import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const JudgeDashboard = () => {
  const [criminals, setCriminals] = useState([]);
  const [selectedCriminal, setSelectedCriminal] = useState(null);
  const [sentence, setSentence] = useState("");
  const navigate = useNavigate();

  const url = 'http://localhost:3000';

  
  useEffect(() => {
    const fetchCriminals = async () => {
      try {
        const response = await axios.get(`${url}/api/criminals/`); 
        setCriminals(response.data);
      } catch (error) {
        console.error("Error fetching criminals:", error);
      }
    };
    fetchCriminals();
  }, [criminals]);


  const handleUpdateSentence = async () => {
    try {
      await axios.put(`${url}/api/criminals/updateSentence/${selectedCriminal._id}`, {
        sentence,
      });
      alert("Sentence updated successfully");
      setSentence("");
    } catch (error) {
      console.error("Error updating sentence:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <div className="bg-gray-900 min-h-screen p-8 text-white">
      <div className="flex justify-between w-full">
      <h1 className="text-3xl font-bold mb-8">Judge Dashboard</h1>
      <button className="border-2 rounded-lg border-red-400 px-4" onClick={handleLogout}>Logout</button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Criminal List</h2>
        <ul className="space-y-4">
          {criminals.map((criminal) => (
            <li
              key={criminal._id}
              className="p-4 bg-gray-800 rounded-md cursor-pointer"
              onClick={() => setSelectedCriminal(criminal)}
            >
              <p>Name: {criminal.name}</p>
              <p>Crime: {criminal.crimeType}</p>
              <p>Jail: {criminal.jailName}</p>
              <p>Sentence: {criminal.sentence}</p>
            </li>
          ))}
        </ul>
      </div>

      {selectedCriminal && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Update Sentence for {selectedCriminal.name}
          </h2>
          <input
            type="text"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            placeholder="Enter new sentence"
            className="p-2 rounded-md bg-gray-800 w-full text-white mb-4"
          />
          <button
            onClick={handleUpdateSentence}
            className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700"
          >
            Update Sentence
          </button>
        </div>
      )}
    </div>
  );
};

export default JudgeDashboard;
