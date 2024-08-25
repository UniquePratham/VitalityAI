import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Stack,
  Icon,
  HStack,
  Avatar,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaQuoteLeft } from "react-icons/fa";

const Feedbacks = () => {
  const feedbacks = [
    {
      name: "John Doe",
      feedback: "Amazing service! Helped me find the right doctor quickly.",
    },
    {
      name: "Jane Smith",
      feedback: "The healthcare facilities recommended were top-notch.",
    },
    {
      name: "Mary Johnson",
      feedback:
        "Very satisfied with the quick response and accurate information.",
    },
    {
      name: "Robert Brown",
      feedback: "The chatbot was incredibly helpful with my medical questions.",
    },
    {
      name: "Emily Davis",
      feedback: "Fast and reliable, great support for women's health needs.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [feedbacks.length]);

  const getFeedbackPosition = (index) => {
    const diff = (index - currentIndex + feedbacks.length) % feedbacks.length;
    if (diff === 0) return "center";
    if (diff === 1 || diff === feedbacks.length - 1) return "side";
    return "hidden";
  };

  const feedbackSize = useBreakpointValue({
    base: "90%", // On smaller screens, take most of the screen width
    md: "45%",   // On medium screens, reduce the width
  });

  const feedbackSpacing = useBreakpointValue({
    base: 4,     // Closer spacing on smaller screens
    md: 8,       // Wider spacing on medium and larger screens
  });

  return (
    <Box bg="gray.100" color="gray.700" px={4} py={10} textAlign="center">
      <Heading fontSize={["2xl", "4xl", "5xl"]} fontWeight="300" mb={10}>
        Client Feedbacks
      </Heading>

      {/* Feedbacks Container */}
      <HStack
        spacing={feedbackSpacing}
        justify="center"
        position="relative"
        flexWrap="wrap" // Allow wrapping on smaller screens
      >
        {feedbacks.map((feedback, index) => {
          const position = getFeedbackPosition(index);
          const isCenter = position === "center";

          return (
            <Stack
              key={index}
              p={8}
              bg="white"
              boxShadow="lg"
              borderRadius="md"
              spacing={4}
              position="relative"
              transform={
                isCenter
                  ? "scale(1.1)"
                  : position === "side"
                  ? "scale(0.9)"
                  : "scale(0)"
              }
              opacity={position === "hidden" ? 0 : 1}
              transition="transform 0.5s ease, opacity 0.5s ease"
              zIndex={isCenter ? 2 : 1}
              width={feedbackSize}
              display={position === "hidden" ? "none" : "block"}
            >
              <HStack justify="center">
                <Avatar name={feedback.name} />
                <Text fontWeight="bold" fontSize={["sm", "md"]}>
                  {feedback.name}
                </Text>
              </HStack>
              <HStack>
                <Icon as={FaQuoteLeft} color="gray.500" boxSize={[5, 6]} />
                <Text fontSize={["sm", "md", "lg"]}>
                  {feedback.feedback}
                </Text>
              </HStack>
            </Stack>
          );
        })}
      </HStack>
    </Box>
  );
};

export default Feedbacks;
