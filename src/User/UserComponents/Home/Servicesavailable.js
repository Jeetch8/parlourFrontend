import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

const Servicesavailable = () => {
  return (
    <Box py="5vh">
      <Text
        pb="2vh"
        fontStyle={"italic"}
        fontWeight="medium"
        fontFamily={"Ubuntu"}
        fontSize="35px"
        color={"darkgray"}
      >
        OUR SERVICES
      </Text>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        mx="auto"
        width={"full"}
        overflow="hidden"
      >
        <Box
          height={"50vh"}
          //   width={"24.8vw"}
          bg={
            "url(https://promakeupcenter.com/wp-content/uploads/2016/07/17601786_xxl-1080x1519.jpg)"
          }
          backgroundPosition="center"
          backgroundSize={"cover"}
        >
          <Text
            color="white"
            fontSize="25px"
            fontStyle="italic"
            fontWeight="medium"
          >
            SKIN CARE SERVICES
          </Text>
        </Box>
        <Box
          height={"50vh"}
          //   width={"24.8vw"}
          bg={
            "url(https://i.ibb.co/2WBqtdC/pexels-alexander-krivitskiy-14425843.jpg)"
          }
          backgroundPosition="center"
          backgroundSize={"cover"}
        >
          <Text
            color="white"
            fontSize="25px"
            fontStyle="italic"
            fontWeight="medium"
          >
            HAIR STYLING
          </Text>
        </Box>
        <Box
          height={"50vh"}
          //   width={"24.8vw"}
          bg={"url(https://i.ibb.co/dc0pqTj/pexels-shiny-diamond-3373716.jpg)"}
          backgroundPosition="center"
          backgroundSize={"cover"}
        >
          <Text
            color="white"
            fontSize="25px"
            fontStyle="italic"
            fontWeight="medium"
          >
            COSMETIC SERVICES
          </Text>
        </Box>
        <Box
          height={"50vh"}
          //   width={"24.8vw"}
          bg={
            "url(https://image.wedmegood.com/resized/800X/uploads/member/544433/1612431558_Best_Makeup_Artist_in_Kolkata___Makeoverxpress_Makeup_Service___Bridal_Makeup_Artist_Rimanka__12_.png)"
          }
          backgroundPosition="center"
          backgroundSize={"cover"}
        >
          <Text
            color="white"
            fontSize="25px"
            fontStyle="italic"
            fontWeight="medium"
          >
            BRIDAL MAKE-OVER
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Servicesavailable;
