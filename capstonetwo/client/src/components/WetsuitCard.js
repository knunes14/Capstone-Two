import React from 'react';
import { useNavigate } from 'react-router-dom';

const WetsuitCard = ({ product }) => {
    const navigate = useNavigate();

    const handlePurchase = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="wetsuit-card">
            <h2>{product.title}</h2>
            <img src={product.img} alt={product.title} style={{ width: '100%' }} />
            <p>{product.description}</p>
            <div className="separator"></div>
            <p>{`Style: ${product.style}, Material: ${product.material}`}</p>
            <div className="separator"></div>
            <p>{`Price: $${product.price.toFixed(2)}`}</p>
            <button className="purchase-button" onClick={() => handlePurchase(product._id)}>Purchase Now</button>
        </div>
    );
};

export default WetsuitCard;
