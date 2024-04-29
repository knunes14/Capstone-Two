import React from 'react';

const WeightOptions = () => {
    const weights = [];
    for (let pounds = 90; pounds <= 260; pounds++) {
        weights.push(`${pounds} lbs`);
    }

    return weights.map((weight, index) => (
        <option key={index} value={weight}>{weight}</option>
    ));
};

export default WeightOptions;
