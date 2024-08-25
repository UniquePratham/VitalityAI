import {
    Box,
    Flex,
    Link,
    Button,
    HStack,
    IconButton,
    Image,
    useDisclosure,
    VStack,
    Collapse,
    ScaleFade,
  } from "@chakra-ui/react";
  import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
  import NextLink from "next/link";
  import { useRouter } from "next/router";
  
  export default function Navbar() {
    const { isOpen, onToggle } = useDisclosure();
    const router = useRouter();
  
    const handleDonateClick = () => {
      router.push("/donate");
    };
  
    return (
      <Box bg="gray.700" px={4} py={5} color="white" w="full">
        <Flex alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <NextLink href="/" passHref>
            <Link>
              <Image src="/logo.png" alt="VitalityAi Logo" width="180px" />
            </Link>
          </NextLink>
  
          {/* Mobile Menu Toggle Button */}
          <IconButton
            icon={isOpen ? <FaTimes /> : <FaBars />}
            aria-label="Toggle Navigation"
            display={{ base: "block", md: "none" }}
            onClick={onToggle}
            variant="ghost"
            color="white"
            transition="background-color 0.3s"
            _hover={{ bg: "whiteAlpha.200" }}
          />
  
          {/* Links for larger screens */}
          <HStack as="nav" spacing={8} display={{ base: "none", md: "flex" }}>
            <NextLink href="/womenchildren" passHref>
              <Link _hover={{ color: "green.300", transition: "color 0.3s" }}>
                Women & Children
              </Link>
            </NextLink>
            <NextLink href="/chatbot" passHref>
              <Link _hover={{ color: "green.300", transition: "color 0.3s" }}>
                AI Diagnosis
              </Link>
            </NextLink>
            <NextLink href="/cardiometer" passHref>
              <Link _hover={{ color: "green.300", transition: "color 0.3s" }}>
                Cardiometer
              </Link>
            </NextLink>
            <NextLink href="https://bonefish-solid-ferret.ngrok-free.app" passHref>
              <Link _hover={{ color: "green.300", transition: "color 0.3s" }}>
                Disease Prediction
              </Link>
            </NextLink>
            <NextLink
              href="https://buck-upward-absolutely.ngrok-free.app/"
              passHref
            >
              <Link
                bg="gold"
                color="black"
                px={4}
                py={2}
                borderRadius="md"
                _hover={{
                  bg: "black",
                  color: "gold",
                  boxShadow: "2px 2px 5px rgba(0,0,0,0.7)",
                }}
                transition="all 0.3s"
              >
                AI ChatBot
              </Link>
            </NextLink>
            <NextLink href="/contactus" passHref>
              <Link
                bg="cyan.500"
                color="white"
                px={4}
                py={2}
                borderRadius="md"
                _hover={{
                  bg: "white",
                  color: "cyan.500",
                  boxShadow: "2px 2px 5px rgba(255,255,255,0.7)",
                }}
                transition="all 0.3s"
              >
                Contact Us
              </Link>
            </NextLink>
          </HStack>
  
          {/* Right-side Icons for larger screens */}
          <HStack spacing={4} display={{ base: "none", md: "flex" }}>
            <Button
              size="sm"
              variant="outline"
              colorScheme="whiteAlpha"
              color="white"
              _hover={{ bg: "whiteAlpha.300" }}
              transition="background-color 0.3s"
              onClick={handleDonateClick} // Link to Donate page
            >
              Donate
            </Button>
          </HStack>
        </Flex>
  
        {/* Mobile Menu Links */}
        <Collapse in={isOpen} animateOpacity>
          <ScaleFade initialScale={0.9} in={isOpen}>
            <VStack
              as="nav"
              spacing={4}
              mt={4}
              display={{ base: "flex", md: "none" }}
              flexDirection="column"
            >
              <NextLink href="/womenchildren" passHref>
                <Link _hover={{ color: "green.300", transition: "color 0.3s" }}>
                  Women & Children
                </Link>
              </NextLink>
              <NextLink href="/chatbot" passHref>
                <Link _hover={{ color: "green.300", transition: "color 0.3s" }}>
                  AI Diagnosis
                </Link>
              </NextLink>
              <NextLink href="/cardiometer" passHref>
                <Link _hover={{ color: "green.300", transition: "color 0.3s" }}>
                  Cardiometer
                </Link>
              </NextLink>
              <NextLink
                href="https://buck-upward-absolutely.ngrok-free.app/"
                passHref
              >
                <Link
                  bg="gold"
                  color="black"
                  px={4}
                  py={2}
                  borderRadius="md"
                  _hover={{
                    bg: "black",
                    color: "gold",
                    boxShadow: "2px 2px 5px rgba(0,0,0,0.7)",
                  }}
                  transition="all 0.3s"
                >
                  AI ChatBot
                </Link>
              </NextLink>
              <NextLink href="/contactus" passHref>
                <Link
                  bg="cyan.500"
                  color="white"
                  px={4}
                  py={2}
                  borderRadius="md"
                  _hover={{
                    bg: "white",
                    color: "cyan.500",
                    boxShadow: "2px 2px 5px rgba(255,255,255,0.7)",
                  }}
                  transition="all 0.3s"
                >
                  Contact Us
                </Link>
              </NextLink>
              <Button
                size="sm"
                variant="outline"
                colorScheme="whiteAlpha"
                _hover={{ bg: "whiteAlpha.300" }}
                transition="background-color 0.3s"
                onClick={handleDonateClick} // Link to Donate page
              >
                Donate
              </Button>
            </VStack>
          </ScaleFade>
        </Collapse>
      </Box>
    );
  }
  