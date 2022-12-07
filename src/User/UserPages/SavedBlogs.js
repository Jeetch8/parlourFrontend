import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import axios from "axios";
import { baseDomain } from "../../Utills/BaseUrl";
import ArticleCard2 from "../UserComponents/Home/ArticleCard2";
import NavBar from "../UserComponents/NavBar";
import { Footer } from "../UserComponents/Footer";

const SavedBlogs = () => {
  const [savedBlogs, setSavedBlogs] = useState([]);
  const {} = useQuery(
    ["fetchAllSavedBlogs"],
    () => {
      return axios.get(baseDomain + "/blogs/savedblogs", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      });
    },
    {
      onSuccess: (data) => {
        console.log(data.data);
        setSavedBlogs([...data.data.savedBlogs]);
      },
    }
  );
  return (
    <Box>
      <NavBar />
      <Box pt="5vh" px={"5vw"} minH="100vh">
        <Text fontSize={"30px"} fontWeight="bold">
          Saved Blogs
        </Text>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          rowGap={{ base: "8", md: "12" }}
          columnGap="8"
          px="2vw"
          pb="5vh"
          pt="5vh"
        >
          {savedBlogs.length === 0 ? (
            <Text>No Blogs have been Saved</Text>
          ) : (
            <ArticleCard2 />
          )}
        </SimpleGrid>
      </Box>
      <Footer />
    </Box>
  );
};

export default SavedBlogs;
