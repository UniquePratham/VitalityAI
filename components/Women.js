/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  StackDivider,
  Flex,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { FaHeartbeat, FaClinicMedical, FaUserNurse } from "react-icons/fa";

// he
const Women = () => {
  return (
    <Box
      bg="blue.100"
      py={{ base: "30px", md: "50px" }} // Adjust padding for smaller screens
      px={{ base: "5", md: "10" }} // Adjust padding for smaller screens
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading
        fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }} // Responsive heading sizes
        fontWeight="300"
        mb={8}
        color="blue.700"
        textAlign="center" // Center text for all screen sizes
      >
        Women's Health Facilities
      </Heading>

      <Flex
        direction={{ base: "column", md: "row" }} // Column layout for mobile, row layout for larger screens
        spacing={{ base: 4, md: 8 }} // Responsive spacing
        w="100%"
        justify="space-between"
        alignItems={{ base: "center", md: "flex-start" }} // Align differently based on screen size
      >
        {/* Left Section: Image and Additional Text */}
        <VStack
          w={{ base: "100%", md: "40%" }} // Full width on mobile, 40% width on larger screens
          spacing={5}
          mb={{ base: 8, md: 0 }} // Add margin on mobile to space out sections
          align="center"
        >
          <Image
            src="/women_care.png"
            alt="Women's health consultation"
            borderRadius="md"
            boxShadow="md"
            w={{ base: "80%", md: "100%" }} // Responsive image width
          />
          <Text fontSize={{ base: "md", lg: "lg" }} color="gray.500" textAlign="center">
            Empowering women with comprehensive health care services.
          </Text>
        </VStack>

        {/* Right Section: Descriptions and Process */}
        <VStack
          w={{ base: "100%", md: "50%" }} // Full width on mobile, 50% width on larger screens
          align="start"
          spacing={5}
        >
          <Text fontSize={{ base: "lg", md: "xl" }} color="gray.700" textAlign="left">
            We provide a full range of women's health services to meet the unique needs
            of every woman. From routine gynecological care to specialized treatments,
            we are here to support your health journey.
          </Text>
          <Text fontSize={{ base: "md", lg: "lg" }} color="gray.600">
            Our network of women's health specialists is dedicated to offering
            personalized care. Whether you're looking for reproductive health guidance,
            pregnancy support, or menopause management, our experts are here for you.
          </Text>

          {/* Women's Health Check-up Steps */}
          <VStack
            spacing={4}
            align="start"
            divider={<StackDivider borderColor="gray.300" />}
            mt={6}
          >
            <HStack spacing={4}>
              <Icon as={FaHeartbeat} w={6} h={6} color="blue.700" />
              <Text fontSize={{ base: "md", lg: "lg" }} color="gray.700">
                Step 1: Schedule Your Wellness Check
              </Text>
            </HStack>
            <Text color="gray.600" ml={10} fontSize={{ base: "sm", md: "md" }}>
              Book an appointment with one of our women's health specialists to begin
              your personalized care plan.
            </Text>

            <HStack spacing={4}>
              <Icon as={FaClinicMedical} w={6} h={6} color="blue.700" />
              <Text fontSize={{ base: "md", lg: "lg" }} color="gray.700">
                Step 2: Meet Your Specialist
              </Text>
            </HStack>
            <Text color="gray.600" ml={10} fontSize={{ base: "sm", md: "md" }}>
              Consult with our experts to discuss your health needs and get
              recommendations for the best care options.
            </Text>

            <HStack spacing={4}>
              <Icon as={FaUserNurse} w={6} h={6} color="blue.700" />
              <Text fontSize={{ base: "md", lg: "lg" }} color="gray.700">
                Step 3: Receive Continued Support
              </Text>
            </HStack>
            <Text color="gray.600" ml={10} fontSize={{ base: "sm", md: "md" }}>
              Stay connected with our team for ongoing care, guidance, and wellness
              support as you navigate your health journey.
            </Text>
          </VStack>

          {/* Updated Button */}
          <Link href="/consult-specialists" _hover={{ textDecoration: "none" }}>
            <Button colorScheme="blue" size={{ base: "md", md: "lg" }} mt={8}>
              Consult Specialists Nearby
            </Button>
          </Link>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Women;
