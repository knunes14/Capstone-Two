import React from 'react';

const HeightOptions = () => {
    const heights = [];
    for (let feet = 5; feet <= 6; feet++) {
        let startInch = feet === 5 ? 1 : 0; // Start at 1 inch if 5 feet, otherwise start at 0 inches
        let endInch = feet === 6 ? 6 : 11; // Go up to 6 inches if 6 feet, otherwise up to 11 inches
        for (let inches = startInch; inches <= endInch; inches++) {
            const totalInches = feet * 12 + inches; // Convert feet and inches to total inches
            heights.push({ display: `${feet}'${inches}"`, value: totalInches });
        }
    }

    return heights.map((height) => (
        <option key={height.value} value={height.value}>{height.display}</option>
    ));
};

export default HeightOptions;

