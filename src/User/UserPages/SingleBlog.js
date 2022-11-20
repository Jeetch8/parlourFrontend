import { useQuery } from "@tanstack/react-query";
import "./Unreset.scss";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import getReadingTime from "blog-reading-time";
import { BsBookmarkPlus } from "react-icons/bs";
import parse from "html-react-parser";
import "./Unreset.scss";
import { BiLike } from "react-icons/bi";
import CommentSection from "../UserComponents/SinlgeBlog/CommentSection";
import { Avatar, Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import RingLoader from "react-spinners/RingLoader";
import "react-quill/dist/quill.snow.css";
import NavBar from "../UserComponents/NavBar";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import { baseDomain } from "../../Utills/BaseUrl";

const SingleBlog = () => {
  const [respData, setRespData] = useState({});
  const { blogId } = useParams();
  const formatter = buildFormatter(frenchStrings);
  const { data, isLoading, isFetching } = useQuery(
    ["fetchSinglleBlog"],
    () => {
      return axios.get(`${baseDomain}/blogs/blog/${blogId}`);
    },
    {
      onSuccess: (data) => {
        setRespData(data.data.blog);
      },
    }
  );

  const savePostFunction = () => {};

  if (isLoading || isFetching) {
    return (
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
        <RingLoader />
        <h2>Please wait...</h2>
      </Flex>
    );
  }
  return (
    <Box>
      <NavBar />
      <HStack justifyContent={"center"} mt="5vh">
        {respData ? (
          <Box
            position={"sticky"}
            top="0"
            w="60vw"
            className="sticky top-0 w-[60vw] pt-[13vh]"
          >
            <Image src={respData.blogImg} rounded="lg" shadow={"base"} />
            <HStack
              rowGap={2}
              justifyContent="space-between"
              alignItems={"center"}
              mt="13vh"
            >
              <HStack rowGap={3} className="flex space-x-3">
                <Box>
                  <Text fontSize={"14px"} color="gray.500">
                    <TimeAgo date={respData.updatedAt} formatter={formatter} />{" "}
                    . {getReadingTime(respData.HTMLBody)} min read
                  </Text>
                </Box>
              </HStack>
              <BsBookmarkPlus onClick={() => savePostFunction()} />
            </HStack>
            {/* Article */}
            <Box>
              <Text fontSize={"30px"} fontWeight="bold">
                {respData.title}
              </Text>
              <Text className="unreset">{parse(respData.HTMLBody)}</Text>
              {/* <Prose>{respData.HTMLBody}</Prose> */}
              {/* <Prose>
                <h1>Testing size</h1>
              </Prose> */}
              <HStack
                display={"flex"}
                fontSize="25px"
                justifyContent={"space-between"}
                py="7vh"
              >
                <HStack>
                  <BiLike cursor={"pointer"} />
                </HStack>
                <BsBookmarkPlus />
              </HStack>
            </Box>
            <CommentSection
              blogId={respData._id}
              commentList={respData.commentArray}
            />
          </Box>
        ) : null}
      </HStack>
    </Box>
  );
};

export default SingleBlog;
