import React, { useState } from "react";
import { BsBookmarkPlus, BsFillBookmarkCheckFill } from "react-icons/bs";
import getReadingTime from "blog-reading-time";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  HStack,
  Image,
  Stack,
  Text,
  useBreakpointValue as mode,
  useToast,
} from "@chakra-ui/react";
import { baseDomain } from "../../../Utills/BaseUrl";
import { useReducer } from "react";
import {
  INTIAL_STATE,
  userExistReducer,
} from "../../../Utills/UserAuthReducer";
import { motion } from "framer-motion";

const ArticleCard2 = ({ blog }) => {
  const [userExist, dispatch] = useReducer(userExistReducer, INTIAL_STATE);
  const [bookmarkerd, setBookmarked] = useState(false);
  const toast = useToast();
  const naviagte = useNavigate();
  const formatter = buildFormatter(frenchStrings);
  const regex = /(<([^>]+)>)/gi;

  const saveClickHandler = () => {
    axios
      .get(`${baseDomain}/blogs/saveBlogForUser/${blog._id}`, {
        withCredentials: true,
      })
      .then(
        toast({
          position: "top",
          duration: 3000,
          status: "success",
          title: "Blog saved",
          isClosable: false,
        })
      );
    setBookmarked(!bookmarkerd);
  };

  const saveClickFunction = () => {
    if (!userExist.authenticated) {
      toast({
        position: "top",
        duration: 3000,
        status: "error",
        title: "Please login first",
        isClosable: false,
      });
      return;
    }
  };

  return (
    <Box
      p="6"
      bg="bg-surface"
      boxShadow={"base"}
      _groupHover={{ boxShadow: "lg-dark" }}
      transition="all 0.2s"
      height="full"
      as={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      <Stack
        spacing={{ base: "3", lg: "5" }}
        justify="space-between"
        height="full"
      >
        <Stack spacing="8">
          <Box overflow="hidden">
            <Image
              src={
                blog.blogImg
                  ? blog.blogImg
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
              }
              alt={"image"}
              loading="lazy"
              width="full"
              height="15rem"
              objectFit="cover"
              onClick={() => naviagte(`/blog/${blog._id}`)}
              cursor="pointer"
            />
          </Box>
        </Stack>
        <Stack spacing="3">
          <Text fontSize={"small"}>
            <TimeAgo date={blog.updatedAt} formatter={formatter} />
          </Text>
          <Text fontSize={"xl"} fontWeight="semibold">
            <Link
              _hover={{ textDecor: "none" }}
              role="group"
              to={`/blog/${blog._id}`}
            >
              {blog.title}
            </Link>
          </Text>
          <Text>
            {`${blog.HTMLBody.replace(regex, "").substring(0, 190)}...`}
          </Text>
          <HStack justifyContent={"space-between"} w="full">
            <Text fontSize={"small"}>{getReadingTime(blog.HTMLBody)} min</Text>
            {bookmarkerd ? (
              <BsFillBookmarkCheckFill
                cursor={"pointer"}
                onClick={() => saveClickFunction()}
              />
            ) : (
              <BsBookmarkPlus
                cursor={"pointer"}
                onClick={() => saveClickFunction()}
              />
            )}
          </HStack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ArticleCard2;
