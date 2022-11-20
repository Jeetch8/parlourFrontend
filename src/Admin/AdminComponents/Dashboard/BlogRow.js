import {
  Box,
  Button,
  HStack,
  Image,
  Td,
  Text,
  Textarea,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import BlogEditModal from "./BlogEditModal";
import { baseDomain } from "../../../Utills/BaseUrl";

const BlogRow = ({ blog, setRefetchBlogs, refetchBlogs }) => {
  const toast = useToast();
  const regex = /(<([^>]+)>)/gi;
  const deleteBlogReq = (blogId) => {
    axios
      .delete(`${baseDomain}/blogs/deleteBlog/${blog._id}`, {
        withCredentials: true,
      })
      .then(
        toast({
          position: "top",
          status: "success",
          isClosable: false,
          title: "Blog deleted",
          duration: 3000,
        })
      )
      .then(setRefetchBlogs(!refetchBlogs));
  };

  const publishADraftedBlogHandler = () => {
    axios
      .get(`${baseDomain}/blogs/publishDraftedBlog/${blog._id}`, {
        withCredentials: true,
      })
      .then(
        toast({
          position: "top",
          status: "success",
          isClosable: false,
          title: "Blog Publised",
          duration: 3000,
        })
      )
      .then(setRefetchBlogs(!refetchBlogs));
  };

  return (
    <>
      <HStack
        p="3vh"
        pt="6vh"
        alignItems={"start"}
        rowGap="10"
        spacing={10}
        w="fit-content"
      >
        <Image
          src={
            blog.blogImg
              ? blog.blogImg
              : "https://t4.ftcdn.net/jpg/04/95/28/65/360_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg"
          }
          border={"3px solid black"}
          rounded="2xl"
          w="15vw"
        />
        <Box w="400px" h="20vh">
          <Text fontSize={"17px"}>{blog.title}</Text>
          <textarea
            cols={50}
            rows={5}
            overflow={"hidden"}
            color="black"
            // outline={"none"}
            // border="none"
            value={`${blog.HTMLBody.replace(regex, "").substring(0, 200)}...`}
            // isDisabled
            disabled={true}
          ></textarea>
        </Box>
        <VStack alignItems={"start"}>
          <BlogEditModal blog={blog} />
          {blog.status === "draft" ? (
            <Button onClick={() => publishADraftedBlogHandler(blog._id)}>
              Publish
            </Button>
          ) : null}
          <Button onClick={() => deleteBlogReq(blog._id)}>Delete</Button>
        </VStack>
        <VStack alignItems={"start"} spacing="7">
          <Text>Total Comments: {(Math.random() * 200).toFixed(0)}</Text>
          <Text>Total Likes: {(Math.random() * 200).toFixed(0)}</Text>
          <Text>Totoal views: {(Math.random() * 200).toFixed(0)}</Text>
        </VStack>
      </HStack>
    </>
  );
};

export default BlogRow;
