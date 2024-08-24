// components/ChatBot.js
import { useState } from "react";
import {
  Box,
  Input,
  Button,
  Text,
  Flex,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { FaPaperPlane, FaRobot } from "react-icons/fa";

const MotionBox = motion(Box);

const ChatBot = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleQuerySubmit = async () => {
    if (!query) return;

    // Replace spaces with '+' in the query
    const formattedQuery = query.split(" ").join("+");

    // Construct the URL
    const requestUrl = `https://cors-anywhere.herokuapp.com/https://api.wolframalpha.com/v2/query?input=${formattedQuery}&format=plaintext&output=JSON&appid=LYYUH3-6K982RERP2`;

    console.log(requestUrl);

    // Add user message
    setMessages([...messages, { text: query, type: "user" }]);
    setQuery("");

    try {
      const res = await fetch(requestUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();

      const resultPod = data.queryresult.pods.find(
        (pod) => pod.title === "Result"
      );
      const botResponse = resultPod
        ? resultPod.subpods[0].plaintext
        : "No answer found.";

      // Add bot message
      setMessages([...messages, { text: botResponse, type: "bot" }]);
    } catch (error) {
      console.error("Error fetching data from Wolfram API:", error);
      setMessages([
        ...messages,
        { text: "Sorry, I encountered an error.", type: "bot" },
      ]);
    }
  };

  return (
    <>
      {/* Chat Icon */}
      <MotionBox
        position="fixed"
        bottom="10px"
        left="10px"
        borderRadius="full"
        backgroundColor="red.500"
        boxShadow="md"
        padding="10px"
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        zIndex={1000}
      >
        <IconButton
          justify="center"
          display="flex"
          icon={<FaRobot />}
          aria-label="Chat with AI"
          variant="unstyled"
          color="white"
          fontSize="24px"
        />
      </MotionBox>

      {/* Chat Interface */}
      {isOpen && (
        <MotionBox
          position="fixed"
          bottom="0"
          left="0"
          width="360px"
          height="480px"
          borderRadius="8px"
          backgroundColor="white"
          boxShadow="lg"
          zIndex="1000"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Flex direction="column" height="100%">
            <Box
              backgroundColor="red.500"
              color="white"
              padding="4"
              borderTopRadius="8px"
              position="relative"
              textAlign="center"
            >
              <Text fontWeight="bold" fontSize="lg">
                Talk with Wolfram AI
              </Text>
              <IconButton
                position="absolute"
                top="4px"
                right="4px"
                onClick={() => setIsOpen(false)}
                variant="link"
                color="white"
                fontSize="24px"
                aria-label="Close Chat"
                icon={<AiOutlineClose />}
              />
            </Box>

            <VStack
              spacing="3"
              align="stretch"
              padding="4"
              flex="1"
              overflowY="auto"
              backgroundColor="gray.100"
            >
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  padding="3"
                  borderRadius="md"
                  backgroundColor={
                    msg.type === "user" ? "blue.100" : "green.100"
                  }
                  alignSelf={msg.type === "user" ? "flex-end" : "flex-start"}
                  maxWidth="80%"
                >
                  <Text>{msg.text}</Text>
                </Box>
              ))}
            </VStack>

            <Flex
              as="form"
              padding="2"
              onSubmit={(e) => {
                e.preventDefault();
                handleQuerySubmit();
              }}
              alignItems="center"
              backgroundColor="white"
            >
              <Input
                placeholder="Type your question..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                marginRight="2"
                size="md"
                borderRadius="md"
                backgroundColor="gray.50"
                borderColor="gray.200"
              />
              <Button
                type="submit"
                colorScheme="blue"
                size="md"
                borderRadius="md"
              >
                <FaPaperPlane />
              </Button>
            </Flex>
          </Flex>
        </MotionBox>
      )}
    </>
  );
};

export default ChatBot;
