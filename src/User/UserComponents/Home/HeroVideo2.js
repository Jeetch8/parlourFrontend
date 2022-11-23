import React from "react";
import { motion } from "framer-motion";
import { Box, position } from "@chakra-ui/react";

const HeroVideo2 = () => {
  return (
    <Box
      // className="heroVideoContainer"
      width={{ base: "100%", lg: "50.7%" }}
      position="relative"
      background={"black"}
      height={{ base: "70vh", lg: "100vh" }}
    >
      {/* <iframe
        src="https://streamable.com/e/sjj8y2?autoplay=1&nocontrols=1"
        frameborder="0"
        width="100%"
        height="100%"
        allowfullscreen
        allow="autoplay"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: "0px",
          top: "0px",
          overflow: "hidden",
        }}
      ></iframe> */}
      <embed
        src="https://streamable.com/e/sjj8y2?autoplay=1&nocontrols=1"
        width={"100%"}
        height="100%"
        autostart="1"
        autoPlay={true}
        allow="autoplay"
        style={{
          position: "absolute",
          border: "0",
          left: "0",
          top: "0",
          overflow: "hidden",
        }}
      ></embed>
    </Box>
  );
};

export default HeroVideo2;
