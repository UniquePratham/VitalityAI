// components/PayPalButton.js

import React, { useEffect, useState } from "react";
import { loadScript } from "@paypal/paypal-js";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

const PayPalButton = ({ amount }) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);

  const client_id =
    "AZSXFk8heXGqEiI7J3ISk9Mp4mDoey0O4mj1Cks7xNHucVDsocRIak86BCCFABrR3LeLjPacdcnJApqJ";

  useEffect(() => {
    const initializePayPalScript = async () => {
      try {
        const paypalScript = await loadScript({
          // "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          "client-id": client_id,
        });
        setSdkLoaded(true);
      } catch (err) {
        console.error("Failed to load PayPal SDK:", err);
      }
    };

    initializePayPalScript();

    return () => {
      // Clean up any PayPal SDK script
      const existingScript = document.querySelector(
        // `[src="https://www.paypal.com/sdk/js?client-id=${process.env.local.NEXT_PUBLIC_PAYPAL_CLIENT_ID}"]`
        `[src="https://www.paypal.com/sdk/js?client-id=${client_id}"]`
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (sdkLoaded) {
      // Render PayPal buttons using PayPal SDK
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log("Payment completed:", order);
            // Handle payment success (e.g., show success message)
          },
          onError: (err) => {
            console.error("PayPal error:", err);
            // Handle payment error (e.g., show error message)
          },
        })
        .render("#paypal-button-container");
    }
  }, [sdkLoaded, amount]);

  return (
    <Box
      style={{ margin: "50px 50px 80px 0px" }}
      id="paypal-button-container"
    ></Box>
  );
};

export default PayPalButton;
