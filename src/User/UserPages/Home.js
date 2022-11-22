import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NavBar from "../UserComponents/NavBar";
import ArticleCard2 from "../UserComponents/Home/ArticleCard2";
import { Container, Flex, Image, SimpleGrid, Stack } from "@chakra-ui/react";
import RingLoader from "react-spinners/RingLoader";
import { baseDomain } from "../../Utills/BaseUrl";
import { motion, useScroll } from "framer-motion";
import Carousel from "../UserComponents/Home/Carousel";
import ContactForm from "../UserComponents/Home/ContactForm";
import { Footer } from "../UserComponents/Footer";

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
    <Stack spacing={10}>
      <NavBar />
      <Carousel />
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
      <ContactForm />
      <Footer />
    </Stack>
  );
};

export default Home;
