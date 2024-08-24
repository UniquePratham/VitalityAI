// components/DeviceIntro.js
import {
    Box,
    Heading,
    Text,
    Image,
    Stack,
    useBreakpointValue,
    keyframes,
  } from "@chakra-ui/react";
  
  const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  `;
  
  const slideIn = keyframes`
    from { opacity: 0; transform: translateX(-100px); }
    to { opacity: 1; transform: translateX(0); }
  `;
  
  const zoomIn = keyframes`
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  `;
  
  const DeviceIntro = () => (
    <Box
      p={12}
      bgGradient="linear(to-b, gray.900, black)"
      borderRadius="xl"
      boxShadow="dark-lg"
      backdropFilter="blur(15px)"
      mb={16}
      width="100%"
      mx="auto"
      textAlign="center"
      animation={`${fadeIn} 1s ease-out`}
    >
      <Stack spacing={10} width="100%" animation={`${slideIn} 1.2s ease-in-out`}>
        <Heading
          size="2xl"
          color="teal.300"
          animation={`${zoomIn} 1.5s ease-in-out`}
        >
          Introducing CardioQ: Your Heart&apos;s Guardian
        </Heading>
        <Text
          fontSize="xl"
          color="gray.300"
          animation={`${fadeIn} 1.5s ease-out`}
        >
          CardioQ is an advanced IoT device engineered to keep a vigilant eye on
          your heart while you sleep. Equipped with precise sensors, it tracks
          your heartbeat for fluctuations and anomalies, delivering real-time data
          and updates to your connected device. Whether you&apos;re resting at home or
          on the move, CardioQ is always there to monitor and ensure your cardiac
          well-being.
        </Text>
        <Image
          src="CardioQ.png"
          alt="CardioQ Device"
          boxSize={useBreakpointValue({ base: "100%", md: "80%" })}
          objectFit="contain"
          borderRadius="xl"
          mx="auto"
          shadow="2xl"
          height="auto"
          width="250px"
          animation={`${zoomIn} 2s ease`}
        />
        <Text
          fontSize="lg"
          color="gray.400"
          animation={`${fadeIn} 1.8s ease-out`}
        >
          With its modern design, CardioQ sits comfortably on your wrist or chest,
          ensuring both accuracy and ease of use. The sleek profile allows you to
          wear it all night without discomfort, while the real-time syncing
          capabilities give you peace of mind, knowing that every heartbeat is
          monitored and recorded. Your heart health is in good hands.
        </Text>
        <Text
          fontSize="lg"
          color="gray.400"
          animation={`${fadeIn} 1.8s ease-out`}
        >
          In the morning, review a detailed report of your heart&apos;s activity during
          sleep, including fluctuations, rhythm trends, and warnings for
          irregularities. This data empowers you to make informed decisions about
          your health, alerting you to any significant changes long before they
          become a concern. Stay connected to your heart with CardioQ.
        </Text>
      </Stack>
    </Box>
  );
  
  export default DeviceIntro;
  