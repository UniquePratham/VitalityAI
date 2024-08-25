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

  // Function to format the raw diagnosis string into a structured layout
  const formatDiagnosis = (diagnosis) => {
    // Split the string by newlines to extract the key-value pairs
    const lines = diagnosis.split("\n").filter(line => line.trim() !== "");

    const formattedData = {};
    let currentKey = "";

    lines.forEach((line) => {
      if (line.includes(":")) {
        const [key, value] = line.split(":");
        formattedData[key.trim()] = value.trim();
        currentKey = key.trim();
      } else if (currentKey) {
        // Handle multi-line values (like probabilities)
        formattedData[currentKey] += "\n" + line.trim();
      }
    });

    return formattedData;
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
    >
      <Heading color="white" mb={8}>
        AI Diagnosis
      </Heading>

      <Box
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="xl"
        w="full"
        maxW="lg"
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
        />

        <Select
          placeholder="Select Gender"
          mb={4}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
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
        />

        <Button colorScheme="teal" size="lg" w="full" onClick={handleDiagnosis}>
          Get Diagnosis
        </Button>
      </Box>

      {loading ? (
        <Spinner size="xl" color="white" mt={8} />
      ) : (
        diagnosis && (
          <Box
            mt={8}
            p={6}
            bg="white"
            borderRadius="md"
            shadow="xl"
            textAlign="center"
            w="full"
            maxW="lg"
          >
            {Object.keys(formatDiagnosis(diagnosis)).map((key, index) => (
              <Box key={index} mb={4}>
                {/* <Text fontWeight="bold">{key}</Text> */}
                {key === "Characteristics of patients" ? (
                  <Image src={formatDiagnosis(diagnosis)[key]} alt="Diagnosis Image" />
                ) : key === "Wolfram|Alpha website result for \"Fever a 21 year old male\"" ? (
                  <Link href={formatDiagnosis(diagnosis)[key]} color="teal.500" isExternal>
                    View Detailed Report
                  </Link>
                ) : (
                  <Text whiteSpace="pre-wrap">{formatDiagnosis(diagnosis)[key]}</Text>
                )}
              </Box>
            ))}
          </Box>
        )
      )}
    </VStack>
  );
}
