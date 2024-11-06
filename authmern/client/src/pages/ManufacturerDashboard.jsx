import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';

const ManufacturerDashboard = () => {
  const [manufacturerData, setManufacturerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('manufacturerAuth'));

  useEffect(() => {
    if (!token) {
      navigate('/manufacturer/login');
      return;
    }

    const fetchManufacturerData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/v1/manufacturer/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setManufacturerData(response.data.manufacturer);
      } catch (error) {
        console.error('Error fetching manufacturer data:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('manufacturerAuth');
          navigate('/manufacturer/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchManufacturerData();
  }, [token, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Manufacturer Dashboard</h1>
      {manufacturerData && (
        <div className="dashboard-info">
          <h2>Welcome, {manufacturerData.companyName}!</h2>
          <div className="info-card">
            <p><strong>Email:</strong> {manufacturerData.businessEmail}</p>
            <p><strong>Address:</strong> {manufacturerData.address}</p>
            <p><strong>Verification Status:</strong> {manufacturerData.verificationStatus}</p>
          </div>
        </div>
      )}
      <button
        onClick={() => {
          localStorage.removeItem('manufacturerAuth');
          navigate('/manufacturer/login');
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ManufacturerDashboard;