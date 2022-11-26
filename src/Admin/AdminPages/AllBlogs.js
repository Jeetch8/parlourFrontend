import {
  Button,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import { baseDomain } from "../../Utills/BaseUrl";
import BlogRow from "../AdminComponents/Dashboard/BlogRow";
import SideBar from "../AdminComponents/Dashboard/SideBar";

const AllBlogs = () => {
  const [allBlogsList, setAllBlogsList] = useState([]);
  const [refetchBlogs, setRefetchBlogs] = useState(false);

  const { refetch, isLoading, isFetching } = useQuery(
    ["fetchAllBlogs"],
    () => {
      return axios.get(baseDomain + "/blogs/");
    },
    {
      onSuccess: (data) => {
        setAllBlogsList([...data.data.blogs]);
      },
    }
  );

  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 2000);
  }, [refetchBlogs]);

  if (isLoading || isFetching) {
    return (
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
        <RingLoader />
        <h2>Please wait...</h2>
      </Flex>
    );
  }

  return (
    <HStack bg="gray.100" alignItems={"start"}>
      <SideBar />
      <Box
        // height={"fit-content"}
        w="fit-content"
        // height={"95vh"}
        py="3vh"
        fontSize={"15px"}
        fontWeight={"medium"}
      >
        <Box bg="white" pl={"3vh"} pr="5vw" pt="2vh" rounded={"lg"}>
          <Text fontSize={"25px"} mb={"5vh"} pt="5vh">
            All Blogs
          </Text>
          {allBlogsList.length === 0 ? (
            <Box shadow={"base"} bg="white" p="4vh" rounded={"lg"}>
              <Text>Nothing to show here</Text>
            </Box>
          ) : (
            allBlogsList.map((blog) => {
              return (
                <BlogRow
                  blog={blog}
                  key={blog._id}
                  setRefetchBlogs={setRefetchBlogs}
                  refetchBlogs={refetchBlogs}
                />
              );
            })
          )}
        </Box>
      </Box>
    </HStack>
  );
};

export default AllBlogs;
