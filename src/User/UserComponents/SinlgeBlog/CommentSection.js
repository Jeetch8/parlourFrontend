import React, { useState } from "react";
import axios from "axios";
import { Avatar, Box, Button, HStack, Text, Textarea } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import PuffLoader from "react-spinners/PuffLoader";
import { baseDomain } from "../../../Utills/BaseUrl";

const CommentSection = ({ commentList, blogId }) => {
  const [localCommentList, setLocalCommentList] = useState([...commentList]);
  const [commentText, setCommentText] = useState("");

  const { mutate: commentOnBlogFunction, isLoading } = useMutation(
    ["sendCommentReq"],
    () => {
      return axios.post(
        `${baseDomain}/blogs/blogComment/${blogId}`,
        {
          content: commentText,
        },
        { withCredentials: true }
      );
    },
    {
      onSuccess: () => {
        // localCommentList.push();
        setLocalCommentList([
          ...localCommentList,
          {
            commentText: commentText,
            user: {
              name: localStorage.getItem("userName"),
              profileImg: localStorage.getItem("profileImg"),
            },
          },
        ]);
        setCommentText("");
        // toast({
        //   duration:3000,
        //   title:"Commented"
        // })
      },
    }
  );

  return (
    <Box borderTop={"1px"} borderColor="gray.400" pt="5vh" mb="20vh">
      <Text
        fontSize={"25px"}
        fontWeight="medium"
        pb="3vh"
        className="text-[25px] font-medium pb-[3vh]"
      >
        Reponses
      </Text>
      <Box
        shadow={"base"}
        p="20px"
        rounded={"10px"}
        mb="5vh"
        pb="5vh"
        className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-[20px] rounded-[10px] mb-[5vh] pb-[5vh]"
      >
        <HStack
          alignItems="center"
          className="flex items-center pb-[3vh] space-x-5"
        >
          <Avatar
            src={localStorage.getItem("profileImg")}
            alt="Profile Pic"
            w={"45px"}
            className="w-[45px] h-[45px] rounded-full"
          />
          <Text>{localStorage.getItem("userName")}</Text>
        </HStack>
        <HStack
          alignItems={"end"}
          className="flex items-end"
          position={"relative"}
        >
          <Box
            position={"absolute"}
            top="0"
            display={"flex"}
            justifyContent="center"
            w="full"
            alignItems={"center"}
            h="full"
          >
            <PuffLoader loading={isLoading} />
          </Box>
          <Textarea
            isDisabled={isLoading ? true : false}
            name=""
            id=""
            cols="80"
            rows="5"
            className="outline-none"
            value={commentText}
            outline="none"
            border={"none"}
            placeholder="What are your thoughts?"
            onChange={(e) => setCommentText(e.target.value)}
          ></Textarea>
          <Button
            bg="green.500"
            color={"white"}
            px="1vw"
            py="0.5vh"
            rounded={"full"}
            ml="40px"
            className="bg-green-500 text-white px-[1vw] py-[0.5vh] rounded-full ml-[40px]"
            onClick={() => commentOnBlogFunction()}
          >
            Respond
          </Button>
        </HStack>
      </Box>
      {/* Other Comments */}
      {localCommentList.length === 0 ? (
        <Box textAlign={"center"} pt="10vh" className="text-center pt-[10vh]">
          <Text>There are currently no responses for this story.</Text>
          <Text> Be the first to respond.</Text>
        </Box>
      ) : (
        localCommentList.map((comment, index) => {
          return (
            <Box
              py="5vh"
              borderBottom={"1px"}
              borderColor="gray.400"
              w="50vw"
              mx="auto"
              className="py-[5vh] border-b-[1px] border-gray-400 w-[50vw] mx-auto"
              key={index}
            >
              {/* User info */}
              <HStack
                alignItems={"center"}
                pb="3vh"
                rowGap={5}
                className="flex items-center pb-[3vh] space-x-5"
              >
                <Avatar
                  src={comment.user.profileImg}
                  alt="Profile Pic"
                  className="w-[45px] h-[45px] rounded-full"
                />
                <Text>{comment.user.name}</Text>
              </HStack>
              {/* Comment */}
              {`${comment.commentText}`}
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default CommentSection;
