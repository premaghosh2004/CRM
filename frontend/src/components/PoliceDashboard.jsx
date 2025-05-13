import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PoliceDashboard = () => {
    const [criminalId, setCriminalId] = useState('');
    const [criminals, setCriminals] = useState([]);
    const [newJail, setNewJail] = useState('');
    const [cellNo, setCellNo] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const url = 'http://localhost:3000';

    
    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${url}/api/criminals/transferCriminal/${criminalId}`, {
                newJail,
                cellNo
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'Transfer failed');
        }
    };

    
    useEffect(() => {
        const fetchCriminals = async () => {
            try {
                const response = await axios.get(`${url}/api/criminals/`); // Replace with your API endpoint
                setCriminals(response.data);
            } catch (error) {
                console.error("Error fetching criminals:", error);
            }
        };
        fetchCriminals();
    }, [criminals]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/')
      }

    return (
        <div className='w-full bg-black h-screen'>
            <div className="flex flex-col items-center bg-black text-white h-screen p-10">
            <div className="flex justify-between w-full">
      <h1 className="text-3xl font-bold mb-8">Police/CBI Dashboard</h1>
      <button className="border-2 rounded-lg border-red-400 px-4" onClick={handleLogout}>Logout</button>
      </div>

                <form className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleTransfer}>
                    <div className="mb-4">
                        <label htmlFor="criminalId" className="block text-sm font-medium mb-2">Criminal ID</label>
                        <input
                            type="text"
                            id="criminalId"
                            value={criminalId}
                            onChange={(e) => setCriminalId(e.target.value)}
                            className="w-full p-2 border rounded bg-gray-700 text-white"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="newJail" className="block text-sm font-medium mb-2">New Jail</label>
                        <input
                            type="text"
                            id="newJail"
                            value={newJail}
                            onChange={(e) => setNewJail(e.target.value)}
                            className="w-full p-2 border rounded bg-gray-700 text-white"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="cellNo" className="block text-sm font-medium mb-2">Cell Number</label>
                        <input
                            type="text"
                            id="cellNo"
                            value={cellNo}
                            onChange={(e) => setCellNo(e.target.value)}
                            className="w-full p-2 border rounded bg-gray-700 text-white"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Transfer Criminal
                    </button>

                    {message && <p className="mt-4 text-center">{message}</p>}
                </form>
            </div>

            <div className="mb-4">
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
        </div>
    );
};

export default PoliceDashboard;
