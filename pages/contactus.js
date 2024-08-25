// pages/contact.js
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaPhoneAlt, FaFileAlt, FaComments } from "react-icons/fa";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});
import { useRouter } from "next/router";

const MotionBox = motion(Box);

export default function Contact() {
  const iconColor = useColorModeValue("teal.400", "teal.300"); // Updated to match the reference theme
  const buttonBg = useColorModeValue("teal.500", "teal.400");
  const buttonHoverBg = useColorModeValue("teal.600", "teal.500");
  const router = useRouter();
  const cardBg = useColorModeValue(
    "rgba(255, 255, 255, 0.3)",
    "rgba(0, 0, 0, 0.3)"
  );
  const cardBorder = useColorModeValue(
    "rgba(255, 255, 255, 0.3)",
    "rgba(0, 0, 0, 0.3)"
  );
  const handleButtonClick = () => {
    router.push("https://64d2-43-251-179-145.ngrok-free.app"); // Redirect to the map page
  };

  return (
    <>
      <Navbar />
      <Container
        bgImage={[
          "https://image.slidesdocs.com/responsive-images/docs/geometric-promotion-of-mobile-phone-technology-page-border-background-word-template_c2dd63fced__1131_1600.jpg",
          null,
          "bgContact.jpg",
        ]}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        width="100%"
        maxW="100%"
        p={8}
      >
        <Stack
          spacing={8}
          maxW={{ base: "100%", md: "70%" }}
          margin={{ base: "0 auto", md: "0 auto" }}
          bg="rgba(255,255,255,0.1)"
          padding="15px"
          borderRadius="10px"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
          backdropFilter="blur(10px)"
          border="1px solid rgba(255, 255, 255, 0.3)"
        >
          <Heading
            as="h1"
            mb={8}
            textAlign="center"
            fontFamily="Poppins"
            fontSize={{ base: "3xl", md: "5xl" }}
            color="cyan.800"
            _hover={{ color: "cyan.500", transition: "color 0.3s" }}
          >
            Contact Us
          </Heading>
          <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
            <MotionBox
              textAlign="center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              bg={cardBg}
              border={`2px solid ${cardBorder}`}
              display={{ base: "block", md: "flex" }}
              alignItems="center"
              flexDirection="column"
              width={{ base: "100%", md: "30%" }}
              padding="20px"
              borderRadius="15px"
              height="auto"
              justifyContent="center"
              boxShadow="md"
            >
              <Box
                mb={4}
                color="cyan.500"
                display="flex"
                justifyContent="center"
              >
                <FaPhoneAlt size="50" />
              </Box>
              <Text fontSize="lg" mb={4}>
                Get telephone support by signing into your account.
              </Text>
              <Button bg="cyan.500" _hover={{ bg: "cyan.600" }} color="white">
                Log In
              </Button>
            </MotionBox>

            <MotionBox
              textAlign="center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              bg={cardBg}
              border={`2px solid ${cardBorder}`}
              display={{ base: "block", md: "flex" }}
              alignItems="center"
              flexDirection="column"
              width={{ base: "100%", md: "30%" }}
              padding="20px"
              borderRadius="15px"
              height="auto"
              justifyContent="center"
              boxShadow="md"
            >
              <Box
                mb={4}
                color="red.400"
                display="flex"
                justifyContent="center"
              >
                <FaFileAlt size="50" />
              </Box>
              <Text fontSize="lg" mb={4}>
                Submit your questions and start a case for help.
              </Text>
              <Button bg="red.400" _hover={{ bg: "red.500" }} color="white">
                Start Here
              </Button>
            </MotionBox>

            <MotionBox
              textAlign="center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              bg={cardBg}
              border={`2px solid ${cardBorder}`}
              display={{ base: "block", md: "flex" }}
              alignItems="center"
              flexDirection="column"
              width={{ base: "100%", md: "30%" }}
              padding="20px"
              borderRadius="15px"
              height="auto"
              justifyContent="center"
              boxShadow="md"
            >
              <Box
                mb={4}
                color="orange.400"
                display="flex"
                justifyContent="center"
              >
                <FaComments size="50" />
              </Box>
              <Text fontSize="lg" mb={4}>
                Chat with a member of our in-house team.
              </Text>
              <Button
                bg="orange.400"
                _hover={{ bg: "orange.500" }}
                color="white"
              >
                Start Chat
              </Button>
            </MotionBox>
          </Flex>

          <Box textAlign="center" mt={16}>
            <Heading as="h2" mb={4} fontFamily="Poppins" color="cyan.800">
              Track a Case
            </Heading>
            <Box as="form">
              <Flex justify="center" mb={4} flexWrap="wrap" gap={4}>
                <Input
                  placeholder="Case Number"
                  mr={2}
                  width={{ base: "100%", md: "45%" }}
                />
                <Input
                  placeholder="Email Address"
                  width={{ base: "100%", md: "45%" }}
                />
              </Flex>
              <Button
                bg={buttonBg}
                _hover={{ bg: buttonHoverBg }}
                color="white"
              >
                Go
              </Button>
            </Box>
          </Box>
          <Box textAlign="center" mt={16}>
            <Heading as="h2" mb={4} fontFamily="Poppins" color="cyan.800">
              Need Instant Help?
            </Heading>
            <Flex justify="center" gap={4} flexWrap="wrap">
              <Button
                bg={buttonBg}
                _hover={{ bg: buttonHoverBg }}
                color="white"
              >
                Video Tutorials
              </Button>
              <Button
                bg={buttonBg}
                _hover={{ bg: buttonHoverBg }}
                color="white"
              >
                Knowledge Base
              </Button>
              <Button
                bg={buttonBg}
                _hover={{ bg: buttonHoverBg }}
                color="white"
              >
                Resources
              </Button>
            </Flex>
            <Box width="100%" mt={8}>
              <Button
                as="a"
                width="100%"
                bg={buttonBg}
                _hover={{ bg: buttonHoverBg }}
                color="white"
                fontSize="xl"
                padding="1.5rem"
                textAlign="center"
                borderRadius="md"
                onClick={handleButtonClick}
              >
                GO TO HEALTH PORTAL
              </Button>
            </Box>
          </Box>
        </Stack>
      </Container>
      <Footer />
    </>
  );
}
