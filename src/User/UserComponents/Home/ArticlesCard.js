import React, { useState } from "react";
import { BsBookmarkPlus, BsFillBookmarkCheckFill } from "react-icons/bs";
import getReadingTime from "blog-reading-time";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, HStack, Image, Text, useToast } from "@chakra-ui/react";

const ArticleCard = ({ singleBlog }) => {
  const [bookmarkerd, setBookmarked] = useState(false);
  const toast = useToast();
  const naviagte = useNavigate();
  const formatter = buildFormatter(frenchStrings);
  const regex = /(<([^>]+)>)/gi;

  const savePostFunction = async () => {
    const resp = await axios.post(
      "http://localhost:5000/api/v1/user/savePost",
      {
        blogId: singleBlog._id,
        token: localStorage.getItem("token"),
      }
    );
    resp.data.success
      ? toast.success("Blog Saved", {
          position: "top-center",
          closeButton: false,
          hideProgressBar: true,
        })
      : toast.error("Somthing went wrong", {
          position: "top-center",
          closeButton: false,
          hideProgressBar: true,
        });
  };

  return (
    <Box
      w="55vw"
      alignItems={"start"}
      pt="3vh"
      pb="4vh"
      borderBottom={"1px"}
      borderColor="gray.300"
    >
      <HStack spacing={2} fontSize="15px">
        {/* Profile Pic */}
        <Image
          src={
            singleBlog.user.profilePic ||
            "https://wallpaperaccess.com/full/2213424.jpg"
          }
          w="25px"
          h="25px"
          rounded={"full"}
          mb="15px"
          alt="avatar"
        />
        <h3>{singleBlog.user.name}</h3>.
        <Text color={"gray.500"} className="text-gray-500">
          <TimeAgo date={singleBlog.updatedAt} formatter={formatter} />
        </Text>
      </HStack>
      <Box className=" justify-between  items-start">
        <HStack
          justifyContent={"space-between"}
          cursor="pointer"
          onClick={() => naviagte(`/blog/${singleBlog._id}`)}
        >
          <Box w="45vw">
            <Text fontSize={"22px"} fontWeight="bold">
              {singleBlog.title}
            </Text>
            <Text fontSize={"15px"}>
              {`${singleBlog.HTMLBody.replace(regex, "").substring(0, 190)}...`}
            </Text>
          </Box>
          <div className="">
            <Image
              src="https://miro.medium.com/fit/c/140/140/1*7mTnKPO0SqPLhGn5XFWjOg.png"
              alt=""
              width={110}
            />
          </div>
        </HStack>
        <HStack
          alignItems={"center"}
          justifyContent="space-between"
          color={"gray.500"}
          pt="4vh"
          w="45vw"
        >
          <HStack spacing={2} alignItems="center">
            <Text
              color={"black"}
              fontWeight="light"
              fontSize={"13px"}
              py="0.2vh"
              px="0.5vw"
              bg="gray.200"
              rounded={"full"}
            >
              Node
            </Text>
            <Text fontSize={"14px"}>
              {getReadingTime(singleBlog.HTMLBody)} min
            </Text>
            .<Text fontSize={"14px"}>Selected for you</Text>
          </HStack>
          <Button
            fontSize={"20px"}
            color="black"
            bg="white"
            onClick={() => savePostFunction()}
          >
            {bookmarkerd ? (
              <BsFillBookmarkCheckFill
                onClick={() => setBookmarked(!bookmarkerd)}
              />
            ) : (
              <BsBookmarkPlus onClick={() => setBookmarked(!bookmarkerd)} />
            )}
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default ArticleCard;
