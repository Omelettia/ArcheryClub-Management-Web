import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios'; // Import axios for making HTTP requests
import Iconify from 'src/components/iconify';
import EquipmentCard from '../equipment-card';
import EquipmentSort from '../equipment-sort';
import EquipmentFilters, { CATEGORY_OPTIONS, SKILL_OPTIONS, PRICE_OPTIONS } from '../equipment-filters';
import NewEquipmentTypeForm from '../new-equipment-type-form';

export default function EquipmentsView({ isStaff }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [openNewEquipmentTypeForm, setOpenNewEquipmentTypeForm] = useState(false);
  const [equipments, setEquipments] = useState([]); // State to store fetched equipments
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);

  const fetchEquipments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/equipmentTypes/');
      setEquipments(response.data); // Set the fetched equipments in state
    } catch (error) {
      console.error('Error fetching equipments:', error);
    }
  };

  useEffect(() => {
    // Fetch equipment data when the component mounts
    fetchEquipments();
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleOpenNewEquipmentTypeForm = () => {
    setOpenNewEquipmentTypeForm(true);
  };

  const handleCloseNewEquipmentTypeForm = () => {
    setOpenNewEquipmentTypeForm(false);
  };

  const handleNewEquipmentTypeSubmit = (newEquipment) => {
    // Add the new equipment to the existing list
    setEquipments((prevEquipments) => [...prevEquipments, newEquipment]);
    // Close the form modal
    handleCloseNewEquipmentTypeForm();
  };

  const filteredEquipments = equipments.filter((equipment) => {
    if (
      (selectedCategory.length === 0 || selectedCategory.includes(equipment.category)) &&
      (selectedSkill.length === 0 || selectedSkill.includes(equipment.skill_level)) &&
      (selectedPrice === '' ||
        (selectedPrice === 'below' && equipment.renting_price < 25) ||
        (selectedPrice === 'between' && equipment.renting_price >= 25 && equipment.renting_price <= 75) ||
        (selectedPrice === 'above' && equipment.renting_price > 75))
    ) {
      return true;
    }
    return false;
  });
  

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Equipments
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="space-between"
        sx={{ mb: 5 }}
      >
        {isStaff ? (
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpenNewEquipmentTypeForm}
          >
            New
          </Button>
        ) : (
          <Box sx={{ width: 120 }} /> // Adjust the width as needed
        )}
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <EquipmentFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSkill={selectedSkill}
            setSelectedSkill={setSelectedSkill}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
          />
          <EquipmentSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {filteredEquipments.map((equipment) => (
          <Grid key={equipment.id} xs={12} sm={6} md={3}>
            <EquipmentCard equipment={equipment} />
          </Grid>
        ))}
      </Grid>
      <NewEquipmentTypeForm
        open={openNewEquipmentTypeForm}
        onClose={handleCloseNewEquipmentTypeForm}
        onSubmit={handleNewEquipmentTypeSubmit}
      />
    </Container>
  );
}

EquipmentsView.propTypes = {
  isStaff: PropTypes.bool.isRequired,
};
