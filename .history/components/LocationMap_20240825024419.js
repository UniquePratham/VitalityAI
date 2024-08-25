import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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
  Link,
  useDisclosure,
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

  const handleGoogleRedirect = (hospital) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <Box h="100vh" w="100%" bg="gray.50">
      {/* Header Section */}
      <Box p={4} bg="grey" shadow="md" w="full" position="relative">
        <HStack justify="space-between" color="white">
          <Heading
            size="lg"
            fontFamily="sans-serif"
            textShadow="2px 2px 5px rgba(255,255,255,0.2)"
          >
            Vitality AI
          </Heading>
          <HStack spacing={4}>
            <Button
              variant="solid"
              colorScheme="green"
              onClick={() => setShowPanel(!showPanel)}
            >
              Find Hospitals
            </Button>
          </HStack>
        </HStack>
      </Box>

      {/* Map and Side Panel */}
      <Flex
        h="calc(100vh - 184px)"
        direction={{ base: "column", md: "row" }}
        justify="center"
        alignItems="center"
      >
        {/* Map Section */}
        <Box
          h="70vh"
          w={{ base: "100%", md: "50%" }}
          position="relative"
          border="1px solid #ccc"
          boxShadow="lg"
          borderRadius="lg"
          overflow="hidden"
        >
          {loading ? (
            <Flex align="center" justify="center" h="100%">
              <Text>Loading map...</Text>
            </Flex>
          ) : userLocation ? (
            <MapContainer
              center={[userLocation.latitude, userLocation.longitude]} // Use user's location for map center
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
                  opacity={
                    highlightedHospital &&
                    hospital.latitude === highlightedHospital.latitude &&
                    hospital.longitude === highlightedHospital.longitude
                      ? 1.0
                      : 0.7
                  }
                >
                  <Popup>
                    <Text fontWeight="bold">{hospital.name}</Text>
                  </Popup>
                </Marker>
              ))}
              {highlightedHospital && (
                <PanToMarker location={highlightedHospital} />
              )}
            </MapContainer>
          ) : (
            <Flex align="center" justify="center" h="100%">
              <Text>Location access denied or unavailable</Text>
            </Flex>
          )}
        </Box>

        {/* Slide-in Panel for Hospital List */}
        <Slide direction="right" in={showPanel} style={{ zIndex: 10 }}>
          <Box
            w={{ base: "full", md: "300px" }}
            bg="white"
            p={4}
            shadow="xl"
            h="100%"
            border="1px solid #ccc"
            overflowY="scroll"
            position="relative"
          >
            <Flex justify="space-between" alignItems="center">
              <Heading size="md" mb={4}>
                Nearby Hospitals
              </Heading>
              <IconButton
                icon={<CloseIcon />}
                variant="outline"
                size="sm"
                onClick={() => setShowPanel(false)}
                aria-label="Close"
              />
            </Flex>
            <VStack spacing={4} align="start">
              {nearbyHospitals.map((hospital) => (
                <Box
                  key={hospital.id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  w="full"
                  boxShadow="sm"
                  border="1px solid #ddd"
                  onClick={() => setHighlightedHospital(hospital)}
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                >
                  <Text fontWeight="bold">{hospital.name}</Text>
                  <Link
                    color="blue.500"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent map pan when clicking on the link
                      handleGoogleRedirect(hospital);
                    }}
                  >
                    View on Google Maps
                  </Link>
                </Box>
              ))}
            </VStack>
          </Box>
        </Slide>
      </Flex>
    </Box>
  );
};

// Helper component to pan the map to the clicked hospital
const PanToMarker = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo([location.latitude, location.longitude], 14, {
        animate: true,
      });
    }
  }, [location, map]);

  return null;
};

export default MapComponent;
