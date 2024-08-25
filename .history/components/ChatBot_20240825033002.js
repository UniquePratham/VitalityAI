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
} from "@chakra-ui/react";
import axios from "axios";
import { motion } from "framer-motion";

const appId = process.env.NEXT_PUBLIC_WOLFRAM_APP_ID; // Ensure this is set correctly in your .env.local file

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
      const query = `${symptoms} a ${age} year old ${gender}`;

      // Make the API request
      const response = await axios.get(
        `https://api.wolframalpha.com/v2/query`, 
        {
          params: {
            input: query,
            format: "plaintext", // Make sure we're getting the correct format
            appid: appId,
          },
        }
      );

      console.log("API Response:", response.data); // Log the response for debugging

      if (response.data && response.data.queryresult && response.data.queryresult.success) {
        const diagnosisText = response.data.queryresult.pods
          .map((pod) =>
            pod.subpods.map((subpod) => subpod.plaintext).join("\n")
          )
          .join("\n");

        setDiagnosis(diagnosisText);
      } else {
        setDiagnosis("Unable to fetch diagnosis. Please check your input and try again.");
      }
    } catch (error) {
      console.error("Error fetching diagnosis:", error); // Log any errors
      setDiagnosis("An error occurred while fetching the diagnosis. Please try again.");
    } finally {
      setLoading(false);
    }
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
            <Text fontSize="xl" whiteSpace="pre-wrap">{diagnosis}</Text>
          </Box>
        )
      )}
    </VStack>
  );
}
