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
import { FaStethoscope, FaUserMd, FaHospital } from "react-icons/fa";

const Children = () => {
  return (
    <Box
      bg="yellow.100"
      py={{ base: "40px", md: "80px" }} // Responsive padding
      px={{ base: 5, md: 10 }} // Responsive padding
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading
        fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }} // Responsive font size
        fontWeight="300"
        mb={8}
        color="yellow.700"
        textAlign="center" // Center the heading text for all screens
      >
        Child Care Facilities
      </Heading>

      <Flex
        direction={{ base: "column", md: "row" }} // Column on mobile, row on larger screens
        spacing={{ base: 4, md: 8 }} // Responsive spacing
        w="100%"
        justify="space-between"
        alignItems={{ base: "center", md: "flex-start" }} // Align items differently on mobile vs larger screens
      >
        {/* Left Section: Descriptions and Process */}
        <VStack
          w={{ base: "100%", md: "50%" }} // Full width on mobile, 50% on larger screens
          align="start"
          spacing={5}
        >
          <Text fontSize={{ base: "lg", md: "xl" }} color="gray.700" textAlign="left">
            Providing top-quality pediatric care for your little ones. We offer a wide range of services, from routine check-ups to specialized treatments, ensuring that your child gets the best medical attention.
          </Text>
          <Text fontSize={{ base: "md", lg: "lg" }} color="gray.600">
            Our dedicated team of pediatricians and specialists are here to guide you through every step of your child's health journey. Whether it's vaccinations, growth monitoring, or treating acute conditions, our experts are ready to assist.
          </Text>

          {/* Medical Check-up Steps */}
          <VStack
            spacing={4}
            align="start"
            divider={<StackDivider borderColor="gray.300" />}
            mt={6}
          >
            <HStack spacing={4}>
              <Icon as={FaStethoscope} w={6} h={6} color="yellow.700" />
              <Text fontSize={{ base: "md", lg: "lg" }} color="gray.700">
                Step 1: Schedule a Consultation
              </Text>
            </HStack>
            <Text color="gray.600" ml={10} fontSize={{ base: "sm", md: "md" }}>
              Choose a convenient time to meet with our pediatric experts for an initial consultation.
            </Text>

            <HStack spacing={4}>
              <Icon as={FaUserMd} w={6} h={6} color="yellow.700" />
              <Text fontSize={{ base: "md", lg: "lg" }} color="gray.700">
                Step 2: Meet with Pediatricians
              </Text>
            </HStack>
            <Text color="gray.600" ml={10} fontSize={{ base: "sm", md: "md" }}>
              Discuss your child's health concerns and let our team guide you through the next steps of care.
            </Text>

            <HStack spacing={4}>
              <Icon as={FaHospital} w={6} h={6} color="yellow.700" />
              <Text fontSize={{ base: "md", lg: "lg" }} color="gray.700">
                Step 3: Receive Care at Our Facilities
              </Text>
            </HStack>
            <Text color="gray.600" ml={10} fontSize={{ base: "sm", md: "md" }}>
              Visit our state-of-the-art facilities where your child will receive the best possible care.
            </Text>
          </VStack>

          {/* Updated Button */}
          <Link href="/consult-doctors" _hover={{ textDecoration: "none" }}>
            <Button colorScheme="yellow" size={{ base: "md", md: "lg" }} mt={8}>
              Consult Doctors Nearby
            </Button>
          </Link>
        </VStack>

        {/* Right Section: Image and Additional Text */}
        <VStack
          w={{ base: "100%", md: "40%" }} // Full width on mobile, 40% on larger screens
          spacing={5}
          mt={{ base: 8, md: 0 }} // Margin-top for spacing on mobile
          align="center"
        >
          <Image
            src="/child_care.webp"
            alt="Child doctor consultation"
            borderRadius="md"
            boxShadow="md"
            w={{ base: "80%", md: "100%" }} // Responsive image size
          />
          <Text fontSize={{ base: "md", lg: "lg" }} color="gray.500" textAlign="center">
            Pediatricians providing compassionate and comprehensive care.
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Children;
