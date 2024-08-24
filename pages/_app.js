import ChatBot from "@/components/ChatBot";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <title>VitalityAI - A new approach to medical technology</title>
        <meta
          name="description"
          content="VitalityAI - Medical technology for the future"
        />
        <link rel="icon" href="/icon.png" />
      </Head>
      <Component {...pageProps} />
      <ChatBot />
    </ChakraProvider>
  );
}
