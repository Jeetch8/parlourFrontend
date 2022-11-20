import React from "react";
import {
  Flex,
  Stack,
  useColorModeValue,
  Center,
  Heading,
  Image,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";
import { useNavigate, useParams } from "react-router-dom";
import { baseDomain } from "../../Utills/BaseUrl";

const EmailVerificationSuccess = () => {
  const { uuid } = useParams();
  console.log(uuid);
  const navigate = useNavigate();
  const toast = useToast();
  const { isFetching, isRefetchError, isLoading, data, isError } = useQuery(
    ["sendEmailVerificationReq"],
    () => {
      return axios.get(`${baseDomain}/user/auth/verifyEmail/${uuid}`);
    },
    {
      onSuccess: () => {
        toast({
          status: "success",
          position: "top",
          isClosable: false,
          title: "Email verified",
          duration: 4000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      },
    }
  );
  console.log(isRefetchError);
  console.log(isFetching);

  if (isFetching) {
    return (
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
        <RingLoader />
        <h2>Please wait...</h2>
      </Flex>
    );
  }

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      {/* {isLoading ? (
        <>
          <Skeleton height={"20px"} />
          <Skeleton height={"20px"} />
        </>
      ) : ( */}
      <Stack
        spacing={4}
        w={"full"}
        maxW={"sm"}
        bg={"white"}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        {isError ? (
          <>
            <Center
              fontSize={{ base: "sm", sm: "md" }}
              fontWeight="semibold"
              textAlign="center"
            >
              Something went wrong. <br />
              Please try again
            </Center>
            <center>We are unable to verify your email</center>
          </>
        ) : (
          <>
            <Center>
              <Image
                src="https://i.giphy.com/media/PijzuUzUhm7hcWinGn/giphy.webp"
                width={"100px"}
              />
            </Center>
            <Center
              fontSize={{ base: "sm", sm: "md" }}
              color={"gray.800"}
              textAlign="center"
            >
              Your email has been successfully verified. <br />
              You will be redirected to login page. <br />
              Please login
            </Center>
          </>
        )}
      </Stack>
      {/* )} */}
    </Flex>
  );
};

export default EmailVerificationSuccess;
