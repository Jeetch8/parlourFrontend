import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NavBar from "../UserComponents/NavBar";
import ArticleCard2 from "../UserComponents/Home/ArticleCard2";
import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import RingLoader from "react-spinners/RingLoader";
import { baseDomain } from "../../Utills/BaseUrl";
import { motion, useScroll } from "framer-motion";
import Carousel from "../UserComponents/Home/Carousel";
import ContactForm from "../UserComponents/Home/ContactForm";
import { Footer } from "../UserComponents/Footer";
import HeroVideo from "../UserComponents/Home/HeroVideo";
import HeroVideo2 from "../UserComponents/Home/HeroVideo2";
import Carousel2 from "../UserComponents/Home/Carousel2";
import Servicesavailable from "../UserComponents/Home/Servicesavailable";

const Home = () => {
  const { scrollYProgress } = useScroll();
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
        // initial={{ x: "0vw" }}
        // animate={{ x: "-100vw", transition: { duration: 3 } }}
        // exit={{ x: "-100vw" }}
      >
        {/* <RingLoader />
        <h2>Please wait...</h2> */}
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
      {/* </Container> */}
      <Servicesavailable />
      <ContactForm />

      {/* <div class="mapouter"><div class="gmap_canvas"><iframe width="1080" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=zolo%20euphoria&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://123movies-to.org"></a><br><style>.mapouter{position:relative;text-align:right;height:500px;width:1080px;}</style><a href="https://www.embedgooglemap.net">embed code google map</a><style>.gmap_canvas {overflow:"hidden";background:none!important;height:"500px";width:"1080px";}</style></div></div> */}

      <iframe
        src="https://maps.google.com/maps?q=zolo%20euphoria&t=&z=13&ie=UTF8&iwloc=&output=embed"
        height="550px"
      ></iframe>

      <Footer />
    </Stack>
  );
};

export default Home;
