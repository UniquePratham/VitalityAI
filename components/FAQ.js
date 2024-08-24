// FAQ.js
import {
    Box,
    Heading,
    Flex,
    Text,
    IconButton,
    Collapse,
  } from "@chakra-ui/react";
  import { FaPlus, FaMinus } from "react-icons/fa";
  import { useState } from "react";
  
  const FAQ = () => {
    const questionsAndAnswers = [
      {
        question: "What is the Health Emergency Response System?",
        answer:
          "The Health Emergency Response System is a comprehensive solution designed to monitor heart activity and ensure timely medical assistance in case of abnormal patterns. It integrates IoT-based health monitoring with predictive analytics and secure emergency response mechanisms.",
      },
      {
        question: "How does the system monitor heart activity?",
        answer:
          "The system continuously tracks heartbeat data using an Arduino-based IoT cardiometer. This device monitors your heart activity in real-time and sends the data to our web server for analysis.",
      },
      {
        question: "What happens if an abnormal heartbeat is detected?",
        answer:
          "When an abnormal heartbeat is detected, the system automatically sends an alert to the nearest available ambulance to ensure prompt medical attention. This helps in providing timely intervention during critical situations.",
      },
      {
        question: "How can I monitor my heart activity using this system?",
        answer:
          "You can monitor your heart activity through our web interface, which displays real-time heartbeat data from the IoT cardiometer. This interface also provides insights into your heart health and alerts you to any abnormalities detected.",
      },
      {
        question: "What should I do if I receive an abnormal heartbeat alert?",
        answer:
          "If you receive an alert indicating an abnormal heartbeat, it's important to seek immediate medical attention. The system will have already notified emergency services, so follow any additional instructions provided by the system and wait for medical professionals to arrive.",
      },
      {
        question: "Can I use this system for regular health check-ups?",
        answer:
          "Yes, the system is designed for continuous monitoring and can be used to track your heart health over time. Regular use helps in identifying potential issues early and provides valuable data for your healthcare provider.",
      },
      {
        question: "Is the system effective for all ages?",
        answer:
          "The system is designed to monitor heart activity across various age groups. However, it’s always best to consult with a healthcare professional to ensure it meets your specific health needs and conditions.",
      },
      {
        question: "How is my health data protected?",
        answer:
          "Your health data is securely transmitted and stored using encryption technologies. We take privacy and data security seriously, ensuring that your information is protected and only accessible by authorized personnel.",
      },
      {
        question: "Can the system detect all types of heart conditions?",
        answer:
          "The system is designed to detect abnormal heart activity, which may include irregular heartbeat patterns. However, it may not detect all types of heart conditions. Regular consultations with your healthcare provider are recommended for comprehensive heart health monitoring.",
      },
      {
        question: "How can I get support if I have issues with the system?",
        answer:
          "If you encounter any issues with the system, you can contact our support team through our website or the contact information provided in the application. We offer assistance to help resolve any problems you may experience.",
      },
    ];
  
    const [isOpen, setIsOpen] = useState(
      Array(questionsAndAnswers.length).fill(false)
    );
  
    const handleToggle = (index) => {
      const newIsOpen = [...isOpen];
      newIsOpen[index] = !newIsOpen[index];
      setIsOpen(newIsOpen);
    };
  
    return (
      <Box
        bg="linear-gradient(to bottom, #fff8e1, #fffde7)"
        p={8}
      //   ml={{ base: "0px", md: "100px" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Heading mt={10} fontSize="4xl" fontWeight={200} mb={10}>
          FAQ&apos;s
        </Heading>
  
        {questionsAndAnswers.map((item, index) => (
          <Flex
            key={index}
            direction="column"
            mb={4}
            w="100%"
            border="1px solid black"
            borderRadius="md"
            overflow="hidden"
          >
            <Flex
              justify="space-between"
              align="center"
              cursor="pointer"
              onClick={() => handleToggle(index)}
              p={4}
            >
              <Text fontSize={{ base: "14px", md: "18px" }}>{item.question}</Text>
              <IconButton
                icon={isOpen[index] ? <FaMinus /> : <FaPlus />}
                fontSize={{ base: "18px", md: "22px" }}
                zIndex="900"
              />
            </Flex>
            <Collapse in={isOpen[index]} animateOpacity>
              <Text
                mt={2}
                fontSize="md"
                p={4}
                color="gray.600"
                transition="height 0.3s ease"
              >
                {item.answer}
              </Text>
            </Collapse>
          </Flex>
        ))}
      </Box>
    );
  };
  
  export default FAQ;
  