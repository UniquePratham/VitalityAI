import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Flex,
  Button,
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
import { FaFemale, FaChild, FaPregnantWoman } from "react-icons/fa";

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

const WC = () => {
  const [borderRight, setBorderRight] = useState("4px solid white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const timer = setTimeout(() => {
      setBorderRight("none");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      overflow="hidden"
      color="white"
      height={{ base: "120vh", md: "100vh" }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
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
        px={[4, 6, 8]} // Responsive padding
        pt={[16, 20]}
        transition="background-color 0.3s ease-in-out"
      >
        {/* Main Heading with Typewriter Animation */}
        <Heading
          as="h1"
          fontSize={["3xl", "4xl", "5xl", "6xl"]} // Responsive font size
          fontWeight="300"
          overflow="hidden"
          whiteSpace="nowrap"
          borderRight={borderRight}
          width="fit-content"
          margin="0 auto"
          animation={`${typing} 4s steps(40)`}
          animationFillMode="forwards"
          transition="transform 0.3s ease, color 0.3s ease"
          _hover={{ color: "cyan", transform: "scale(1.05)" }}
          cursor="pointer"
        >
          Women&apos;s & Child Care
        </Heading>

        {/* Content */}
        <Flex
          direction={["column", "row"]} // Stack on small screens, row on larger screens
          align="center"
          justify="center"
          wrap="wrap"
          mt={[6, 8]} // Adjust margin top
          spacing={[4, 6, 8]} // Adjust spacing
        >
          {/* Women&apos;s Care Section */}
          <VStack
            bg="blue.500"
            color="white"
            p={[4, 6]} // Responsive padding
            borderRadius="md"
            boxShadow="lg"
            width={{ base: "90%", md: "400px" }} // Full width on mobile, 30% on larger screens
            mb={[6, 0]} // Margin bottom on smaller screens
            transition="transform 0.3s ease, background-color 0.3s ease"
            _hover={{ bg: "blue.600", transform: "scale(1.05)" }}
            spacing={4}
            mr={[0, 2]} // Margin right only on larger screens
          >
            <Icon as={FaFemale} boxSize={[8, 10]} mb={4} />{" "}
            {/* Responsive icon size */}
            <Heading size={["md", "lg"]} fontWeight="300" mb={2}>
              Women&apos;s Care
            </Heading>
            <Text fontSize={["sm", "md"]}>
              Comprehensive care for women&apos;s health, including gynecological
              services, reproductive health, and general wellness checks.
            </Text>
          </VStack>

          {/* Child Care Section */}
          <VStack
            bg="yellow.500"
            color="black"
            p={[4, 6]} // Responsive padding
            borderRadius="md"
            boxShadow="lg"
            width={{ base: "90%", md: "400px" }} // Full width on mobile, 30% on larger screens
            mb={[6, 0]} // Margin bottom on smaller screens
            transition="transform 0.3s ease, background-color 0.3s ease"
            _hover={{ bg: "yellow.600", transform: "scale(1.05)" }}
            spacing={4}
          >
            <Icon as={FaChild} boxSize={[8, 10]} mb={4} />{" "}
            {/* Responsive icon size */}
            <Heading size={["md", "lg"]} fontWeight="300" mb={2}>
              Child Care
            </Heading>
            <Text fontSize={["sm", "md"]}>
              From vaccinations to growth monitoring, our specialists ensure
              your child gets the best care during every stage of their
              development.
            </Text>
          </VStack>

          {/* Pregnancy Care Section */}
          <VStack
            bg="red.500"
            color="white"
            p={[4, 6]} // Responsive padding
            borderRadius="md"
            boxShadow="lg"
            width={{ base: "90%", md: "400px" }} // Full width on mobile, 30% on larger screens
            mb={[6, 0]} // Margin bottom on smaller screens
            transition="transform 0.3s ease, background-color 0.3s ease"
            _hover={{ bg: "red.600", transform: "scale(1.05)" }}
            spacing={4}
            ml={[0, 2]} // Margin left only on larger screens
          >
            <Icon as={FaPregnantWoman} boxSize={[8, 10]} mb={4} />{" "}
            {/* Responsive icon size */}
            <Heading size={["md", "lg"]} fontWeight="300" mb={2}>
              Pregnancy Care
            </Heading>
            <Text fontSize={["sm", "md"]}>
              Our pregnancy care services provide expectant mothers with the
              support and medical guidance needed for a healthy and safe
              pregnancy journey.
            </Text>
          </VStack>
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
      <Modal isOpen={isOpen} onClose={onClose}>
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
};

export default WC;
