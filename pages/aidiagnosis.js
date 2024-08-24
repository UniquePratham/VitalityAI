// pages/cardiometer.js
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});
import AiDiagnosis from "../components/AiDiagnosis";
import Footer from "../components/Footer";

const AiDiagnosisPage = () => (
  <Box>
    <Navbar />
    <AiDiagnosis />
    <Footer />
  </Box>
);

export default AiDiagnosisPage;
