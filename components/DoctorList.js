// components/DoctorList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Input, Select, Grid, Flex, Text, Button, Image } from '@chakra-ui/react';
import { FaStethoscope } from 'react-icons/fa';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');

  // Fetch data from the Random User API
  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=20').then((res) => {
      const formattedDoctors = res.data.results.map((user) => ({
        name: `${user.name.first} ${user.name.last}`,
        specialty: getRandomSpecialty(),
        location: `${user.location.city}, ${user.location.country}`,
        picture: user.picture.medium,
      }));
      setDoctors(formattedDoctors);
    });
  }, []);

  // Random specialties
  const getRandomSpecialty = () => {
    const specialties = ['Cardiology', 'Pediatrics', 'Neurology', 'Dermatology', 'Orthopedics'];
    return specialties[Math.floor(Math.random() * specialties.length)];
  };

  // Filter doctors based on search input
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      doctor.specialty.includes(specialtyFilter)
  );

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Text fontSize="3xl" textAlign="center" color="blue.800" mb={6}>
        <FaStethoscope /> Find Your Doctor
      </Text>
      
      {/* Search Box */}
      <Flex justify="center" mb={8}>
        <Input
          placeholder="Search by doctor name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="300px"
          mr={4}
          borderColor="blue.500"
        />
        <Select
          placeholder="Select specialty"
          onChange={(e) => setSpecialtyFilter(e.target.value)}
          width="200px"
          borderColor="blue.500"
        >
          <option value="Cardiology">Cardiology</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Neurology">Neurology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Orthopedics">Orthopedics</option>
        </Select>
      </Flex>

      {/* Doctors Grid */}
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {filteredDoctors.map((doctor, index) => (
          <Box
            key={index}
            p={6}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="lg"
            _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s ease' }}
            bg="white"
            textAlign="center"
          >
            <Image
              borderRadius="full"
              boxSize="100px"
              src={doctor.picture}
              alt={doctor.name}
              mx="auto"
              mb={4}
            />
            <Text fontWeight="bold" fontSize="xl">
              {doctor.name}
            </Text>
            <Text color="gray.500">{doctor.specialty}</Text>
            <Text color="gray.500">{doctor.location}</Text>
            <Button colorScheme="teal" mt={4}>
              Book Appointment
            </Button>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default DoctorList;
