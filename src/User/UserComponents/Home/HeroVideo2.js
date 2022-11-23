import React from "react";
import { motion } from "framer-motion";
import { Box, Image } from "@chakra-ui/react";

const HeroVideo2 = () => {
  return (
    <Box
      width={{ base: "100%", lg: "50.7%" }}
      position="relative"
      background={"black"}
      height={{ base: "70vh", lg: "100vh" }}
    >
      <Box
        display={{ lg: "block", base: "none" }}
        // className="heroVideoContainer"
        width={{ base: "100%", lg: "100%" }}
        position="relative"
        background={"black"}
        height={{ base: "70vh", lg: "100vh" }}
      >
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
      <Image
        display={{ lg: "none", base: "block" }}
        src="https://i.ibb.co/xFM6kc5/Untitled-video-Made-with-Clipchamp-1-Adobe-Express.gif"
        width={"100%"}
        height="100%"
        px={{ md: "10vw", sm: "0" }}
      />
    </Box>
  );
};

export default HeroVideo2;
