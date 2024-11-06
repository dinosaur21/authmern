import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManufacturerLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('manufacturerAuth');
    toast.success('Logged out successfully');
    navigate('/manufacturer/login');
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default ManufacturerLogout;