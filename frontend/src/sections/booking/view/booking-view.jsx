import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function BookingView({ chosenItems }) {
  const [equipments, setEquipments] = useState([]); // State to store fetched equipments
  const [totalAmount, setTotalAmount] = useState(0); // State to store total amount

  useEffect(() => {
    if (chosenItems.length > 0) {
      console.log("Fetching equipment details for chosen items:", chosenItems);
      
      // Fetch equipment details based on chosenItems array
      Promise.all(chosenItems.map(itemId => 
        fetch(`http://localhost:3001/api/equipmentTypes/${itemId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Error fetching equipment with ID: ${itemId}`);
            }
            return response.json();
          })
      ))
      .then(dataArray => {
        console.log("Fetched data:", dataArray);

        // Combine all fetched equipment data
        const combinedData = dataArray.map(data => ({
          ...data,
          quantity: 0,
          equipmentCount: data.equipmentCount
        }));
        setEquipments(combinedData);
        console.log("combinedData:", combinedData);

        // Calculate total amount initially
        calculateTotalAmount(combinedData);
      })
      .catch(error => {
        console.error('Error fetching equipment details:', error);
      });
    }
  }, [chosenItems]); // Update equipments whenever chosenItems change

  const handleQuantityChange = (equipmentId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    const updatedEquipments = equipments.map(equipment =>
      equipment.id === equipmentId ? { ...equipment, quantity: newQuantity } : equipment
    );
    setEquipments(updatedEquipments);
  
    // Recalculate total amount based on updated quantities
    const updatedTotalAmount = calculateTotalAmount(updatedEquipments);
    setTotalAmount(updatedTotalAmount);
  };
  

  const calculateTotalAmount = (updatedEquipments) => updatedEquipments.reduce((acc, equipment) => 
    acc + (equipment.renting_price * (equipment.quantity || 0)), 0);

  const handleSubmit = () => {
    // Handle submitting the booking
    console.log("Booking submitted with items:", equipments);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Booking
      </Typography>

      {equipments.length > 0 ? (
        equipments.map((equipment) => (
          <Stack
            key={equipment.id}
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={8}
            sx={{ marginBottom: '1rem', marginLeft: 12, marginTop: 9 }}
          >
            <img
              src={equipment.equipment_image}
              alt={equipment.name}
              style={{ width: '200px', height: '200px' }}
            />
            <Stack flexGrow={1} alignItems="flex-start">
              <Typography variant="subtitle1">
                {equipment.name}
              </Typography>
              <Typography variant="subtitle2">
                ${equipment.renting_price}
              </Typography>
            </Stack>
            <TextField
              label="Qty"
              type="number"
              value={equipment.quantity}
              onChange={(event) => handleQuantityChange(equipment.id, event)}
              inputProps={{ min: 0 }}
              sx={{ width: '60px' }}
            />
          </Stack>
        ))
      ) : (
        <Typography variant="h6">No equipment selected or available.</Typography>
      )}

      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
        <Typography variant="h6">
          Total Amount: ${totalAmount}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </Container>
  );
}

BookingView.propTypes = {
  chosenItems: PropTypes.arrayOf(PropTypes.number).isRequired, // Changed to array of numbers
};
