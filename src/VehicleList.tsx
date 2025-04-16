import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import './styles/main.css';

type Car = {
  _id: string;
  type: 'car';
  brand: string;
  model: string;
  year: number;
  rentPerDay: number;
  registrationNumber: string;
  availability: boolean;
  image: string;
};

type Bike = {
  _id: string;
  type: 'bike';
  brand: string;
  model: string;
  year: number;
  rentPerDay: number;
  registrationNumber: string;
  availability: boolean;
  image: string;
};

type Bicycle = {
  _id: string;
  type: 'bicycle';
  brand: string;
  model: string;
  year: number;
  rentPerDay: number;
  registrationNumber: string;
  availability: boolean;
  image: string;
};

type Vehicle = Car | Bike | Bicycle;

interface VehicleListProps {
  type: 'car' | 'bike' | 'bicycle';
}

const VehicleList: React.FC<VehicleListProps> = ({ type }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        console.log(`Fetching ${type}s...`);
        const response = await axios.get(`http://localhost:5000/${type}s`);
        console.log(`Found ${type}s:`, response.data);
        setVehicles(response.data);
        setError(null);
      } catch (err) {
        const error = err as AxiosError;
        console.error(`Error fetching ${type}s:`, error);
        setError(`Failed to load ${type}s: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [type]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <strong>Error!</strong> {error}
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="error-message warning">
        <strong>No {type}s available</strong> Please check back later.
      </div>
    );
  }

  return (
    <div className="vehicle-list">
      <div className="vehicle-list-header">
        <h2 className="vehicle-list-title">{type}s</h2>
        <div className="vehicle-count">
          Showing {vehicles.length} {type}{vehicles.length !== 1 ? 's' : ''}
        </div>
      </div>
      <div className="vehicle-grid">
        {vehicles.map(vehicle => (
          <div key={vehicle._id} className="vehicle-card">
            <div className="vehicle-image-container">
              <img 
                src={vehicle.image} 
                alt={`${vehicle.brand} ${vehicle.model}`} 
                className="vehicle-image"
              />
              <div className="vehicle-price-tag">
                ${vehicle.rentPerDay}/day
              </div>
              <div className="vehicle-overlay">
                <h3 className="vehicle-title">
                  {vehicle.brand} {vehicle.model}
                </h3>
                <p className="vehicle-year">
                  Year: {vehicle.year}
                </p>
              </div>
            </div>
            <div className="vehicle-info">
              <div className="vehicle-status">
                <div className="availability-indicator">
                  <span className={`status-dot ${vehicle.availability ? 'available' : 'unavailable'}`}></span>
                  <span className="status-text">
                    {vehicle.availability ? 'Available' : 'Not Available'}
                  </span>
                </div>
                <span className="registration-number">
                  Reg: {vehicle.registrationNumber}
                </span>
              </div>
              <button 
                className={`rent-button ${!vehicle.availability ? 'disabled' : ''}`}
                disabled={!vehicle.availability}
              >
                {vehicle.availability ? 'Rent Now' : 'Not Available'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleList;
