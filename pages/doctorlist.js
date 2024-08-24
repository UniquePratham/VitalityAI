import Head from "next/head";
import dynamic from "next/dynamic";
import DoctorList from "../components/DoctorList";
import Footer from "@/components/Footer";
const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Navbar />
      <DoctorList />
      <Footer />
    </div>
  );
}
