import {
  Box,
  HStack,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { AiFillCalendar, AiTwotoneMail } from "react-icons/ai";
import { BsClockFill, BsFillTelephoneFill } from "react-icons/bs";

export const Footer = () => {
  return (
    <Box>
      <HStack
        w="full"
        justifyContent={"space-between"}
        px="10vw"
        py="8vh"
        borderTop={"1px solid"}
        borderColor="gray.200"
        as={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        // flexFlow={{ lg: "none", base: "none", sm: "column" }}
        flexFlow="row wrap"
        rowGap={10}
        flex
        alignItems="start"
      >
        <Text>Logo</Text>
        <UnorderedList listStyleType={"none"} lineHeight="8">
          <ListItem>
            <Link type="email" display={"flex"} alignItems="center">
              <AiTwotoneMail /> <Text ml="8px">Email: support@support.com</Text>
            </Link>
          </ListItem>
          <ListItem>
            <Link display={"flex"} alignItems="center">
              <BsFillTelephoneFill />{" "}
              <Text ml="8px">Phone No: +91 8888888888</Text>
            </Link>
          </ListItem>
          <ListItem display={"flex"} alignItems="center">
            <AiFillCalendar />{" "}
            <Text ml="8px">Working Days - Monday - Sunday</Text>
          </ListItem>
          <ListItem display={"flex"} alignItems="center">
            <BsClockFill /> <Text ml="8px">working Hours 10:00AM - 6:00PM</Text>
          </ListItem>
        </UnorderedList>
        <UnorderedList listStyleType={"none"} lineHeight="8">
          <ListItem fontWeight="bold" fontSize={"17px"}>
            Address
          </ListItem>
          <ListItem>Lorem, ipsum dolor</ListItem>
          <ListItem>asjhd aoiasdj9s dasoi</ListItem>
          <ListItem>Karnataka,India</ListItem>
        </UnorderedList>
      </HStack>
      <Box textAlign={"center"} py="20px">
        <Link href="http://minimax-technologies.netlify.app" target={"_blank"}>
          @cyberspace technologies
        </Link>
      </Box>
    </Box>
  );
};
