import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NavBar from "../UserComponents/NavBar";
import ArticleCard2 from "../UserComponents/Home/ArticleCard2";
import {
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { baseDomain } from "../../Utills/BaseUrl";
import { motion } from "framer-motion";
import ContactForm from "../UserComponents/Home/ContactForm";
import { Footer } from "../UserComponents/Footer";
import HeroVideo2 from "../UserComponents/Home/HeroVideo2";
import Carousel2 from "../UserComponents/Home/Carousel2";
import Servicesavailable from "../UserComponents/Home/Servicesavailable";

const Home = () => {
  const [blogsList, setBlogList] = useState([]);

  const { isLoading, isFetching } = useQuery(
    ["blogs"],
    () => {
      return axios.get(baseDomain + "/blogs");
    },
    {
      onSuccess: (data) => {
        setBlogList([...data.data.blogs]);
      },
    }
  );
  if (isLoading || isFetching) {
    return (
      <Flex
        as={motion.div}
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg="#FFFCF7"
      >
        <motion.div
          initial={{ opacity: 0.1 }}
          animate={{
            opacity: 1,
            transition: { duration: 2, repeat: Infinity },
          }}
        >
          <Image
            src="https://images-platform.99static.com//_OYnMEcNEN4d2iNFdhDkxzcAKq0=/463x104:1557x1198/fit-in/590x590/99designs-contests-attachments/102/102767/attachment_102767932"
            w="300px"
          />
        </motion.div>
      </Flex>
    );
  }
  return (
    <Stack spacing={0}>
      <NavBar />
      {/* <HeroVideo /> */}
      <HStack bg="black" flexFlow={{ lg: "nowrap", base: "row wrap" }}>
        <HeroVideo2 />
        {/* <Carousel /> */}
        <Carousel2 />
      </HStack>
      <HStack
        bg="#EDEDED"
        justifyContent={"space-around"}
        py="7vh"
        fontWeight={"bold"}
        textAlign="center"
        flexFlow="row wrap"
        lineHeight={"10"}
      >
        <VStack textAlign={"center"} alignItems="center" px="40px">
          <Image src="https://mahekbeauty.com/wp-content/uploads/2019/08/quality-icon-01.png" />
          <Text>EXPERT BEAUTICIANS</Text>
        </VStack>
        <VStack alignItems="center" px="30px">
          <Image src="https://mahekbeauty.com/wp-content/uploads/2019/08/quality-icon-02.png" />
          <Text>QUALITY SERVICES</Text>
        </VStack>
        <VStack alignItems="center" px="30px">
          <Image src="https://mahekbeauty.com/wp-content/uploads/2019/08/quality-icon-03.png" />
          <Text>BEAUTY PRODUCTS</Text>
        </VStack>
      </HStack>
      {/* <Container mx="1vw" mt="5vh"> */}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        rowGap={{ base: "8", md: "12" }}
        columnGap="8"
        px="2vw"
        pb="5vh"
        pt="5vh"
      >
        {blogsList.length !== 0 ? (
          blogsList.map((blog) => {
            return <ArticleCard2 blog={blog} key={blog._id} />;
          })
        ) : (
          <h2>Nothing to Show Here</h2>
        )}
      </SimpleGrid>
      <Servicesavailable />
      <ContactForm />

      <iframe
        title="google-maps"
        src="https://maps.google.com/maps?q=zolo%20euphoria&t=&z=13&ie=UTF8&iwloc=&output=embed"
        height="550px"
      ></iframe>

      <Footer />
    </Stack>
  );
};

export default Home;
