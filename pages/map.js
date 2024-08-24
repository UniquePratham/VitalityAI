import Head from "next/head";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});
const LocationMap = dynamic(() => import("@/components/LocationMap"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <LocationMap />
      <Footer />
    </>
  );
}
