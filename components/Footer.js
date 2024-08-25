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
  const [username, setUsername] = useState("");
  const toast = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (email) {
      emailjs
        .send(
          "vitality_ai", // Service ID
          "vitality_ai_template", // Template ID from EmailJS
          {
            user_email: email,
            user_name: username,
            message: "Thank you for subscribing!",
          }, // Data being sent (email)
          "7wARxgqnQG0HcsgzD" // Public key from EmailJS
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
    <Box as="footer" py={8} bg="gray.900" color="white" px={4}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "flex-start" }}
        flexWrap="wrap"
        maxW="1200px"
        mx="auto"
        mb={8}
      >
        {/* Left part: Contact Information */}
        <Box textAlign={{ base: "center", md: "left" }} mb={{ base: 6, md: 0 }}>
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Contact Us
          </Text>
          <Flex align="center" mb={4}>
            <Icon as={FiMapPin} mr={2} color="cyan.400" />
            <Text
              _hover={{ color: "green.300", transition: "color 0.3s" }}
              cursor="pointer"
            >
              Salt Lake, Kolkata- 700138
            </Text>
          </Flex>
          <Flex align="center" mb={4}>
            <Icon as={FiPhone} mr={2} color="red.400" />
            <Text
              _hover={{ color: "green.300", transition: "color 0.3s" }}
              cursor="pointer"
            >
              +91 9674177512
            </Text>
          </Flex>
          <Flex align="center" mb={4}>
            <Icon as={FiMail} mr={2} color="yellow.400" />
            <Text
              _hover={{ color: "green.300", transition: "color 0.3s" }}
              cursor="pointer"
            >
              shaswata.ssaha@gmail.com
            </Text>
          </Flex>
        </Box>

        {/* Newsletter subscription section */}
        <Box textAlign={{ base: "center", md: "left" }}>
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Stay Updated!
          </Text>
          <Text mb={4}>
            Subscribe to our newsletter for exclusive updates and news.
          </Text>
          <form onSubmit={handleSubscribe}>
            <Flex direction="column" alignItems="center">
              <Flex w={{ base: "100%", md: "auto" }} mb={4} direction="column" alignItems="center">
                <Input
                  placeholder="Enter your username"
                  bg="gray.700"
                  size="lg"
                  color="white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  _placeholder={{ color: "gray.400" }}
                  m={2}

                />
                <Input
                  placeholder="Enter your email"
                  bg="gray.700"
                  size="lg"
                  color="white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  _placeholder={{ color: "gray.400" }}
                  m={2}
                />
                <Button
                  type="submit"
                  size="lg"
                  bg="cyan.400"
                  color="black"
                  _hover={{
                    bg: "cyan.500",
                    color: "white",
                    boxShadow: "0px 0px 10px rgba(72, 187, 250, 0.7)",
                  }}
                  m={2}
                >
                  Subscribe
                </Button>
              </Flex>
            </Flex>
          </form>
        </Box>

        {/* Social Links */}
        <Box textAlign={{ base: "center", md: "left" }}>
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Follow Us
          </Text>
          <Flex justify="center" mb={4}>
            <Link
              href="https://www.linkedin.com/in/shaswata-saha-74b209251/"
              isExternal
              mx={2}
              _hover={{ color: "cyan.500", transition: "color 0.3s" }}
            >
              <Icon as={FaLinkedin} boxSize={6} />
            </Link>
            <Link
              href="https://wa.me/919674177512"
              isExternal
              mx={2}
              _hover={{ color: "green.500", transition: "color 0.3s" }}
            >
              <Icon as={FaWhatsapp} boxSize={6} />
            </Link>
            <Link
              href="https://www.instagram.com"
              isExternal
              mx={2}
              _hover={{ color: "pink.500", transition: "color 0.3s" }}
            >
              <Icon as={FaInstagram} boxSize={6} />
            </Link>
            <Link
              href="https://t.me"
              isExternal
              mx={2}
              _hover={{ color: "blue.400", transition: "color 0.3s" }}
            >
              <Icon as={FaTelegram} boxSize={6} />
            </Link>
            <Link
              href="https://www.facebook.com"
              isExternal
              mx={2}
              _hover={{ color: "blue.600", transition: "color 0.3s" }}
            >
              <Icon as={FaFacebook} boxSize={6} />
            </Link>
          </Flex>
        </Box>
      </Flex>

      {/* Developer Attribution */}
      <Flex justify="center" mt={4}>
        <Text fontSize="sm" color="gray.500" textAlign="center">
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
      </Flex>

      {/* Copyright */}
      <Flex justify="center" mt={4} textShadow="2px 2px 5px rgba(0,0,0,0.5)">
        <Text fontSize="lg">&copy; 2024 VitalityAI</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
