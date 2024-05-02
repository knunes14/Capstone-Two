import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './WetsuitForm.css';

function WetsuitForm({ onSubmit }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        categories: '',
        height: '',
        weight: '',
        style: '',
        material: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("Form submitted with data:", formData);
        console.log(api); // Should log { fetchRecommendations: f }
        console.log(api.fetchRecommendations); // Should log the function itself

        const recommendedWetsuits = await api.fetchRecommendations(formData);

        navigate('/results', { state: { product: recommendedWetsuits } });

        if (typeof onSubmit === 'function') {
            onSubmit(formData);
        } else {
            console.error('onSubmit is not provided or not a function');
        }
    };

   return (  
    <div className="wetsuit-form-container">
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h1>FIND YOUR PERFECT WETSUIT</h1>
            <label>
                <p>Please fill out the form below:</p>
                <select name="categories" value={formData.categories} onChange={handleChange}>
                    <option value="">I am looking for a...</option>
                    <option value="men">Men's Wetsuit</option>
                    <option value="women">Women's Wetsuit</option>
                </select>
            </label>
            <label>
                Height (inches)
                <input type="number" name="height" placeholder="ex. 70" value={formData.height} onChange={handleChange} />
            </label>
            <label>
                Weight (pounds):
                <input type="number" name="weight" placeholder="ex. 180" value={formData.weight} onChange={handleChange} />
            </label>
            <label>
                Style:
                <select name="style" value={formData.style} onChange={handleChange}>
                    <option value="">Select Style</option>
                    <option value="Fullsuit">Fullsuit</option>
                    <option value="Springsuit">Springsuit</option>
                </select>
            </label>
            <label>
                Material:
                <select name="material" value={formData.material} onChange={handleChange}>
                    <option value="">Select Material</option>
                    <option value="Geoflex">Geoflex</option>
                    <option value="Geoprene">Geoprene</option>
                </select>
            </label>
            <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Find My Wetsuit'}</button>
        </form>
    </div>
    );
}

export default WetsuitForm;