// pages/checkout.js

import React, { useState } from "react";
import {
  Box,
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import PayPalButton from "../components/PayPalButton";
import Head from "next/head";

const CheckoutPage = () => {
  const [amount, setAmount] = useState(""); // State for amount input
  const [currency, setCurrency] = useState("USD"); // State for currency selection
  const [showPayPalButton, setShowPayPalButton] = useState(false); // State to control PayPal button display

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setShowPayPalButton(false); // Hide PayPal button when amount changes
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
    setShowPayPalButton(false); // Hide PayPal button when currency changes
  };

  const isAmountValid = amount > 0; // Check if amount is a positive number

  const handlePayNowClick = () => {
    // Show PayPal button when "Pay Now" button is clicked and amount is valid
    if (isAmountValid) {
      setShowPayPalButton(true);
    } else {
      // Optionally show a message or alert if amount is invalid
      alert("Please enter a valid amount.");
    }
  };

  return (
    <ChakraProvider>
      <Head>
        <title>Checkout | ACNS </title>
      </Head>
      <Box bg="#111119" color="white" minHeight="100vh">
        <Navbar />
        <Flex
          justify="center"
          align="center"
          direction="column"
          py={8}
          px={4}
          height="100%"
        >
          <Box width="100%" maxW="600px">
            <FormControl mb={4}>
              <FormLabel htmlFor="amount">Amount:</FormLabel>
              <Input
                id="amount"
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={handleAmountChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="currency">Currency:</FormLabel>
              <Select
                id="currency"
                value={currency}
                onChange={handleCurrencyChange}
                bg="#333" // Dark background color
                color="white" // White text color
              >
                <option value="USD">USD - US Dollar</option>
              </Select>
            </FormControl>
            <Button onClick={handlePayNowClick}>Pay Now</Button>
            {showPayPalButton && (
              <PayPalButton amount={amount} currency={currency} />
            )}
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default CheckoutPage;
