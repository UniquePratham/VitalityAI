import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  VStack,
  HStack,
  Text,
  Input,
  Icon,
  keyframes,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";
import { FaUserMd, FaMapMarkerAlt, FaRegClipboard } from "react-icons/fa";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

// Typing animation keyframes
const typing = keyframes`
  from {
    width: 0;
    border-right: 4px solid white;
  }
  to {
    width: 100%;
    border-right: none;
  }
`;

export default function HeroSection() {
  const [borderRight, setBorderRight] = useState("4px solid white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleButton1Click = () => {
    router.push("/doctorlist"); // Redirect to the map page
  };
  const handleButton2Click = () => {
    router.push("/map"); // Redirect to the map page
  };
  // const handleButton3Click = () => {
  //   router.push("/map"); // Redirect to the map page
  // };

  useEffect(() => {
    const timer = setTimeout(() => {
      setBorderRight("none");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      position="relative"
      height={{ base: "130vh", md: "100vh" }}
      overflow="hidden"
      color="white"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <Box
        position="absolute"
        inset="0"
        bg="blackAlpha.600"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        px={4}
        pt={[16, 0]}
        transition="background-color 0.3s ease-in-out"
      >
        {/* Search Bar */}
        <Flex
          mb={[4, 8]}
          direction={["column", "column"]}
          maxW={{ base: "sm", md: "lg" }}
          width="100%"
          alignItems="center"
          position="relative"
          zIndex={1}
        >
          <VStack spacing={4} mb={[6, 8]} textAlign="center">
            <Heading
              as="h1"
              pb={-4}
              fontSize={["5xl", "6xl", "7xl"]}
              fontWeight="300"
              overflow="hidden"
              whiteSpace="nowrap"
              borderRight={borderRight}
              borderColor="white"
              width="fit-content"
              margin="0 auto"
              animation={`${typing} 4s steps(40)`}
              animationFillMode="forwards"
              transition="transform 0.3s ease, color 0.3s ease"
              _hover={{ color: "cyan", transform: "scale(1.05)" }}
              cursor="pointer"
            >
              Vitality AI
            </Heading>
            <Text
              fontSize={["lg", "xl"]}
              transition="color 0.3s ease"
              _hover={{ color: "teal.300" }}
              pb={5}
            >
              Stay updated with the latest technology in Medicine.
            </Text>
          </VStack>
          <HStack
            flexDirection={{ base: "column", md: "row" }}
            alignItems={{ base: "center", md: "flex-start" }}
            spacing={{ base: 2, md: 4 }}
            width="680px"
          >
            <Input
              placeholder="Enter a doctor, specialty, or condition!"
              size="lg"
              fontSize={{ base: "md", md: "lg" }}
              borderRadius="md"
              bg="white"
              color="gray.700"
              mb={{ base: 2, md: 0 }}
              padding="10px 20px"
              flex={1}
              width={{ base: "95vw", md: "90vw" }}
              textAlign="center"
              _focus={{
                outline: "none",
                border: "2px solid rgba(255,255,255,0.6)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.5)",
              }}
              _active={{
                outline: "none",
                border: "2px solid rgba(255,255,255,0.6)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.5)",
              }}
              transition="border-color 0.3s ease, box-shadow 0.3s ease"
            />
            <Button
              colorScheme="green"
              size="lg"
              width={{ base: "20%", md: "auto" }}
              ml={{ base: 0, md: 1 }}
              mt={{ base: 2, md: 0 }}
              _hover={{ bg: "green.600", transform: "scale(1.05)" }}
              _active={{ bg: "green.700" }}
              transition="transform 0.3s ease, background-color 0.3s ease"
              rightIcon={<ArrowForwardIcon />}
            >
              Search
            </Button>
          </HStack>
        </Flex>

        {/* Action Buttons */}
        <Flex
          direction={["column", "row"]}
          width="100%"
          justifyContent="center"
          gap={4}
        >
          <Button
            bg="blue.500"
            color="white"
            size="lg"
            _hover={{ bg: "blue.600", transform: "scale(1.05)" }}
            _active={{ bg: "blue.700" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            py={8}
            flex={1}
            borderRadius="md"
            height={{ base: "auto", md: "250px" }}
            mb={[4, 0]}
            transition="transform 0.3s ease, background-color 0.3s ease"
            onClick={handleButton1Click}
          >
            <Icon as={FaUserMd} boxSize={[8, 10]} mb={4} />
            <Text fontWeight="400" fontSize={["24px", "28px"]}>
              Find A Doctor
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }} textAlign="center">
              Search doctors by specialty and location.
            </Text>
          </Button>

          <Button
            bg="red.500"
            color="white"
            size="lg"
            height={{ base: "auto", md: "250px" }}
            _hover={{ bg: "red.600", transform: "scale(1.05)" }}
            _active={{ bg: "red.700" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            py={8}
            flex={1}
            borderRadius="md"
            mb={[4, 0]}
            transition="transform 0.3s ease, background-color 0.3s ease"
            onClick={handleButton2Click}
          >
            <Icon as={FaMapMarkerAlt} boxSize={[8, 10]} mb={4} />
            <Text fontWeight="400" fontSize={["24px", "28px"]}>
              Find Health Care Near You
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }} textAlign="center">
              Discover nearby health care facilities.
            </Text>
          </Button>

          <Button
            bg="yellow.500"
            color="white"
            height={{ base: "20vh", md: "250px" }}
            size="lg"
            _hover={{ bg: "yellow.600", transform: "scale(1.05)" }}
            _active={{ bg: "yellow.700" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            py={8}
            flex={1}
            borderRadius="md"
            transition="transform 0.3s ease, background-color 0.3s ease"
          >
            <Icon as={FaRegClipboard} boxSize={[8, 10]} mb={4} />
            <Text fontWeight="400" fontSize={["24px", "28px"]}>
              Go to Health Portal
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }} textAlign="center">
              Manage health records anywhere.
            </Text>
          </Button>
        </Flex>
      </Box>

      {/* Floating Emergency Button */}
      <Button
        position="fixed"
        bottom={4}
        right={4}
        colorScheme="red"
        size={["md", "lg"]}
        borderRadius="full"
        boxShadow="lg"
        _hover={{ bg: "red.600", transform: "scale(1.1)" }}
        _active={{ bg: "red.700" }}
        transition="transform 0.3s ease, background-color 0.3s ease"
        onClick={onOpen}
        zIndex={1000}
      >
        Have an Emergency?
      </Button>

      {/* Emergency Modal */}
      <Modal isOpen={isOpen} onClose={onClose} zIndex={1000}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Emergency Options</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>
              If you have an emergency, you can call 911 or send an SMS.
            </Text>
            <Button
              as="a"
              href="tel:911"
              colorScheme="red"
              size="lg"
              width="full"
              mb={4}
              _hover={{ bg: "red.600", transform: "scale(1.05)" }}
              _active={{ bg: "red.700" }}
            >
              Call 911
            </Button>
            <Button
              as="a"
              href="sms:911?body=Emergency! Please send an ambulance."
              colorScheme="teal"
              size="lg"
              width="full"
              _hover={{ bg: "teal.600", transform: "scale(1.05)" }}
              _active={{ bg: "teal.700" }}
            >
              Send SMS
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
