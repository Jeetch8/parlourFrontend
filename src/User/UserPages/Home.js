import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NavBar from "../UserComponents/NavBar";
import ArticleCard2 from "../UserComponents/Home/ArticleCard2";
import { Container, Flex, SimpleGrid, Stack } from "@chakra-ui/react";
import RingLoader from "react-spinners/RingLoader";
import { baseDomain } from "../../Utills/BaseUrl";

const Home = () => {
  const [blogsList, setBlogList] = useState([]);
  const [userExist, setUSerExist] = useState(false);
  useEffect(() => {
    if (document.cookie) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; token=`);
      const token = parts.pop().split(";").shift();
      if (token) {
        setUSerExist(true);
      }
    }
  }, []);
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
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
        <RingLoader />
        <h2>Please wait...</h2>
      </Flex>
    );
  }
  return (
    <Stack spacing={10}>
      <NavBar />
      {/* <Container mx="1vw" mt="5vh"> */}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        rowGap={{ base: "8", md: "12" }}
        columnGap="8"
        px="2vw"
        pb="5vh"
      >
        {blogsList.length !== 0 ? (
          blogsList.map((blog) => {
            return (
              <ArticleCard2 blog={blog} key={blog._id} userExist={userExist} />
            );
          })
        ) : (
          <h2>Nothing to Show Here</h2>
        )}
      </SimpleGrid>
      {/* </Container> */}
    </Stack>
  );
};

export default Home;
