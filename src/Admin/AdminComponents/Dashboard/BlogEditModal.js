import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  VStack,
  Text,
  HStack,
  Box,
} from "@chakra-ui/react";
import parse from "html-react-parser";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useQuery } from "@tanstack/react-query";
import { baseDomain } from "../../../Utills/BaseUrl";

function BlogEditModal({ blog }) {
  const [toShowBlog, setToShowBlog] = useState(blog);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { refetch, isFetching } = useQuery(
    ["reefetchBlog"],
    () => {
      return axios.get(`${baseDomain}/blogs/blog/${blog._id}`, {
        withCredentials: true,
      });
    },
    {
      onSuccess: (data) => {
        setToShowBlog(data.data.blog);
      },
      enabled: false,
    }
  );

  const deleteCommentFunction = (commentId) => {
    axios
      .post(baseDomain + "/blogs/deleteComment", {
        blogId: toShowBlog._id,
        commentId: commentId,
      })
      .then((resp) => refetch());
  };

  return (
    <>
      <Button onClick={onOpen}>Edit & View Blog Details</Button>

      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={"bold"} fontSize="xl">
            {toShowBlog.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text
              h="50vh"
              overflow={"scroll"}
              sx={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
              border="2px dashed black"
            >
              {parse(toShowBlog.HTMLBody)}
            </Text>
            <Text fontSize={"20px"} fontWeight="semibold" mt="10px">
              Comments
            </Text>
            <VStack
              alignItems={"start"}
              overflow={"scroll"}
              sx={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
              border="2px dashed black"
              h="10vh"
              position={"relative"}
            >
              {toShowBlog?.commentArray.length === 0 ? (
                <HStack
                  justifyContent={"center"}
                  alignItems="center"
                  w="full"
                  h="full"
                >
                  <Text>No comments made till now</Text>
                </HStack>
              ) : (
                toShowBlog.commentArray?.map((comment) => {
                  return (
                    <HStack
                      key={comment._id}
                      justifyContent={"space-between"}
                      w="full"
                      borderTop={"1px"}
                      borderColor="gray.200"
                      alignItems={"center"}
                      px="5px"
                    >
                      <Box>
                        <Text>{comment.user.name}</Text>
                        <Text>{comment.commentText}</Text>
                      </Box>
                      <TiDeleteOutline
                        cursor={"pointer"}
                        size={"20px"}
                        onClick={() => deleteCommentFunction(comment._id)}
                      />
                    </HStack>
                  );
                })
              )}

              {isFetching ? (
                <Box
                  position={"absolute"}
                  w="full"
                  h="full"
                  backdropBlur={"3xl"}
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <ClipLoader />
                </Box>
              ) : null}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BlogEditModal;
