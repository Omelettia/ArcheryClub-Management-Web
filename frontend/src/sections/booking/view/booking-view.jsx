import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function BookingView({ chosenItems, setBookingOrders }) {
  const [equipments, setEquipments] = useState([]); // State to store fetched equipments
  const [totalAmount, setTotalAmount] = useState(0); // State to store total amount

  useEffect(() => {
    if (chosenItems.length > 0) {
      console.log("Fetching equipment details for chosen items:", chosenItems);
      
      // Fetch equipment details based on chosenItems array
      Promise.all(chosenItems.map(itemId => 
        axios.get(`http://localhost:3001/api/equipmentTypes/${itemId}`)
          .then(response => response.data)
          .catch(error => {
            console.error(`Error fetching equipment with ID: ${itemId}`, error);
            throw error;
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

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = JSON.parse(atob(token.split('.')[1])).id;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Dictionary to store equipment type ID with corresponding quantity
      const equipmentQuantities = {};
  
      // Iterate over equipments and store their quantities
      equipments.forEach((equipment) => {
        const { id: equipmentTypeId, quantity } = equipment;
        equipmentQuantities[equipmentTypeId] = quantity;
      });
  
      // Array to store all rented back equipment IDs
      const allRentedBackEquipmentIds = [];
  
      // Iterate over equipments and make a request for each type
      await Promise.all(equipments.map(async (equipment) => {
        const { id: equipmentTypeId } = equipment;
  
        // Send a request to update the equipment with the updated quantities
        const response = await axios.put('http://localhost:3001/api/equipments/updateUserId', {
          equipmentTypeId,
          userId,
        }, config);
  
        // Push the returned equipment ID into the array
        allRentedBackEquipmentIds.push(response.data.rentedBackEquipmentIds);
      }));
  
      // Prepare data for booking creation
      const bookingEquipmentIdsWithQuantities = allRentedBackEquipmentIds.map((equipmentId) => ({
        equipmentId: equipmentId.equipmentId,
        duration: equipmentQuantities[equipmentId.equipmentTypeId],
      }));
  
      // Send a request to create a booking
      const response2 = await axios.post('http://localhost:3001/api/bookings', {
        totalPrice: totalAmount,
        userId,
        equipmentIds: bookingEquipmentIdsWithQuantities,
      }, config);
  
      // Update booking orders state
      setBookingOrders((prevBookingOrders) => {
        // Extracting bookingId from response2.data
        const bookingId = response2.data.id;
    
        // Adding the new bookingId to the list of previous booking orders
        const uniqueBookingIds = Array.from(new Set([...prevBookingOrders, bookingId]));
    
        // Logging and returning the updated list of booking orders
        if (!prevBookingOrders.includes(bookingId)) {
            console.log("Booking ID added:", bookingId);
        } else {
            console.log("Booking ID already in bell:", bookingId);
        }
        return uniqueBookingIds;
    });
    
  
      console.log('All rented back equipment IDs:', allRentedBackEquipmentIds);
  
      // Handle booking creation or other operations here
    } catch (error) {
      console.error('Error submitting booking:', error);
    }
  };  
  

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Booking
      </Typography>
      <Link to="/"> 
          <IconButton aria-label="back" sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
        </Link>
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
              label="Dur"
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
  setBookingOrders: PropTypes.func.isRequired,
};
