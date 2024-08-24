import React, { useState } from "react";
import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import {
  FaLinkedin,
  FaWhatsapp,
  FaInstagram,
  FaTelegram,
  FaFacebook,
} from "react-icons/fa";
import emailjs from "emailjs-com"; // Import EmailJS

const Footer = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (email) {
      emailjs
        .send(
          "service_vuu1jrw", // Service ID
          "template_xxxxxxx", // Template ID from EmailJS
          { user_email: email }, // Data being sent (email)
          "user_xxxxxxxxx" // Public key from EmailJS
        )
        .then(
          (response) => {
            toast({
              title: "Subscription Successful.",
              description:
                "You have successfully subscribed to our newsletter.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            setEmail(""); // Reset the email field after submission
          },
          (error) => {
            toast({
              title: "Subscription Failed.",
              description:
                "There was an issue with your subscription. Please try again.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        );
    } else {
      toast({
        title: "Invalid Email.",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box as="footer" py={8} bg="gray.700" color="white" px={4}>
      {/* Contact and Social Links */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "flex-start" }}
        flexWrap="wrap"
        maxW="1200px"
        mx="auto"
      >
        {/* Left part: Contact Information */}
        <Box
          flex="1"
          mb={{ base: 4, md: 0 }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Flex align="center" mb={4}>
            <Icon as={FiMapPin} mr={2} color="cyan" />
            <Text
              cursor="pointer"
              _hover={{ color: "green.300", transition: "color 0.3s" }}
            >
              Salt Lake, Kolkata- 700138
            </Text>
          </Flex>
          <Flex align="center" mb={4}>
            <Icon as={FiPhone} mr={2} color="red" />
            <Text
              cursor="pointer"
              _hover={{ color: "green.300", transition: "color 0.3s" }}
            >
              +91 9674177512
            </Text>
          </Flex>
          <Flex align="center" mb={4}>
            <Icon as={FiMail} mr={2} color="yellow" />
            <Text
              cursor="pointer"
              _hover={{ color: "green.300", transition: "color 0.3s" }}
            >
              shaswata.ssaha@gmail.com
            </Text>
          </Flex>
        </Box>

        {/* Right part: Social Links and Newsletter Subscription */}
        <Box flex="1" textAlign={{ base: "center", md: "right" }}>
          <Flex justify="center" mb={4}>
            {/* LinkedIn */}
            <Link
              href="https://www.linkedin.com/in/shaswata-saha-74b209251/"
              isExternal
              mx={2}
              _hover={{ color: "cyan.500", transition: "color 0.3s" }}
            >
              <Icon as={FaLinkedin} boxSize={6} />
            </Link>
            {/* WhatsApp */}
            <Link
              href="https://wa.me/919674177512"
              isExternal
              mx={2}
              _hover={{ color: "green.500", transition: "color 0.3s" }}
            >
              <Icon as={FaWhatsapp} boxSize={6} />
            </Link>
            {/* Instagram */}
            <Link
              href="https://www.instagram.com"
              isExternal
              mx={2}
              _hover={{ color: "pink.500", transition: "color 0.3s" }}
            >
              <Icon as={FaInstagram} boxSize={6} />
            </Link>
            {/* Telegram */}
            <Link
              href="https://t.me"
              isExternal
              mx={2}
              _hover={{ color: "blue.400", transition: "color 0.3s" }}
            >
              <Icon as={FaTelegram} boxSize={6} />
            </Link>
            {/* Facebook */}
            <Link
              href="https://www.facebook.com"
              isExternal
              mx={2}
              _hover={{ color: "blue.600", transition: "color 0.3s" }}
            >
              <Icon as={FaFacebook} boxSize={6} />
            </Link>
          </Flex>

          {/* Newsletter subscription section */}
          <form onSubmit={handleSubscribe}>
            <Flex justify="center" flexDir="column" alignItems="center">
              <Text mb={2} textAlign="center">
                Subscribe to our newsletter
              </Text>
              <Flex>
                <Input
                  placeholder="Enter your email"
                  bg="gray.600"
                  color="white"
                  size="lg"
                  mr={2}
                  _placeholder={{ color: "gray.400" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="submit"
                  bg="gold"
                  size="lg"
                  color="black"
                  _hover={{
                    bg: "black",
                    color: "gold",
                    boxShadow: "2px 2px 5px rgba(0,0,0,0.7)",
                  }}
                  transition="all 0.3s"
                >
                  Subscribe
                </Button>
              </Flex>
            </Flex>
          </form>
        </Box>
      </Flex>

      {/* Developer Attribution */}
      <Flex justify="center" mt={8} position="relative">
        <Box
          position="absolute"
          top="-12px"
          left="50%"
          transform="translateX(-50%)"
          bg="gray.700"
          px={4}
        >
          <Text fontSize="sm" color="gray.400">
            Developed by{" "}
            <Link
              href="https://acns.vercel.app"
              isExternal
              color="cyan.500"
              _hover={{ color: "white", transition: "color 0.3s" }}
            >
              ACNS
            </Link>
          </Text>
        </Box>
      </Flex>

      {/* Copyright */}
      <Flex justify="center" mt={4} textShadow="2px 2px 5px rgba(0,0,0,0.5)">
        <Text fontSize="lg">&copy; 2024 VitalityAI</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
