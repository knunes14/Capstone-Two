import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WetsuitCard from '../components/WetsuitCard';
import './WetsuitResultPage.css';

const WetsuitResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const product = Array.isArray(location.state?.product) ? location.state.product : [];

    const handleReturn = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className='wetsuit-results-container'>
            <div className="wrapper">
                <h1 className="title">OUR RECOMMENDATIONS FOR YOU</h1>
                {product.map(prod => (
                    <WetsuitCard key={prod._id} product={prod} />
                ))}
                <h2 className="subtitle">Questions about our wetsuit recommendations? Please email us at swellmade@example.com</h2>
                <button className="button" onClick={handleReturn}>Try Again</button>
            </div>
        </div>
    );
};

export default WetsuitResultPage;