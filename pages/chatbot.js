import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});
import ChatBot from "@/components/ChatBot";
const Chatbot = () => {
  return (
    <>
      <Navbar />
      <ChatBot />
      <Footer />
    </>
  );
};
export default Chatbot;
