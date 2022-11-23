import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";

const HeroVideo = () => {
  return (
    <Box position={"relative"}>
      {/* <HStack>
        <Box>
          <Text>You experince matters</Text>
        </Box> */}
      <Box
        height={"100%"}
        width={"100%"}
        position="absolute"
        // backdropFilter={"blur(2px)"}
        backgroundColor={"rgba(0,0,0,0.5)"}
        zIndex="overlay"
      ></Box>
      <Box
        // w={"full"}
        // position="relative"
        style={{
          width: "100%",
          height: "0px",
          position: "relative",
          paddingBottom: "56.25%",
          overflow: "hidden",
        }}
      >
        <iframe
          src="https://streamable.com/e/lbivtw?autoplay=1&nocontrols=1"
          frameborder="0"
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
        ></iframe>
      </Box>
      {/* </HStack> */}
    </Box>
  );
};

export default HeroVideo;
