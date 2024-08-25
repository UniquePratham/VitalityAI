import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Select,
  Text,
  Heading,
  VStack,
  Spinner,
  Image,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import { motion } from "framer-motion";

const appId = process.env.NEXT_PUBLIC_WOLFRAM_APP_ID;

export default function AIDiagnosis() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDiagnosis = async () => {
    setLoading(true);
    setDiagnosis(null);

    try {
      const response = await axios.get("/api/proxyDiagnosis", {
        params: {
          age: age,
          gender: gender,
          symptoms: symptoms,
        },
      });

      // Directly set the response text as received
      setDiagnosis(response.data);
    } catch (error) {
      setDiagnosis("An error occurred while fetching the diagnosis.");
      console.error("Diagnosis error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Utility function to format the diagnosis string into structured layout
  const formatDiagnosis = (diagnosis) => {
    const formattedDiagnosis = [];

    // Splitting by double newlines to separate different sections
    const sections = diagnosis.split(/\n{2,}/);

    sections.forEach((section) => {
      // Splitting by single newlines to get key-value pairs or text blocks
      const lines = section.split("\n").filter((line) => line.trim() !== "");

      if (lines.length === 1) {
        // Single line is either a title or non-parsed text
        formattedDiagnosis.push(<Text fontWeight="bold" mt={4}>{lines[0]}</Text>);
      } else if (lines.length > 1) {
        // Handle key-value like structures or multiple lines in a block
        const key = lines[0].replace(":", "").trim(); // First line is treated as a key

        if (key === "Characteristics of patients" && lines[1].startsWith("image:")) {
          // Handle the image separately
          const imageUrl = lines[1].replace("image:", "").trim();
          formattedDiagnosis.push(
            <Box key={key} mt={4}>
              <Text fontWeight="bold">{key}</Text>
              <Image src={imageUrl} alt="Diagnosis Image" mt={2} width="100%" />
            </Box>
          );
        } else if (key.startsWith("Wolfram|Alpha website result")) {
          // Handle the link separately
          const linkUrl = lines[1].trim();
          formattedDiagnosis.push(
            <Box key={key} mt={4}>
              <Text fontWeight="bold">{key}</Text>
              <Link href={linkUrl} color="teal.500" isExternal mt={2}>
                View Detailed Report
              </Link>
            </Box>
          );
        } else {
          // Handle the key-value pairs or text blocks
          formattedDiagnosis.push(
            <Box key={key} mt={4}>
              <Text fontWeight="bold">{key}</Text>
              {lines.slice(1).map((value, index) => (
                <Text key={index} whiteSpace="pre-wrap">
                  {value}
                </Text>
              ))}
            </Box>
          );
        }
      }
    });

    return formattedDiagnosis;
  };

  return (
    <VStack
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition="0.5s ease-in-out"
      minH="100vh"
      bgGradient="linear(to-b, blue.900, teal.600)"
      align="center"
      justify="center"
      p={6}
      spacing={[8, 12, 16]} // Responsive spacing between elements
    >
      <Heading
        color="white"
        mb={8}
        fontSize={["2xl", "3xl", "4xl"]} // Responsive font sizes
        textAlign="center" // Center text for small screens
      >
        AI Diagnosis
      </Heading>

      <Box
        bg="white"
        p={[4, 6, 8]} // Responsive padding
        borderRadius="md"
        boxShadow="xl"
        w="full"
        maxW={["sm", "md", "lg"]} // Responsive width
        as={motion.div}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Text mb={4}>Enter your details and symptoms:</Text>

        <Input
          placeholder="Age"
          mb={4}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          size={["sm", "md", "lg"]} // Responsive input size
        />

        <Select
          placeholder="Select Gender"
          mb={4}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          size={["sm", "md", "lg"]} // Responsive select size
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Select>

        <Input
          placeholder="Enter your symptoms"
          mb={4}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          size={["sm", "md", "lg"]} // Responsive input size
        />

        <Button
          colorScheme="teal"
          size="lg"
          w="full"
          onClick={handleDiagnosis}
          py={[4, 6]} // Responsive button padding
        >
          Get Diagnosis
        </Button>
      </Box>

      {loading ? (
        <Spinner size="xl" color="white" mt={8} />
      ) : (
        diagnosis && (
          <Box
            mt={8}
            p={[4, 6, 8]} // Responsive padding
            bg="white"
            borderRadius="md"
            shadow="xl"
            textAlign="center"
            w="full"
            maxW={["sm", "md", "lg"]} // Responsive width
          >
            {formatDiagnosis(diagnosis)}
          </Box>
        )
      )}
    </VStack>
  );
}
