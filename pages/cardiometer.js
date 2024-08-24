// pages/cardiometer.js
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});
import DeviceIntro from "../components/DeviceIntro";
import UsageSteps from "../components/UsageSteps";
import Footer from "../components/Footer";

const CardiometerPage = () => (
  <Box>
    <Navbar />
    <Box p={4} bg="gray.50" minH="100vh" width="100%">
      <DeviceIntro />
      <UsageSteps />
    </Box>
    <Footer />
  </Box>
);

export default CardiometerPage;
