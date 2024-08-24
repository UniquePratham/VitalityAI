import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  IconButton,
  Slide,
  Spinner,
  Link,
  Button,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import L from "leaflet";

// Custom hospital icon
const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1486/1486262.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Custom user location icon
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

  useEffect(() => {
    if (navigator.geolocation) {
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
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

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
      console.error("Error fetching nearby hospitals:", error);
      setLoading(false);
    }
  };

  return (
    <Box
      h="100vh"
      w="100%" 
    >
      {/* Header Section */}
      <Flex
        p={4}
        bg="white"
        color="black"
        align="center"
        justify="space-between"
        shadow="md"
      >
        <Heading size="md" fontFamily="inherit" fontWeight="bold">
          Health Locator
        </Heading>
        <Flex>
          <Button
            variant="solid"
            colorScheme="teal"
            onClick={() => setShowPanel(!showPanel)}
            size="md"
          >
            Find Hospitals 🏥
          </Button>
        </Flex>
      </Flex>

      {/* Map and Side Panel */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="center"
        h="calc(100vh - 80px)"
        p={{ base: 4, md: 6 }}
      >
        {/* Map Section */}
        <Box
          h={{ base: "60vh", md: "70vh" }}
          w="100%"
          position="relative"
          boxShadow="lg"
          borderRadius="lg"
          overflow="hidden"
          bg="white"
          border="1px solid #ccc"
          mb={{ base: 6, md: 0 }}
          zIndex={-5}
        >
          {loading ? (
            <Flex align="center" justify="center" h="100%">
              <Spinner size="xl" color="teal.500" />
            </Flex>
          ) : (
            <MapContainer
              center={
                userLocation
                  ? [userLocation.latitude, userLocation.longitude]
                  : [51.505, -0.09] // Default fallback center
              }
              zoom={14}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {userLocation && (
                <Marker
                  position={[userLocation.latitude, userLocation.longitude]}
                  icon={userIcon}
                >
                  <Popup>
                    <Text fontWeight="bold">You are here</Text>
                  </Popup>
                </Marker>
              )}
              {nearbyHospitals.map((hospital) => (
                <Marker
                  key={hospital.id}
                  position={[hospital.latitude, hospital.longitude]}
                  icon={hospitalIcon}
                  eventHandlers={{
                    click: () => {
                      setHighlightedHospital(hospital);
                    },
                  }}
                >
                  <Popup>
                    <Text fontWeight="bold">
                      <Link
                        href={`https://www.google.com/maps/search/?api=1&query=${hospital.name}`}
                        isExternal
                        color="teal.500"
                      >
                        {hospital.name}
                      </Link>
                    </Text>
                  </Popup>
                </Marker>
              ))}
              {highlightedHospital && (
                <PanToMarker location={highlightedHospital} />
              )}
            </MapContainer>
          )}
        </Box>

        {/* Slide-in Panel for Hospital List */}
        <Slide direction="right" in={showPanel} style={{ zIndex: 10 }}>
          <Box
            w={{ base: "full", md: "300px" }}
            bg="white"
            p={4}
            shadow="xl"
            h={{ base: "40vh", md: "100%" }}
            borderRadius="lg"
            overflowY="auto"
            border="1px solid #ccc"
            position="relative"
            zIndex={5}
          >
            <Flex justify="space-between" alignItems="center" mb={4}>
              <Heading size="md" fontWeight="bold">
                Nearby Hospitals
              </Heading>
              <IconButton
                icon={<CloseIcon />}
                variant="outline"
                size="sm"
                onClick={() => setShowPanel(false)}
                aria-label="Close"
                border="1px solid teal"
                color="teal.500"
              />
            </Flex>

            <VStack spacing={4} align="start">
              {nearbyHospitals.map((hospital) => (
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${hospital.name}`}
                  isExternal
                  key={hospital.id}
                  w="full"
                  _hover={{ textDecoration: "none" }}
                >
                  <Box
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    shadow="md"
                    w="full"
                    onClick={() => setHighlightedHospital(hospital)}
                    cursor="pointer"
                    _hover={{ bg: "teal.50" }}
                  >
                    <Text fontWeight="bold" color="teal.500">
                      {hospital.name}
                    </Text>
                    <Text fontSize="sm">Lat: {hospital.latitude}</Text>
                    <Text fontSize="sm">Lon: {hospital.longitude}</Text>
                  </Box>
                </Link>
              ))}
            </VStack>
          </Box>
        </Slide>
      </Flex>
    </Box>
  );
};

export default MapComponent;

// Utility for panning the map to a specific marker
const PanToMarker = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo([location.latitude, location.longitude], 14, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [location, map]);

  return null;
};
