import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeightOptions from '../components/HeightOptions';
import WeightOptions from '../components/WeightOptions';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.5)
        ),
        url("https://scontent.cdninstagram.com/v/t39.30808-6/432668450_18422350075009960_5527286107716371751_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=18de74&_nc_ohc=teVK6oMr_90Q7kNvgFyfS7X&_nc_ht=scontent.cdninstagram.com&edm=AM6HXa8EAAAA&oh=00_AfAH_-vBDAN78PbJTXrvjo6E7OclI4s35ZbbRRHhnfypsQ&oe=66338E71")
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
    
`;

const Form = styled.form`
    display: flex;
    flex-direction: column; // Changed for better form structure
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    display: flex;
    justify-content: center;
`;

const StyledSelect = styled.select`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  background-color: white; /* Match the background color of input fields */
  border: 1px solid #ccc; /* Match the border style of input fields */
  border-radius: 5px; /* Match the border radius of input fields */
`;


const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0; // Simplified margin for uniform spacing
    padding: 10px;
`;

const Button = styled.button`
    width: 100%; // Full width for better UI
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    &:disabled {
        background-color: gray; // Visual cue for disabled state
    }
`;

const Error = styled.span`
    color: red;
`;

const sizeMappings = {
    Men: {
        Fullsuit: {
            Geoprene: {
                height: [["5'3\"", "5'6\""], ["5'5\"", "5'7\""], ["5'8\"", "5'10\""], ["5'6\"", "5'8\""], ["5'8\"", "5'10\""], ["5'10\"", "6'0\""], ["5'9\"", "5'11\""], ["5'7\"", "5'9\""], ["5'10\"", "6'1\""], ["6'2\"", "6'4\""], ["5'8\"", "5'10\""], ["5'11\"", "6'2\""], ["5'9\"", "5'11\""], ["6'2\"", "6'5\""], ["6'0\"", "6'3\""], ["6'1\"", "6'6\""]],
                weight: [[120, 135], [135, 145], [135, 150], [145, 155], [150, 165], [165, 175], [160, 180], [170, 190], [180, 200], [190, 215], [205, 230], [205, 220], [205, 230], [230, 260]], 
                sizes: ['XS', 'S', 'ST', 'MS', 'M', 'MT', 'ML', 'LS', 'L', 'LT', 'XLS', 'XL', '2XLS', 'XLT', 'XXL', 'XXXL']
            },
            Geoflex: {
                height: [["5'3\"", "5'6\""], ["5'5\"", "5'7\""], ["5'8\"", "5'10\""], ["5'6\"", "5'8\""], ["5'8\"", "5'10\""], ["5'10\"", "6'0\""], ["5'9\"", "5'11\""], ["5'7\"", "5'9\""], ["5'10\"", "6'1\""], ["6'2\"", "6'4\""], ["5'8\"", "5'10\""], ["5'11\"", "6'2\""], ["5'9\"", "5'11\""], ["6'2\"", "6'5\""], ["6'0\"", "6'3\""], ["6'1\"", "6'6\""]],
                weight: [[120, 135], [135, 145], [135, 150], [145, 155], [150, 165], [165, 175], [160, 180], [170, 190], [180, 200], [190, 215], [205, 230], [205, 220], [205, 230], [230, 260]], 
                sizes: ['XS', 'S', 'ST', 'MS', 'M', 'MT', 'ML', 'LS', 'L', 'LT', 'XLS', 'XL', '2XLS', 'XLT', 'XXL', 'XXXL']
            }
        },
        // Springsuit: {
        //     // Define mappings for Springsuit
        // },
        // Add other styles here
    },
    Women: {
        Fullsuit: {
            Geoprene: {
                height: [["5'1\"", "5'3\""], ["5'3\"", "5'5\""], ["5'2\"", "5'4\""], ["5'4\"", "5'6\""], ["5'6\"", "5'9\""], ["5'3\"", "5'5\""], ["5'5\"", "5'7\""], ["5'7\"", "5'10\""], ["5'3\"", "5'6\""], ["5'6\"", "5'8\""], ["5'9\"", "6'0\""], ["5'7\"", "5'9\""], ["5'9\"", "5'11\""]],
                weight: [[90, 105], [100, 115], [110, 120], [110, 125], [115, 135], [120, 135], [125, 140], [125, 140], [130, 145], [135, 150], [140, 155], [140, 160], [150, 170]],
                sizes: ['2', '4', '6S', '6', '6T', '8S', '8', '8T', '10S', '10', '10T', '12', '14']
            },
            Geoflex: {
                height: [["5'1\"", "5'3\""], ["5'3\"", "5'5\""], ["5'2\"", "5'4\""], ["5'4\"", "5'6\""], ["5'6\"", "5'9\""], ["5'3\"", "5'5\""], ["5'5\"", "5'7\""], ["5'7\"", "5'10\""], ["5'3\"", "5'6\""], ["5'6\"", "5'8\""], ["5'9\"", "6'0\""], ["5'7\"", "5'9\""], ["5'9\"", "5'11\""]],
                weight: [[90, 105], [100, 115], [110, 120], [110, 125], [115, 135], [120, 135], [125, 140], [125, 140], [130, 145], [135, 150], [140, 155], [140, 160], [150, 170]],
                sizes: ['2', '4', '6S', '6', '6T', '8S', '8', '8T', '10S', '10', '10T', '12', '14']
            }
        },
        // Springsuit: {
        //     // Define mappings for Springsuit
        // },
        // Add other styles here
    }
};



// Function to parse height from feet and inches string to inches only
const parseHeightToInches = (height) => {
    const [feet, inches] = height.split("'").map(h => parseInt(h.replace('"', ''), 10));
    return feet * 12 + inches;
};

const calculatePerfectFit = (categories, style, material, height, weight) => {
    const userHeightInInches = parseHeightToInches(height);
    const userWeight = parseInt(weight.replace(' lbs', ''), 10);

    const categoryStyles = sizeMappings[categories][style];
    if (!categoryStyles) {
        return null; // Style not found
    }

    const materialSizes = categoryStyles[material];
    if (!materialSizes) {
        return null; // Material not found
    }

    const { height: heightRanges, weight: weightRanges, sizes } = materialSizes;
    let sizeIndex = -1;

    // Determine size by height
    for (let i = 0; i < heightRanges.length; i++) {
        const [minHeight, maxHeight] = heightRanges[i].map(parseHeightToInches);
        if (userHeightInInches >= minHeight && userHeightInInches <= maxHeight) {
            sizeIndex = i;
            break;
        }
    }

    if (sizeIndex !== -1) {
        const [minWeight, maxWeight] = weightRanges[sizeIndex];
        if (userWeight >= minWeight && userWeight <= maxWeight) {
            return sizes[sizeIndex];
        }
    }

    // No perfect fit found
    return null; 
};


const WetsuitSizingForm = () => {
    const [categories, setCategories] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [chest, setChest] = useState("");
    const [waist, setWaist] = useState("");
    const [style, setStyle] = useState("");
    const [material, setMaterial] = useState("");

    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!categories || !height || !weight || !style || !material) {
            alert("Please fill out all required fields.");
            return;
        }
    
        const perfectFit = calculatePerfectFit(categories, style, material, height, weight);
    
        if (perfectFit) {
            navigate('/results', { state: { perfectFit } });
        } else {
            alert("We couldn't find a perfect fit. Please adjust your selections.");
        }
    };
    
    return (
        <Container>
            <Wrapper>
                <Form onSubmit={handleSubmit}>
                <Title>WETSUIT SIZING TOOL</Title>
                <Form>
                <StyledSelect onChange={(e) => setCategories(e.target.value)}>
                    <option value="">I am looking for a...</option>
                    <option value="men">Men's Wetsuit</option>
                    <option value="women">Women's Wetsuit</option>
                </StyledSelect>
                <p>Please select your measurements</p>
                <StyledSelect onChange={(e) => setHeight(e.target.value)} value={height}>
                    <option value="">Select Height</option>
                    <HeightOptions />
                </StyledSelect>
                <StyledSelect onChange={(e) => setWeight(e.target.value)} value={weight}>
                    <option value="">Select Weight</option>
                    <WeightOptions />
                </StyledSelect>
                    <Input type="number" placeholder="Chest (optional)" onChange={(e) => setChest(e.target.value)} />
                    <Input type="number" placeholder="Waist (optional)" onChange={(e) => setWaist(e.target.value)} />
                <p>What style of wetsuit are you looking for?</p>
                <StyledSelect onChange={(e) => setStyle(e.target.value)}>
                    <option value="">Select Style</option>
                    <option value="fullsuit">Fullsuit</option>
                    <option value="springsuit">Springsuit</option>
                    <option value="shortsleevefull">Short Sleeve Full</option>
                    <option value="longsleevespring">Long Sleeve Spring</option>
                </StyledSelect>
                <p>What material are you looking for?</p>
                <StyledSelect onChange={(e) => setMaterial(e.target.value)}>
                    <option value="">Select Material</option>
                    <option value="geoprene">Geoprene</option>
                    <option value="geoflex">Geoflex</option>
                    {/* Add more material options here */}
                </StyledSelect>
                <Button type="submit" disabled={isFetching}>Find My Perfect Fit</Button>
                    {error && <Error>{error}</Error>}
                </Form>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default WetsuitSizingForm;
