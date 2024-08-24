import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  Box,
  Flex,
  Heading,
  Button,
  VStack,
  HStack,
  Slide,
  Text,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import L from "leaflet";

// Custom Icons
const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1486/1486262.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [highlightedHospital, setHighlightedHospital] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal for redirect

  // Fetch User Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        fetchNearbyHospitals(latitude, longitude);
      },
      (error) => {
        console.error("Error getting user location:", error);
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // Fetch Hospitals Nearby
  const fetchNearbyHospitals = async (latitude, longitude) => {
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:5000,${latitude},${longitude})[amenity=hospital];out;`;

    try {
      const response = await fetch(overpassUrl);
      const data = await response.json();
      const hospitals = data.elements.map((hospital) => ({
        id: hospital.id,
        name: hospital.tags.name || "Unknown Hospital",
        latitude: hospital.lat,
        longitude: hospital.lon,
      }));
      setNearbyHospitals(hospitals);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      setLoading(false);
    }
  };

  // Google Redirect Handler
  const handleGoogleRedirect = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <Box h="100vh" w="100%" bg="gray.50">
      {/* Header */}
      <Box p={4} bg="gray.700" shadow="md" w="full">
        <HStack justify="space-between" color="white">
          <Heading size="lg">Vitality AI</Heading>
          <HStack spacing={4}>
            <Button colorScheme="green" onClick={() => setShowPanel(!showPanel)}>
              Find Hospitals
            </Button>
            <Button colorScheme="teal" onClick={onOpen}>
              Health Portal
            </Button>
          </HStack>
        </HStack>
      </Box>

      {/* Body with Map and Hospital List */}
      <Flex h="calc(100vh - 72px)" direction={{ base: "column", md: "row" }}>
        {/* Map */}
        <Box flex="1" h={{ base: "50vh", md: "100%" }} position="relative">
          {loading ? (
            <Flex justify="center" align="center" h="100%">
              <Text>Loading map...</Text>
            </Flex>
          ) : (
            <MapContainer
              center={
                userLocation
                  ? [userLocation.latitude, userLocation.longitude]
                  : [51.505, -0.09]
              }
              zoom={14}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {userLocation && (
                <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userIcon}>
                  <Popup>You are here</Popup>
                </Marker>
              )}
              {nearbyHospitals.map((hospital) => (
                <Marker
                  key={hospital.id}
                  position={[hospital.latitude, hospital.longitude]}
                  icon={hospitalIcon}
                  opacity={highlightedHospital?.id === hospital.id ? 1.0 : 0.5}
                >
                  <Popup>{hospital.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </Box>

        {/* Slide-in Hospital List */}
        <Slide direction="right" in={showPanel} style={{ zIndex: 10 }}>
          <Box
            w={{ base: "full", md: "300px" }}
            bg="white"
            p={4}
            shadow="lg"
            overflowY="scroll"
            h="100%"
            position="relative"
          >
            <Flex justify="space-between" alignItems="center">
              <Heading size="md">Nearby Hospitals</Heading>
              <IconButton
                icon={<CloseIcon />}
                variant="outline"
                size="sm"
                onClick={() => setShowPanel(false)}
                aria-label="Close"
              />
            </Flex>
            <VStack mt={4} spacing={4}>
              {nearbyHospitals.length ? (
                nearbyHospitals.map((hospital) => (
                  <Box
                    key={hospital.id}
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    w="full"
                    onClick={() => setHighlightedHospital(hospital)}
                    cursor="pointer"
                    _hover={{ bg: "gray.100" }}
                  >
                    <Text fontWeight="bold">{hospital.name}</Text>
                  </Box>
                ))
              ) : (
                <Text>No hospitals found nearby.</Text>
              )}
            </VStack>
          </Box>
        </Slide>
      </Flex>

      {/* Google Redirect Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Health Portal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Would you like to go to Google?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleGoogleRedirect}>
              Yes
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MapComponent;
